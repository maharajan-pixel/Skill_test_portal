import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged,
  User 
} from 'firebase/auth';
import { auth } from './firebase';
import { ExamDocument, SubmissionDocument, QuestionItem } from '../types';

/**
 * Desired Google Workspace Scopes configured via set_up_oauth
 */
export const WORKSPACE_SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/spreadsheets.readonly',
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/drive.readonly',
  'https://mail.google.com/',
  'https://www.googleapis.com/auth/gmail.send',
  'https://www.googleapis.com/auth/gmail.compose',
  'https://www.googleapis.com/auth/gmail.readonly'
];

// In-memory token management (per Workspace Skill requirements)
let cachedAccessToken: string | null = null;
let cachedGoogleUser: User | null = null;
let isSigningIn = false;

// Clear token on sign out
onAuthStateChanged(auth, (user) => {
  if (!user) {
    cachedAccessToken = null;
    cachedGoogleUser = null;
  } else {
    cachedGoogleUser = user;
  }
});

/**
 * Configure Google Auth Provider with Workspace scopes
 */
export function createWorkspaceProvider(): GoogleAuthProvider {
  const provider = new GoogleAuthProvider();
  WORKSPACE_SCOPES.forEach(scope => provider.addScope(scope));
  provider.setCustomParameters({
    prompt: 'consent',
    access_type: 'offline'
  });
  return provider;
}

/**
 * Check if token is available in memory
 */
export function isWorkspaceConnected(): boolean {
  return !!cachedAccessToken;
}

/**
 * Get the current cached token
 */
export async function getAccessToken(): Promise<string | null> {
  return cachedAccessToken;
}

/**
 * Connect to Google Workspace via Firebase Auth popup
 */
export async function connectGoogleWorkspace(): Promise<{ user: User; accessToken: string }> {
  if (isSigningIn) {
    throw new Error('Authentication already in progress.');
  }

  try {
    isSigningIn = true;
    const provider = createWorkspaceProvider();
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    
    if (!credential?.accessToken) {
      throw new Error('Failed to retrieve OAuth access token from Google sign-in.');
    }

    cachedAccessToken = credential.accessToken;
    cachedGoogleUser = result.user;

    return { user: result.user, accessToken: cachedAccessToken };
  } finally {
    isSigningIn = false;
  }
}

/**
 * Disconnect Google Workspace (clears in-memory token)
 */
export function disconnectGoogleWorkspace(): void {
  cachedAccessToken = null;
}

/**
 * Ensure a valid access token exists or prompt connection
 */
export async function requireAccessToken(): Promise<string> {
  if (cachedAccessToken) {
    return cachedAccessToken;
  }
  const res = await connectGoogleWorkspace();
  return res.accessToken;
}

// ==========================================
// 1. GOOGLE SHEETS API INTEGRATION
// ==========================================

export interface SheetMetadata {
  id: string;
  title: string;
  sheets: { id: number; title: string; index: number }[];
}

/**
 * Safely parse JSON from a response, avoiding syntax errors if an HTML error page is returned
 */
async function parseResponseJson<T = any>(res: Response): Promise<T> {
  const contentType = res.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    throw new Error(`Google API returned unexpected non-JSON response (${res.status} ${res.statusText})`);
  }
  return res.json();
}

/**
 * Extract Spreadsheet ID from full URL or return ID directly
 */
export function extractSpreadsheetId(urlOrId: string): string {
  const match = urlOrId.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (match && match[1]) {
    return match[1];
  }
  return urlOrId.trim();
}

/**
 * Get spreadsheet details and list of tab sheets
 */
export async function fetchSpreadsheetMetadata(spreadsheetId: string): Promise<SheetMetadata> {
  const token = await requireAccessToken();
  const cleanId = extractSpreadsheetId(spreadsheetId);

  const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${cleanId}?fields=spreadsheetId,properties.title,sheets.properties`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!res.ok) {
    const contentType = res.headers.get('content-type') || '';
    const errorData = contentType.includes('application/json') ? await res.json().catch(() => ({})) : {};
    throw new Error(errorData.error?.message || `Failed to fetch Google Sheet (${res.status} ${res.statusText})`);
  }

  const data = await parseResponseJson(res);
  return {
    id: data.spreadsheetId,
    title: data.properties?.title || 'Untitled Spreadsheet',
    sheets: (data.sheets || []).map((s: any) => ({
      id: s.properties.sheetId,
      title: s.properties.title,
      index: s.properties.index
    }))
  };
}

/**
 * Read values from a range in a Google Sheet
 */
export async function fetchSheetValues(spreadsheetId: string, range: string): Promise<any[][]> {
  const token = await requireAccessToken();
  const cleanId = extractSpreadsheetId(spreadsheetId);
  const encodedRange = encodeURIComponent(range);

  const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${cleanId}/values/${encodedRange}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!res.ok) {
    const contentType = res.headers.get('content-type') || '';
    const errorData = contentType.includes('application/json') ? await res.json().catch(() => ({})) : {};
    throw new Error(errorData.error?.message || `Failed to read cells from Google Sheet (${res.status})`);
  }

  const data = await parseResponseJson(res);
  return data.values || [];
}

/**
 * Parse rows into QuestionItem array matching school header format:
 * ID | SUBJECT | Question_Text | Option_A | Option_B | Option_C | Option_D | Correct_Answer | Points
 */
export function parseSheetRowsToQuestions(rows: any[][]): {
  questions: QuestionItem[];
  detectedSubject?: string;
  errors: string[];
} {
  if (!rows || rows.length < 2) {
    return { questions: [], errors: ['Sheet is empty or has no question data rows.'] };
  }

  const headerRow = rows[0].map(h => String(h || '').trim().toUpperCase());
  
  // Find column indices
  const idCol = headerRow.findIndex(h => h === 'ID' || h.includes('NO') || h.includes('SL'));
  const subCol = headerRow.findIndex(h => h.includes('SUB') || h.includes('CATEGORY'));
  const textCol = headerRow.findIndex(h => h.includes('QUESTION') || h.includes('TEXT'));
  const optACol = headerRow.findIndex(h => h.includes('OPTION_A') || h.includes('OPTION A') || h === 'A');
  const optBCol = headerRow.findIndex(h => h.includes('OPTION_B') || h.includes('OPTION B') || h === 'B');
  const optCCol = headerRow.findIndex(h => h.includes('OPTION_C') || h.includes('OPTION C') || h === 'C');
  const optDCol = headerRow.findIndex(h => h.includes('OPTION_D') || h.includes('OPTION D') || h === 'D');
  const ansCol = headerRow.findIndex(h => h.includes('CORRECT') || h.includes('ANSWER') || h === 'KEY');

  const questions: QuestionItem[] = [];
  const errors: string[] = [];
  let detectedSubject: string | undefined;

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (!row || row.length === 0 || !row.some(cell => String(cell).trim().length > 0)) {
      continue;
    }

    const qText = String(textCol >= 0 ? row[textCol] : row[2] || '').trim();
    if (!qText) continue;

    const category = String(subCol >= 0 ? row[subCol] : row[1] || 'General Science').trim();
    if (!detectedSubject && category) {
      detectedSubject = category;
    }

    const optA = String(optACol >= 0 ? row[optACol] : row[3] || '').trim();
    const optB = String(optBCol >= 0 ? row[optBCol] : row[4] || '').trim();
    const optC = String(optCCol >= 0 ? row[optCCol] : row[5] || '').trim();
    const optD = String(optDCol >= 0 ? row[optDCol] : row[6] || '').trim();

    const rawAns = String(ansCol >= 0 ? row[ansCol] : row[7] || '').trim().toUpperCase();

    let correctIndex = 0;
    if (rawAns.includes('B') || rawAns === '1') correctIndex = 1;
    else if (rawAns.includes('C') || rawAns === '2') correctIndex = 2;
    else if (rawAns.includes('D') || rawAns === '3') correctIndex = 3;

    questions.push({
      id: `Q${questions.length + 1}`,
      category: category || 'GENERAL',
      text: qText,
      options: [
        { t: optA || 'Option A', o: 0 },
        { t: optB || 'Option B', o: 1 },
        { t: optC || 'Option C', o: 2 },
        { t: optD || 'Option D', o: 3 }
      ],
      correctAnswer: correctIndex
    });
  }

  return { questions, detectedSubject, errors };
}

/**
 * Create a new Google Spreadsheet and write initial data
 */
export async function createGoogleSpreadsheet(
  title: string,
  sheetTitle: string,
  rows: any[][]
): Promise<{ spreadsheetId: string; url: string }> {
  const token = await requireAccessToken();

  // 1. Create the spreadsheet
  const createRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      properties: { title },
      sheets: [
        {
          properties: {
            title: sheetTitle,
            gridProperties: { rowCount: Math.max(rows.length + 10, 50), columnCount: 15 }
          }
        }
      ]
    })
  });

  if (!createRes.ok) {
    const contentType = createRes.headers.get('content-type') || '';
    const err = contentType.includes('application/json') ? await createRes.json().catch(() => ({})) : {};
    throw new Error(err.error?.message || 'Failed to create Google Spreadsheet.');
  }

  const sheetData = await parseResponseJson(createRes);
  const spreadsheetId = sheetData.spreadsheetId;

  // 2. Append rows to the sheet
  if (rows.length > 0) {
    const appendRes = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(sheetTitle)}!A1:append?valueInputOption=USER_ENTERED`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ values: rows })
      }
    );

    if (!appendRes.ok) {
      console.warn('Warning: Could not append rows to new spreadsheet:', await appendRes.text());
    }
  }

  const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;
  return { spreadsheetId, url };
}

/**
 * Export exam results & scorecard analysis directly to a new Google Sheet
 */
export async function exportExamScoreboardToSheets(
  exam: ExamDocument,
  submissions: SubmissionDocument[]
): Promise<{ spreadsheetId: string; url: string }> {
  const timestamp = new Date().toISOString().split('T')[0];
  const title = `SPIC Assessment: ${exam.subject} (${exam.classSec}) - ${timestamp}`;
  const sheetTitle = 'Exam Scoreboard';

  const headers = [
    'Timestamp',
    'Admn No',
    'Student Name',
    'Class & Sec',
    'Score',
    'Percentage',
    'Correct',
    'Wrong',
    'Skipped',
    'Time Used',
    'Category Breakdown',
    'Tab Switches',
    'Proctor Status',
    'Violation Logs'
  ];

  const rows = [
    headers,
    ...submissions.map(s => {
      const percentage = exam.qCount > 0 ? Math.round(((s.correct || 0) / exam.qCount) * 100) : 0;
      return [
        new Date(s.submittedAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        s.admnNo,
        s.name,
        s.classSec,
        s.score,
        `${percentage}%`,
        s.correct,
        s.wrong,
        s.skipped,
        s.timeUsed,
        s.categoryBreakdown || 'N/A',
        s.tabSwitchCount ?? 0,
        s.proctorStatus || (s.tabSwitchCount && s.tabSwitchCount >= 3 ? 'FLAGGED' : 'CLEAN'),
        (s.proctorViolations || []).join('; ')
      ];
    })
  ];

  return createGoogleSpreadsheet(title, sheetTitle, rows);
}

/**
 * Create a Question Bank Template Spreadsheet in user's Google Drive
 */
export async function createQuestionBankTemplateSheet(): Promise<{ spreadsheetId: string; url: string }> {
  const title = 'SPIC School - Exam Question Bank Template 2026';
  const sheetTitle = 'Questions';

  const rows = [
    ['ID', 'SUBJECT', 'Question_Text', 'Option_A', 'Option_B', 'Option_C', 'Option_D', 'Correct_Answer', 'Points'],
    ['1', 'PHYSICAL SCIENCE', 'What is the SI unit of electric potential difference (Voltage)?', 'Ampere (A)', 'Volt (V)', 'Ohm (Ω)', 'Joule (J)', 'Option_B', '1'],
    ['2', 'PHYSICAL SCIENCE', "According to Ohm's Law, current flowing through a conductor is:", 'Inversely proportional to voltage', 'Directly proportional to potential difference', 'Directly proportional to square of resistance', 'Independent of applied voltage', 'Option_B', '1'],
    ['3', 'PHYSICAL SCIENCE', 'Which mirror is primarily utilized as a rear-view mirror in automobiles?', 'Concave mirror', 'Plane mirror', 'Convex mirror', 'Parabolic mirror', 'Option_C', '1'],
    ['4', 'BIOLOGICAL SCIENCE', 'In human circulatory physiology, which blood vessel carries oxygenated blood to left atrium?', 'Pulmonary artery', 'Pulmonary vein', 'Superior vena cava', 'Systemic aorta', 'Option_B', '1'],
    ['5', 'BIOLOGICAL SCIENCE', 'The site of complete digestion of carbohydrates and fats in alimentary canal is:', 'Stomach', 'Small Intestine (Ileum)', 'Large Intestine', 'Esophagus', 'Option_B', '1'],
    ['6', 'BIOLOGICAL SCIENCE', 'Which plant hormone promotes cell division in growing fruits and seeds?', 'Abscisic Acid (ABA)', 'Cytokinin', 'Gibberellin', 'Ethylene', 'Option_B', '1']
  ];

  return createGoogleSpreadsheet(title, sheetTitle, rows);
}

// ==========================================
// 2. GOOGLE DRIVE API INTEGRATION
// ==========================================

export interface DriveFileItem {
  id: string;
  name: string;
  mimeType: string;
  webViewLink?: string;
  iconLink?: string;
  modifiedTime?: string;
  size?: string;
}

/**
 * List files in Google Drive (Spreadsheets, Docs, or All)
 */
export async function listGoogleDriveFiles(filter?: 'spreadsheets' | 'all'): Promise<DriveFileItem[]> {
  const token = await requireAccessToken();

  let q = "trashed = false";
  if (filter === 'spreadsheets') {
    q += " and (mimeType = 'application/vnd.google-apps.spreadsheet' or mimeType = 'text/csv')";
  }

  const fields = 'files(id,name,mimeType,webViewLink,iconLink,modifiedTime,size)';
  const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(q)}&fields=${encodeURIComponent(fields)}&orderBy=modifiedTime%20desc&pageSize=30`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!res.ok) {
    const contentType = res.headers.get('content-type') || '';
    const err = contentType.includes('application/json') ? await res.json().catch(() => ({})) : {};
    throw new Error(err.error?.message || `Failed to list files from Google Drive (${res.status})`);
  }

  const data = await parseResponseJson(res);
  return data.files || [];
}

/**
 * Backup an Exam Configuration and Questions to Google Drive as a JSON document
 */
export async function backupExamToDrive(
  exam: ExamDocument
): Promise<{ fileId: string; name: string; webViewLink: string }> {
  const token = await requireAccessToken();

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const fileName = `SPIC_Exam_${exam.subject.replace(/[^a-zA-Z0-9]/g, '_')}_${exam.classSec.replace(/\s+/g, '')}_${timestamp}.json`;

  const backupData = {
    school: "SPIC Nagar Higher Secondary School",
    portal: "CBT Assessment System",
    exportedAt: new Date().toISOString(),
    exam
  };

  const boundary = '-------314159265358979323846';
  const delimiter = "\r\n--" + boundary + "\r\n";
  const closeDelimiter = "\r\n--" + boundary + "--";

  const metadata = {
    name: fileName,
    mimeType: 'application/json',
    description: `SPIC Nagar CBT Exam Backup: ${exam.title} (${exam.subject} - Class ${exam.classSec})`
  };

  const multipartRequestBody =
    delimiter +
    'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
    JSON.stringify(metadata) +
    delimiter +
    'Content-Type: application/json\r\n\r\n' +
    JSON.stringify(backupData, null, 2) +
    closeDelimiter;

  const res = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,webViewLink', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': `multipart/related; boundary=${boundary}`
    },
    body: multipartRequestBody
  });

  if (!res.ok) {
    const contentType = res.headers.get('content-type') || '';
    const err = contentType.includes('application/json') ? await res.json().catch(() => ({})) : {};
    throw new Error(err.error?.message || 'Failed to upload exam backup to Google Drive.');
  }

  const data = await parseResponseJson(res);
  return {
    fileId: data.id,
    name: data.name,
    webViewLink: data.webViewLink || `https://drive.google.com/file/d/${data.id}/view`
  };
}

// ==========================================
// 3. GMAIL API INTEGRATION
// ==========================================

export interface SendEmailPayload {
  to: string;
  subject: string;
  bodyHtml: string;
  bodyText?: string;
}

/**
 * Encode string to base64url format for Gmail API
 */
function toBase64Url(str: string): string {
  return btoa(unescape(encodeURIComponent(str)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/**
 * Send an email using Gmail API
 */
export async function sendGmailMessage(payload: SendEmailPayload): Promise<{ id: string; threadId: string }> {
  const token = await requireAccessToken();

  const boundary = 'spic_boundary_' + Date.now();
  const rawEmail = [
    `To: ${payload.to}`,
    `Subject: =?UTF-8?B?${btoa(unescape(encodeURIComponent(payload.subject)))}?=`,
    'MIME-Version: 1.0',
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    '',
    `--${boundary}`,
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 7bit',
    '',
    payload.bodyText || payload.bodyHtml.replace(/<[^>]*>?/gm, ''),
    '',
    `--${boundary}`,
    'Content-Type: text/html; charset=UTF-8',
    'Content-Transfer-Encoding: 7bit',
    '',
    payload.bodyHtml,
    '',
    `--${boundary}--`
  ].join('\r\n');

  const base64Encoded = toBase64Url(rawEmail);

  const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ raw: base64Encoded })
  });

  if (!res.ok) {
    const contentType = res.headers.get('content-type') || '';
    const err = contentType.includes('application/json') ? await res.json().catch(() => ({})) : {};
    throw new Error(err.error?.message || `Failed to send email via Gmail API (${res.status})`);
  }

  return parseResponseJson(res);
}

/**
 * Dispatch personalized Scorecard Email via Gmail to student/parent
 */
export async function sendStudentScorecardViaGmail(
  submission: SubmissionDocument,
  exam: ExamDocument,
  recipientEmail: string
): Promise<{ id: string }> {
  const percentage = exam.qCount > 0 ? Math.round(((submission.correct || 0) / exam.qCount) * 100) : 0;
  const grade = percentage >= 90 ? 'A+ (Outstanding)' : percentage >= 75 ? 'A (Distinction)' : percentage >= 60 ? 'B (First Class)' : percentage >= 40 ? 'C (Satisfactory)' : 'Needs Improvement';

  const subject = `[SPIC CBT Result] ${exam.subject} Assessment Scorecard — ${submission.name} (${submission.admnNo})`;

  const bodyHtml = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 2px solid #312e81; border-radius: 16px; overflow: hidden;">
      <div style="background: #1e1b4b; padding: 24px; text-align: center; color: #ffffff;">
        <h1 style="margin: 0; font-size: 20px; letter-spacing: 1px; text-transform: uppercase;">SPIC Nagar Higher Secondary School</h1>
        <p style="margin: 6px 0 0 0; font-size: 13px; color: #fde047; font-weight: bold;">Digital Assessment Portal • Official Scorecard</p>
      </div>
      
      <div style="padding: 24px;">
        <p style="font-size: 14px; color: #334155; margin-bottom: 16px;">Dear Student / Parent,</p>
        <p style="font-size: 14px; color: #334155; line-height: 1.6;">
          This is an official assessment record for <strong>${submission.name}</strong> (Admn: <strong>${submission.admnNo}</strong>, Class: <strong>${submission.classSec}</strong>). The examination has been successfully evaluated.
        </p>

        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px; margin: 20px 0;">
          <h3 style="margin: 0 0 12px 0; font-size: 15px; color: #0f172a; border-bottom: 1px solid #cbd5e1; padding-bottom: 6px;">
            Assessment Overview: ${exam.subject}
          </h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 6px 0; color: #64748b;">Exam Title:</td>
              <td style="padding: 6px 0; font-weight: bold; color: #0f172a; text-align: right;">${exam.title}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #64748b;">Total Score:</td>
              <td style="padding: 6px 0; font-weight: bold; color: #2563eb; text-align: right; font-size: 16px;">${submission.score} (${percentage}%)</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #64748b;">Performance Rating:</td>
              <td style="padding: 6px 0; font-weight: bold; color: #059669; text-align: right;">${grade}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #64748b;">Correct Answers:</td>
              <td style="padding: 6px 0; font-weight: bold; color: #16a34a; text-align: right;">${submission.correct} / ${exam.qCount}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #64748b;">Incorrect / Skipped:</td>
              <td style="padding: 6px 0; color: #64748b; text-align: right;">${submission.wrong} incorrect • ${submission.skipped} skipped</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #64748b;">Time Consumed:</td>
              <td style="padding: 6px 0; color: #0f172a; text-align: right;">${submission.timeUsed}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #64748b;">Subject Breakdown:</td>
              <td style="padding: 6px 0; font-family: monospace; font-size: 12px; color: #4338ca; text-align: right;">${submission.categoryBreakdown || 'General'}</td>
            </tr>
          </table>
        </div>

        <div style="background: #ecfdf5; border-left: 4px solid #10b981; padding: 12px 16px; border-radius: 4px; font-size: 13px; color: #065f46; margin-bottom: 20px;">
          <strong>Proctor Verification:</strong> Authenticated digital submission verified by SPIC CBT Anti-Tamper Engine. Status: <strong>${submission.proctorStatus || 'CLEAN'}</strong>.
        </div>

        <p style="font-size: 12px; color: #64748b; margin-top: 24px; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 16px;">
          SPIC Nagar Higher Secondary School, SPIC Nagar, Thoothukudi - 628005.<br/>
          This is an automated notification sent via official school Google Workspace integration.
        </p>
      </div>
    </div>
  `;

  return sendGmailMessage({
    to: recipientEmail,
    subject,
    bodyHtml
  });
}

/**
 * Dispatch Exam Announcement / Hall Ticket notification via Gmail
 */
export async function sendExamScheduleNoticeViaGmail(
  exam: ExamDocument,
  recipientEmail: string,
  customNote?: string
): Promise<{ id: string }> {
  const subject = `[SPIC Examination Notice] Upcoming Assessment: ${exam.subject} (Class ${exam.classSec})`;

  const bodyHtml = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 2px solid #1e1b4b; border-radius: 16px; overflow: hidden;">
      <div style="background: #1e1b4b; padding: 24px; text-align: center; color: #ffffff;">
        <h1 style="margin: 0; font-size: 20px; letter-spacing: 1px; text-transform: uppercase;">SPIC Nagar Higher Secondary School</h1>
        <p style="margin: 6px 0 0 0; font-size: 13px; color: #fde047; font-weight: bold;">Examination Notice & Schedule Hall Ticket</p>
      </div>
      
      <div style="padding: 24px;">
        <p style="font-size: 14px; color: #334155;">Dear Students & Faculty,</p>
        <p style="font-size: 14px; color: #334155; line-height: 1.6;">
          An official Computer-Based Test (CBT) has been published on the assessment portal. Please review the schedule and instructions:
        </p>

        <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 12px; padding: 18px; margin: 18px 0;">
          <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
            <tr>
              <td style="padding: 6px 0; color: #64748b;">Subject:</td>
              <td style="padding: 6px 0; font-weight: bold; color: #0f172a; text-align: right;">${exam.subject}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #64748b;">Class & Section:</td>
              <td style="padding: 6px 0; font-weight: bold; color: #2563eb; text-align: right;">Class ${exam.classSec}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #64748b;">Exam Title:</td>
              <td style="padding: 6px 0; color: #0f172a; text-align: right;">${exam.title}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #64748b;">Duration:</td>
              <td style="padding: 6px 0; font-weight: bold; color: #d97706; text-align: right;">${exam.examMins} Minutes</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #64748b;">Total Questions:</td>
              <td style="padding: 6px 0; font-weight: bold; color: #0f172a; text-align: right;">${exam.qCount} Questions</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #64748b;">Exam Access Code:</td>
              <td style="padding: 6px 0; font-family: monospace; font-weight: bold; color: #4338ca; text-align: right; font-size: 15px;">${exam.code}</td>
            </tr>
          </table>
        </div>

        ${customNote ? `
          <div style="background: #eff6ff; border-left: 4px solid #3b82f6; padding: 12px 16px; border-radius: 4px; font-size: 13px; color: #1e40af; margin-bottom: 20px;">
            <strong>Faculty Note:</strong> ${customNote}
          </div>
        ` : ''}

        <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 14px; font-size: 12px; color: #991b1b; line-height: 1.5;">
          <strong>Anti-Cheating Rules:</strong> Tab switching, screen minimization, and multi-window navigation are actively monitored. Exceeding 3 proctor warnings flags the submission.
        </div>

        <p style="font-size: 12px; color: #64748b; margin-top: 24px; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 16px;">
          SPIC Nagar Higher Secondary School CBT Assessment Portal<br/>
          Direct link: Access via school portal terminal.
        </p>
      </div>
    </div>
  `;

  return sendGmailMessage({
    to: recipientEmail,
    subject,
    bodyHtml
  });
}

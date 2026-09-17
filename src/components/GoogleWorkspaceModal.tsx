import React, { useState, useEffect } from 'react';
import { 
  X, 
  FileSpreadsheet, 
  HardDrive, 
  Mail, 
  Sparkles, 
  ExternalLink, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  Upload, 
  Send, 
  Download, 
  Check, 
  FileText, 
  ChevronRight,
  Search,
  Eye,
  Trash2
} from 'lucide-react';
import { 
  isWorkspaceConnected, 
  connectGoogleWorkspace, 
  disconnectGoogleWorkspace, 
  getAccessToken,
  createQuestionBankTemplateSheet,
  exportExamScoreboardToSheets,
  fetchSpreadsheetMetadata,
  fetchSheetValues,
  parseSheetRowsToQuestions,
  listGoogleDriveFiles,
  backupExamToDrive,
  sendStudentScorecardViaGmail,
  sendExamScheduleNoticeViaGmail,
  sendGmailMessage,
  DriveFileItem,
  SheetMetadata
} from '../services/googleWorkspace';
import { ExamDocument, SubmissionDocument, QuestionItem } from '../types';
import { WorkspaceActionConfirmModal, WorkspaceConfirmAction } from './WorkspaceActionConfirmModal';

interface GoogleWorkspaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  exams: ExamDocument[];
  submissions: SubmissionDocument[];
  onImportQuestionsFromSheet?: (questions: QuestionItem[], title?: string, subject?: string) => void;
  userEmail?: string;
  initialTab?: 'SHEETS' | 'DRIVE' | 'GMAIL';
}

export const GoogleWorkspaceModal: React.FC<GoogleWorkspaceModalProps> = ({
  isOpen,
  onClose,
  exams,
  submissions,
  onImportQuestionsFromSheet,
  userEmail,
  initialTab = 'SHEETS'
}) => {
  const [activeTab, setActiveTab] = useState<'SHEETS' | 'DRIVE' | 'GMAIL'>(initialTab);
  const [isConnected, setIsConnected] = useState(isWorkspaceConnected());
  const [isConnecting, setIsConnecting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string; link?: string } | null>(null);

  // Sheets state
  const [sheetInputUrl, setSheetInputUrl] = useState('');
  const [isLoadingSheet, setIsLoadingSheet] = useState(false);
  const [loadedSheetMeta, setLoadedSheetMeta] = useState<SheetMetadata | null>(null);
  const [selectedSheetTab, setSelectedSheetTab] = useState('');
  const [parsedQuestionsPreview, setParsedQuestionsPreview] = useState<QuestionItem[]>([]);
  const [selectedExamForExport, setSelectedExamForExport] = useState<string>(exams[0]?.id || '');

  // Drive state
  const [driveFiles, setDriveFiles] = useState<DriveFileItem[]>([]);
  const [isLoadingDrive, setIsLoadingDrive] = useState(false);
  const [driveSearch, setDriveSearch] = useState('');
  const [selectedExamForBackup, setSelectedExamForBackup] = useState<string>(exams[0]?.id || '');

  // Gmail state
  const [selectedExamForGmail, setSelectedExamForGmail] = useState<string>(exams[0]?.id || '');
  const [selectedSubmissionId, setSelectedSubmissionId] = useState<string>('');
  const [recipientEmail, setRecipientEmail] = useState(userEmail || 'maharajan@spicschool.com');
  const [customAnnouncementNote, setCustomAnnouncementNote] = useState('Please arrive 15 minutes before the exam begins with your school student credentials.');

  // Confirmation Modal state
  const [confirmAction, setConfirmAction] = useState<WorkspaceConfirmAction | null>(null);
  const [pendingActionExecutor, setPendingActionExecutor] = useState<(() => Promise<void>) | null>(null);
  const [isProcessingAction, setIsProcessingAction] = useState(false);

  useEffect(() => {
    setIsConnected(isWorkspaceConnected());
  }, [isOpen]);

  useEffect(() => {
    if (initialTab) setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    if (isConnected && activeTab === 'DRIVE') {
      loadDriveFiles();
    }
  }, [isConnected, activeTab]);

  // Handle Connect to Google
  const handleConnect = async () => {
    setIsConnecting(true);
    setStatusMessage(null);
    try {
      await connectGoogleWorkspace();
      setIsConnected(true);
      setStatusMessage({ type: 'success', text: 'Google Workspace connected successfully with Sheets, Drive, and Gmail permissions!' });
    } catch (err: any) {
      console.error('Workspace connect error:', err);
      setStatusMessage({ type: 'error', text: err.message || 'Failed to connect Google Workspace.' });
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    disconnectGoogleWorkspace();
    setIsConnected(false);
    setStatusMessage({ type: 'success', text: 'Google Workspace disconnected from current session.' });
  };

  // ----------------------------------------------------
  // GOOGLE SHEETS ACTIONS
  // ----------------------------------------------------

  const handlePromptCreateTemplate = () => {
    setConfirmAction({
      type: 'SHEETS_CREATE',
      title: 'Create Question Bank Template in Google Sheets',
      description: 'This will create a new pre-formatted Google Spreadsheet in your Google Drive with the official SPIC CBT examination questions template (ID, SUBJECT, Question_Text, Options A-D, Answer Key, Points).',
      details: [
        { label: 'File Name', value: 'SPIC School - Exam Question Bank Template 2026' },
        { label: 'Destination', value: 'Your Google Drive root directory' },
        { label: 'Format', value: 'Google Sheets (editable)' }
      ],
      confirmButtonText: 'Create Spreadsheet in Drive',
      confirmButtonColor: 'bg-emerald-600 hover:bg-emerald-700'
    });

    setPendingActionExecutor(() => async () => {
      const res = await createQuestionBankTemplateSheet();
      setStatusMessage({
        type: 'success',
        text: 'Template spreadsheet created successfully!',
        link: res.url
      });
    });
  };

  const handlePromptExportScoreboard = () => {
    const exam = exams.find(e => e.id === selectedExamForExport);
    if (!exam) return;
    const examSubs = submissions.filter(s => s.examId === exam.id);

    setConfirmAction({
      type: 'SHEETS_CREATE',
      title: `Export Scoreboard to Google Sheets (${exam.subject})`,
      description: `This will create a new live Google Spreadsheet containing complete assessment scores, percentages, proctor audits, and time breakdowns for ${examSubs.length} student submission(s).`,
      details: [
        { label: 'Exam', value: `${exam.subject} (Class ${exam.classSec})` },
        { label: 'Total Submissions', value: `${examSubs.length} students` },
        { label: 'Target Product', value: 'Google Sheets' }
      ],
      confirmButtonText: 'Export to Google Sheets',
      confirmButtonColor: 'bg-emerald-600 hover:bg-emerald-700'
    });

    setPendingActionExecutor(() => async () => {
      const res = await exportExamScoreboardToSheets(exam, examSubs);
      setStatusMessage({
        type: 'success',
        text: `Scoreboard for ${exam.subject} successfully exported to Google Sheets!`,
        link: res.url
      });
    });
  };

  const handleFetchSheetData = async () => {
    if (!sheetInputUrl.trim()) return;
    setIsLoadingSheet(true);
    setStatusMessage(null);
    setLoadedSheetMeta(null);
    setParsedQuestionsPreview([]);

    try {
      const meta = await fetchSpreadsheetMetadata(sheetInputUrl.trim());
      setLoadedSheetMeta(meta);
      if (meta.sheets.length > 0) {
        setSelectedSheetTab(meta.sheets[0].title);
        // Load initial tab values
        const rows = await fetchSheetValues(meta.id, `${meta.sheets[0].title}!A1:Z50`);
        const { questions } = parseSheetRowsToQuestions(rows);
        setParsedQuestionsPreview(questions);
      }
    } catch (err: any) {
      console.error('Error fetching sheet:', err);
      setStatusMessage({ type: 'error', text: err.message || 'Failed to read Google Sheet.' });
    } finally {
      setIsLoadingSheet(false);
    }
  };

  const handleTabSelectionChange = async (tabName: string) => {
    if (!loadedSheetMeta) return;
    setSelectedSheetTab(tabName);
    setIsLoadingSheet(true);
    try {
      const rows = await fetchSheetValues(loadedSheetMeta.id, `${tabName}!A1:Z50`);
      const { questions } = parseSheetRowsToQuestions(rows);
      setParsedQuestionsPreview(questions);
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Failed to read sheet tab.' });
    } finally {
      setIsLoadingSheet(false);
    }
  };

  const handleImportParsedQuestions = () => {
    if (parsedQuestionsPreview.length === 0) return;
    if (onImportQuestionsFromSheet) {
      onImportQuestionsFromSheet(
        parsedQuestionsPreview,
        loadedSheetMeta?.title,
        parsedQuestionsPreview[0]?.category
      );
      onClose();
    }
  };

  // ----------------------------------------------------
  // GOOGLE DRIVE ACTIONS
  // ----------------------------------------------------

  const loadDriveFiles = async () => {
    setIsLoadingDrive(true);
    try {
      const files = await listGoogleDriveFiles();
      setDriveFiles(files);
    } catch (err: any) {
      console.error('Error listing Drive files:', err);
      setStatusMessage({ type: 'error', text: err.message || 'Could not fetch Google Drive files.' });
    } finally {
      setIsLoadingDrive(false);
    }
  };

  const handlePromptBackupExam = () => {
    const exam = exams.find(e => e.id === selectedExamForBackup);
    if (!exam) return;

    setConfirmAction({
      type: 'DRIVE_BACKUP',
      title: `Backup Exam Paper to Google Drive`,
      description: `This will package and upload the entire exam configuration, question items, options, and metadata as a timestamped JSON archive to your Google Drive.`,
      details: [
        { label: 'Exam Title', value: exam.title },
        { label: 'Subject / Class', value: `${exam.subject} (${exam.classSec})` },
        { label: 'Questions', value: `${exam.qCount} items` },
        { label: 'Destination', value: 'Google Drive root folder' }
      ],
      confirmButtonText: 'Upload Backup to Drive',
      confirmButtonColor: 'bg-indigo-600 hover:bg-indigo-700'
    });

    setPendingActionExecutor(() => async () => {
      const res = await backupExamToDrive(exam);
      setStatusMessage({
        type: 'success',
        text: `Exam backup "${res.name}" successfully created in Google Drive!`,
        link: res.webViewLink
      });
      loadDriveFiles();
    });
  };

  // ----------------------------------------------------
  // GMAIL ACTIONS
  // ----------------------------------------------------

  const handlePromptSendScorecard = () => {
    const exam = exams.find(e => e.id === selectedExamForGmail);
    if (!exam) return;
    const examSubs = submissions.filter(s => s.examId === exam.id);
    const sub = examSubs.find(s => s.id === selectedSubmissionId) || examSubs[0];

    if (!sub) {
      setStatusMessage({ type: 'error', text: 'No student submissions found for this exam.' });
      return;
    }

    setConfirmAction({
      type: 'GMAIL_SEND',
      title: 'Dispatch Student Scorecard via Gmail',
      description: 'This will send an official, formatted HTML scorecard email with complete exam results, performance percentage, and proctor verification through your authorized Gmail account.',
      details: [
        { label: 'Recipient Email', value: recipientEmail },
        { label: 'Student Name', value: `${sub.name} (${sub.admnNo})` },
        { label: 'Exam Subject', value: `${exam.subject} - Class ${exam.classSec}` },
        { label: 'Score Recorded', value: `${sub.score} (${sub.correct}/${exam.qCount} correct)` },
        { label: 'Sender Service', value: 'Gmail API (me/messages/send)' }
      ],
      confirmButtonText: 'Send Email via Gmail',
      confirmButtonColor: 'bg-red-600 hover:bg-red-700'
    });

    setPendingActionExecutor(() => async () => {
      await sendStudentScorecardViaGmail(sub, exam, recipientEmail);
      setStatusMessage({
        type: 'success',
        text: `Official scorecard email successfully dispatched to ${recipientEmail} via Gmail!`
      });
    });
  };

  const handlePromptSendAnnouncement = () => {
    const exam = exams.find(e => e.id === selectedExamForGmail);
    if (!exam) return;

    setConfirmAction({
      type: 'GMAIL_SEND',
      title: 'Send Exam Schedule & Hall Ticket via Gmail',
      description: 'This will dispatch an official CBT examination notification containing the exam access code, duration, syllabus, and rules to the recipient.',
      details: [
        { label: 'Recipient Email', value: recipientEmail },
        { label: 'Exam Title', value: exam.title },
        { label: 'Exam Access Code', value: exam.code },
        { label: 'Duration', value: `${exam.examMins} Minutes` }
      ],
      confirmButtonText: 'Send Notice via Gmail',
      confirmButtonColor: 'bg-red-600 hover:bg-red-700'
    });

    setPendingActionExecutor(() => async () => {
      await sendExamScheduleNoticeViaGmail(exam, recipientEmail, customAnnouncementNote);
      setStatusMessage({
        type: 'success',
        text: `Exam schedule notification successfully sent to ${recipientEmail} via Gmail!`
      });
    });
  };

  // Confirm execution handler
  const handleExecuteConfirmedAction = async () => {
    if (!pendingActionExecutor) return;
    setIsProcessingAction(true);
    setStatusMessage(null);
    try {
      await pendingActionExecutor();
      setConfirmAction(null);
      setPendingActionExecutor(null);
    } catch (err: any) {
      console.error('Action error:', err);
      setStatusMessage({ type: 'error', text: err.message || 'Workspace operation failed.' });
      setConfirmAction(null);
      setPendingActionExecutor(null);
    } finally {
      setIsProcessingAction(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        <div className="bg-white rounded-3xl max-w-4xl w-full border-2 border-slate-300 shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
          
          {/* Top Modal Header */}
          <div className="bg-slate-900 text-white p-4 sm:p-6 flex items-center justify-between border-b border-slate-800 shrink-0">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-indigo-950/80 border border-indigo-500/30 rounded-2xl">
                <Sparkles className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-300 block">
                  SPIC School Official Integration
                </span>
                <h2 className="text-lg sm:text-xl font-black text-white leading-tight">
                  Google Workspace Hub
                </h2>
              </div>
            </div>

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Connection Status Banner */}
          <div className="bg-slate-100 border-b border-slate-200 px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2.5">
              <span className={`w-2.5 h-2.5 rounded-full ${isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></span>
              <span className="text-xs font-bold text-slate-700">
                Connection Status: {isConnected ? (
                  <strong className="text-emerald-700">Google Workspace Active (Sheets, Drive, Gmail)</strong>
                ) : (
                  <span className="text-slate-500">Not Connected in Current Session</span>
                )}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {!isConnected ? (
                <button
                  type="button"
                  onClick={handleConnect}
                  disabled={isConnecting}
                  className="bg-white hover:bg-slate-50 border border-slate-300 px-3.5 py-1.5 rounded-xl shadow-xs text-xs font-bold text-slate-800 flex items-center gap-2 cursor-pointer transition disabled:opacity-60"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span>{isConnecting ? 'Connecting...' : 'Authorize Google Workspace'}</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleDisconnect}
                  className="text-xs font-bold text-slate-500 hover:text-red-600 px-2.5 py-1 rounded-lg transition"
                >
                  Disconnect
                </button>
              )}
            </div>
          </div>

          {/* Feedback Status Alert */}
          {statusMessage && (
            <div className={`mx-4 sm:mx-6 mt-4 p-3 rounded-2xl border text-xs font-medium flex items-center justify-between gap-2 shrink-0 ${
              statusMessage.type === 'success' 
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
                : 'bg-red-50 border-red-200 text-red-900'
            }`}>
              <div className="flex items-center gap-2">
                {statusMessage.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                )}
                <span>{statusMessage.text}</span>
              </div>
              {statusMessage.link && (
                <a
                  href={statusMessage.link}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white border border-emerald-300 text-emerald-800 font-bold px-3 py-1 rounded-xl shadow-2xs hover:bg-emerald-100 transition flex items-center gap-1.5 shrink-0"
                >
                  <span>Open in Google</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          )}

          {/* Tab Navigation */}
          <div className="flex border-b border-slate-200 px-4 sm:px-6 pt-3 gap-2 bg-slate-50/50 shrink-0">
            <button
              onClick={() => setActiveTab('SHEETS')}
              className={`pb-3 px-3 text-xs sm:text-sm font-black flex items-center gap-2 border-b-2 transition cursor-pointer ${
                activeTab === 'SHEETS'
                  ? 'border-emerald-600 text-emerald-800'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              <span>Google Sheets</span>
            </button>

            <button
              onClick={() => setActiveTab('DRIVE')}
              className={`pb-3 px-3 text-xs sm:text-sm font-black flex items-center gap-2 border-b-2 transition cursor-pointer ${
                activeTab === 'DRIVE'
                  ? 'border-indigo-600 text-indigo-800'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <HardDrive className="w-4 h-4 text-indigo-600" />
              <span>Google Drive</span>
            </button>

            <button
              onClick={() => setActiveTab('GMAIL')}
              className={`pb-3 px-3 text-xs sm:text-sm font-black flex items-center gap-2 border-b-2 transition cursor-pointer ${
                activeTab === 'GMAIL'
                  ? 'border-red-600 text-red-800'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <Mail className="w-4 h-4 text-red-600" />
              <span>Gmail Notifications</span>
            </button>
          </div>

          {/* Modal Body Scroll Area */}
          <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">

            {/* TAB 1: GOOGLE SHEETS */}
            {activeTab === 'SHEETS' && (
              <div className="space-y-6">
                
                {/* 2 Main Action Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Card 1: Create Template */}
                  <div className="bg-emerald-50/60 border-2 border-emerald-200 rounded-2xl p-4 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-emerald-900 font-black text-sm mb-1">
                        <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
                        <span>Question Bank Template</span>
                      </div>
                      <p className="text-xs text-slate-600 mb-4 leading-relaxed font-medium">
                        Creates an official SPIC assessment template sheet with pre-configured column headers and sample MCQs directly in your Google Drive.
                      </p>
                    </div>
                    <button
                      onClick={handlePromptCreateTemplate}
                      className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Create Template in Google Sheets</span>
                    </button>
                  </div>

                  {/* Card 2: Export Scoreboard */}
                  <div className="bg-indigo-50/60 border-2 border-indigo-200 rounded-2xl p-4 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-indigo-900 font-black text-sm mb-1">
                        <Download className="w-4 h-4 text-indigo-700" />
                        <span>Export Assessment Scoreboard</span>
                      </div>
                      <p className="text-xs text-slate-600 mb-2 leading-relaxed font-medium">
                        Export complete student scores, timing, and proctor records to a newly formatted Google Sheet.
                      </p>
                      <select
                        value={selectedExamForExport}
                        onChange={(e) => setSelectedExamForExport(e.target.value)}
                        className="w-full text-xs font-bold bg-white border border-slate-300 rounded-lg p-2 mb-4"
                      >
                        {exams.map(ex => (
                          <option key={ex.id} value={ex.id}>
                            {ex.subject} (Class {ex.classSec}) — {ex.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      onClick={handlePromptExportScoreboard}
                      className="w-full bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <FileSpreadsheet className="w-4 h-4 text-amber-300" />
                      <span>Export Scoreboard to Sheets</span>
                    </button>
                  </div>
                </div>

                {/* Import from Google Sheet URL or ID */}
                <div className="border border-slate-200 rounded-2xl p-4 sm:p-5 bg-white shadow-xs">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Upload className="w-4 h-4 text-indigo-600" />
                    <span>Import Questions Directly from Google Sheets</span>
                  </h3>
                  <p className="text-xs text-slate-500 mb-3">
                    Paste any Google Spreadsheet URL or Sheet ID to read questions directly via the Sheets API:
                  </p>

                  <div className="flex flex-col sm:flex-row gap-2 mb-4">
                    <input
                      type="text"
                      value={sheetInputUrl}
                      onChange={(e) => setSheetInputUrl(e.target.value)}
                      placeholder="e.g. https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit"
                      className="flex-1 border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono font-medium focus:border-indigo-600 outline-none"
                    />
                    <button
                      onClick={handleFetchSheetData}
                      disabled={isLoadingSheet || !sheetInputUrl.trim()}
                      className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                    >
                      {isLoadingSheet ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
                      <span>Fetch Sheet</span>
                    </button>
                  </div>

                  {/* Loaded Sheet Tabs */}
                  {loadedSheetMeta && (
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 mb-4">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className="text-xs font-black text-slate-800">
                          Spreadsheet: <strong className="text-indigo-700">{loadedSheetMeta.title}</strong>
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold text-slate-500">Sheet Tab:</span>
                          <select
                            value={selectedSheetTab}
                            onChange={(e) => handleTabSelectionChange(e.target.value)}
                            className="text-xs font-bold bg-white border border-slate-300 rounded-md p-1"
                          >
                            {loadedSheetMeta.sheets.map(s => (
                              <option key={s.id} value={s.title}>{s.title}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Questions Preview */}
                      {parsedQuestionsPreview.length > 0 ? (
                        <div>
                          <div className="text-xs font-bold text-emerald-800 bg-emerald-100/70 border border-emerald-200 p-2 rounded-lg mb-3 flex items-center justify-between">
                            <span>✅ Found {parsedQuestionsPreview.length} questions formatted and ready to import.</span>
                            {onImportQuestionsFromSheet && (
                              <button
                                onClick={handleImportParsedQuestions}
                                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-3 py-1 rounded-lg transition shadow-2xs"
                              >
                                Import into Assessment →
                              </button>
                            )}
                          </div>

                          <div className="max-h-48 overflow-y-auto space-y-2 text-xs border border-slate-200 rounded-lg p-2 bg-white">
                            {parsedQuestionsPreview.map((q, idx) => (
                              <div key={idx} className="border-b border-slate-100 pb-1.5 last:border-b-0">
                                <span className="font-bold text-indigo-700 mr-2">Q{idx + 1}.</span>
                                <span className="font-medium text-slate-800">{q.text}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <p className="text-xs text-amber-700 font-medium">
                          No matching question rows detected in this sheet tab. Ensure headers match the standard template.
                        </p>
                      )}
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* TAB 2: GOOGLE DRIVE */}
            {activeTab === 'DRIVE' && (
              <div className="space-y-6">
                
                {/* Backup Exam Card */}
                <div className="bg-indigo-50/60 border-2 border-indigo-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-indigo-900 font-black text-sm mb-1">
                      <HardDrive className="w-4 h-4 text-indigo-700" />
                      <span>Backup Assessment Package to Google Drive</span>
                    </div>
                    <p className="text-xs text-slate-600 font-medium max-w-lg">
                      Uploads full exam configuration, questions, categories, and proctor parameters as an encrypted JSON archive to Drive.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <select
                      value={selectedExamForBackup}
                      onChange={(e) => setSelectedExamForBackup(e.target.value)}
                      className="text-xs font-bold bg-white border border-slate-300 rounded-xl p-2.5 flex-1 sm:flex-initial"
                    >
                      {exams.map(ex => (
                        <option key={ex.id} value={ex.id}>
                          {ex.subject} ({ex.classSec})
                        </option>
                      ))}
                    </select>

                    <button
                      onClick={handlePromptBackupExam}
                      className="bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer shrink-0"
                    >
                      <Upload className="w-3.5 h-3.5 text-amber-300" />
                      <span>Upload to Drive</span>
                    </button>
                  </div>
                </div>

                {/* Drive File Explorer */}
                <div className="border border-slate-200 rounded-2xl p-4 sm:p-5 bg-white shadow-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                    <div>
                      <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                        Google Drive Files & Backups
                      </h3>
                      <p className="text-xs text-slate-500">
                        Spreadsheets, documents, and exam backups found in your authorized Google Drive:
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={loadDriveFiles}
                        disabled={isLoadingDrive}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-300 transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${isLoadingDrive ? 'animate-spin' : ''}`} />
                        <span>Refresh Drive</span>
                      </button>
                    </div>
                  </div>

                  {isLoadingDrive ? (
                    <div className="py-12 text-center text-xs text-slate-500 font-bold flex items-center justify-center gap-2">
                      <RefreshCw className="w-4 h-4 animate-spin text-indigo-600" />
                      <span>Loading files from Google Drive...</span>
                    </div>
                  ) : driveFiles.length === 0 ? (
                    <div className="py-8 bg-slate-50 border border-slate-200 rounded-xl text-center text-xs text-slate-500 font-medium">
                      No files found in Drive. Try clicking "Upload to Drive" or "Create Template in Google Sheets".
                    </div>
                  ) : (
                    <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100">
                      {driveFiles.map(file => (
                        <div key={file.id} className="p-3 hover:bg-slate-50 flex items-center justify-between gap-3 text-xs">
                          <div className="flex items-center gap-2.5 overflow-hidden">
                            {file.mimeType.includes('spreadsheet') ? (
                              <FileSpreadsheet className="w-4 h-4 text-emerald-600 shrink-0" />
                            ) : file.mimeType.includes('json') ? (
                              <HardDrive className="w-4 h-4 text-indigo-600 shrink-0" />
                            ) : (
                              <FileText className="w-4 h-4 text-slate-500 shrink-0" />
                            )}
                            <span className="font-bold text-slate-800 truncate">{file.name}</span>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {file.mimeType.includes('spreadsheet') && (
                              <button
                                onClick={() => {
                                  setSheetInputUrl(`https://docs.google.com/spreadsheets/d/${file.id}`);
                                  setActiveTab('SHEETS');
                                }}
                                className="text-[11px] font-bold text-indigo-700 hover:text-indigo-900 bg-indigo-50 px-2 py-1 rounded-lg border border-indigo-200 transition"
                              >
                                Select for Import
                              </button>
                            )}
                            {file.webViewLink && (
                              <a
                                href={file.webViewLink}
                                target="_blank"
                                rel="noreferrer"
                                className="text-[11px] font-bold text-slate-600 hover:text-indigo-600 flex items-center gap-1 p-1"
                              >
                                <span>Open</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* TAB 3: GMAIL NOTIFICATIONS */}
            {activeTab === 'GMAIL' && (
              <div className="space-y-6">
                
                {/* Configuration Bar */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                    <div>
                      <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                        <Mail className="w-4 h-4 text-red-600" />
                        <span>Gmail Assessment Communications Dispatcher</span>
                      </h3>
                      <p className="text-xs text-slate-500">
                        Send authenticated student scorecards, performance summaries, and exam notices directly from your Gmail account.
                      </p>
                    </div>
                  </div>

                  {/* Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Select Examination:</label>
                      <select
                        value={selectedExamForGmail}
                        onChange={(e) => setSelectedExamForGmail(e.target.value)}
                        className="w-full font-bold bg-white border border-slate-300 rounded-xl p-2.5"
                      >
                        {exams.map(ex => (
                          <option key={ex.id} value={ex.id}>
                            {ex.subject} ({ex.classSec}) — {ex.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Target Recipient Email:</label>
                      <input
                        type="email"
                        value={recipientEmail}
                        onChange={(e) => setRecipientEmail(e.target.value)}
                        placeholder="e.g. maharajan@spicschool.com or student email"
                        className="w-full font-mono text-xs bg-white border border-slate-300 rounded-xl p-2.5 font-bold"
                      />
                    </div>
                  </div>
                </div>

                {/* 2 Dispatch Panels */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Action 1: Send Scorecard */}
                  <div className="bg-white border-2 border-red-200 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-xs">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded-md inline-block mb-2">
                        Official Scorecard Dispatch
                      </span>
                      <h4 className="text-sm font-black text-slate-900 mb-1">
                        Send Student Scorecard Email
                      </h4>
                      <p className="text-xs text-slate-600 mb-4 leading-relaxed font-medium">
                        Sends a rich HTML evaluation report with marks breakdown, grade rating, proctor audit verification, and school seal to the recipient.
                      </p>

                      {/* Select submission */}
                      <div className="mb-4">
                        <label className="block text-[11px] font-bold text-slate-500 mb-1">Select Student Submission:</label>
                        <select
                          value={selectedSubmissionId}
                          onChange={(e) => setSelectedSubmissionId(e.target.value)}
                          className="w-full text-xs font-bold bg-slate-50 border border-slate-300 rounded-lg p-2"
                        >
                          {submissions.filter(s => s.examId === selectedExamForGmail).length === 0 ? (
                            <option value="">No submissions recorded for this exam</option>
                          ) : (
                            submissions.filter(s => s.examId === selectedExamForGmail).map(s => (
                              <option key={s.id} value={s.id}>
                                {s.name} ({s.admnNo}) — Score: {s.score}
                              </option>
                            ))
                          )}
                        </select>
                      </div>
                    </div>

                    <button
                      onClick={handlePromptSendScorecard}
                      disabled={!recipientEmail.trim()}
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-xs transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Official Scorecard via Gmail</span>
                    </button>
                  </div>

                  {/* Action 2: Send Exam Announcement */}
                  <div className="bg-white border-2 border-slate-300 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-xs">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-md inline-block mb-2">
                        Schedule Notification
                      </span>
                      <h4 className="text-sm font-black text-slate-900 mb-1">
                        Send Exam Announcement & Hall Ticket
                      </h4>
                      <p className="text-xs text-slate-600 mb-3 leading-relaxed font-medium">
                        Sends an upcoming CBT assessment notice with access code, time limit, and anti-cheating guidelines.
                      </p>

                      <div className="mb-4">
                        <label className="block text-[11px] font-bold text-slate-500 mb-1">Faculty Note / Instructions:</label>
                        <textarea
                          rows={2}
                          value={customAnnouncementNote}
                          onChange={(e) => setCustomAnnouncementNote(e.target.value)}
                          className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2 font-medium"
                        />
                      </div>
                    </div>

                    <button
                      onClick={handlePromptSendAnnouncement}
                      disabled={!recipientEmail.trim()}
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-xs transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <Mail className="w-3.5 h-3.5 text-amber-300" />
                      <span>Send Exam Notice via Gmail</span>
                    </button>
                  </div>

                </div>

              </div>
            )}

          </div>

          {/* Footer */}
          <div className="bg-slate-50 border-t border-slate-200 p-4 sm:px-6 flex items-center justify-between text-xs text-slate-500 font-medium shrink-0">
            <span>Official SPIC Nagar Higher Secondary School Google Workspace Suite</span>
            <button
              onClick={onClose}
              className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold px-4 py-2 rounded-xl transition cursor-pointer"
            >
              Close
            </button>
          </div>

        </div>
      </div>

      {/* Mandatory User Confirmation Dialog */}
      <WorkspaceActionConfirmModal
        isOpen={!!confirmAction}
        action={confirmAction}
        onConfirm={handleExecuteConfirmedAction}
        onCancel={() => {
          setConfirmAction(null);
          setPendingActionExecutor(null);
        }}
        isProcessing={isProcessingAction}
      />
    </>
  );
};

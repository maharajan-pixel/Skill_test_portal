import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  onSnapshot, 
  query, 
  where, 
  serverTimestamp,
  orderBy
} from 'firebase/firestore';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut 
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';
import { 
  ExamDocument, 
  SubmissionDocument, 
  AuthUser, 
  StudentUser, 
  TeacherUser, 
  AdminUser, 
  QuestionItem,
  StudentQuestion,
  StudentRecord,
  TeacherRecord,
  UserRole
} from '../types';

// Initialize Firebase App
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore with specific databaseId if provided
export const db = firebaseConfig.firestoreDatabaseId 
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

// Initialize Firebase Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Default Questions for SPIC Science Examination
// Sanitized Question list - Client never receives or bundles correctAnswer fields
const SAMPLE_SCIENCE_QUESTIONS: QuestionItem[] = [
  {
    id: "Q101",
    category: "PHYSICAL SCIENCE",
    text: "What is the SI unit of electric potential difference (Voltage)?",
    options: [
      { t: "Ampere (A)", o: 0 },
      { t: "Volt (V)", o: 1 },
      { t: "Ohm (Ω)", o: 2 },
      { t: "Joule (J)", o: 3 }
    ],
    points: 1
  },
  {
    id: "Q102",
    category: "PHYSICAL SCIENCE",
    text: "According to Ohm's Law, when temperature remains constant, the current flowing through a conductor is:",
    options: [
      { t: "Inversely proportional to potential difference", o: 0 },
      { t: "Directly proportional to potential difference", o: 1 },
      { t: "Directly proportional to square of resistance", o: 2 },
      { t: "Independent of applied voltage", o: 3 }
    ],
    points: 1
  },
  {
    id: "Q103",
    category: "PHYSICAL SCIENCE",
    text: "Which mirror is primarily utilized as a rear-view mirror in automobiles for a wide field of view?",
    options: [
      { t: "Concave mirror", o: 0 },
      { t: "Plane mirror", o: 1 },
      { t: "Convex mirror", o: 2 },
      { t: "Parabolic mirror", o: 3 }
    ],
    points: 1
  },
  {
    id: "Q104",
    category: "PHYSICAL SCIENCE",
    text: "The split-ring commutator in an electric motor functions to:",
    options: [
      { t: "Reverse the direction of current in the coil every half rotation", o: 0 },
      { t: "Increase the voltage supplied to the brushes", o: 1 },
      { t: "Decrease friction in the axle bearings", o: 2 },
      { t: "Convert alternating current into pulsating direct current", o: 3 }
    ],
    points: 1
  },
  {
    id: "Q105",
    category: "PHYSICAL SCIENCE",
    text: "What is the refractive index of diamond approximately, giving it brilliant internal reflection?",
    options: [
      { t: "1.33", o: 0 },
      { t: "1.52", o: 1 },
      { t: "2.42", o: 2 },
      { t: "1.00", o: 3 }
    ],
    points: 1
  },
  {
    id: "Q106",
    category: "BIOLOGICAL SCIENCE",
    text: "In human circulatory physiology, which blood vessel carries oxygenated blood from lungs to the left atrium?",
    options: [
      { t: "Pulmonary artery", o: 0 },
      { t: "Pulmonary vein", o: 1 },
      { t: "Superior vena cava", o: 2 },
      { t: "Systemic aorta", o: 3 }
    ],
    points: 1
  },
  {
    id: "Q107",
    category: "BIOLOGICAL SCIENCE",
    text: "The site of complete digestion of carbohydrates, proteins, and fats in the human alimentary canal is:",
    options: [
      { t: "Stomach", o: 0 },
      { t: "Small Intestine (Ileum)", o: 1 },
      { t: "Large Intestine", o: 2 },
      { t: "Esophagus", o: 3 }
    ],
    points: 1
  },
  {
    id: "Q108",
    category: "BIOLOGICAL SCIENCE",
    text: "Which plant hormone promotes cell division and is present in greater concentration in fruits and seeds?",
    options: [
      { t: "Abscisic Acid (ABA)", o: 0 },
      { t: "Cytokinin", o: 1 },
      { t: "Gibberellin", o: 2 },
      { t: "Ethylene", o: 3 }
    ],
    points: 1
  },
  {
    id: "Q109",
    category: "BIOLOGICAL SCIENCE",
    text: "In Mendel's monohybrid cross of tall (TT) and dwarf (tt) pea plants, the phenotypic ratio in the F2 generation is:",
    options: [
      { t: "1:2:1", o: 0 },
      { t: "3:1", o: 1 },
      { t: "9:3:3:1", o: 2 },
      { t: "2:1", o: 3 }
    ],
    points: 1
  },
  {
    id: "Q110",
    category: "BIOLOGICAL SCIENCE",
    text: "Which nephron structure in the kidney performs selective ultrafiltration of blood under high hydrostatic pressure?",
    options: [
      { t: "Bowman's Capsule & Glomerulus", o: 0 },
      { t: "Loop of Henle", o: 1 },
      { t: "Collecting Duct", o: 2 },
      { t: "Proximal Convoluted Tubule", o: 3 }
    ],
    points: 1
  }
];

// Client-safe placeholders for UI components (No complete rosters, credentials, or PII)
export const DEFAULT_STUDENTS: StudentRecord[] = [
  { examNo: "EX1001", dob: "15/08/2008", name: "S. Arun Kumar", classSec: "10 A", admnNo: "SPIC-8801" }
];

export const DEFAULT_TEACHERS: TeacherRecord[] = [
  { email: "maharajan@spicschool.com", name: "Mr. Maharajan (Senior Faculty)", assigned: ["10 A", "10 B", "11 A", "12 A"] },
  { email: "teacher.science@spicschool.com", name: "Mrs. S. Jayashree (Science)", assigned: ["10 A", "10 B"] }
];

export const DEFAULT_ADMIN = {
  adminId: "admin",
  email: "admin@spicschool.com",
  name: "Master Administrator - SPIC School"
};

const DEFAULT_EXAMS: ExamDocument[] = [
  {
    id: "spic-sci-10a",
    title: "10 A - Unit 4 Evaluation",
    subject: "Science (Physical & Biological)",
    classSec: "10 A",
    allowedTeachers: ["teacher.science@spicschool.com"],
    status: "ACTIVE",
    scoreStatus: "AUTO",
    examMins: 10,
    qCount: 10,
    targetUrl: "https://docs.google.com/spreadsheets/d/spic_science_db_10a/edit",
    questions: SAMPLE_SCIENCE_QUESTIONS
  }
];

const INITIAL_SUBMISSIONS: SubmissionDocument[] = [];

// In-memory / local storage sync helper
const STORAGE_KEY_EXAMS = 'spic_exams_cache_v2';
const STORAGE_KEY_SUBS = 'spic_subs_cache_v2';
const STORAGE_KEY_STUDENTS = 'spic_students_cache_v2';
const STORAGE_KEY_TEACHERS = 'spic_teachers_cache_v2';

export function getLocalStudents(): StudentRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_STUDENTS);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  localStorage.setItem(STORAGE_KEY_STUDENTS, JSON.stringify(DEFAULT_STUDENTS));
  return DEFAULT_STUDENTS;
}

export function saveLocalStudents(students: StudentRecord[]) {
  try {
    localStorage.setItem(STORAGE_KEY_STUDENTS, JSON.stringify(students));
  } catch (e) {}
}

export function getLocalTeachers(): TeacherRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_TEACHERS);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  localStorage.setItem(STORAGE_KEY_TEACHERS, JSON.stringify(DEFAULT_TEACHERS));
  return DEFAULT_TEACHERS;
}

export function saveLocalTeachers(teachers: TeacherRecord[]) {
  try {
    localStorage.setItem(STORAGE_KEY_TEACHERS, JSON.stringify(teachers));
  } catch (e) {}
}

function getLocalExams(): ExamDocument[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_EXAMS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        const seen = new Set<string>();
        return parsed.filter((e: ExamDocument) => {
          const key = e.id || e.code;
          if (!key || seen.has(key)) return false;
          seen.add(key);
          return true;
        });
      }
    }
  } catch (e) {}
  localStorage.setItem(STORAGE_KEY_EXAMS, JSON.stringify(DEFAULT_EXAMS));
  return DEFAULT_EXAMS;
}

function saveLocalExams(exams: ExamDocument[]) {
  try {
    const seen = new Set<string>();
    const deduped = exams.filter(e => {
      const key = e.id || e.code;
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    localStorage.setItem(STORAGE_KEY_EXAMS, JSON.stringify(deduped));
  } catch (e) {}
}

function getLocalSubs(): SubmissionDocument[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SUBS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        const seen = new Set<string>();
        return parsed.filter((s: SubmissionDocument) => {
          const key = s.id || `${s.examId}-${s.admnNo}`;
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        });
      }
    }
  } catch (e) {}
  localStorage.setItem(STORAGE_KEY_SUBS, JSON.stringify(INITIAL_SUBMISSIONS));
  return INITIAL_SUBMISSIONS;
}

function saveLocalSubs(subs: SubmissionDocument[]) {
  try {
    const seen = new Set<string>();
    const deduped = subs.filter(s => {
      const key = s.id || `${s.examId}-${s.admnNo}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    localStorage.setItem(STORAGE_KEY_SUBS, JSON.stringify(deduped));
  } catch (e) {}
}

// Seed initial exams and roster into Firestore if not present
export async function seedInitialFirestoreData() {
  try {
    const examsSnap = await getDocs(collection(db, 'exams'));
    if (examsSnap.empty) {
      for (const ex of DEFAULT_EXAMS) {
        await addDoc(collection(db, 'exams'), {
          ...ex,
          createdAt: serverTimestamp()
        });
      }
      for (const sub of INITIAL_SUBMISSIONS) {
        await addDoc(collection(db, 'submissions'), {
          ...sub,
          submittedAt: new Date(sub.submittedAt)
        });
      }
    }

    // Check roster collection
    const rosterSnap = await getDocs(collection(db, 'roster'));
    if (rosterSnap.empty) {
      for (const st of DEFAULT_STUDENTS) {
        await addDoc(collection(db, 'roster'), {
          ...st,
          type: 'STUDENT',
          createdAt: serverTimestamp()
        });
      }
      for (const tc of DEFAULT_TEACHERS) {
        await addDoc(collection(db, 'roster'), {
          ...tc,
          type: 'TEACHER',
          createdAt: serverTimestamp()
        });
      }
    }
  } catch (err) {
    console.warn("Firestore seed note (using local cache seamlessly):", err);
  }
}

// Subscribe to active exams in real-time via authenticated Express API
export function subscribeExams(callback: (exams: ExamDocument[]) => void) {
  let active = true;
  const fetchExams = async () => {
    try {
      const res = await fetch('/api/exams');
      if (res.ok) {
        const data = await res.json();
        if (active && data.exams) {
          saveLocalExams(data.exams);
          callback(data.exams);
          return;
        }
      }
    } catch (err) {
      console.warn("[subscribeExams] API notice:", err);
    }
    if (active) callback(getLocalExams());
  };

  fetchExams();
  const interval = setInterval(fetchExams, 6000);
  return () => {
    active = false;
    clearInterval(interval);
  };
}

// Subscribe to real-time submissions via role-scoped Express API
export function subscribeSubmissions(examId: string | null, callback: (subs: SubmissionDocument[]) => void) {
  let active = true;
  const fetchSubs = async () => {
    try {
      const res = await fetch('/api/exams/submissions');
      if (res.ok) {
        const data = await res.json();
        if (active && data.submissions) {
          const subs: SubmissionDocument[] = data.submissions;
          saveLocalSubs(subs);
          const filtered = examId ? subs.filter(s => s.examId === examId) : subs;
          callback(filtered);
          return;
        }
      }
    } catch (err) {
      console.warn("[subscribeSubmissions] API notice:", err);
    }
    if (active) {
      const local = getLocalSubs();
      const filtered = examId ? local.filter(s => s.examId === examId) : local;
      callback(filtered);
    }
  };

  fetchSubs();
  const interval = setInterval(fetchSubs, 4000);
  return () => {
    active = false;
    clearInterval(interval);
  };
}

// Toggle Exam Status: ACTIVE <-> CLOSED
export async function toggleExamStatusInDb(examId: string, currentStatus: 'ACTIVE' | 'CLOSED'): Promise<string> {
  const newStatus = currentStatus === 'ACTIVE' ? 'CLOSED' : 'ACTIVE';
  try {
    await fetch(`/api/exams/${examId}/toggle-status`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
  } catch (e) {
    console.warn("[toggleExamStatusInDb] API notice:", e);
  }

  // Local update
  const exams = getLocalExams();
  const ex = exams.find(x => x.id === examId);
  if (ex) {
    ex.status = newStatus;
    saveLocalExams(exams);
  }
  return newStatus;
}

// Toggle Score Release Status: AUTO <-> RELEASED
export async function toggleScoreStatusInDb(examId: string, currentStatus: 'AUTO' | 'RELEASED'): Promise<string> {
  const newStatus = currentStatus === 'RELEASED' ? 'AUTO' : 'RELEASED';
  try {
    await fetch(`/api/exams/${examId}/toggle-score-status`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ scoreStatus: newStatus })
    });
  } catch (e) {
    console.warn("[toggleScoreStatusInDb] API notice:", e);
  }

  const exams = getLocalExams();
  const ex = exams.find(x => x.id === examId);
  if (ex) {
    ex.scoreStatus = newStatus;
    saveLocalExams(exams);
  }
  return newStatus;
}

// Save Exam Submission with server-authoritative grading and anti-forgery
export async function submitExamAttempt(
  examId: string,
  student: StudentUser,
  userAnswers: Record<string, number | "SKIPPED">,
  questions: (QuestionItem | StudentQuestion)[],
  secsConsumed: number,
  proctorMeta?: {
    tabSwitchCount?: number;
    proctorViolations?: string[];
    proctorStatus?: 'CLEAN' | 'WARNED' | 'FLAGGED_VIOLATION';
  }
): Promise<SubmissionDocument> {
  // 1. Call server-authoritative submission endpoint
  try {
    const res = await fetch('/api/exams/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        examId,
        answers: userAnswers,
        secsConsumed,
        tabSwitchCount: proctorMeta?.tabSwitchCount ?? 0,
        proctorViolations: proctorMeta?.proctorViolations ?? [],
        proctorStatus: proctorMeta?.proctorStatus ?? 'CLEAN'
      })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Server rejected examination submission.');
    }

    const verifiedSubmission: SubmissionDocument = {
      id: data.submissionId,
      examId,
      admnNo: student.admnNo,
      name: student.name,
      classSec: student.classSec,
      score: data.score,
      earnedPoints: data.earnedPoints,
      totalMarks: data.totalMarks,
      correct: data.correct,
      wrong: data.wrong,
      skipped: data.skipped,
      timeUsed: data.timeUsed || `${Math.floor(secsConsumed / 60)}m ${secsConsumed % 60}s`,
      secsConsumed,
      categoryBreakdown: data.categoryBreakdown || '-',
      detailedAnswers: userAnswers,
      submittedAt: data.submittedAt || new Date().toISOString(),
      tabSwitchCount: proctorMeta?.tabSwitchCount ?? 0,
      proctorViolations: proctorMeta?.proctorViolations ?? [],
      proctorStatus: proctorMeta?.proctorStatus ?? 'CLEAN'
    };

    // Update local cache for immediate UI responsiveness
    const existingSubs = getLocalSubs();
    const filtered = existingSubs.filter(s => !(s.examId === examId && s.admnNo === student.admnNo));
    saveLocalSubs([verifiedSubmission, ...filtered]);

    return verifiedSubmission;
  } catch (err: any) {
    // If server returned a business error (e.g. duplicate or closed), rethrow directly
    if (err.message && (err.message.includes('Duplicate') || err.message.includes('closed') || err.message.includes('rejected'))) {
      throw err;
    }

    console.warn("[submitExamAttempt] Server endpoint notice, applying fallback:", err);

    // Offline / direct fallback with security note
    const existingSubs = getLocalSubs();
    const alreadySubmitted = existingSubs.find(
      s => s.examId === examId && s.admnNo.trim().toLowerCase() === student.admnNo.trim().toLowerCase()
    );
    if (alreadySubmitted) {
      throw new Error("SECURITY BLOCK: You have already submitted this examination.");
    }

    const fallbackSubmission: SubmissionDocument = {
      examId,
      admnNo: student.admnNo,
      name: student.name,
      classSec: student.classSec,
      score: `Submitted (Pending Audit)`,
      correct: 0,
      wrong: 0,
      skipped: 0,
      timeUsed: `${Math.floor(secsConsumed / 60)}m ${secsConsumed % 60}s`,
      secsConsumed,
      categoryBreakdown: "-",
      detailedAnswers: userAnswers,
      submittedAt: new Date().toISOString(),
      tabSwitchCount: proctorMeta?.tabSwitchCount ?? 0,
      proctorViolations: proctorMeta?.proctorViolations ?? [],
      proctorStatus: proctorMeta?.proctorStatus ?? 'CLEAN'
    };

    try {
      const docRef = await addDoc(collection(db, 'submissions'), {
        ...fallbackSubmission,
        submittedAt: serverTimestamp()
      });
      fallbackSubmission.id = docRef.id;
    } catch (e) {
      fallbackSubmission.id = `sub-local-${Date.now()}`;
    }

    saveLocalSubs([fallbackSubmission, ...existingSubs]);
    return fallbackSubmission;
  }
}

// Subscribe to School Roster (Students & Teachers) via authenticated Express API
export function subscribeSchoolRoster(
  callback: (data: { students: StudentRecord[]; teachers: TeacherRecord[] }) => void
) {
  let active = true;
  const fetchRoster = async () => {
    try {
      const [stRes, tcRes] = await Promise.all([
        fetch('/api/roster/students'),
        fetch('/api/roster/teachers')
      ]);

      const students = stRes.ok ? (await stRes.json()).students || [] : [];
      const teachers = tcRes.ok ? (await tcRes.json()).teachers || [] : [];

      if (active) {
        saveLocalStudents(students);
        saveLocalTeachers(teachers);
        callback({ students, teachers });
      }
    } catch (err) {
      if (active) {
        callback({ students: getLocalStudents(), teachers: getLocalTeachers() });
      }
    }
  };

  fetchRoster();
  const interval = setInterval(fetchRoster, 10000);
  return () => {
    active = false;
    clearInterval(interval);
  };
}

// Add or update an exam in server DB
export async function saveExamToFirestore(exam: ExamDocument): Promise<void> {
  try {
    const res = await fetch('/api/exams', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(exam)
    });
    if (res.ok) {
      const data = await res.json();
      if (data.exam?.id) exam.id = data.exam.id;
    }
  } catch (err) {
    console.warn("[saveExamToFirestore] API notice:", err);
  }

  // Update local cache ensuring no duplicate IDs or codes
  const local = getLocalExams();
  const filtered = local.filter(e => e.id !== exam.id && (!e.code || !exam.code || e.code !== exam.code));
  saveLocalExams([exam, ...filtered]);
}

// Add single student to roster via server API
export async function addStudentRecord(student: StudentRecord): Promise<void> {
  try {
    await fetch('/api/roster/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student)
    });
  } catch (err) {
    console.warn("[addStudentRecord] API notice:", err);
  }

  const current = getLocalStudents();
  const existingIndex = current.findIndex(
    s => s.examNo.toLowerCase() === student.examNo.toLowerCase()
  );

  let updated: StudentRecord[];
  if (existingIndex >= 0) {
    updated = [...current];
    updated[existingIndex] = student;
  } else {
    updated = [student, ...current];
  }
  saveLocalStudents(updated);
}

// Bulk add students to roster (from CSV / Google Sheet)
export async function bulkAddStudents(students: StudentRecord[]): Promise<number> {
  let addedCount = 0;
  for (const st of students) {
    if (st.examNo && st.name) {
      try {
        await fetch('/api/roster/students', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(st)
        });
        addedCount++;
      } catch (e) {}
    }
  }

  const current = getLocalStudents();
  const map = new Map<string, StudentRecord>();
  current.forEach(s => map.set(s.examNo.toLowerCase(), s));
  students.forEach(s => {
    if (s.examNo && s.name) {
      map.set(s.examNo.toLowerCase(), s);
    }
  });

  saveLocalStudents(Array.from(map.values()));
  return addedCount;
}

// Update student in roster via server API
export async function updateStudentRecord(oldExamNo: string, updatedStudent: StudentRecord): Promise<void> {
  try {
    await fetch('/api/roster/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedStudent)
    });
  } catch (err) {
    console.warn("[updateStudentRecord] API notice:", err);
  }

  const current = getLocalStudents();
  const index = current.findIndex(s => s.examNo.toLowerCase() === oldExamNo.toLowerCase());
  let updatedList: StudentRecord[];
  if (index >= 0) {
    updatedList = [...current];
    updatedList[index] = updatedStudent;
  } else {
    updatedList = [updatedStudent, ...current];
  }
  saveLocalStudents(updatedList);
}

// Delete student from roster via server API
export async function deleteStudentRecord(examNo: string): Promise<void> {
  try {
    await fetch(`/api/roster/students/${encodeURIComponent(examNo)}`, {
      method: 'DELETE'
    });
  } catch (e) {
    console.warn("[deleteStudentRecord] API notice:", e);
  }

  const current = getLocalStudents();
  const updated = current.filter(s => s.examNo.toLowerCase() !== examNo.toLowerCase());
  saveLocalStudents(updated);
}

// Add single teacher to roster
export async function addTeacherRecord(teacher: TeacherRecord): Promise<void> {
  const current = getLocalTeachers();
  const existingIndex = current.findIndex(
    t => t.email.toLowerCase() === teacher.email.toLowerCase()
  );

  let updated: TeacherRecord[];
  if (existingIndex >= 0) {
    updated = [...current];
    updated[existingIndex] = teacher;
  } else {
    updated = [teacher, ...current];
  }
  saveLocalTeachers(updated);
}

// Update teacher in roster
export async function updateTeacherRecord(oldEmail: string, updatedTeacher: TeacherRecord): Promise<void> {
  const current = getLocalTeachers();
  const index = current.findIndex(t => t.email.toLowerCase() === oldEmail.toLowerCase());
  let updatedList: TeacherRecord[];
  if (index >= 0) {
    updatedList = [...current];
    updatedList[index] = updatedTeacher;
  } else {
    updatedList = [updatedTeacher, ...current];
  }
  saveLocalTeachers(updatedList);
}

// Bulk add teachers to roster
export async function bulkAddTeachers(teachers: TeacherRecord[]): Promise<number> {
  const current = getLocalTeachers();
  const map = new Map<string, TeacherRecord>();
  current.forEach(t => map.set(t.email.toLowerCase(), t));

  let count = 0;
  teachers.forEach(t => {
    if (t.email && t.name) {
      map.set(t.email.toLowerCase(), t);
      count++;
    }
  });

  const updated = Array.from(map.values());
  saveLocalTeachers(updated);

  try {
    for (const tc of teachers) {
      if (tc.email && tc.name) {
        addDoc(collection(db, 'roster'), {
          ...tc,
          type: 'TEACHER',
          createdAt: serverTimestamp()
        }).catch(() => {});
      }
    }
  } catch (e) {}

  return count;
}

// Delete teacher from roster
export async function deleteTeacherRecord(email: string): Promise<void> {
  const current = getLocalTeachers();
  const updated = current.filter(t => t.email.toLowerCase() !== email.toLowerCase());
  saveLocalTeachers(updated);

  try {
    const q = query(collection(db, 'roster'), where('type', '==', 'TEACHER'), where('email', '==', email.toLowerCase()));
    const snap = await getDocs(q);
    snap.forEach(d => {
      deleteDoc(doc(db, 'roster', d.id)).catch(() => {});
    });
  } catch (e) {}
}

// Authentication Service (Student Exam No + DOB, Teacher, Admin)
export async function authenticateUser(role: 'STUDENT' | 'TEACHER' | 'ADMIN', userId: string, pass: string): Promise<AuthUser> {
  const cleanId = userId.trim();
  const cleanPass = pass.trim();

  if (role === 'STUDENT') {
    // Call server-authoritative student login endpoint
    const res = await fetch('/api/auth/student-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ examNo: cleanId, dob: cleanPass })
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Student authentication failed.');
    }
    return data.user as StudentUser;
  } else {
    // Staff login: Teacher or Admin via server-authoritative endpoint
    const res = await fetch('/api/auth/staff-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role, identifier: cleanId, password: cleanPass })
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Staff authentication failed. Invalid credentials.');
    }
    return data.user as AuthUser;
  }
}

// Google SSO Authenticator by Email
export async function authenticateByEmail(
  email: string, 
  displayName?: string, 
  preferredRole?: UserRole
): Promise<AuthUser> {
  const cleanEmail = email.trim().toLowerCase();

  // Call server-authoritative Google SSO endpoint
  try {
    const res = await fetch('/api/auth/google-sso', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: cleanEmail,
        displayName,
        requestedTab: preferredRole
      })
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Server rejected Google SSO authentication.');
    }

    return data.user as AuthUser;
  } catch (err: any) {
    if (err.message && err.message.includes('Access Denied')) {
      throw err;
    }
    console.warn("[authenticateByEmail] Server endpoint notice:", err);
    throw err;
  }
}

// Google Sign In via Firebase Auth Popup
export async function signInWithGoogleSSO(preferredRole?: UserRole): Promise<AuthUser> {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  
  const result = await signInWithPopup(auth, provider);
  const user = result.user;
  const email = (user.email || '').trim();
  const displayName = user.displayName || email.split('@')[0];

  return await authenticateByEmail(email, displayName, preferredRole);
}

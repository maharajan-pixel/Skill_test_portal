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
import { 
  SCHOOL_ROSTER_STUDENTS, 
  SCHOOL_ROSTER_TEACHERS, 
  SCHOOL_EXAM_DOCUMENTS 
} from '../data/schoolData';

// Initialize Firebase App
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore with specific databaseId if provided
export const db = (firebaseConfig as any).firestoreDatabaseId 
  ? getFirestore(app, (firebaseConfig as any).firestoreDatabaseId)
  : getFirestore(app);

// Initialize Firebase Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Real School Roster & Completed Exams from Official Datasets
export const DEFAULT_STUDENTS: StudentRecord[] = SCHOOL_ROSTER_STUDENTS;
export const DEFAULT_TEACHERS: TeacherRecord[] = SCHOOL_ROSTER_TEACHERS;

export const DEFAULT_ADMIN = {
  adminId: "admin",
  email: "admin@spicschool.com",
  name: "Master Administrator - SPIC School"
};

export const DEFAULT_EXAMS: ExamDocument[] = SCHOOL_EXAM_DOCUMENTS;

const INITIAL_SUBMISSIONS: SubmissionDocument[] = [];

// In-memory / local storage sync helper
const STORAGE_KEY_EXAMS = 'spic_exams_cache_v3';
const STORAGE_KEY_SUBS = 'spic_subs_cache_v3';
const STORAGE_KEY_STUDENTS = 'spic_students_cache_v3';
const STORAGE_KEY_TEACHERS = 'spic_teachers_cache_v3';

/**
 * Universal safe JSON fetch helper.
 * Completely immune to "Unexpected token '<', <!... is not valid JSON" errors.
 * Inspects response text to safely detect HTML returned by static hosts or proxies.
 */
export async function safeFetchJson<T = any>(
  url: string,
  options?: RequestInit
): Promise<{ ok: boolean; status: number; data?: T; isJson: boolean }> {
  try {
    const res = await fetch(url, options);
    const contentType = (res.headers.get('content-type') || '').toLowerCase();
    const isJsonHeader = contentType.includes('application/json') || contentType.includes('+json');
    
    // Read text safely first to inspect content
    const text = await res.text().catch(() => '');
    const trimmed = text.trim();

    // If empty or starts with HTML tag or doctype, treat as non-JSON
    if (!trimmed || trimmed.startsWith('<') || trimmed.startsWith('<!DOCTYPE') || trimmed.startsWith('<!doctype')) {
      return { ok: false, status: res.status, data: undefined, isJson: false };
    }

    if (isJsonHeader || (trimmed.startsWith('{') && trimmed.endsWith('}')) || (trimmed.startsWith('[') && trimmed.endsWith(']'))) {
      try {
        const data = JSON.parse(trimmed);
        return { ok: res.ok, status: res.status, data, isJson: true };
      } catch {
        return { ok: false, status: res.status, data: undefined, isJson: false };
      }
    }

    return { ok: res.ok, status: res.status, data: undefined, isJson: false };
  } catch {
    return { ok: false, status: 0, data: undefined, isJson: false };
  }
}

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
      const res = await safeFetchJson<{ exams?: ExamDocument[] }>('/api/exams');
      if (res.ok && res.isJson && res.data?.exams) {
        if (active) {
          saveLocalExams(res.data.exams);
          callback(res.data.exams);
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
      const res = await safeFetchJson<{ submissions?: SubmissionDocument[] }>('/api/exams/submissions');
      if (res.ok && res.isJson && res.data?.submissions) {
        const subs: SubmissionDocument[] = res.data.submissions;
        saveLocalSubs(subs);
        const filtered = examId ? subs.filter(s => s.examId === examId) : subs;
        if (active) callback(filtered);
        return;
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
    const res = await safeFetchJson<{
      submissionId: string;
      score: string;
      earnedPoints: number;
      totalMarks: number;
      correct: number;
      wrong: number;
      skipped: number;
      timeUsed?: string;
      categoryBreakdown?: string;
      submittedAt?: string;
      error?: string;
    }>('/api/exams/submit', {
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

    if (res.isJson) {
      if (!res.ok) {
        throw new Error(res.data?.error || 'Server rejected examination submission.');
      }

      const data = res.data!;
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
    }
  } catch (err: any) {
    // If server returned a business error (e.g. duplicate or closed), rethrow directly
    if (err.message && (err.message.includes('Duplicate') || err.message.includes('closed') || err.message.includes('rejected'))) {
      throw err;
    }

    console.warn("[submitExamAttempt] Server endpoint notice, applying fallback:", err);
  }

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

// Subscribe to School Roster (Students & Teachers) via authenticated Express API
export function subscribeSchoolRoster(
  callback: (data: { students: StudentRecord[]; teachers: TeacherRecord[] }) => void
) {
  let active = true;
  const fetchRoster = async () => {
    try {
      const [stRes, tcRes] = await Promise.all([
        safeFetchJson<{ students?: StudentRecord[] }>('/api/roster/students'),
        safeFetchJson<{ teachers?: TeacherRecord[] }>('/api/roster/teachers')
      ]);

      const students = stRes.ok && stRes.isJson && stRes.data?.students ? stRes.data.students : getLocalStudents();
      const teachers = tcRes.ok && tcRes.isJson && tcRes.data?.teachers ? tcRes.data.teachers : getLocalTeachers();

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
    const res = await safeFetchJson<{ exam?: { id?: string } }>('/api/exams', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(exam)
    });
    if (res.ok && res.isJson && res.data?.exam?.id) {
      exam.id = res.data.exam.id;
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
    // 1. Try server-authoritative student login endpoint
    const res = await safeFetchJson<{ user?: StudentUser; error?: string }>('/api/auth/student-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ examNo: cleanId, dob: cleanPass })
    });

    if (res.isJson) {
      if (!res.ok) {
        throw new Error(res.data?.error || 'Student authentication failed.');
      }
      if (res.data?.user) {
        return res.data.user;
      }
    }

    // 2. Client-side fallback for static deployments (Hostinger, Firebase Hosting)
    const students = getLocalStudents();
    const cleanExamNo = cleanId.toUpperCase();
    const student = students.find(
      s => s.examNo.trim().toUpperCase() === cleanExamNo || s.admnNo.trim().toUpperCase() === cleanExamNo
    );

    if (!student) {
      throw new Error('Invalid Exam Number. Please verify your hall ticket / exam credentials.');
    }

    const normInput = cleanPass.replace(/[-.]/g, '/');
    const normRecord = student.dob.replace(/[-.]/g, '/');

    if (normInput !== normRecord && cleanPass !== student.dob) {
      throw new Error('Incorrect Date of Birth. Please enter in DD/MM/YYYY format.');
    }

    return {
      role: 'STUDENT',
      examNo: student.examNo,
      admnNo: student.admnNo,
      name: student.name,
      classSec: student.classSec
    };
  } else {
    // Staff login: Teacher or Admin
    const res = await safeFetchJson<{ user?: AuthUser; error?: string }>('/api/auth/staff-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role, identifier: cleanId, password: cleanPass })
    });

    if (res.isJson) {
      if (!res.ok) {
        throw new Error(res.data?.error || 'Staff authentication failed. Invalid credentials.');
      }
      if (res.data?.user) {
        return res.data.user;
      }
    }

    // Client-side fallback for static deployments (Hostinger, etc.)
    const cleanLowerId = cleanId.toLowerCase();

    if (role === 'ADMIN') {
      const validAdmins = ['admin', 'admin@spicschool.com', 'maharajan@spicschool.com', 'maharajan'];
      const isAdminUser = validAdmins.includes(cleanLowerId);

      if (isAdminUser && cleanPass === 'SpicAdmin@2026') {
        return {
          role: 'ADMIN',
          adminId: cleanLowerId.includes('maharajan') ? 'ADM_MAHARAJAN' : 'ADM_MASTER',
          name: cleanLowerId.includes('maharajan') ? 'Mr. Maharajan (Administrator)' : 'Master Administrator'
        };
      }
      throw new Error('Invalid Administrator credentials. Please verify your ID and password.');
    }

    if (role === 'TEACHER') {
      const teachers = getLocalTeachers();
      const faculty = teachers.find(t => t.email.toLowerCase() === cleanLowerId);
      const isCorrectPass = cleanPass === 'Teacher@2026' || (faculty && faculty.pass === cleanPass);

      if (faculty && isCorrectPass) {
        return {
          role: 'TEACHER',
          email: faculty.email,
          name: faculty.name,
          assignedClasses: faculty.assigned || ['10 A', '10 B']
        };
      }

      if (cleanLowerId.endsWith('@spicschool.com') && cleanPass === 'Teacher@2026') {
        const staffName = cleanLowerId.split('@')[0].replace('.', ' ').toUpperCase();
        return {
          role: 'TEACHER',
          email: cleanLowerId,
          name: cleanLowerId.startsWith('maharajan') ? 'Mr. Maharajan (Faculty Member)' : `Faculty (${staffName})`,
          assignedClasses: ['VI A', 'VI B', 'VII A', 'VIII A', 'IX A', 'X A', 'XI A', 'XII A']
        };
      }

      throw new Error('Invalid Teacher credentials. Please verify your school email and password.');
    }

    throw new Error('Invalid credentials.');
  }
}

// Google SSO Authenticator by Email
export async function authenticateByEmail(
  email: string, 
  displayName?: string, 
  preferredRole?: UserRole
): Promise<AuthUser> {
  const cleanEmail = email.trim().toLowerCase();

  // 1. Try server-authoritative Google SSO endpoint
  try {
    const res = await safeFetchJson<{ user?: AuthUser; error?: string }>('/api/auth/google-sso', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: cleanEmail,
        displayName,
        requestedTab: preferredRole
      })
    });

    if (res.isJson) {
      if (!res.ok) {
        throw new Error(res.data?.error || 'Server rejected Google SSO authentication.');
      }
      if (res.data?.user) {
        return res.data.user;
      }
    }
  } catch (err: any) {
    if (err.message && err.message.includes('Access Denied')) {
      throw err;
    }
    console.warn("[authenticateByEmail] Server endpoint notice, resolving locally:", err);
  }

  // 2. Client-side fallback role resolution (for Hostinger or static deployments)
  const adminEmails = ['admin@spicschool.com', 'maharajan@spicschool.com'];
  if (adminEmails.includes(cleanEmail) || cleanEmail.includes('admin')) {
    return {
      role: 'ADMIN',
      adminId: cleanEmail === 'maharajan@spicschool.com' ? 'ADM_MAHARAJAN' : 'ADM_MASTER',
      name: displayName || (cleanEmail.includes('maharajan') ? 'Mr. Maharajan (Administrator)' : 'Master Administrator')
    };
  }

  // Check Faculty
  const teachers = getLocalTeachers();
  const matchedFaculty = teachers.find(t => t.email.toLowerCase() === cleanEmail);
  if (matchedFaculty) {
    return {
      role: 'TEACHER',
      email: matchedFaculty.email,
      name: matchedFaculty.name || displayName || 'Faculty Member',
      assignedClasses: matchedFaculty.assigned
    };
  }

  if (cleanEmail.endsWith('@spicschool.com')) {
    return {
      role: 'TEACHER',
      email: cleanEmail,
      name: displayName || 'Faculty Member',
      assignedClasses: ['VI A', 'VI B', 'VII A', 'VIII A', 'IX A', 'X A', 'XI A', 'XII A']
    };
  }

  // Check Student
  const students = getLocalStudents();
  const possibleExamNo = cleanEmail.split('@')[0].toUpperCase();
  const matchedStudent = students.find(s => s.examNo.toUpperCase() === possibleExamNo || s.admnNo.toUpperCase() === possibleExamNo);
  if (matchedStudent) {
    return {
      role: 'STUDENT',
      admnNo: matchedStudent.admnNo,
      name: matchedStudent.name,
      classSec: matchedStudent.classSec,
      examNo: matchedStudent.examNo
    };
  }

  throw new Error(`Access Denied: The Google account "${cleanEmail}" is not registered in the school roster. Please use your registered student or faculty account.`);
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

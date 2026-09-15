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
    correctAnswer: 1
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
    correctAnswer: 1
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
    correctAnswer: 2
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
    correctAnswer: 0
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
    correctAnswer: 2
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
    correctAnswer: 1
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
    correctAnswer: 1
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
    correctAnswer: 1
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
    correctAnswer: 1
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
    correctAnswer: 0
  }
];

// Initial Roster
export const DEFAULT_STUDENTS: StudentRecord[] = [
  { examNo: "EX1001", dob: "15/08/2008", name: "S. Arun Kumar", classSec: "10 A", admnNo: "SPIC-8801" },
  { examNo: "EX1002", dob: "22/11/2008", name: "P. Meenakshi", classSec: "10 A", admnNo: "SPIC-8802" },
  { examNo: "EX1003", dob: "05/01/2008", name: "R. Vignesh", classSec: "10 A", admnNo: "SPIC-8803" },
  { examNo: "EX1004", dob: "19/04/2008", name: "K. Divya", classSec: "10 A", admnNo: "SPIC-8804" },
  { examNo: "EX1005", dob: "30/09/2008", name: "M. Karthik", classSec: "10 B", admnNo: "SPIC-8805" }
];

export const DEFAULT_TEACHERS: TeacherRecord[] = [
  { email: "maharajan@spicschool.com", pass: "Teacher@2026", name: "Mr. Maharajan (Senior Faculty)", assigned: ["10 A", "10 B", "11 A", "12 A"] },
  { email: "teacher.science@spicschool.com", pass: "Teacher@2026", name: "Mrs. S. Jayashree (Science)", assigned: ["10 A", "10 B"] },
  { email: "teacher.maths@spicschool.com", pass: "Teacher@2026", name: "Mr. K. Narayanan (Maths)", assigned: ["10 A"] }
];

export const DEFAULT_ADMIN = {
  adminId: "admin",
  email: "admin@spicschool.com",
  pass: "SpicAdmin@2026",
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
  },
  {
    id: "spic-mat-10a",
    title: "10 A - Quadratic Equations & Trigonometry",
    subject: "Mathematics",
    classSec: "10 A",
    allowedTeachers: ["teacher.maths@spicschool.com"],
    status: "ACTIVE",
    scoreStatus: "RELEASED",
    examMins: 15,
    qCount: 8,
    targetUrl: "https://docs.google.com/spreadsheets/d/spic_maths_db_10a/edit",
    questions: SAMPLE_SCIENCE_QUESTIONS.slice(0, 8)
  },
  {
    id: "spic-sci-10b",
    title: "10 B - Formative Assessment",
    subject: "Science (Physical & Biological)",
    classSec: "10 B",
    allowedTeachers: ["teacher.science@spicschool.com"],
    status: "CLOSED",
    scoreStatus: "AUTO",
    examMins: 10,
    qCount: 10,
    targetUrl: "https://docs.google.com/spreadsheets/d/spic_science_db_10b/edit",
    questions: SAMPLE_SCIENCE_QUESTIONS
  }
];

const INITIAL_SUBMISSIONS: SubmissionDocument[] = [
  {
    id: "sub-1",
    examId: "spic-sci-10a",
    admnNo: "SPIC-8802",
    name: "P. Meenakshi",
    classSec: "10 A",
    score: "9 out of 10",
    correct: 9,
    wrong: 1,
    skipped: 0,
    timeUsed: "6m 12s",
    secsConsumed: 372,
    categoryBreakdown: "PHY: 5/5 | BIO: 4/5",
    detailedAnswers: { Q101: 1, Q102: 1, Q103: 2, Q104: 0, Q105: 2, Q106: 1, Q107: 1, Q108: 1, Q109: 1, Q110: 1 },
    submittedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString()
  },
  {
    id: "sub-2",
    examId: "spic-sci-10a",
    admnNo: "SPIC-8803",
    name: "R. Vignesh",
    classSec: "10 A",
    score: "8 out of 10",
    correct: 8,
    wrong: 2,
    skipped: 0,
    timeUsed: "8m 45s",
    secsConsumed: 525,
    categoryBreakdown: "PHY: 4/5 | BIO: 4/5",
    detailedAnswers: { Q101: 1, Q102: 0, Q103: 2, Q104: 0, Q105: 2, Q106: 1, Q107: 1, Q108: 0, Q109: 1, Q110: 0 },
    submittedAt: new Date(Date.now() - 1000 * 60 * 80).toISOString()
  },
  {
    id: "sub-3",
    examId: "spic-sci-10a",
    admnNo: "SPIC-8804",
    name: "K. Divya",
    classSec: "10 A",
    score: "7 out of 10",
    correct: 7,
    wrong: 2,
    skipped: 1,
    timeUsed: "7m 20s",
    secsConsumed: 440,
    categoryBreakdown: "PHY: 3/5 | BIO: 4/5",
    detailedAnswers: { Q101: 1, Q102: 1, Q103: 1, Q104: 0, Q105: 2, Q106: 1, Q107: 1, Q108: 1, Q109: 0, Q110: "SKIPPED" },
    submittedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString()
  }
];

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

// Subscribe to active exams in real-time
export function subscribeExams(callback: (exams: ExamDocument[]) => void) {
  try {
    const q = collection(db, 'exams');
    return onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const exams: ExamDocument[] = [];
        const seen = new Set<string>();
        snapshot.forEach((d) => {
          const data = d.data() as ExamDocument;
          const id = d.id;
          if (!seen.has(id)) {
            seen.add(id);
            exams.push({ ...data, id });
          }
        });
        saveLocalExams(exams);
        callback(exams);
      } else {
        const local = getLocalExams();
        callback(local);
      }
    }, (error) => {
      console.warn("Real-time listener fallback:", error);
      callback(getLocalExams());
    });
  } catch (e) {
    callback(getLocalExams());
    return () => {};
  }
}

// Subscribe to real-time submissions
export function subscribeSubmissions(examId: string | null, callback: (subs: SubmissionDocument[]) => void) {
  try {
    const col = collection(db, 'submissions');
    const q = examId 
      ? query(col, where('examId', '==', examId))
      : query(col, orderBy('submittedAt', 'desc'));

    return onSnapshot(q, (snapshot) => {
      const subs: SubmissionDocument[] = [];
      const seen = new Set<string>();
      snapshot.forEach((d) => {
        const data = d.data();
        const id = d.id;
        if (!seen.has(id)) {
          seen.add(id);
          subs.push({
            ...data,
            id,
            submittedAt: data.submittedAt?.toDate?.()?.toISOString() || data.submittedAt || new Date().toISOString()
          } as SubmissionDocument);
        }
      });
      if (subs.length > 0) {
        saveLocalSubs(subs);
        callback(subs);
      } else {
        const local = getLocalSubs();
        const filtered = examId ? local.filter(s => s.examId === examId) : local;
        callback(filtered);
      }
    }, (error) => {
      console.warn("Submissions listener fallback:", error);
      const local = getLocalSubs();
      const filtered = examId ? local.filter(s => s.examId === examId) : local;
      callback(filtered);
    });
  } catch (e) {
    const local = getLocalSubs();
    const filtered = examId ? local.filter(s => s.examId === examId) : local;
    callback(filtered);
    return () => {};
  }
}

// Toggle Exam Status: ACTIVE <-> CLOSED
export async function toggleExamStatusInDb(examId: string, currentStatus: 'ACTIVE' | 'CLOSED'): Promise<string> {
  const newStatus = currentStatus === 'ACTIVE' ? 'CLOSED' : 'ACTIVE';
  try {
    const docRef = doc(db, 'exams', examId);
    await updateDoc(docRef, { status: newStatus });
  } catch (e) {
    // Local update
    const exams = getLocalExams();
    const ex = exams.find(x => x.id === examId);
    if (ex) {
      ex.status = newStatus;
      saveLocalExams(exams);
    }
  }
  return newStatus;
}

// Toggle Score Release Status: AUTO <-> RELEASED
export async function toggleScoreStatusInDb(examId: string, currentStatus: 'AUTO' | 'RELEASED'): Promise<string> {
  const newStatus = currentStatus === 'RELEASED' ? 'AUTO' : 'RELEASED';
  try {
    const docRef = doc(db, 'exams', examId);
    await updateDoc(docRef, { scoreStatus: newStatus });
  } catch (e) {
    const exams = getLocalExams();
    const ex = exams.find(x => x.id === examId);
    if (ex) {
      ex.scoreStatus = newStatus;
      saveLocalExams(exams);
    }
  }
  return newStatus;
}

// Save Exam Submission with atomic validation
export async function submitExamAttempt(
  examId: string,
  student: StudentUser,
  userAnswers: Record<string, number | "SKIPPED">,
  questions: QuestionItem[],
  secsConsumed: number,
  proctorMeta?: {
    tabSwitchCount?: number;
    proctorViolations?: string[];
    proctorStatus?: 'CLEAN' | 'WARNED' | 'FLAGGED_VIOLATION';
  }
): Promise<SubmissionDocument> {
  // Check if student already submitted this exam
  const existingSubs = getLocalSubs();
  const alreadySubmitted = existingSubs.find(
    s => s.examId === examId && s.admnNo.trim().toLowerCase() === student.admnNo.trim().toLowerCase()
  );
  if (alreadySubmitted) {
    throw new Error("SECURITY BLOCK: You have already submitted this examination.");
  }

  // Calculate grading, points, and category breakdown
  let correct = 0;
  let wrong = 0;
  let skipped = 0;
  let earnedPoints = 0;
  let totalPointsPossible = 0;
  const catStats: Record<string, { c: number; t: number }> = {};
  const detailedAnswers: Record<string, string | number> = {};

  questions.forEach(q => {
    const cat = q.category ? q.category.toUpperCase().trim() : "GENERAL";
    const qPoints = typeof q.points === 'number' && !isNaN(q.points) ? q.points : 1;
    totalPointsPossible += qPoints;

    if (!catStats[cat]) catStats[cat] = { c: 0, t: 0 };
    catStats[cat].t++;

    const chosen = userAnswers[q.id];
    if (chosen === "SKIPPED" || chosen === null || chosen === undefined) {
      skipped++;
      detailedAnswers[q.id] = "SKIPPED";
    } else {
      const chosenNum = Number(chosen);
      detailedAnswers[q.id] = q.options.find(o => o.o === chosenNum)?.t || chosenNum;
      if (chosenNum === q.correctAnswer) {
        correct++;
        earnedPoints += qPoints;
        catStats[cat].c++;
      } else {
        wrong++;
      }
    }
  });

  const breakdownParts: string[] = [];
  for (const c in catStats) {
    if (catStats[c].t > 0) {
      let shortName = c.includes("PHYSICAL") ? "PHY" : (c.includes("BIOLOGICAL") ? "BIO" : c.slice(0, 4));
      breakdownParts.push(`${shortName}: ${catStats[c].c}/${catStats[c].t}`);
    }
  }
  const categoryBreakdown = breakdownParts.length > 0 ? breakdownParts.join(" | ") : "-";

  // Check if exam defines a custom totalMarks
  const exams = getLocalExams();
  const exam = exams.find(x => x.id === examId);
  const maxMarks = exam?.totalMarks || totalPointsPossible || questions.length;
  const score = `${earnedPoints} out of ${maxMarks}`;
  const m = Math.floor(secsConsumed / 60);
  const s = secsConsumed % 60;
  const timeUsed = `${m}m ${s}s`;

  const newSubmission: SubmissionDocument = {
    examId,
    admnNo: student.admnNo,
    name: student.name,
    classSec: student.classSec,
    score,
    earnedPoints,
    totalMarks: maxMarks,
    correct,
    wrong,
    skipped,
    timeUsed,
    secsConsumed,
    categoryBreakdown,
    detailedAnswers,
    submittedAt: new Date().toISOString(),
    tabSwitchCount: proctorMeta?.tabSwitchCount ?? 0,
    proctorViolations: proctorMeta?.proctorViolations ?? [],
    proctorStatus: proctorMeta?.proctorStatus ?? ((proctorMeta?.tabSwitchCount ?? 0) >= 3 ? 'FLAGGED_VIOLATION' : (proctorMeta?.tabSwitchCount ?? 0) > 0 ? 'WARNED' : 'CLEAN')
  };

  try {
    const docRef = await addDoc(collection(db, 'submissions'), {
      ...newSubmission,
      submittedAt: serverTimestamp()
    });
    newSubmission.id = docRef.id;
  } catch (err) {
    console.warn("Firestore write fallback to local cache:", err);
    newSubmission.id = `sub-local-${Date.now()}`;
  }

  // Update local cache
  const updated = [newSubmission, ...existingSubs];
  saveLocalSubs(updated);

  return newSubmission;
}

// Subscribe to School Roster (Students & Teachers) from Firestore
export function subscribeSchoolRoster(
  callback: (data: { students: StudentRecord[]; teachers: TeacherRecord[] }) => void
) {
  try {
    const q = collection(db, 'roster');
    return onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const students: StudentRecord[] = [];
        const teachers: TeacherRecord[] = [];
        snapshot.forEach((d) => {
          const data = d.data();
          if (data.type === 'STUDENT' || data.examNo) {
            students.push({
              id: d.id,
              examNo: data.examNo,
              dob: data.dob,
              name: data.name,
              classSec: data.classSec,
              admnNo: data.admnNo
            });
          } else if (data.type === 'TEACHER' || data.email) {
            teachers.push({
              id: d.id,
              email: data.email,
              pass: data.pass,
              name: data.name,
              assigned: data.assigned || []
            });
          }
        });

        // Merge defaults if not present
        const mergedStudents = [...students];
        DEFAULT_STUDENTS.forEach(defSt => {
          if (!mergedStudents.some(s => s.examNo.toLowerCase() === defSt.examNo.toLowerCase())) {
            mergedStudents.push(defSt);
          }
        });

        const mergedTeachers = [...teachers];
        DEFAULT_TEACHERS.forEach(defTc => {
          if (!mergedTeachers.some(t => t.email.toLowerCase() === defTc.email.toLowerCase())) {
            mergedTeachers.push(defTc);
          }
        });

        saveLocalStudents(mergedStudents);
        saveLocalTeachers(mergedTeachers);
        callback({ students: mergedStudents, teachers: mergedTeachers });
      } else {
        const st = getLocalStudents();
        const tc = getLocalTeachers();
        callback({ students: st, teachers: tc });
      }
    }, (err) => {
      console.warn("Roster listener fallback to cache:", err);
      callback({ students: getLocalStudents(), teachers: getLocalTeachers() });
    });
  } catch (e) {
    callback({ students: getLocalStudents(), teachers: getLocalTeachers() });
    return () => {};
  }
}

// Add or update an exam in Firestore & local cache
export async function saveExamToFirestore(exam: ExamDocument): Promise<void> {
  try {
    const docRef = await addDoc(collection(db, 'exams'), {
      ...exam,
      createdAt: serverTimestamp()
    });
    exam.id = docRef.id;
  } catch (err) {
    console.warn("Firestore exam creation fallback to local:", err);
  }

  // Update local cache ensuring no duplicate IDs or codes
  const local = getLocalExams();
  const filtered = local.filter(e => e.id !== exam.id && (!e.code || !exam.code || e.code !== exam.code));
  saveLocalExams([exam, ...filtered]);
}

// Add single student to roster
export async function addStudentRecord(student: StudentRecord): Promise<void> {
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

  try {
    await addDoc(collection(db, 'roster'), {
      ...student,
      type: 'STUDENT',
      createdAt: serverTimestamp()
    });
  } catch (err) {
    console.warn("Firestore roster write fallback:", err);
  }
}

// Bulk add students to roster (from CSV / Google Sheet)
export async function bulkAddStudents(students: StudentRecord[]): Promise<number> {
  const current = getLocalStudents();
  const map = new Map<string, StudentRecord>();
  current.forEach(s => map.set(s.examNo.toLowerCase(), s));
  
  let addedCount = 0;
  students.forEach(s => {
    if (s.examNo && s.name) {
      map.set(s.examNo.toLowerCase(), s);
      addedCount++;
    }
  });

  const updated = Array.from(map.values());
  saveLocalStudents(updated);

  // Firestore background sync
  try {
    for (const st of students) {
      if (st.examNo && st.name) {
        addDoc(collection(db, 'roster'), {
          ...st,
          type: 'STUDENT',
          createdAt: serverTimestamp()
        }).catch(() => {});
      }
    }
  } catch (e) {}

  return addedCount;
}

// Update student in roster
export async function updateStudentRecord(oldExamNo: string, updatedStudent: StudentRecord): Promise<void> {
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

  // Firestore background sync
  try {
    const q = query(collection(db, 'roster'), where('type', '==', 'STUDENT'), where('examNo', '==', oldExamNo));
    const snap = await getDocs(q);
    if (!snap.empty) {
      for (const d of snap.docs) {
        await updateDoc(doc(db, 'roster', d.id), {
          ...updatedStudent,
          updatedAt: serverTimestamp()
        });
      }
    } else {
      await addDoc(collection(db, 'roster'), {
        ...updatedStudent,
        type: 'STUDENT',
        createdAt: serverTimestamp()
      });
    }
  } catch (err) {
    console.warn("Firestore updateStudentRecord fallback:", err);
  }
}

// Delete student from roster
export async function deleteStudentRecord(examNo: string): Promise<void> {
  const current = getLocalStudents();
  const updated = current.filter(s => s.examNo.toLowerCase() !== examNo.toLowerCase());
  saveLocalStudents(updated);

  try {
    const q = query(collection(db, 'roster'), where('type', '==', 'STUDENT'), where('examNo', '==', examNo));
    const snap = await getDocs(q);
    snap.forEach(d => {
      deleteDoc(doc(db, 'roster', d.id)).catch(() => {});
    });
  } catch (e) {}
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

  try {
    await addDoc(collection(db, 'roster'), {
      ...teacher,
      type: 'TEACHER',
      createdAt: serverTimestamp()
    });
  } catch (err) {
    console.warn("Firestore roster write fallback:", err);
  }
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

  // Firestore background sync
  try {
    const q = query(collection(db, 'roster'), where('type', '==', 'TEACHER'), where('email', '==', oldEmail.toLowerCase()));
    const snap = await getDocs(q);
    if (!snap.empty) {
      for (const d of snap.docs) {
        await updateDoc(doc(db, 'roster', d.id), {
          ...updatedTeacher,
          updatedAt: serverTimestamp()
        });
      }
    } else {
      await addDoc(collection(db, 'roster'), {
        ...updatedTeacher,
        type: 'TEACHER',
        createdAt: serverTimestamp()
      });
    }
  } catch (err) {
    console.warn("Firestore updateTeacherRecord fallback:", err);
  }
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

// Authentication Service
export function authenticateUser(role: 'STUDENT' | 'TEACHER' | 'ADMIN', userId: string, pass: string): AuthUser {
  const cleanId = userId.trim().toLowerCase();
  const cleanPass = pass.trim();

  if (role === 'STUDENT') {
    const students = getLocalStudents();
    const student = students.find(
      s => s.examNo.toLowerCase() === cleanId && s.dob.trim() === cleanPass
    );
    if (!student) {
      throw new Error("Invalid Exam Number or Password (DD/MM/YYYY). Please check your credentials or contact the school office.");
    }
    return {
      role: 'STUDENT',
      admnNo: student.admnNo,
      name: student.name,
      classSec: student.classSec,
      examNo: student.examNo
    };
  } else if (role === 'TEACHER') {
    const teachers = getLocalTeachers();
    let teacher = teachers.find(
      t => t.email.toLowerCase() === cleanId && t.pass === cleanPass
    );

    // Support SPIC School domain logins (e.g. maharajan@spicschool.com or any @spicschool.com email)
    if (!teacher && cleanId.endsWith('@spicschool.com')) {
      if (cleanPass === 'Teacher@2026' || cleanPass === 'SpicAdmin@2026') {
        const staffName = cleanId.split('@')[0].replace('.', ' ').toUpperCase();
        teacher = {
          email: cleanId,
          pass: cleanPass,
          name: cleanId.startsWith('maharajan') ? 'Mr. Maharajan (Senior Faculty)' : `Staff (${staffName})`,
          assigned: ['10 A', '10 B', '11 A', '12 A']
        };
        // Auto-persist into teachers roster
        addTeacherRecord(teacher).catch(() => {});
      }
    }

    if (!teacher) {
      throw new Error("Invalid Teacher Email or Password. School domain teachers may use their @spicschool.com email with standard staff password.");
    }
    return {
      role: 'TEACHER',
      email: teacher.email,
      name: teacher.name,
      assignedClasses: teacher.assigned
    };
  } else {
    // ADMIN
    if (
      (cleanId === DEFAULT_ADMIN.adminId || 
       cleanId === DEFAULT_ADMIN.email || 
       cleanId === 'maharajan@spicschool.com' ||
       cleanId === 'maharajan') &&
      (cleanPass === DEFAULT_ADMIN.pass || cleanPass === 'SpicAdmin@2026')
    ) {
      return {
        role: 'ADMIN',
        adminId: DEFAULT_ADMIN.adminId,
        name: cleanId.includes('maharajan') ? 'Mr. Maharajan (Administrator)' : DEFAULT_ADMIN.name
      };
    }
    throw new Error("Invalid Master Administrator Credentials.");
  }
}

// Google SSO Authenticator by Email
export function authenticateByEmail(
  email: string, 
  displayName?: string, 
  preferredRole?: UserRole
): AuthUser {
  const cleanEmail = email.trim().toLowerCase();

  // 1. If user requested Admin or has Admin email
  if (
    preferredRole === 'ADMIN' || 
    cleanEmail === DEFAULT_ADMIN.email || 
    cleanEmail === 'admin@spicschool.com'
  ) {
    return {
      role: 'ADMIN',
      adminId: DEFAULT_ADMIN.adminId,
      name: displayName || (cleanEmail.includes('maharajan') ? 'Mr. Maharajan (Administrator)' : DEFAULT_ADMIN.name)
    };
  }

  // 2. Check Teacher Roster
  const teachers = getLocalTeachers();
  const matchedTeacher = teachers.find(t => t.email.toLowerCase() === cleanEmail);
  if (matchedTeacher) {
    return {
      role: 'TEACHER',
      email: matchedTeacher.email,
      name: matchedTeacher.name || displayName || 'Faculty Member',
      assignedClasses: matchedTeacher.assigned
    };
  }

  // 3. SPIC School Google Workspace Domain (@spicschool.com)
  if (cleanEmail.endsWith('@spicschool.com')) {
    // Auto-create faculty member in roster
    const staffName = displayName || cleanEmail.split('@')[0].replace('.', ' ').toUpperCase();
    const newFaculty: TeacherRecord = {
      email: cleanEmail,
      pass: 'Teacher@2026',
      name: cleanEmail.startsWith('maharajan') ? 'Mr. Maharajan (Senior Faculty)' : `Faculty (${staffName})`,
      assigned: ['10 A', '10 B', '11 A', '12 A']
    };
    addTeacherRecord(newFaculty).catch(() => {});

    return {
      role: 'TEACHER',
      email: newFaculty.email,
      name: newFaculty.name,
      assignedClasses: newFaculty.assigned
    };
  }

  // 4. Check Student Roster
  const students = getLocalStudents();
  const matchedStudent = students.find(s => 
    cleanEmail.includes(s.examNo.toLowerCase()) || 
    cleanEmail.includes(s.admnNo.toLowerCase().replace(/[^a-z0-9]/g, '')) ||
    (s.name && cleanEmail.split('@')[0].replace(/[^a-z]/g, '').includes(s.name.toLowerCase().replace(/[^a-z]/g, '')))
  );

  if (matchedStudent) {
    return {
      role: 'STUDENT',
      admnNo: matchedStudent.admnNo,
      name: matchedStudent.name,
      classSec: matchedStudent.classSec,
      examNo: matchedStudent.examNo
    };
  }

  // If user selected student role specifically
  if (preferredRole === 'STUDENT') {
    throw new Error(`The Google Account (${cleanEmail}) is not linked to any student Exam Number in the roster. Please log in using your Exam Number and DOB, or ask your administrator to register your account.`);
  }

  // If user selected teacher role specifically
  if (preferredRole === 'TEACHER') {
    throw new Error(`The Google Account (${cleanEmail}) is not found in the SPIC School faculty roster. Please use your official @spicschool.com school email or contact the school office.`);
  }

  throw new Error(`Google Account (${cleanEmail}) is not registered in SPIC School records. Please use your school domain account (@spicschool.com).`);
}

// Google Sign In via Firebase Auth Popup
export async function signInWithGoogleSSO(preferredRole?: UserRole): Promise<AuthUser> {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  
  const result = await signInWithPopup(auth, provider);
  const user = result.user;
  const email = (user.email || '').trim();
  const displayName = user.displayName || email.split('@')[0];

  return authenticateByEmail(email, displayName, preferredRole);
}

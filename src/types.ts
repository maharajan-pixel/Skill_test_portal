export type UserRole = 'STUDENT' | 'TEACHER' | 'ADMIN';

export interface StudentRecord {
  examNo: string;
  dob: string; // DD/MM/YYYY or password
  name: string;
  classSec: string;
  admnNo: string;
  id?: string;
}

export interface TeacherRecord {
  email: string;
  pass?: string;
  name: string;
  assigned: string[];
  id?: string;
}

export interface StudentUser {
  role: 'STUDENT';
  admnNo: string;
  name: string;
  classSec: string;
  examNo: string;
}

export interface TeacherUser {
  role: 'TEACHER';
  email: string;
  name: string;
  assignedClasses?: string[];
}

export interface AdminUser {
  role: 'ADMIN';
  name: string;
  adminId: string;
}

export type AuthUser = StudentUser | TeacherUser | AdminUser;

export interface QuestionOption {
  t: string; // Option text
  o: number; // Original option index (0, 1, 2, 3)
}

export interface QuestionItem {
  id: string;
  category: string; // e.g. "PHYSICAL SCIENCE", "BIOLOGICAL SCIENCE"
  text: string;
  options: QuestionOption[];
  correctAnswer?: number; // 0, 1, 2, 3 (omitted in student sessions and client bundles)
  points?: number; // default 1
}

/**
 * Sanitized question payload for students.
 * Crucially omits correctAnswer to ensure answers are never exposed to the client.
 */
export interface StudentQuestion {
  id: string;
  category: string;
  text: string;
  options: QuestionOption[];
  points?: number;
}

export interface AuthoritativeAnswerKey {
  examId: string;
  answerKey: Record<string, number>; // questionId -> correct option index
  points: Record<string, number>;    // questionId -> point value
  categories?: Record<string, string>; // questionId -> category
  totalMarks: number;
  updatedAt?: any;
}

export interface ExamDocument {
  id: string;
  code?: string;
  title: string;
  subject: string;
  classSec: string;
  allowedTeachers: string[];
  status: 'ACTIVE' | 'CLOSED';
  scoreStatus: 'AUTO' | 'RELEASED';
  examMins: number;
  qCount: number;
  totalMarks?: number;
  targetUrl: string;
  questions: QuestionItem[];
  createdAt?: any;
}

export interface StudentExamDocument {
  id: string;
  code?: string;
  title: string;
  subject: string;
  classSec: string;
  status: 'ACTIVE' | 'CLOSED';
  scoreStatus: 'AUTO' | 'RELEASED';
  examMins: number;
  qCount: number;
  totalMarks?: number;
  questions: StudentQuestion[];
}

export interface SubmissionDocument {
  id?: string;
  examId: string;
  admnNo: string;
  name: string;
  classSec: string;
  score: string; // e.g. "8 out of 10"
  earnedPoints?: number;
  totalMarks?: number;
  correct: number;
  wrong: number;
  skipped: number;
  timeUsed: string; // e.g. "4m 32s"
  secsConsumed: number;
  categoryBreakdown: string; // e.g. "PHY: 4/5 | BIO: 4/5"
  detailedAnswers: Record<string, string | number>; // qId -> option text or index
  submittedAt: string | number | Date;
  tabSwitchCount?: number;
  proctorViolations?: string[];
  proctorStatus?: 'CLEAN' | 'WARNED' | 'FLAGGED_VIOLATION';
}

export interface ActiveStudentExamCard {
  id: string;
  subject: string;
  title: string;
  url: string;
  state: 'ACTIVE' | 'COMPLETED';
  score: string;
  embargoed: boolean;
  unlockTime: string;
  qCount: number;
  examMins: number;
  status: 'ACTIVE' | 'CLOSED';
}

export interface KioskQuestionState extends StudentQuestion {
  selectedOpt: number | null;
  isAnsweredOnce: boolean;
  editsLeft: number;
  questionSecsLeft: number;
  isTimeLocked: boolean;
  markedForReview?: boolean;
  visited?: boolean;
}

export interface ExamSessionBackup {
  currentUser: StudentUser;
  examId: string;
  activeExamPaperName: string;
  activeExamMins: number;
  masterTotalSecs: number;
  masterGraceSecs: number;
  isMasterGrace: boolean;
  qList: KioskQuestionState[];
  activeQIndex: number;
  examStartTime: number;
  tabSwitchCount?: number;
  proctorViolations?: string[];
}

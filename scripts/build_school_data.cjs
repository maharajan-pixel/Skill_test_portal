const fs = require('fs');
const path = require('path');

function parseCsv(content) {
  const lines = content.trim().split(/\r?\n/).filter(l => l.trim().length > 0);
  if (lines.length === 0) return { header: [], rows: [] };

  function parseLine(line) {
    const res = [];
    let cur = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (c === '"') {
        inQuotes = !inQuotes;
      } else if (c === ',' && !inQuotes) {
        res.push(cur.trim());
        cur = '';
      } else {
        cur += c;
      }
    }
    res.push(cur.trim());
    return res;
  }

  const header = parseLine(lines[0]);
  const rows = lines.slice(1).map(l => parseLine(l));
  return { header, rows };
}

const rootDir = path.resolve(__dirname, '..');
const examsCsvPath = path.join(rootDir, 'src/data/raw_exams.csv');
const stud1Path = path.join(rootDir, 'src/data/raw_students_1.csv');
const stud2Path = path.join(rootDir, 'src/data/raw_students_2.csv');

const examsData = parseCsv(fs.readFileSync(examsCsvPath, 'utf8'));
const stud1Data = parseCsv(fs.readFileSync(stud1Path, 'utf8'));
const stud2Data = parseCsv(fs.readFileSync(stud2Path, 'utf8'));

// Combine student rows
const allStudentRows = [...stud1Data.rows, ...stud2Data.rows];

const students = [];
for (const row of allStudentRows) {
  if (row.length < 7) continue;
  const [admNo, name, gender, dob, classLevel, section, examNo, pwd] = row;
  students.push({
    admissionNo: admNo,
    name: name,
    gender: gender || 'Not Specified',
    dob: dob,
    classLevel: classLevel,
    section: section,
    classSec: `${classLevel} ${section}`.trim(),
    examNumber: examNo,
    password: pwd || dob
  });
}

// Build faculty map & exams
const teacherMap = new Map();
// Add Mr. Maharajan as Super Admin / Dean
teacherMap.set('maharajan@spicschool.com', {
  id: 'teacher-maharajan',
  name: 'Mr. Maharajan',
  email: 'maharajan@spicschool.com',
  role: 'admin',
  department: 'Administration & Examination Head',
  classes: ['VI A', 'VI B', 'VI C', 'VII A', 'VII B', 'VII C', 'VIII A', 'VIII B', 'VIII C', 'IX A', 'IX B', 'IX C', 'X A', 'X B', 'X C', 'X D', 'XI A', 'XI B', 'XI C', 'XI D', 'XII A', 'XII B', 'XII C', 'XII D']
});

const exams = [];
for (let i = 0; i < examsData.rows.length; i++) {
  const row = examsData.rows[i];
  if (row.length < 5) continue;
  const [classSec, subject, title, sheetUrl, teacherEmailRaw, statusRaw, qCountRaw, examMinsRaw, scoreStatusRaw] = row;
  
  const status = (statusRaw || 'Closed').trim().toUpperCase() === 'CLOSED' ? 'CLOSED' : 'ACTIVE';
  const qCount = parseInt(qCountRaw || '10', 10) || 10;
  const examMins = parseInt(examMinsRaw || '10', 10) || 10;
  const scoreStatus = (scoreStatusRaw || '').trim().toUpperCase() === 'AUTO' ? 'AUTO' : 'RELEASED';
  
  const teacherEmails = teacherEmailRaw ? teacherEmailRaw.split(',').map(e => e.trim().toLowerCase()).filter(e => e.includes('@')) : [];

  for (const email of teacherEmails) {
    if (!teacherMap.has(email)) {
      const namePart = email.split('@')[0].replace('.', ' ');
      const formattedName = namePart.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      teacherMap.set(email, {
        id: `teacher-${email.split('@')[0].replace(/[^a-z0-9]/g, '-')}`,
        name: `${formattedName}`,
        email: email,
        role: 'teacher',
        department: subject,
        classes: [classSec]
      });
    } else {
      const t = teacherMap.get(email);
      if (!t.classes.includes(classSec)) {
        t.classes.push(classSec);
      }
    }
  }

  const titleSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 35);
  const classSlug = classSec.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const examId = `exam-${classSlug}-${titleSlug}-${i+1}`;

  const octoberMathsQuestions = [
    {
      id: "Q1",
      category: "MATHS",
      text: "Evaluate the expression: (-12) + (+25) + (-8)",
      options: [
        { t: "5", o: 0 },
        { t: "-5", o: 1 },
        { t: "13", o: 2 },
        { t: "-13", o: 3 }
      ],
      correctAnswer: 0,
      points: 1
    },
    {
      id: "Q2",
      category: "MATHS",
      text: "Which of the following numbers is the predecessor of -49?",
      options: [
        { t: "-48", o: 0 },
        { t: "-50", o: 1 },
        { t: "50", o: 2 },
        { t: "48", o: 3 }
      ],
      correctAnswer: 1,
      points: 1
    },
    {
      id: "Q3",
      category: "MATHS",
      text: "Find the equivalent fraction of 3/5 with numerator 15:",
      options: [
        { t: "15/20", o: 0 },
        { t: "15/25", o: 1 },
        { t: "15/30", o: 2 },
        { t: "9/15", o: 3 }
      ],
      correctAnswer: 1,
      points: 1
    },
    {
      id: "Q4",
      category: "MATHS",
      text: "Express 25 millimetres in centimetres (cm):",
      options: [
        { t: "0.25 cm", o: 0 },
        { t: "250 cm", o: 1 },
        { t: "2.5 cm", o: 2 },
        { t: "0.025 cm", o: 3 }
      ],
      correctAnswer: 2,
      points: 1
    },
    {
      id: "Q5",
      category: "MATHS",
      text: "The length and breadth of a rectangular field are 12 m and 8 m. What is its perimeter?",
      options: [
        { t: "40 m", o: 0 },
        { t: "96 m", o: 1 },
        { t: "20 m", o: 2 },
        { t: "48 m", o: 3 }
      ],
      correctAnswer: 0,
      points: 1
    },
    {
      id: "Q6",
      category: "MATHS",
      text: "Solve the linear equation: x + 7 = 19. What is the value of x?",
      options: [
        { t: "26", o: 0 },
        { t: "12", o: 1 },
        { t: "14", o: 2 },
        { t: "-12", o: 3 }
      ],
      correctAnswer: 1,
      points: 1
    },
    {
      id: "Q7",
      category: "MATHS",
      text: "What is the Highest Common Factor (HCF) of 18 and 48?",
      options: [
        { t: "3", o: 0 },
        { t: "9", o: 1 },
        { t: "6", o: 2 },
        { t: "12", o: 3 }
      ],
      correctAnswer: 2,
      points: 1
    },
    {
      id: "Q8",
      category: "MATHS",
      text: "An angle whose measure is 135° is classified as an:",
      options: [
        { t: "Acute angle", o: 0 },
        { t: "Right angle", o: 1 },
        { t: "Obtuse angle", o: 2 },
        { t: "Reflex angle", o: 3 }
      ],
      correctAnswer: 2,
      points: 1
    },
    {
      id: "Q9",
      category: "MATHS",
      text: "If a school bus travels 180 km in 3 hours, what is its average speed in km/h?",
      options: [
        { t: "50 km/h", o: 0 },
        { t: "60 km/h", o: 1 },
        { t: "45 km/h", o: 2 },
        { t: "90 km/h", o: 3 }
      ],
      correctAnswer: 1,
      points: 1
    },
    {
      id: "Q10",
      category: "MATHS",
      text: "Which of the following is the smallest positive integer?",
      options: [
        { t: "0", o: 0 },
        { t: "-1", o: 1 },
        { t: "1", o: 2 },
        { t: "2", o: 3 }
      ],
      correctAnswer: 2,
      points: 1
    }
  ];

  // Questions generator for tests
  const questions = [];
  if (title.toUpperCase().includes('OCTOBER') && subject.toUpperCase().includes('MATHS')) {
    questions.push(...octoberMathsQuestions);
  } else {
    for (let q = 1; q <= qCount; q++) {
      questions.push({
        id: `Q${q}`,
        category: subject.toUpperCase(),
        text: `${subject} Question ${q}`,
        options: [
          { t: "Option A", o: 0 },
          { t: "Option B", o: 1 },
          { t: "Option C", o: 2 },
          { t: "Option D", o: 3 }
        ],
        points: 1
      });
    }
  }

  exams.push({
    id: examId,
    code: examId,
    title: title,
    subject: subject,
    classSec: classSec,
    allowedTeachers: teacherEmails.length > 0 ? teacherEmails : ['maharajan@spicschool.com'],
    status: status,
    scoreStatus: scoreStatus,
    examMins: examMins,
    qCount: qCount,
    totalMarks: qCount,
    targetUrl: sheetUrl,
    questions: questions
  });
}

const teachers = Array.from(teacherMap.values());

const tsOutput = `// SPIC Nagar Higher Secondary School - School Data & Completed Exams
// Auto-generated from official school rosters and completed exam sheets

import { StudentRecord, TeacherRecord, ExamDocument, QuestionItem } from '../types';

export interface SchoolStudent {
  admissionNo: string;
  name: string;
  gender: string;
  dob: string;
  classLevel: string;
  section: string;
  classSec: string;
  examNumber: string;
  password: string;
}

export interface SchoolTeacher {
  id: string;
  name: string;
  email: string;
  role: 'teacher' | 'admin';
  department: string;
  classes: string[];
}

export interface SchoolExam {
  id: string;
  code: string;
  title: string;
  subject: string;
  classSec: string;
  allowedTeachers: string[];
  status: 'ACTIVE' | 'CLOSED' | 'DRAFT';
  scoreStatus: 'RELEASED' | 'AUTO' | 'PENDING';
  examMins: number;
  qCount: number;
  totalMarks: number;
  targetUrl: string;
  questions: Array<{
    id: string;
    category: string;
    text: string;
    options: Array<{ t: string; o: number }>;
    correctAnswer?: number;
    points: number;
  }>;
}

export const SCHOOL_STUDENTS: SchoolStudent[] = ${JSON.stringify(students, null, 2)};

export const SCHOOL_TEACHERS: SchoolTeacher[] = ${JSON.stringify(teachers, null, 2)};

export const SCHOOL_COMPLETED_EXAMS: SchoolExam[] = ${JSON.stringify(exams, null, 2)};

export const SCHOOL_ROSTER_STUDENTS: StudentRecord[] = SCHOOL_STUDENTS.map(s => ({
  examNo: s.examNumber,
  dob: s.dob,
  name: s.name,
  classSec: s.classSec,
  admnNo: s.admissionNo
}));

export const SCHOOL_ROSTER_TEACHERS: TeacherRecord[] = SCHOOL_TEACHERS.map(t => ({
  email: t.email,
  pass: 'Teacher@2026',
  name: t.name,
  assigned: t.classes
}));

export const SCHOOL_EXAM_DOCUMENTS: ExamDocument[] = SCHOOL_COMPLETED_EXAMS as ExamDocument[];
`;

fs.writeFileSync(path.join(rootDir, 'src/data/schoolData.ts'), tsOutput, 'utf8');
console.log(`Successfully generated schoolData.ts:`);
console.log(`- Students: ${students.length}`);
console.log(`- Faculty: ${teachers.length}`);
console.log(`- Completed Exams: ${exams.length}`);

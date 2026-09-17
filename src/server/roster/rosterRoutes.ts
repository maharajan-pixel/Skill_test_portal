import { Router, Response } from 'express';
import { 
  serverDb, 
  getStudentByExamNo,
  getTeacherByEmail 
} from '../firebaseAdmin';
import { FieldValue } from 'firebase-admin/firestore';
import { 
  AuthenticatedRequest, 
  requireTeacherOrAdmin, 
  requireAdmin 
} from '../middleware/authMiddleware';
import { StudentRecord, TeacherRecord } from '../../types';

export const rosterRouter = Router();

// Fallback seed students for school administration
const fallbackStudents: StudentRecord[] = [
  { examNo: "EX1001", dob: "15/08/2008", name: "S. Arun Kumar", classSec: "10 A", admnNo: "SPIC-8801" },
  { examNo: "EX1002", dob: "22/11/2008", name: "P. Meenakshi", classSec: "10 A", admnNo: "SPIC-8802" },
  { examNo: "EX1003", dob: "05/01/2008", name: "R. Vignesh", classSec: "10 A", admnNo: "SPIC-8803" },
  { examNo: "EX1004", dob: "19/04/2008", name: "K. Divya", classSec: "10 A", admnNo: "SPIC-8804" },
  { examNo: "EX1005", dob: "30/09/2008", name: "M. Karthik", classSec: "10 B", admnNo: "SPIC-8805" }
];

const fallbackTeachers: TeacherRecord[] = [
  { email: "maharajan@spicschool.com", pass: "Teacher@2026", name: "Mr. Maharajan (Senior Faculty)", assigned: ["10 A", "10 B", "11 A", "12 A"] },
  { email: "teacher.science@spicschool.com", pass: "Teacher@2026", name: "Mrs. S. Jayashree (Science)", assigned: ["10 A", "10 B"] },
  { email: "teacher.maths@spicschool.com", pass: "Teacher@2026", name: "Mr. K. Narayanan (Maths)", assigned: ["10 A"] }
];

/**
 * GET /api/roster/students
 * Staff-only access to enrolled student list
 */
rosterRouter.get('/students', requireTeacherOrAdmin, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const snap = await serverDb.collection('roster').where('type', '==', 'STUDENT').get();
    if (!snap.empty) {
      const students: StudentRecord[] = [];
      snap.forEach(d => {
        const data = d.data();
        students.push({
          examNo: data.examNo,
          dob: data.dob,
          name: data.name,
          classSec: data.classSec,
          admnNo: data.admnNo
        });
      });
      res.json({ students });
      return;
    }
    res.json({ students: fallbackStudents });
  } catch (err: any) {
    console.warn('[rosterRoutes] Notice retrieving students from DB:', err);
    res.json({ students: fallbackStudents });
  }
});

/**
 * POST /api/roster/students
 * Add or update enrolled student (Teachers/Admins)
 */
rosterRouter.post('/students', requireTeacherOrAdmin, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const student: StudentRecord = req.body;
    if (!student.examNo || !student.name || !student.dob) {
      res.status(400).json({ error: 'ExamNo, name, and DOB are required.' });
      return;
    }

    const docId = `STUDENT_${student.examNo.trim().toUpperCase()}`;
    await serverDb.collection('roster').doc(docId).set({
      ...student,
      type: 'STUDENT',
      updatedAt: FieldValue.serverTimestamp()
    }, { merge: true });

    res.json({ success: true, student });
  } catch (err: any) {
    console.error('[rosterRoutes] Error saving student:', err);
    res.status(500).json({ error: 'Failed to save student record.' });
  }
});

/**
 * DELETE /api/roster/students/:examNo
 */
rosterRouter.delete('/students/:examNo', requireTeacherOrAdmin, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { examNo } = req.params;
    const docId = `STUDENT_${examNo.trim().toUpperCase()}`;
    await serverDb.collection('roster').doc(docId).delete();
    res.json({ success: true, examNo });
  } catch (err: any) {
    console.error('[rosterRoutes] Error deleting student:', err);
    res.status(500).json({ error: 'Failed to delete student record.' });
  }
});

/**
 * GET /api/roster/teachers
 * Admin-only faculty list
 */
rosterRouter.get('/teachers', requireAdmin, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const snap = await serverDb.collection('roster').where('type', '==', 'TEACHER').get();
    if (!snap.empty) {
      const teachers: Omit<TeacherRecord, 'pass'>[] = [];
      snap.forEach(d => {
        const data = d.data();
        teachers.push({
          email: data.email,
          name: data.name,
          assigned: data.assigned || []
        });
      });
      res.json({ teachers });
      return;
    }
    const safeTeachers = fallbackTeachers.map(({ pass, ...rest }) => rest);
    res.json({ teachers: safeTeachers });
  } catch (err: any) {
    console.warn('[rosterRoutes] Notice retrieving faculty from DB:', err);
    const safeTeachers = fallbackTeachers.map(({ pass, ...rest }) => rest);
    res.json({ teachers: safeTeachers });
  }
});

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
import { SCHOOL_ROSTER_STUDENTS, SCHOOL_ROSTER_TEACHERS } from '../../data/schoolData';

export const rosterRouter = Router();

const fallbackStudents: StudentRecord[] = SCHOOL_ROSTER_STUDENTS;
const fallbackTeachers: TeacherRecord[] = SCHOOL_ROSTER_TEACHERS;

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

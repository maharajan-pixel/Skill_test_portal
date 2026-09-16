import { Router, Response, NextFunction } from 'express';
import { 
  getServerExam, 
  getAllServerExams,
  saveServerExam,
  updateServerExamStatus,
  updateServerScoreStatus,
  getServerExamSession, 
  saveServerExamSession,
  saveServerAnswerKey
} from '../firebaseAdmin';
import { 
  AuthenticatedRequest, 
  requireAuth, 
  requireStudent,
  requireTeacherOrAdmin 
} from '../middleware/authMiddleware';
import { ExamDocument, StudentExamDocument, StudentQuestion, AuthoritativeAnswerKey } from '../../types';

export const examRouter = Router();

/**
 * GET /api/exams
 * Returns all exams, sanitizing questions (stripping correctAnswer) for students and unauthenticated viewers.
 */
examRouter.get('/', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const exams = await getAllServerExams();
    const userRole = req.user?.role;

    if (userRole === 'TEACHER' || userRole === 'ADMIN') {
      res.json({ exams });
      return;
    }

    // Sanitize exams for students or viewers
    const sanitizedExams = exams.map(exam => {
      const sanitizedQuestions: StudentQuestion[] = (exam.questions || []).map(q => ({
        id: q.id,
        category: q.category || 'GENERAL',
        text: q.text,
        options: q.options || [],
        points: q.points || 1
      }));

      return {
        id: exam.id,
        code: exam.code,
        title: exam.title,
        subject: exam.subject,
        classSec: exam.classSec,
        status: exam.status,
        scoreStatus: exam.scoreStatus,
        examMins: exam.examMins,
        qCount: sanitizedQuestions.length,
        totalMarks: exam.totalMarks,
        questions: sanitizedQuestions
      };
    });

    res.json({ exams: sanitizedExams });
  } catch (err: any) {
    console.error('[examRoutes] Error listing exams:', err);
    res.status(500).json({ error: 'Failed to retrieve examinations.' });
  }
});

/**
 * GET /api/exams/:examId
 * Returns sanitized exam for students (WITHOUT correctAnswer).
 * Full exam with answers is only accessible to authorized teachers or admins.
 */
examRouter.get('/:examId', requireAuth, async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { examId } = req.params;
    if (examId === 'submissions') {
      return next();
    }
    const exam = await getServerExam(examId);

    if (!exam) {
      res.status(404).json({ error: 'Examination paper not found.' });
      return;
    }

    // If request is from a Student, return ONLY the sanitized payload
    if (req.user?.role === 'STUDENT') {
      const sanitizedQuestions: StudentQuestion[] = (exam.questions || []).map(q => ({
        id: q.id,
        category: q.category || 'GENERAL',
        text: q.text,
        options: q.options || [],
        points: q.points || 1
      }));

      const studentExam: StudentExamDocument = {
        id: exam.id,
        code: exam.code,
        title: exam.title,
        subject: exam.subject,
        classSec: exam.classSec,
        status: exam.status,
        scoreStatus: exam.scoreStatus,
        examMins: exam.examMins,
        qCount: sanitizedQuestions.length,
        totalMarks: exam.totalMarks,
        questions: sanitizedQuestions
      };

      res.json({ exam: studentExam });
      return;
    }

    // Teachers and Admins receive full exam document
    res.json({ exam });
  } catch (err: any) {
    console.error('[examRoutes] Error fetching exam:', err);
    res.status(500).json({ error: 'Failed to retrieve exam details.' });
  }
});

/**
 * POST /api/exams/:examId/start
 * Server-authoritative exam start and deadline initialization.
 * Prevents timer manipulation or reset on browser reload.
 */
examRouter.post('/:examId/start', requireStudent, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { examId } = req.params;
    const student = req.user!;

    const exam = await getServerExam(examId);
    if (!exam) {
      res.status(404).json({ error: 'Examination not found.' });
      return;
    }

    if (exam.status !== 'ACTIVE') {
      res.status(400).json({ error: 'This examination is currently closed by the invigilator.' });
      return;
    }

    const sessionId = `${examId}_${student.role === 'STUDENT' ? student.admnNo : 'USER'}`;
    const now = Date.now();

    // Check if an authoritative session already exists
    const existingSession = await getServerExamSession(sessionId);

    if (existingSession) {
      // Return the original timer metadata - student cannot reset their timer
      res.json({
        sessionId,
        serverStartTime: existingSession.serverStartTime,
        deadline: existingSession.deadline,
        serverCurrentTime: now,
        examMins: exam.examMins,
        resumed: true
      });
      return;
    }

    // Initialize new authoritative session
    const durationMs = (exam.examMins || 10) * 60 * 1000;
    const deadline = now + durationMs;

    const newSession = {
      serverStartTime: now,
      deadline,
      examId,
      admnNo: student.role === 'STUDENT' ? student.admnNo : ''
    };

    await saveServerExamSession(sessionId, newSession);

    res.json({
      sessionId,
      serverStartTime: now,
      deadline,
      serverCurrentTime: now,
      examMins: exam.examMins,
      resumed: false
    });
  } catch (err: any) {
    console.error('[examRoutes] Error starting exam session:', err);
    res.status(500).json({ error: 'Failed to initialize exam timer session.' });
  }
});

/**
 * POST /api/exams/:examId/keys
 * Save or update authoritative answer keys (Teachers/Admins only)
 */
examRouter.post('/:examId/keys', requireTeacherOrAdmin, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { examId } = req.params;
    const { answerKey, points, categories, totalMarks } = req.body;

    if (!answerKey || typeof answerKey !== 'object') {
      res.status(400).json({ error: 'Valid answerKey mapping is required.' });
      return;
    }

    const keyData: AuthoritativeAnswerKey = {
      examId,
      answerKey,
      points: points || {},
      categories: categories || {},
      totalMarks: totalMarks || Object.keys(answerKey).length,
      updatedAt: new Date().toISOString()
    };

    await saveServerAnswerKey(examId, keyData);

    res.json({ success: true, message: 'Authoritative answer key saved securely.' });
  } catch (err: any) {
    console.error('[examRoutes] Error saving answer keys:', err);
    res.status(500).json({ error: 'Failed to store private answer keys.' });
  }
});

/**
 * POST /api/exams
 * Create or import new examination (Teacher/Admin only)
 */
examRouter.post('/', requireTeacherOrAdmin, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const exam: ExamDocument = req.body;
    if (!exam || !exam.title || !exam.questions) {
      res.status(400).json({ error: 'Valid exam payload with questions is required.' });
      return;
    }

    await saveServerExam(exam);
    res.json({ success: true, exam });
  } catch (err: any) {
    console.error('[examRoutes] Error creating exam:', err);
    res.status(500).json({ error: 'Failed to create examination.' });
  }
});

/**
 * POST /api/exams/:examId/toggle-status
 * Toggle exam between ACTIVE and CLOSED (Teacher/Admin only)
 */
examRouter.post('/:examId/toggle-status', requireTeacherOrAdmin, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { examId } = req.params;
    const { status } = req.body;

    if (status !== 'ACTIVE' && status !== 'CLOSED') {
      res.status(400).json({ error: 'Status must be ACTIVE or CLOSED.' });
      return;
    }

    await updateServerExamStatus(examId, status);
    res.json({ success: true, status });
  } catch (err: any) {
    console.error('[examRoutes] Error toggling exam status:', err);
    res.status(500).json({ error: 'Failed to toggle exam status.' });
  }
});

/**
 * POST /api/exams/:examId/toggle-score-status
 * Toggle scoreStatus between AUTO and RELEASED (Teacher/Admin only)
 */
examRouter.post('/:examId/toggle-score-status', requireTeacherOrAdmin, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { examId } = req.params;
    const { scoreStatus } = req.body;

    if (scoreStatus !== 'AUTO' && scoreStatus !== 'RELEASED') {
      res.status(400).json({ error: 'Score status must be AUTO or RELEASED.' });
      return;
    }

    await updateServerScoreStatus(examId, scoreStatus);
    res.json({ success: true, scoreStatus });
  } catch (err: any) {
    console.error('[examRoutes] Error toggling score status:', err);
    res.status(500).json({ error: 'Failed to toggle score status.' });
  }
});

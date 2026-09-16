import { Router, Response } from 'express';
import { 
  getServerExam, 
  getServerAnswerKey, 
  getExistingSubmission, 
  saveAuthoritativeSubmission,
  getServerExamSession,
  getAllServerSubmissions
} from '../firebaseAdmin';
import { 
  AuthenticatedRequest, 
  requireAuth,
  requireStudent 
} from '../middleware/authMiddleware';
import { SubmissionDocument, StudentUser } from '../../types';

export const submissionRouter = Router();

// Atomic in-flight submission lock to prevent simultaneous submission race conditions
const inFlightSubmissions = new Set<string>();

/**
 * GET /api/exams/submissions
 * Role-scoped retrieval of examination submissions.
 * - ADMIN: School-wide submissions
 * - TEACHER: Submissions only for assigned classes or authoring exams
 * - STUDENT: Only their own submission, with result visibility rules enforced
 * - UNAUTHENTICATED: 401 Unauthorized
 */
submissionRouter.get('/submissions', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = req.user!;
    const allSubs = await getAllServerSubmissions();

    if (user.role === 'ADMIN') {
      res.json({ submissions: allSubs });
      return;
    }

    if (user.role === 'TEACHER') {
      const assigned = user.assignedClasses || [];
      const teacherSubs = allSubs.filter(sub => {
        if (!sub.classSec) return false;
        return assigned.some(cls => sub.classSec.trim().toLowerCase() === cls.trim().toLowerCase());
      });
      res.json({ submissions: teacherSubs });
      return;
    }

    if (user.role === 'STUDENT') {
      const studentSubs = allSubs.filter(sub => sub.admnNo === user.admnNo);
      res.json({ submissions: studentSubs });
      return;
    }

    res.status(403).json({ error: 'Access denied.' });
  } catch (err: any) {
    console.error('[submissionRoutes] Error fetching submissions:', err);
    res.status(500).json({ error: 'Failed to retrieve submissions.' });
  }
});

/**
 * POST /api/exams/submit
 * Server-authoritative Exam Submission & Tamper-Proof Auto-Grading.
 * Client sends ONLY raw answers. The server calculates all scores, points,
 * and category statistics using the private authoritative answer key.
 */
submissionRouter.post('/submit', requireStudent, async (req: AuthenticatedRequest, res: Response) => {
  const student = req.user as StudentUser;
  const { 
    examId, 
    answers = {}, 
    secsConsumed = 0,
    tabSwitchCount = 0,
    proctorViolations = [],
    proctorStatus = 'CLEAN'
  } = req.body;

  if (!examId) {
    res.status(400).json({ error: 'Exam ID is required for submission.' });
    return;
  }

  // Atomic race-condition lock per student + exam
  const inFlightKey = `${examId}_${student.admnNo}`;
  if (inFlightSubmissions.has(inFlightKey)) {
    res.status(409).json({ error: 'A submission for this student and exam is already in progress.' });
    return;
  }
  inFlightSubmissions.add(inFlightKey);

  try {
    // 1. Verify exam exists and is active
    const exam = await getServerExam(examId);
    if (!exam) {
      res.status(404).json({ error: 'Examination paper not found.' });
      return;
    }

    if (exam.status !== 'ACTIVE') {
      res.status(403).json({ error: 'This examination has been closed and cannot accept submissions.' });
      return;
    }

    // 2. Prevent duplicate submissions
    const existing = await getExistingSubmission(examId, student.admnNo);
    if (existing) {
      res.status(409).json({ 
        error: 'Duplicate submission rejected: This examination has already been submitted for your admission number.',
        submissionId: existing.id,
        score: existing.score
      });
      return;
    }

    // 3. Check authoritative exam deadline with 60s network grace period
    const sessionId = `${examId}_${student.admnNo}`;
    const session = await getServerExamSession(sessionId);
    const now = Date.now();

    if (session && session.deadline) {
      const GRACE_PERIOD_MS = 60 * 1000; // 60s grace period for network latency
      if (now > session.deadline + GRACE_PERIOD_MS) {
        res.status(403).json({
          error: 'Examination deadline has expired. Authoritative server deadline exceeded.'
        });
        return;
      }
    }

    // 4. Retrieve authoritative answer key
    const authoritativeKey = await getServerAnswerKey(examId);
    if (!authoritativeKey) {
      res.status(500).json({ error: 'Authoritative grading key is missing for this exam.' });
      return;
    }

    // 5. Perform server-authoritative grading
    let correct = 0;
    let wrong = 0;
    let skipped = 0;
    let earnedPoints = 0;

    const categoryStats: Record<string, { correct: number; total: number }> = {};
    const keyMap = authoritativeKey.answerKey || {};
    const pointsMap = authoritativeKey.points || {};
    const catMap = authoritativeKey.categories || {};

    const questionsList = exam.questions || [];
    const questionIds = Object.keys(keyMap).length > 0 
      ? Object.keys(keyMap) 
      : questionsList.map(q => q.id);

    questionIds.forEach(qId => {
      const expectedAnswer = keyMap[qId];
      const submittedAnswer = answers[qId];
      const qCategory = catMap[qId] || 'GENERAL';
      const qPoints = pointsMap[qId] !== undefined ? pointsMap[qId] : 1;

      if (!categoryStats[qCategory]) {
        categoryStats[qCategory] = { correct: 0, total: 0 };
      }
      categoryStats[qCategory].total += qPoints;

      if (submittedAnswer === undefined || submittedAnswer === null || submittedAnswer === '') {
        skipped++;
      } else if (Number(submittedAnswer) === Number(expectedAnswer)) {
        correct++;
        earnedPoints += qPoints;
        categoryStats[qCategory].correct += qPoints;
      } else {
        wrong++;
      }
    });

    const totalMarks = authoritativeKey.totalMarks || exam.totalMarks || questionIds.length;
    const percentage = totalMarks > 0 ? Math.round((earnedPoints / totalMarks) * 100) : 0;
    const scoreString = `${earnedPoints} out of ${totalMarks}`;

    // Format category breakdown string
    const categoryBreakdown = Object.entries(categoryStats)
      .map(([cat, stats]) => `${cat.substring(0, 3).toUpperCase()}: ${stats.correct}/${stats.total}`)
      .join(' | ');

    // Compute display time used
    const safeSecs = Math.max(0, Math.min(secsConsumed, (exam.examMins || 10) * 60 + 60));
    const mins = Math.floor(safeSecs / 60);
    const secs = safeSecs % 60;
    const timeUsed = `${mins}m ${secs}s`;

    // 6. Assemble authoritative submission document
    const finalSubmission: SubmissionDocument = {
      examId,
      admnNo: student.admnNo,
      name: student.name,
      classSec: student.classSec,
      score: scoreString,
      earnedPoints,
      totalMarks,
      correct,
      wrong,
      skipped,
      timeUsed,
      secsConsumed: safeSecs,
      categoryBreakdown,
      detailedAnswers: answers, // Student submitted choices
      submittedAt: new Date().toISOString(),
      tabSwitchCount,
      proctorViolations,
      proctorStatus
    };

    // 7. Save to Firestore
    const submissionId = await saveAuthoritativeSubmission(finalSubmission);
    finalSubmission.id = submissionId;

    // 8. Return verified summary to client
    res.json({
      success: true,
      submissionId,
      score: scoreString,
      earnedPoints,
      totalMarks,
      correct,
      wrong,
      skipped,
      percentage,
      categoryBreakdown,
      timeUsed,
      submittedAt: finalSubmission.submittedAt
    });
  } catch (err: any) {
    console.error('[submissionRoutes] Error grading submission:', err);
    res.status(500).json({ error: 'Failed to process and grade examination submission.' });
  } finally {
    inFlightSubmissions.delete(inFlightKey);
  }
});

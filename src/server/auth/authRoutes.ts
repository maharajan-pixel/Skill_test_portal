import { Router, Request, Response } from 'express';
import { 
  getStudentByExamNo, 
  getTeacherByEmail,
  verifyStaffCredentials
} from '../firebaseAdmin';
import { 
  generateSessionToken, 
  AuthenticatedRequest 
} from '../middleware/authMiddleware';
import { AuthUser, StudentUser, TeacherUser, AdminUser } from '../../types';

export const authRouter = Router();

// Authorized Master Administrators whitelist
const getAuthorizedAdminEmails = (): string[] => {
  const envAdmins = process.env.ADMIN_EMAILS 
    ? process.env.ADMIN_EMAILS.toLowerCase().split(',').map(e => e.trim()) 
    : [];
  return Array.from(new Set([
    'admin@spicschool.com',
    'maharajan@spicschool.com',
    ...envAdmins
  ]));
};

/**
 * POST /api/auth/student-login
 * Authoritative Student Examination Login via Exam Number & DOB
 */
authRouter.post('/student-login', async (req: Request, res: Response) => {
  try {
    const { examNo, dob } = req.body;

    if (!examNo || !dob) {
      res.status(400).json({ error: 'Exam Number and Date of Birth (DD/MM/YYYY) are required.' });
      return;
    }

    const cleanExamNo = String(examNo).trim();
    const cleanDob = String(dob).trim();

    // 1. Look up student in server-authoritative database
    const student = await getStudentByExamNo(cleanExamNo);

    if (!student) {
      res.status(401).json({ error: 'Invalid Exam Number. Please verify your hall ticket credentials.' });
      return;
    }

    // 2. Server-side DOB verification (strict check, normalizing dates)
    const normalizedInputDob = cleanDob.replace(/[-.]/g, '/');
    const normalizedRecordDob = student.dob.replace(/[-.]/g, '/');

    if (normalizedInputDob !== normalizedRecordDob) {
      res.status(401).json({ error: 'Incorrect Date of Birth. Please enter in DD/MM/YYYY format.' });
      return;
    }

    // 3. Build sanitized student user object (no password or DOB returned to client)
    const studentUser: StudentUser = {
      role: 'STUDENT',
      examNo: student.examNo,
      admnNo: student.admnNo,
      name: student.name,
      classSec: student.classSec
    };

    // 4. Create signed session token
    const token = generateSessionToken(studentUser);

    // 5. Set secure HTTP-only cookie
    res.cookie('spic_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 8 * 60 * 60 * 1000 // 8 hours
    });

    res.json({
      success: true,
      user: studentUser
    });
  } catch (err: any) {
    console.error('[authRoutes] Error in student-login:', err);
    res.status(500).json({ error: 'Internal server error during student authentication.' });
  }
});

/**
 * POST /api/auth/staff-login
 * Server-authoritative credentials verification for Faculty and Master Administrators.
 * Generates secure signed JWT session token and sets HttpOnly cookie.
 */
authRouter.post('/staff-login', async (req: Request, res: Response) => {
  try {
    const { role, identifier, password } = req.body;

    if (!role || !identifier || !password) {
      res.status(400).json({ error: 'Role, identifier, and password are required.' });
      return;
    }

    if (role !== 'TEACHER' && role !== 'ADMIN') {
      res.status(400).json({ error: 'Invalid role specified for staff login.' });
      return;
    }

    const authUser = await verifyStaffCredentials(role, identifier, password);

    if (!authUser) {
      res.status(401).json({ error: 'Invalid credentials. Please verify your ID/email and password.' });
      return;
    }

    // Generate authoritative session token
    const token = generateSessionToken(authUser);

    // Set secure HTTP-only cookie
    res.cookie('spic_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 8 * 60 * 60 * 1000 // 8 hours
    });

    res.json({
      success: true,
      user: authUser
    });
  } catch (err: any) {
    console.error('[authRoutes] Error in staff-login:', err);
    res.status(500).json({ error: 'Internal server error during staff authentication.' });
  }
});

/**
 * POST /api/auth/google-sso
 * Server-authoritative Google SSO Role Resolution
 * NEVER trusts client-supplied roles.
 */
authRouter.post('/google-sso', async (req: Request, res: Response) => {
  try {
    const { email, displayName, requestedTab } = req.body;

    if (!email) {
      res.status(400).json({ error: 'Google account email is required.' });
      return;
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const adminEmails = getAuthorizedAdminEmails();

    let authUser: AuthUser | null = null;

    // Rule 1: Check Master Administrator Whitelist
    if (adminEmails.includes(cleanEmail)) {
      const adminUser: AdminUser = {
        role: 'ADMIN',
        adminId: cleanEmail === 'maharajan@spicschool.com' ? 'ADM_MAHARAJAN' : 'ADM_MASTER',
        name: displayName || (cleanEmail.includes('maharajan') ? 'Mr. Maharajan (Administrator)' : 'Master Administrator')
      };
      authUser = adminUser;
    }

    // Rule 2: If requestedTab was ADMIN but email is NOT in admin whitelist -> DENIED
    if (requestedTab === 'ADMIN' && (!authUser || authUser.role !== 'ADMIN')) {
      res.status(403).json({ 
        error: 'Access Denied: Your Google account is not authorized as a Master Administrator.' 
      });
      return;
    }

    // Rule 3: Check Faculty Roster if not admin
    if (!authUser) {
      const faculty = await getTeacherByEmail(cleanEmail);
      if (faculty) {
        const teacherUser: TeacherUser = {
          role: 'TEACHER',
          email: faculty.email,
          name: faculty.name || displayName || 'Faculty Member',
          assignedClasses: faculty.assigned
        };
        authUser = teacherUser;
      }
    }

    // Rule 4: If requestedTab was TEACHER but email is NOT in faculty roster -> DENIED
    if (requestedTab === 'TEACHER' && (!authUser || authUser.role !== 'TEACHER')) {
      res.status(403).json({ 
        error: 'Access Denied: Your Google account is not registered in the Faculty Roster. Please contact the administrator.' 
      });
      return;
    }

    // Rule 5: Check Student Roster by email or student identifier
    if (!authUser) {
      // If user has a SPIC school student email or student ID pattern
      const possibleExamNo = cleanEmail.split('@')[0].toUpperCase();
      const student = await getStudentByExamNo(possibleExamNo);
      if (student) {
        const studentUser: StudentUser = {
          role: 'STUDENT',
          admnNo: student.admnNo,
          name: student.name,
          classSec: student.classSec,
          examNo: student.examNo
        };
        authUser = studentUser;
      }
    }

    // If still unresolved
    if (!authUser) {
      res.status(403).json({
        error: 'Access Denied: No school record found matching this Google account. Please use your registered student or faculty credentials.'
      });
      return;
    }

    // Generate signed session
    const token = generateSessionToken(authUser);

    res.cookie('spic_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 8 * 60 * 60 * 1000
    });

    res.json({
      success: true,
      user: authUser
    });
  } catch (err: any) {
    console.error('[authRoutes] Error in google-sso:', err);
    res.status(500).json({ error: 'Internal server error during Google SSO authentication.' });
  }
});

/**
 * GET /api/auth/me
 * Returns current authenticated user
 */
authRouter.get('/me', (req: AuthenticatedRequest, res: Response) => {
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
});

/**
 * POST /api/auth/logout
 * Clears session cookie
 */
authRouter.post('/logout', (req: Request, res: Response) => {
  res.clearCookie('spic_session');
  res.json({ success: true, message: 'Successfully logged out.' });
});

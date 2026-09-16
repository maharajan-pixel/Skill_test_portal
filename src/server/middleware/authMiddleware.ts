import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthUser } from '../../types';

const JWT_SECRET = process.env.JWT_SECRET || 'spic-school-cbt-secure-jwt-signing-secret-2026';

export interface AuthenticatedRequest extends Request {
  user?: AuthUser;
}

/**
 * Generate a signed JWT session token
 */
export function generateSessionToken(user: AuthUser): string {
  return jwt.sign(user, JWT_SECRET, { expiresIn: '8h' });
}

/**
 * Verify a JWT session token
 */
export function verifySessionToken(token: string): AuthUser | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AuthUser;
  } catch (err) {
    return null;
  }
}

/**
 * Middleware: extracts user from Cookie or Authorization header
 */
export function authenticateSession(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  const token = req.cookies?.spic_session || 
    (req.headers.authorization?.startsWith('Bearer ') ? req.headers.authorization.split(' ')[1] : null);

  if (token) {
    const user = verifySessionToken(token);
    if (user) {
      req.user = user;
    }
  }

  next();
}

/**
 * Middleware: requires an authenticated user
 */
export function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  if (!req.user) {
    res.status(401).json({ error: 'Authentication required. Please log in.' });
    return;
  }
  next();
}

/**
 * Middleware: requires student role
 */
export function requireStudent(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  if (!req.user || req.user.role !== 'STUDENT') {
    res.status(403).json({ error: 'Access denied: Student role required.' });
    return;
  }
  next();
}

/**
 * Middleware: requires admin role
 */
export function requireAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  if (!req.user || req.user.role !== 'ADMIN') {
    res.status(403).json({ error: 'Access denied: Master Administrator privileges required.' });
    return;
  }
  next();
}

/**
 * Middleware: requires teacher or admin role
 */
export function requireTeacherOrAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  if (!req.user || (req.user.role !== 'TEACHER' && req.user.role !== 'ADMIN')) {
    res.status(403).json({ error: 'Access denied: Faculty or Administrator authorization required.' });
    return;
  }
  next();
}

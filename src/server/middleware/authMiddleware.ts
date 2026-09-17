import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthUser } from '../../types';

function resolveJwtSecret(): string {
  if (process.env.NODE_ENV === 'production') {
    if (!process.env.JWT_SECRET || process.env.JWT_SECRET.trim().length === 0) {
      throw new Error(
        '[FATAL PRODUCTION CONFIGURATION ERROR] JWT_SECRET environment variable must be explicitly configured in production. Server startup is blocked to prevent insecure token signing.'
      );
    }
    return process.env.JWT_SECRET.trim();
  }
  // In development, fallback to an isolated development-only secret
  return process.env.JWT_SECRET?.trim() || 'spic-school-cbt-isolated-development-secret-not-for-prod-2026';
}

const JWT_SECRET = resolveJwtSecret();

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
 * Middleware: extracts user strictly from HttpOnly Cookie (with dev-only testing fallback)
 */
export function authenticateSession(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  // Primary: Strictly read secure HttpOnly session cookie
  let token = req.cookies?.spic_session;

  // Development/Automated API test fallback: only if not in production and Authorization header is passed
  if (!token && process.env.NODE_ENV !== 'production' && req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

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

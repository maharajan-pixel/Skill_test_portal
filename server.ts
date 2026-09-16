import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import { createServer as createViteServer } from 'vite';
import { authRouter } from './src/server/auth/authRoutes';
import { examRouter } from './src/server/exams/examRoutes';
import { submissionRouter } from './src/server/submissions/submissionRoutes';
import { rosterRouter } from './src/server/roster/rosterRoutes';
import { authenticateSession } from './src/server/middleware/authMiddleware';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Base middleware
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(authenticateSession);

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // API Routes
  app.use('/api/auth', authRouter);
  app.use('/api/exams', submissionRouter);
  app.use('/api/exams', examRouter);
  app.use('/api/roster', rosterRouter);

  // Vite Middleware for development vs Static dist for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[SPIC Server] Full-Stack Examination Portal running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('[SPIC Server] Fatal startup error:', err);
  process.exit(1);
});

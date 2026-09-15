/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  AuthUser, 
  StudentUser, 
  TeacherUser, 
  AdminUser, 
  ExamDocument, 
  SubmissionDocument 
} from './types';
import { 
  subscribeExams, 
  subscribeSubmissions, 
  toggleExamStatusInDb, 
  toggleScoreStatusInDb, 
  submitExamAttempt,
  seedInitialFirestoreData,
  saveExamToFirestore
} from './services/firebase';
import { Navbar } from './components/Navbar';
import { LoginView } from './components/LoginView';
import { StudentDashboard } from './components/StudentDashboard';
import { TeacherDashboard } from './components/TeacherDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { ExamKiosk } from './components/ExamKiosk';
import { RealTimeAnalyticsView } from './components/RealTimeAnalyticsView';
import { ResultView } from './components/ResultView';
import { InstructionsModal } from './components/InstructionsModal';
import { ImportSheetModal } from './components/ImportSheetModal';
import { RosterManagerModal } from './components/RosterManagerModal';

type AppView = 
  | 'LOGIN'
  | 'STUDENT_DASHBOARD'
  | 'TEACHER_DASHBOARD'
  | 'ADMIN_DASHBOARD'
  | 'EXAM_KIOSK'
  | 'REAL_TIME_ANALYTICS'
  | 'EXAM_RESULT';

export default function App() {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [currentView, setCurrentView] = useState<AppView>('LOGIN');

  // Firestore Data State
  const [exams, setExams] = useState<ExamDocument[]>([]);
  const [submissions, setSubmissions] = useState<SubmissionDocument[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Active Contexts
  const [activeExam, setActiveExam] = useState<ExamDocument | null>(null);
  const [latestSubmission, setLatestSubmission] = useState<SubmissionDocument | null>(null);

  // Modals
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isRosterModalOpen, setIsRosterModalOpen] = useState(false);

  // Initialize and subscribe to Firestore
  useEffect(() => {
    // Seed initial data if empty
    seedInitialFirestoreData();

    // Real-time listener for exams
    const unsubscribeExams = subscribeExams((updatedExams) => {
      const seen = new Set<string>();
      const deduped: ExamDocument[] = [];
      for (const e of updatedExams) {
        const key = e.id || e.code;
        if (key && !seen.has(key)) {
          seen.add(key);
          deduped.push(e);
        }
      }
      setExams(deduped);
    });

    // Real-time listener for submissions
    const unsubscribeSubs = subscribeSubmissions(null, (updatedSubs) => {
      const seen = new Set<string>();
      const deduped: SubmissionDocument[] = [];
      for (const s of updatedSubs) {
        const key = s.id || `${s.examId}-${s.admnNo}`;
        if (key && !seen.has(key)) {
          seen.add(key);
          deduped.push(s);
        }
      }
      setSubmissions(deduped);
    });

    // Check if there was an active exam in sessionStorage to restore
    const backupRaw = sessionStorage.getItem('spic_exam_backup_v2');
    if (backupRaw) {
      try {
        const backup = JSON.parse(backupRaw);
        if (backup.currentUser && backup.examId) {
          setCurrentUser(backup.currentUser);
          // When exams load, activeExam will be set
        }
      } catch (e) {}
    }

    return () => {
      unsubscribeExams();
      unsubscribeSubs();
    };
  }, []);

  // Restore activeExam once exams are available if session backup exists
  useEffect(() => {
    if (exams.length > 0 && currentUser?.role === 'STUDENT' && currentView === 'LOGIN') {
      const backupRaw = sessionStorage.getItem('spic_exam_backup_v2');
      if (backupRaw) {
        try {
          const backup = JSON.parse(backupRaw);
          const matchedExam = exams.find(e => e.id === backup.examId);
          if (matchedExam) {
            setActiveExam(matchedExam);
            setCurrentView('EXAM_KIOSK');
          }
        } catch (e) {}
      }
    }
  }, [exams, currentUser, currentView]);

  // Handle Login
  const handleLoginSuccess = (user: AuthUser) => {
    setCurrentUser(user);
    if (user.role === 'STUDENT') {
      setCurrentView('STUDENT_DASHBOARD');
    } else if (user.role === 'TEACHER') {
      setCurrentView('TEACHER_DASHBOARD');
    } else {
      setCurrentView('ADMIN_DASHBOARD');
    }
  };

  // Handle Logout
  const handleLogout = () => {
    sessionStorage.removeItem('spic_exam_backup_v2');
    setCurrentUser(null);
    setActiveExam(null);
    setLatestSubmission(null);
    setCurrentView('LOGIN');
  };

  // Manual Live Refresh
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 800);
  };

  // Start Exam (Student)
  const handleStartExam = (examToStart: ExamDocument) => {
    setActiveExam(examToStart);
    setCurrentView('EXAM_KIOSK');
  };

  // Submit Exam (Student)
  const handleSubmitExam = async (
    userAnswers: Record<string, number | "SKIPPED">,
    secsConsumed: number,
    proctorMeta?: {
      tabSwitchCount?: number;
      proctorViolations?: string[];
      proctorStatus?: 'CLEAN' | 'WARNED' | 'FLAGGED_VIOLATION';
    }
  ) => {
    if (!currentUser || currentUser.role !== 'STUDENT' || !activeExam) return;

    try {
      const sub = await submitExamAttempt(
        activeExam.id,
        currentUser,
        userAnswers,
        activeExam.questions,
        secsConsumed,
        proctorMeta
      );
      setLatestSubmission(sub);
      setCurrentView('EXAM_RESULT');
    } catch (err: any) {
      alert(err.message || 'Submission failed. Please contact your administrator.');
    }
  };

  // Return to Student Dashboard
  const handleReturnToStudentDashboard = () => {
    setActiveExam(null);
    setLatestSubmission(null);
    setCurrentView('STUDENT_DASHBOARD');
  };

  // Open Real-Time Analytics (Teacher / Admin)
  const handleOpenReport = (examToInspect: ExamDocument) => {
    setActiveExam(examToInspect);
    setCurrentView('REAL_TIME_ANALYTICS');
  };

  // Back from Report
  const handleBackFromReport = () => {
    if (currentUser?.role === 'TEACHER') {
      setCurrentView('TEACHER_DASHBOARD');
    } else if (currentUser?.role === 'ADMIN') {
      setCurrentView('ADMIN_DASHBOARD');
    } else {
      setCurrentView('STUDENT_DASHBOARD');
    }
  };

  // Admin: Toggle Status
  const handleToggleExamStatus = async (examId: string, currentStatus: 'ACTIVE' | 'CLOSED') => {
    await toggleExamStatusInDb(examId, currentStatus);
  };

  // Admin: Toggle Score Status
  const handleToggleScoreStatus = async (examId: string, currentScoreStatus: 'AUTO' | 'RELEASED') => {
    await toggleScoreStatusInDb(examId, currentScoreStatus);
  };

  // Import new exam (Option 3 Hybrid - Google Sheets / CSV)
  const handleImportExam = async (newExam: ExamDocument) => {
    try {
      await saveExamToFirestore(newExam);
    } catch (e) {
      console.warn("Local cache exam fallback:", e);
    }
    setExams(prev => {
      const filtered = prev.filter(e => e.id !== newExam.id && (!e.code || !newExam.code || e.code !== newExam.code));
      return [newExam, ...filtered];
    });
  };

  // Admin: Export All Submissions to CSV
  const handleExportAllCsv = () => {
    if (submissions.length === 0) {
      alert('No submissions in database to export.');
      return;
    }
    const headers = [
      "Timestamp",
      "Exam_ID",
      "Admn_No",
      "Name",
      "Class_Sec",
      "Score",
      "Correct",
      "Wrong",
      "Skipped",
      "Time_Used",
      "Category_Breakdown",
      "Screen_Changes",
      "Proctor_Status",
      "Proctor_Audit_Logs"
    ];

    const rows = submissions.map(s => [
      new Date(s.submittedAt).toLocaleString(),
      `"${s.examId}"`,
      `"${s.admnNo}"`,
      `"${s.name}"`,
      `"${s.classSec}"`,
      `"${s.score}"`,
      s.correct,
      s.wrong,
      s.skipped,
      `"${s.timeUsed}"`,
      `"${s.categoryBreakdown}"`,
      s.tabSwitchCount ?? 0,
      `"${s.proctorStatus || (s.tabSwitchCount && s.tabSwitchCount >= 3 ? 'FLAGGED_VIOLATION' : (s.tabSwitchCount || 0) > 0 ? 'WARNED' : 'CLEAN')}"`,
      `"${(s.proctorViolations || []).join('; ').replace(/"/g, '""')}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + 
      [headers.join(","), ...rows.map(e => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `SPIC_School_Master_Scoreboard_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-200 font-sans flex flex-col justify-between text-slate-800">
      
      {/* Top Application Wrapper */}
      <div className="w-full">
        {/* Navigation Bar (Hidden during active candidate exam kiosk to prevent cheating / distractions) */}
        {currentView !== 'EXAM_KIOSK' && (
          <Navbar
            user={currentUser}
            onLogout={handleLogout}
            onOpenHelp={() => setIsHelpOpen(true)}
            onRefresh={handleRefresh}
            isRefreshing={isRefreshing}
          />
        )}

        {/* Main Content Card Container */}
        <main className="max-w-6xl mx-auto my-4 sm:my-8 px-2 sm:px-4">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-300 transition-all">
            
            {/* 1. Login Screen */}
            {currentView === 'LOGIN' && (
              <LoginView onLoginSuccess={handleLoginSuccess} />
            )}

            {/* 2. Student Dashboard */}
            {currentView === 'STUDENT_DASHBOARD' && currentUser?.role === 'STUDENT' && (
              <StudentDashboard
                user={currentUser as StudentUser}
                exams={exams}
                submissions={submissions}
                onStartExam={handleStartExam}
                onRefresh={handleRefresh}
                isRefreshing={isRefreshing}
              />
            )}

            {/* 3. Teacher Dashboard */}
            {currentView === 'TEACHER_DASHBOARD' && currentUser?.role === 'TEACHER' && (
              <TeacherDashboard
                user={currentUser as TeacherUser}
                exams={exams}
                submissions={submissions}
                onOpenReport={handleOpenReport}
                onRefresh={handleRefresh}
                isRefreshing={isRefreshing}
                onOpenImportModal={() => setIsImportModalOpen(true)}
                onOpenRosterModal={() => setIsRosterModalOpen(true)}
              />
            )}

            {/* 4. Admin Dashboard */}
            {currentView === 'ADMIN_DASHBOARD' && currentUser?.role === 'ADMIN' && (
              <AdminDashboard
                user={currentUser as AdminUser}
                exams={exams}
                submissions={submissions}
                onToggleStatus={handleToggleExamStatus}
                onToggleScoreStatus={handleToggleScoreStatus}
                onOpenReport={handleOpenReport}
                onRefresh={handleRefresh}
                isRefreshing={isRefreshing}
                onOpenImportModal={() => setIsImportModalOpen(true)}
                onOpenRosterModal={() => setIsRosterModalOpen(true)}
                onExportAllCsv={handleExportAllCsv}
              />
            )}

            {/* 5. Candidate Examination Kiosk */}
            {currentView === 'EXAM_KIOSK' && currentUser?.role === 'STUDENT' && activeExam && (
              <ExamKiosk
                student={currentUser as StudentUser}
                exam={activeExam}
                onSubmit={handleSubmitExam}
                onOpenHelp={() => setIsHelpOpen(true)}
              />
            )}

            {/* 6. Real-Time Analytics & Report View */}
            {currentView === 'REAL_TIME_ANALYTICS' && activeExam && (
              <RealTimeAnalyticsView
                exam={activeExam}
                submissions={submissions}
                onBack={handleBackFromReport}
                onRefresh={handleRefresh}
                isRefreshing={isRefreshing}
              />
            )}

            {/* 7. Exam Completed / Result Screen */}
            {currentView === 'EXAM_RESULT' && currentUser?.role === 'STUDENT' && activeExam && (
              <ResultView
                student={currentUser as StudentUser}
                exam={activeExam}
                submission={latestSubmission}
                onReturn={handleReturnToStudentDashboard}
              />
            )}

          </div>
        </main>
      </div>

      {/* Global Rules & Help Modal */}
      <InstructionsModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />

      {/* Hybrid Google Sheets / CSV Import Modal */}
      <ImportSheetModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImportExam={handleImportExam}
        currentTeacherEmail={currentUser?.role === 'TEACHER' ? (currentUser as TeacherUser).email : undefined}
      />

      {/* Student & Teacher Roster Database Modal */}
      <RosterManagerModal
        isOpen={isRosterModalOpen}
        onClose={() => setIsRosterModalOpen(false)}
      />

      {/* Official SPIC School Footer */}
      <footer className="bg-indigo-950 text-indigo-200 border-t-2 border-amber-400 py-3 px-4 sm:px-8 z-40 flex flex-col sm:flex-row justify-between items-center text-xs gap-3 shadow-2xl print:hidden">
        <button
          id="btn-footer-rules"
          onClick={() => setIsHelpOpen(true)}
          className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-4 py-1.5 rounded-xl flex items-center gap-2 shadow-md transform active:scale-95 transition tracking-wide uppercase text-[11px] sm:text-xs whitespace-nowrap cursor-pointer"
        >
          <span>💡</span>
          <span>Help & Rules</span>
        </button>

        <div className="font-medium tracking-wide text-[10px] sm:text-[11px] text-center sm:text-right text-indigo-200/90 leading-snug">
          © 2026 SPIC School. All Rights Reserved. Designed and Developed by Technical Assistant - SPIC School.
        </div>
      </footer>

    </div>
  );
}

import React from 'react';
import { TeacherUser, ExamDocument, SubmissionDocument } from '../types';
import { BarChart3, Users, Clock, FileSpreadsheet, RefreshCw, CheckCircle, Upload, GraduationCap } from 'lucide-react';

interface TeacherDashboardProps {
  user: TeacherUser;
  exams: ExamDocument[];
  submissions: SubmissionDocument[];
  onOpenReport: (exam: ExamDocument) => void;
  onRefresh: () => void;
  isRefreshing: boolean;
  onOpenImportModal?: () => void;
  onOpenRosterModal?: () => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  user,
  exams,
  submissions,
  onOpenReport,
  onRefresh,
  isRefreshing,
  onOpenImportModal,
  onOpenRosterModal
}) => {
  // Filter exams managed by this teacher and ensure unique items
  const managedExams = React.useMemo(() => {
    const seen = new Set<string>();
    return exams.filter((e, idx) => {
      const key = e.id || e.code || `exam-${idx}`;
      if (seen.has(key)) return false;
      seen.add(key);

      if (!e.allowedTeachers || e.allowedTeachers.length === 0) return true;
      return e.allowedTeachers.some(email => email.toLowerCase() === user.email.toLowerCase());
    });
  }, [exams, user.email]);

  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto min-h-[60vh]">
      {/* Teacher Profile Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest block">
            Academic Staff Portal
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
            Teacher Control Panel
          </h2>
          <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full mt-2 inline-flex items-center gap-1.5 shadow-2xs font-mono">
            <span>👩‍🏫</span>
            <span>{user.name}</span>
            <span>({user.email})</span>
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {onOpenImportModal && (
            <button
              id="btn-teacher-import"
              onClick={onOpenImportModal}
              className="bg-indigo-900 hover:bg-indigo-800 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5 text-amber-400" />
              <span>Import Question Paper</span>
            </button>
          )}

          {onOpenRosterModal && (
            <button
              id="btn-teacher-roster"
              onClick={onOpenRosterModal}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3.5 py-2 rounded-xl border border-slate-300 transition flex items-center gap-1.5 cursor-pointer"
            >
              <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
              <span>Students Database</span>
            </button>
          )}

          <button
            id="btn-sync-teacher"
            onClick={onRefresh}
            disabled={isRefreshing}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-xl text-xs font-black shadow-sm transition flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>LIVE REFRESH</span>
          </button>
        </div>
      </div>

      {/* Managed Portfolios */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xs sm:text-sm font-black text-slate-500 uppercase tracking-wider">
            Managed Examination Portfolios
          </h3>
          <span className="text-xs text-indigo-600 font-bold">
            Real-Time Firestore Listener Connected
          </span>
        </div>

        {managedExams.length === 0 ? (
          <div className="p-8 bg-slate-50 border border-slate-200 rounded-3xl text-center text-slate-500 font-bold text-xs">
            No exams currently assigned to your email portfolio.
          </div>
        ) : (
          <div className="space-y-4">
            {managedExams.map((ex, idx) => {
              // Count submissions for this exam in this class
              const examSubs = submissions.filter(s => s.examId === ex.id);
              const isActive = ex.status === 'ACTIVE';

              return (
                <div
                  key={ex.id ? `${ex.id}-${idx}` : `exam-${idx}`}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-5 sm:p-6 border-2 border-slate-200 hover:border-indigo-400 rounded-3xl shadow-sm transition-all gap-4"
                >
                  <div className="w-full sm:w-auto">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-black text-base sm:text-lg text-slate-900">
                        Class {ex.classSec} — {ex.subject}
                      </h3>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase font-black border ${
                        isActive 
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : 'bg-slate-200 text-slate-700 border-slate-300'
                      }`}>
                        {isActive ? 'Active 🟢' : 'Closed 🔒'}
                      </span>
                    </div>

                    <p className="text-xs font-bold text-indigo-600 mb-2">
                      {ex.title}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-slate-500">
                      <span className="flex items-center gap-1 bg-indigo-50 text-indigo-900 border border-indigo-100 px-2.5 py-0.5 rounded-lg font-mono">
                        <Users className="w-3.5 h-3.5 text-indigo-600" />
                        Class Submissions: <strong className="text-indigo-700">{examSubs.length}</strong>
                      </span>
                      <span className="flex items-center gap-1 font-mono text-slate-600">
                        <Clock className="w-3.5 h-3.5 text-amber-500" />
                        {ex.examMins} Mins • {ex.qCount} Questions
                      </span>
                    </div>
                  </div>

                  <button
                    id={`btn-view-report-${ex.id}`}
                    onClick={() => onOpenReport(ex)}
                    className="w-full sm:w-auto bg-indigo-950 hover:bg-indigo-900 text-amber-300 hover:text-amber-200 text-xs font-black px-6 py-3 rounded-2xl shadow-md transition flex items-center justify-center gap-2 uppercase tracking-wider cursor-pointer"
                  >
                    <BarChart3 className="w-4 h-4 text-amber-400" />
                    <span>Real-Time Analytics & Report →</span>
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};

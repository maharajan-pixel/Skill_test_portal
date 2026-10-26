import React, { useState } from 'react';
import { AdminUser, ExamDocument, SubmissionDocument } from '../types';
import { 
  ShieldCheck, 
  BarChart3, 
  Lock, 
  Unlock, 
  Megaphone, 
  Clock, 
  RefreshCw, 
  Users, 
  FileSpreadsheet, 
  Upload, 
  Download, 
  PlusCircle,
  Sparkles
} from 'lucide-react';

interface AdminDashboardProps {
  user: AdminUser;
  exams: ExamDocument[];
  submissions: SubmissionDocument[];
  onToggleStatus: (examId: string, currentStatus: 'ACTIVE' | 'CLOSED') => Promise<void>;
  onToggleScoreStatus: (examId: string, currentScoreStatus: 'AUTO' | 'RELEASED') => Promise<void>;
  onOpenReport: (exam: ExamDocument) => void;
  onRefresh: () => void;
  isRefreshing: boolean;
  onOpenImportModal: () => void;
  onOpenRosterModal: () => void;
  onExportAllCsv: () => void;
  onOpenWorkspace?: (tab?: 'SHEETS' | 'DRIVE' | 'GMAIL') => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  user,
  exams,
  submissions,
  onToggleStatus,
  onToggleScoreStatus,
  onOpenReport,
  onRefresh,
  isRefreshing,
  onOpenImportModal,
  onOpenRosterModal,
  onExportAllCsv,
  onOpenWorkspace
}) => {
  const [updatingExamId, setUpdatingExamId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'CLOSED'>('ALL');
  const [classFilter, setClassFilter] = useState<string>('ALL');
  const [isSyncingRouter, setIsSyncingRouter] = useState(false);
  const [routerMessage, setRouterMessage] = useState<string | null>(null);
  const routerFileInputRef = React.useRef<HTMLInputElement>(null);

  // Ensure unique exam items
  const uniqueExams = React.useMemo(() => {
    const seen = new Set<string>();
    return exams.filter((e, idx) => {
      const key = e.id || e.code || `exam-${idx}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [exams]);

  // Filtered exams according to status and class filter
  const filteredExams = React.useMemo(() => {
    return uniqueExams.filter(e => {
      if (statusFilter === 'ACTIVE' && e.status !== 'ACTIVE') return false;
      if (statusFilter === 'CLOSED' && e.status !== 'CLOSED') return false;
      if (classFilter !== 'ALL' && !e.classSec.startsWith(classFilter)) return false;
      return true;
    });
  }, [uniqueExams, statusFilter, classFilter]);

  const activeCount = uniqueExams.filter(e => e.status === 'ACTIVE').length;
  const closedCount = uniqueExams.filter(e => e.status === 'CLOSED').length;

  const handleStatusToggle = async (examId: string, status: 'ACTIVE' | 'CLOSED') => {
    setUpdatingExamId(examId);
    try {
      await onToggleStatus(examId, status);
    } finally {
      setUpdatingExamId(null);
    }
  };

  const handleScoreToggle = async (examId: string, scoreStatus: 'AUTO' | 'RELEASED') => {
    setUpdatingExamId(examId);
    try {
      await onToggleScoreStatus(examId, scoreStatus);
    } finally {
      setUpdatingExamId(null);
    }
  };

  const handleRouterUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsSyncingRouter(true);
    setRouterMessage(null);
    try {
      const text = await file.text();
      const res = await fetch('/api/exams/sync-router', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ csvContent: text })
      });
      const data = await res.json();
      if (data.success) {
        setRouterMessage(`Successfully synced ${data.count} exams from Router file!`);
        onRefresh();
      } else {
        setRouterMessage(`Router sync error: ${data.error || 'Failed to sync'}`);
      }
    } catch (err: any) {
      setRouterMessage(`Failed to upload router: ${err.message}`);
    } finally {
      setIsSyncingRouter(false);
      if (e.target) e.target.value = '';
    }
  };

  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto min-h-[60vh]">
      
      {/* Master Control Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3.5">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white p-1.5 border-2 border-amber-400 shadow-sm flex items-center justify-center shrink-0">
            <img 
              src="/school-logo.png" 
              alt="SPIC Nagar School Crest" 
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest block">
              Executive Control Tower
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
              Master Control Room
            </h2>
            <span className="text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full mt-2 inline-flex items-center gap-1.5 shadow-2xs font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-rose-600" />
              <span>{user.name}</span>
            </span>
          </div>
        </div>

        {/* Global Action Bar */}
        <div className="flex flex-wrap items-center gap-2">
          {onOpenWorkspace && (
            <button
              id="btn-admin-workspace"
              onClick={() => onOpenWorkspace('SHEETS')}
              className="bg-emerald-800 hover:bg-emerald-700 text-amber-300 text-xs font-black px-3.5 py-2 rounded-xl shadow-sm transition flex items-center gap-1.5 cursor-pointer border border-emerald-600"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Google Workspace (Sheets • Drive • Gmail)</span>
            </button>
          )}

          <button
            id="btn-admin-manage-roster"
            onClick={onOpenRosterModal}
            className="bg-purple-900 hover:bg-purple-800 text-amber-300 text-xs font-bold px-3.5 py-2 rounded-xl shadow-sm transition flex items-center gap-1.5 cursor-pointer border border-amber-400/40"
          >
            <Users className="w-3.5 h-3.5 text-amber-400" />
            <span>Students & Teachers Database</span>
          </button>

          <button
            id="btn-admin-import-sheet"
            onClick={onOpenImportModal}
            className="bg-indigo-900 hover:bg-indigo-800 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-sm transition flex items-center gap-1.5 cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5 text-amber-400" />
            <span>Import Questions (Sheet/CSV)</span>
          </button>

          <button
            id="btn-admin-export-all"
            onClick={onExportAllCsv}
            className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-sm transition flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-white" />
            <span>Export Scoreboard (CSV)</span>
          </button>

          {/* Hidden File Input for School Exam Router CSV */}
          <input
            type="file"
            ref={routerFileInputRef}
            onChange={handleRouterUpload}
            accept=".csv,text/csv"
            className="hidden"
          />

          <button
            id="btn-admin-sync-router"
            onClick={() => routerFileInputRef.current?.click()}
            disabled={isSyncingRouter}
            className="bg-cyan-800 hover:bg-cyan-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-sm transition flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
            title="Upload updated SCHOOL_EXAM_ROUTER CSV to sync all exam papers and statuses"
          >
            <FileSpreadsheet className={`w-3.5 h-3.5 text-cyan-300 ${isSyncingRouter ? 'animate-spin' : ''}`} />
            <span>{isSyncingRouter ? 'Syncing Router...' : 'Sync Router (CSV)'}</span>
          </button>

          <button
            id="btn-sync-admin"
            onClick={onRefresh}
            disabled={isRefreshing}
            className="bg-slate-800 hover:bg-slate-900 text-white px-3.5 py-2 rounded-xl text-xs font-black shadow-sm transition flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>SYNC ALL</span>
          </button>
        </div>
      </div>

      {/* Router Status Feedback Banner */}
      {routerMessage && (
        <div className="mb-6 p-4 rounded-2xl bg-cyan-50 border border-cyan-200 text-cyan-900 text-xs font-bold flex justify-between items-center animate-fade-in">
          <span>{routerMessage}</span>
          <button 
            onClick={() => setRouterMessage(null)}
            className="text-cyan-700 hover:text-cyan-950 font-black ml-4"
          >
            ✕
          </button>
        </div>
      )}

      {/* School Exam Router Live Sync Indicator Card */}
      <div className="mb-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-5 rounded-3xl border border-indigo-500/30 shadow-md">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-400">
                  School Exam Router (AY 2026-27)
                </span>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-black px-2 py-0.5 rounded-full">
                  SYNCHRONIZED
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5 font-medium">
                Official Roster: <strong>{uniqueExams.length} Examination Portfolios</strong> &bull; 
                <span className="text-emerald-300 font-bold ml-1">
                  {activeCount} Active Now (Class VI Maths 27.10.2026)
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => routerFileInputRef.current?.click()}
              className="text-[11px] font-bold bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg border border-white/20 transition flex items-center gap-1 cursor-pointer"
            >
              <Upload className="w-3 h-3 text-cyan-300" />
              <span>Update Router CSV</span>
            </button>
          </div>
        </div>
      </div>

      {/* Global Exam Portfolios */}
      <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
          <div>
            <h3 className="text-xs sm:text-sm font-black text-slate-700 uppercase tracking-wider">
              Global School Examination Portfolios
            </h3>
            <span className="text-xs font-mono text-slate-500 font-bold">
              Showing {filteredExams.length} of {uniqueExams.length} Papers
            </span>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
              <button
                onClick={() => setStatusFilter('ALL')}
                className={`px-3 py-1 rounded-lg transition ${
                  statusFilter === 'ALL' ? 'bg-white text-indigo-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All ({uniqueExams.length})
              </button>
              <button
                onClick={() => setStatusFilter('ACTIVE')}
                className={`px-3 py-1 rounded-lg transition flex items-center gap-1 ${
                  statusFilter === 'ACTIVE' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>Active</span>
                <span className="bg-emerald-700/80 text-[10px] px-1.5 py-0.2 rounded-full font-mono">{activeCount}</span>
              </button>
              <button
                onClick={() => setStatusFilter('CLOSED')}
                className={`px-3 py-1 rounded-lg transition ${
                  statusFilter === 'CLOSED' ? 'bg-slate-700 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Closed ({closedCount})
              </button>
            </div>

            {/* Class Dropdown */}
            <select
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              className="bg-white border border-slate-200 text-xs font-bold text-slate-700 rounded-xl px-2.5 py-1.5 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            >
              <option value="ALL">All Classes</option>
              <option value="VI">Class VI</option>
              <option value="VII">Class VII</option>
              <option value="VIII">Class VIII</option>
              <option value="IX">Class IX</option>
              <option value="X">Class X</option>
              <option value="XI">Class XI</option>
              <option value="XII">Class XII</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredExams.map((ex, idx) => {
            const examSubs = submissions.filter(s => s.examId === ex.id);
            const isActive = ex.status === 'ACTIVE';
            const isReleased = ex.scoreStatus === 'RELEASED';
            const isProcessing = updatingExamId === ex.id;

            return (
              <div
                key={ex.id ? `${ex.id}-${idx}` : `exam-${idx}`}
                className="flex flex-col lg:flex-row justify-between items-start lg:items-center bg-white p-5 sm:p-6 border-2 border-slate-200 hover:border-indigo-400 rounded-3xl shadow-sm transition-all gap-4"
              >
                <div className="w-full lg:w-1/2">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-black text-base sm:text-lg text-slate-900">
                      Class {ex.classSec} — {ex.subject}
                    </h3>
                    
                    {/* Status Badge */}
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase font-black border ${
                      isActive 
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                        : 'bg-slate-200 text-slate-700 border-slate-300'
                    }`}>
                      {isActive ? 'Active 🟢' : 'Closed 🔒'}
                    </span>

                    {/* Score Release Badge */}
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase font-black border ${
                      isReleased 
                        ? 'bg-indigo-100 text-indigo-800 border-indigo-200' 
                        : 'bg-amber-100 text-amber-800 border-amber-200'
                    }`}>
                      {isReleased ? 'Scores Released 📢' : 'Auto Embargo (12h)'}
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

                {/* Control Action Buttons */}
                <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
                  {/* Status Toggle */}
                  <button
                    id={`btn-toggle-status-${ex.id}`}
                    onClick={() => handleStatusToggle(ex.id, ex.status)}
                    disabled={isProcessing}
                    className={`flex-1 sm:flex-none text-xs font-bold px-3.5 py-2.5 rounded-xl shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 ${
                      isActive 
                        ? 'bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200' 
                        : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200'
                    }`}
                  >
                    {isActive ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                    <span>{isActive ? 'Close Exam' : 'Activate Exam'}</span>
                  </button>

                  {/* Score Release Toggle */}
                  <button
                    id={`btn-toggle-score-${ex.id}`}
                    onClick={() => handleScoreToggle(ex.id, ex.scoreStatus)}
                    disabled={isProcessing}
                    className={`flex-1 sm:flex-none text-xs font-bold px-3.5 py-2.5 rounded-xl shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 ${
                      isReleased 
                        ? 'bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200' 
                        : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200'
                    }`}
                  >
                    <Megaphone className="w-3.5 h-3.5" />
                    <span>{isReleased ? 'Set to Auto 12h' : 'Release Scores'}</span>
                  </button>

                  {/* View Real-Time Analytics */}
                  <button
                    id={`btn-admin-report-${ex.id}`}
                    onClick={() => onOpenReport(ex)}
                    className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-amber-300 text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <BarChart3 className="w-4 h-4 text-amber-400" />
                    <span>Real-Time Analytics →</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

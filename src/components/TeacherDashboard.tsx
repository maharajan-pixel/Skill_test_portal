import React, { useState, useMemo } from 'react';
import { TeacherUser, ExamDocument, SubmissionDocument } from '../types';
import { 
  BarChart3, 
  Users, 
  Clock, 
  RefreshCw, 
  Upload, 
  GraduationCap, 
  Sparkles,
  Search,
  Filter,
  X,
  Table,
  LayoutGrid,
  CheckCircle2,
  FileText,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  BookOpen
} from 'lucide-react';

interface TeacherDashboardProps {
  user: TeacherUser;
  exams: ExamDocument[];
  submissions: SubmissionDocument[];
  onOpenReport: (exam: ExamDocument) => void;
  onRefresh: () => void;
  isRefreshing: boolean;
  onOpenImportModal?: () => void;
  onOpenRosterModal?: () => void;
  onOpenWorkspace?: (tab?: 'SHEETS' | 'DRIVE' | 'GMAIL') => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  user,
  exams,
  submissions,
  onOpenReport,
  onRefresh,
  isRefreshing,
  onOpenImportModal,
  onOpenRosterModal,
  onOpenWorkspace
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'CLOSED'>('ALL');
  const [classFilter, setClassFilter] = useState<string>('ALL');
  const [viewMode, setViewMode] = useState<'TABLE' | 'CARDS'>('TABLE');

  // Filter exams managed by this teacher and ensure unique items
  const managedExams = useMemo(() => {
    const seen = new Set<string>();
    return exams.filter((e, idx) => {
      const key = e.id || e.code || `exam-${idx}`;
      if (seen.has(key)) return false;
      seen.add(key);

      if (!e.allowedTeachers || e.allowedTeachers.length === 0) return true;
      return e.allowedTeachers.some(email => email.toLowerCase() === user.email.toLowerCase());
    });
  }, [exams, user.email]);

  // Extract distinct classes in this teacher's portfolio
  const teacherClasses = useMemo(() => {
    const set = new Set<string>();
    managedExams.forEach(e => {
      if (e.classSec) set.add(e.classSec.trim());
    });
    return Array.from(set).sort();
  }, [managedExams]);

  // Submission count map for fast lookup
  const submissionCounts = useMemo(() => {
    const map = new Map<string, number>();
    submissions.forEach(s => {
      if (s.examId) {
        map.set(s.examId, (map.get(s.examId) || 0) + 1);
      }
    });
    return map;
  }, [submissions]);

  // KPI Metrics
  const activeExamsCount = useMemo(() => managedExams.filter(e => e.status === 'ACTIVE').length, [managedExams]);
  const closedExamsCount = useMemo(() => managedExams.filter(e => e.status === 'CLOSED').length, [managedExams]);
  const totalSubmissionsInPortfolio = useMemo(() => {
    return managedExams.reduce((acc, ex) => acc + (submissionCounts.get(ex.id) || 0), 0);
  }, [managedExams, submissionCounts]);

  // Filtered exams
  const filteredExams = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return managedExams.filter(ex => {
      // 1. Status Filter
      if (statusFilter === 'ACTIVE' && ex.status !== 'ACTIVE') return false;
      if (statusFilter === 'CLOSED' && ex.status !== 'CLOSED') return false;

      // 2. Class Filter
      if (classFilter !== 'ALL' && ex.classSec.trim().toLowerCase() !== classFilter.toLowerCase()) {
        return false;
      }

      // 3. Search Query (Title, Subject, Code, Class)
      if (q) {
        const matchTitle = ex.title?.toLowerCase().includes(q);
        const matchSubject = ex.subject?.toLowerCase().includes(q);
        const matchCode = ex.code?.toLowerCase().includes(q);
        const matchClass = ex.classSec?.toLowerCase().includes(q);
        if (!matchTitle && !matchSubject && !matchCode && !matchClass) return false;
      }

      return true;
    });
  }, [managedExams, statusFilter, classFilter, searchQuery]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto min-h-[70vh] flex flex-col gap-6">
      
      {/* 1. Academic Staff Executive Header */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-800 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white p-1.5 border border-amber-400 shadow-sm flex items-center justify-center shrink-0">
            <img 
              src="/school-logo.png" 
              alt="SPIC Nagar School Crest" 
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <div className="text-[11px] font-semibold tracking-wider text-amber-400 uppercase">
              Academic Staff Portal · Assessment Registry
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-0.5">
              Teacher Command Dashboard
            </h1>
            <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-slate-300">
              <span className="font-semibold text-white">{user.name}</span>
              <span className="text-slate-500">·</span>
              <span className="font-mono text-slate-300">{user.email}</span>
              {user.assignedClasses && user.assignedClasses.length > 0 && (
                <>
                  <span className="text-slate-500">·</span>
                  <span className="bg-indigo-900/60 text-indigo-200 border border-indigo-700/60 px-2 py-0.5 rounded text-[11px] font-mono">
                    Classes: {user.assignedClasses.join(', ')}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
          {onOpenWorkspace && (
            <button
              id="btn-teacher-workspace"
              onClick={() => onOpenWorkspace('SHEETS')}
              className="px-3.5 py-2 text-xs font-semibold text-amber-300 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700/60 rounded-lg shadow-sm transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
              title="Open Google Sheets, Drive, & Gmail integration"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Google Workspace</span>
            </button>
          )}

          {onOpenImportModal && (
            <button
              id="btn-teacher-import"
              onClick={onOpenImportModal}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-indigo-700 hover:bg-indigo-600 rounded-lg shadow-sm transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
              title="Import question paper from Google Sheet or CSV"
            >
              <Upload className="w-3.5 h-3.5 text-amber-300" />
              <span>Import Paper</span>
            </button>
          )}

          {onOpenRosterModal && (
            <button
              id="btn-teacher-roster"
              onClick={onOpenRosterModal}
              className="px-3.5 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
              title="View & manage enrolled students"
            >
              <GraduationCap className="w-3.5 h-3.5 text-indigo-300" />
              <span>Students Roster</span>
            </button>
          )}

          <button
            id="btn-sync-teacher"
            onClick={onRefresh}
            disabled={isRefreshing}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg shadow-sm transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50 whitespace-nowrap shrink-0"
            title="Refresh examination database from Firestore"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Sync</span>
          </button>
        </div>
      </div>

      {/* 2. Key Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-medium">Assigned Papers</span>
            <FileText className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono tabular-nums text-slate-900">
              {managedExams.length}
            </span>
            <span className="text-xs text-slate-500 font-medium">papers total</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-medium">Active Right Now</span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono tabular-nums text-emerald-700">
              {activeExamsCount}
            </span>
            <span className="text-xs text-slate-500 font-medium">open for testing</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-medium">Total Submissions</span>
            <Users className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono tabular-nums text-indigo-700">
              {totalSubmissionsInPortfolio}
            </span>
            <span className="text-xs text-slate-500 font-medium">completed tests</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-medium">Portfolio Classes</span>
            <BookOpen className="w-4 h-4 text-amber-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono tabular-nums text-slate-900">
              {teacherClasses.length}
            </span>
            <span className="text-xs text-slate-500 font-medium">classes monitored</span>
          </div>
        </div>
      </div>

      {/* 3. Search and Multi-Parameter Filter Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col gap-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* Search Box */}
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by subject, paper title, class, or code..."
              className="w-full pl-9 pr-8 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 focus:bg-white transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filters and View Switcher */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Class Filter */}
            {teacherClasses.length > 0 && (
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-medium text-slate-500 whitespace-nowrap">Class:</span>
                <select
                  value={classFilter}
                  onChange={(e) => setClassFilter(e.target.value)}
                  className="text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="ALL">All Classes ({managedExams.length})</option>
                  {teacherClasses.map(cls => (
                    <option key={cls} value={cls}>
                      Class {cls}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Status Segmented Control */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg border border-slate-200">
              <button
                onClick={() => setStatusFilter('ALL')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  statusFilter === 'ALL'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All ({managedExams.length})
              </button>
              <button
                onClick={() => setStatusFilter('ACTIVE')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  statusFilter === 'ACTIVE'
                    ? 'bg-white text-emerald-800 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Active ({activeExamsCount})
              </button>
              <button
                onClick={() => setStatusFilter('CLOSED')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  statusFilter === 'CLOSED'
                    ? 'bg-white text-slate-800 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Closed ({closedExamsCount})
              </button>
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg border border-slate-200">
              <button
                onClick={() => setViewMode('TABLE')}
                className={`p-1.5 rounded-md transition-colors ${
                  viewMode === 'TABLE' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Table view"
              >
                <Table className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('CARDS')}
                className={`p-1.5 rounded-md transition-colors ${
                  viewMode === 'CARDS' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Cards view"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Active Filters Bar if any */}
        {(searchQuery || statusFilter !== 'ALL' || classFilter !== 'ALL') && (
          <div className="flex items-center gap-2 pt-2 border-t border-slate-100 text-xs text-slate-500">
            <span>Showing {filteredExams.length} of {managedExams.length} papers</span>
            <span>·</span>
            <button
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('ALL');
                setClassFilter('ALL');
              }}
              className="text-indigo-600 hover:text-indigo-800 font-medium underline"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>

      {/* 4. Examination Registry List (Table or Card View) */}
      {filteredExams.length === 0 ? (
        <div className="bg-white p-12 rounded-xl border border-slate-200 text-center shadow-xs">
          <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-slate-900 mb-1">
            No examination papers found
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto mb-4">
            {managedExams.length === 0
              ? `No examination portfolios are assigned to ${user.email}. Check with the examination controller or import a new paper.`
              : 'No examination papers match the current filters or search term.'}
          </p>
          {(searchQuery || statusFilter !== 'ALL' || classFilter !== 'ALL') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('ALL');
                setClassFilter('ALL');
              }}
              className="px-3.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : viewMode === 'TABLE' ? (
        /* High-Density Data Table */
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">Class</th>
                  <th className="py-3 px-4">Subject & Title</th>
                  <th className="py-3 px-4">Duration & Qs</th>
                  <th className="py-3 px-4">Submissions</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Analytics & Reporting</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredExams.map((ex, idx) => {
                  const subCount = submissionCounts.get(ex.id) || 0;
                  const isActive = ex.status === 'ACTIVE';

                  return (
                    <tr 
                      key={ex.id || `exam-${idx}`} 
                      className="hover:bg-slate-50/80 transition-colors"
                    >
                      {/* Class */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="font-mono font-bold text-slate-900 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded text-xs">
                          {ex.classSec}
                        </span>
                      </td>

                      {/* Subject & Title */}
                      <td className="py-3.5 px-4 min-w-[200px]">
                        <div className="font-semibold text-slate-900 text-sm">
                          {ex.subject}
                        </div>
                        <div className="text-xs text-indigo-700 font-medium truncate max-w-sm">
                          {ex.title}
                        </div>
                        {ex.code && (
                          <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                            Code: {ex.code}
                          </div>
                        )}
                      </td>

                      {/* Duration & Qs */}
                      <td className="py-3.5 px-4 whitespace-nowrap text-slate-600">
                        <div className="flex items-center gap-1.5 font-mono tabular-nums">
                          <Clock className="w-3.5 h-3.5 text-amber-500" />
                          <span>{ex.examMins} mins</span>
                          <span>·</span>
                          <span>{ex.qCount} questions</span>
                        </div>
                      </td>

                      {/* Submissions */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono font-bold text-slate-900 tabular-nums text-sm">
                            {subCount}
                          </span>
                          <span className="text-xs text-slate-500">submitted</span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold ${
                          isActive 
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                            : 'bg-slate-100 text-slate-700 border border-slate-200'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-600' : 'bg-slate-400'}`} />
                          {isActive ? 'Active' : 'Closed'}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="py-3.5 px-4 whitespace-nowrap text-right">
                        <button
                          id={`btn-view-report-${ex.id}`}
                          onClick={() => onOpenReport(ex)}
                          className="px-3 py-1.5 text-xs font-semibold text-amber-300 bg-slate-900 hover:bg-slate-800 rounded-lg shadow-2xs transition inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                        >
                          <BarChart3 className="w-3.5 h-3.5 text-amber-400" />
                          <span>View Analytics →</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Card Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredExams.map((ex, idx) => {
            const subCount = submissionCounts.get(ex.id) || 0;
            const isActive = ex.status === 'ACTIVE';

            return (
              <div
                key={ex.id || `card-${idx}`}
                className="bg-white p-5 rounded-xl border border-slate-200 hover:border-slate-300 shadow-xs transition flex flex-col justify-between gap-4"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono font-bold text-xs text-slate-900 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
                      Class {ex.classSec}
                    </span>
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-semibold ${
                      isActive 
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                        : 'bg-slate-100 text-slate-700 border border-slate-200'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-600' : 'bg-slate-400'}`} />
                      {isActive ? 'Active' : 'Closed'}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900">
                    {ex.subject}
                  </h3>
                  <p className="text-xs font-medium text-indigo-700 mt-0.5">
                    {ex.title}
                  </p>

                  <div className="flex items-center gap-3 mt-3 text-xs text-slate-500 font-mono">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      {ex.examMins} mins
                    </span>
                    <span>·</span>
                    <span>{ex.qCount} questions</span>
                    <span>·</span>
                    <span className="text-slate-900 font-semibold">
                      {subCount} submissions
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-end">
                  <button
                    id={`btn-view-report-${ex.id}`}
                    onClick={() => onOpenReport(ex)}
                    className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-amber-300 bg-slate-900 hover:bg-slate-800 rounded-lg shadow-2xs transition inline-flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                  >
                    <BarChart3 className="w-3.5 h-3.5 text-amber-400" />
                    <span>Real-Time Analytics & Report →</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};

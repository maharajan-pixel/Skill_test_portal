import React, { useState, useMemo, useRef } from 'react';
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
  Sparkles,
  Search,
  Filter,
  X,
  SlidersHorizontal,
  Table,
  LayoutGrid,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  BookOpen,
  HelpCircle,
  FileText,
  AlertCircle
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

const CLASS_STANDARDS = ['VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'] as const;
const SECTIONS = ['A', 'B', 'C', 'D'] as const;

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
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'CLOSED'>('ALL');
  const [classFilter, setClassFilter] = useState<string>('ALL');
  const [sectionFilter, setSectionFilter] = useState<string>('ALL');
  const [subjectFilter, setSubjectFilter] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'CLASS' | 'STATUS' | 'TITLE' | 'SUBMISSIONS'>('CLASS');
  const [viewMode, setViewMode] = useState<'TABLE' | 'CARDS'>('TABLE');
  const [isSyncingRouter, setIsSyncingRouter] = useState(false);
  const [routerMessage, setRouterMessage] = useState<string | null>(null);
  const routerFileInputRef = useRef<HTMLInputElement>(null);

  // Ensure unique exam items
  const uniqueExams = useMemo(() => {
    const seen = new Set<string>();
    return exams.filter((e, idx) => {
      const key = e.id || e.code || `exam-${idx}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [exams]);

  // Extract unique subjects
  const availableSubjects = useMemo(() => {
    const subjects = new Set<string>();
    uniqueExams.forEach(e => {
      if (e.subject) subjects.add(e.subject.trim());
    });
    return Array.from(subjects).sort();
  }, [uniqueExams]);

  // Submission map for quick lookup
  const submissionCounts = useMemo(() => {
    const map = new Map<string, number>();
    submissions.forEach(s => {
      if (s.examId) {
        map.set(s.examId, (map.get(s.examId) || 0) + 1);
      }
    });
    return map;
  }, [submissions]);

  // Dynamic counts for classes
  const classCounts = useMemo(() => {
    const counts: Record<string, number> = { ALL: uniqueExams.length };
    CLASS_STANDARDS.forEach(cls => {
      counts[cls] = uniqueExams.filter(e => {
        const parts = (e.classSec || '').trim().split(/\s+/);
        return parts[0] === cls || e.classSec?.startsWith(cls);
      }).length;
    });
    return counts;
  }, [uniqueExams]);

  // Active / Closed counts
  const activeCount = useMemo(() => uniqueExams.filter(e => e.status === 'ACTIVE').length, [uniqueExams]);
  const closedCount = useMemo(() => uniqueExams.filter(e => e.status === 'CLOSED').length, [uniqueExams]);
  const totalSubmissions = submissions.length;

  // Filtered and sorted exams
  const filteredExams = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const filtered = uniqueExams.filter(e => {
      // 1. Status Filter
      if (statusFilter === 'ACTIVE' && e.status !== 'ACTIVE') return false;
      if (statusFilter === 'CLOSED' && e.status !== 'CLOSED') return false;

      // Parse Class & Section
      const parts = (e.classSec || '').trim().split(/\s+/);
      const examClass = parts[0] || '';
      const examSec = parts[1] || '';

      // 2. Class Filter
      if (classFilter !== 'ALL') {
        if (examClass !== classFilter && !e.classSec.startsWith(classFilter)) {
          return false;
        }
      }

      // 3. Section Filter
      if (sectionFilter !== 'ALL') {
        if (examSec !== sectionFilter && !e.classSec.includes(` ${sectionFilter}`)) {
          return false;
        }
      }

      // 4. Subject Filter
      if (subjectFilter !== 'ALL') {
        if (e.subject?.trim().toLowerCase() !== subjectFilter.toLowerCase()) {
          return false;
        }
      }

      // 5. Search Query (matches title, subject, code, classSec, teacher email)
      if (query) {
        const matchesTitle = e.title?.toLowerCase().includes(query);
        const matchesSubject = e.subject?.toLowerCase().includes(query);
        const matchesCode = e.code?.toLowerCase().includes(query);
        const matchesClass = e.classSec?.toLowerCase().includes(query);
        const matchesTeacher = (e.allowedTeachers || []).some(t => t.toLowerCase().includes(query));
        if (!matchesTitle && !matchesSubject && !matchesCode && !matchesClass && !matchesTeacher) {
          return false;
        }
      }

      return true;
    });

    // Sorting
    return [...filtered].sort((a, b) => {
      if (sortBy === 'STATUS') {
        if (a.status === 'ACTIVE' && b.status !== 'ACTIVE') return -1;
        if (a.status !== 'ACTIVE' && b.status === 'ACTIVE') return 1;
      } else if (sortBy === 'TITLE') {
        return (a.title || '').localeCompare(b.title || '');
      } else if (sortBy === 'SUBMISSIONS') {
        const aCount = submissionCounts.get(a.id) || 0;
        const bCount = submissionCounts.get(b.id) || 0;
        return bCount - aCount;
      }
      
      // Default: By Class and Section
      return (a.classSec || '').localeCompare(b.classSec || '', undefined, { numeric: true });
    });
  }, [uniqueExams, statusFilter, classFilter, sectionFilter, subjectFilter, searchQuery, sortBy, submissionCounts]);

  // Clear all filters helper
  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('ALL');
    setClassFilter('ALL');
    setSectionFilter('ALL');
    setSubjectFilter('ALL');
    setSortBy('CLASS');
  };

  const hasActiveFilters = searchQuery !== '' || statusFilter !== 'ALL' || classFilter !== 'ALL' || sectionFilter !== 'ALL' || subjectFilter !== 'ALL';

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

  // Class badge styling helper
  const getClassBadgeStyle = (classSec: string) => {
    const firstWord = (classSec || '').trim().split(/\s+/)[0];
    switch (firstWord) {
      case 'VI':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'VII':
        return 'bg-indigo-50 text-indigo-800 border-indigo-200';
      case 'VIII':
        return 'bg-teal-50 text-teal-800 border-teal-200';
      case 'IX':
        return 'bg-purple-50 text-purple-800 border-purple-200';
      case 'X':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'XI':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'XII':
        return 'bg-rose-50 text-rose-800 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="p-4 sm:p-7 max-w-7xl mx-auto space-y-6">
      
      {/* 1. INSTITUTIONAL HEADER & COMMAND TOOLBAR */}
      <header className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5">
          {/* Identity & Crest */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-slate-50 p-2 border border-slate-200 shadow-2xs flex items-center justify-center shrink-0">
              <img 
                src="/school-logo.png" 
                alt="SPIC School Crest" 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-black tracking-wider uppercase text-slate-600">
                  SPIC NAGAR HIGHER SECONDARY SCHOOL
                </span>
                <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                  AY 2026-27
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Admin Examination Portal
              </h1>
              <div className="flex items-center gap-2 mt-1 text-xs text-slate-600">
                <span className="inline-flex items-center gap-1 font-medium text-slate-700 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-full font-mono text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                  {user.name} ({user.adminId || 'Administrator'})
                </span>
                <span className="text-slate-400">·</span>
                <span className="text-slate-500 text-[11px]">Central Examination Router</span>
              </div>
            </div>
          </div>

          {/* Institutional Command Actions */}
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            {onOpenWorkspace && (
              <button
                id="btn-admin-workspace"
                onClick={() => onOpenWorkspace('SHEETS')}
                className="text-xs font-bold px-3 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 shadow-2xs transition flex items-center gap-1.5 cursor-pointer"
                title="Google Workspace Integration (Sheets, Drive, Gmail)"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Google Workspace</span>
              </button>
            )}

            <button
              id="btn-admin-manage-roster"
              onClick={onOpenRosterModal}
              className="text-xs font-bold px-3 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 shadow-2xs transition flex items-center gap-1.5 cursor-pointer"
              title="Students and Teachers Database"
            >
              <Users className="w-3.5 h-3.5 text-indigo-600" />
              <span>Roster DB</span>
            </button>

            <button
              id="btn-admin-import-sheet"
              onClick={onOpenImportModal}
              className="text-xs font-bold px-3 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 shadow-2xs transition flex items-center gap-1.5 cursor-pointer"
              title="Import exam paper questions via Google Sheet or CSV"
            >
              <Upload className="w-3.5 h-3.5 text-blue-600" />
              <span>Import Paper</span>
            </button>

            <button
              id="btn-admin-export-all"
              onClick={onExportAllCsv}
              className="text-xs font-bold px-3 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 shadow-2xs transition flex items-center gap-1.5 cursor-pointer"
              title="Export complete school scoreboard to CSV"
            >
              <Download className="w-3.5 h-3.5 text-emerald-600" />
              <span>Export CSV</span>
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
              className="text-xs font-bold px-3 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 shadow-2xs transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              title="Sync official router file SCHOOL_EXAM_ROUTER_AY_2026-27"
            >
              <FileSpreadsheet className={`w-3.5 h-3.5 text-cyan-600 ${isSyncingRouter ? 'animate-spin' : ''}`} />
              <span>{isSyncingRouter ? 'Syncing...' : 'Sync Router'}</span>
            </button>

            <button
              id="btn-sync-admin"
              onClick={onRefresh}
              disabled={isRefreshing}
              className="text-xs font-bold px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white shadow-2xs transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              title="Refresh all examinations and real-time student submissions"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Refreshing' : 'Refresh'}</span>
            </button>
          </div>
        </div>

        {/* Feedback Alert for Router Upload */}
        {routerMessage && (
          <div className="mt-4 p-3 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-950 text-xs font-medium flex justify-between items-center animate-fade-in">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>{routerMessage}</span>
            </span>
            <button 
              onClick={() => setRouterMessage(null)}
              className="text-indigo-700 hover:text-indigo-950 font-bold ml-3 text-sm"
            >
              ✕
            </button>
          </div>
        )}
      </header>

      {/* 2. EXECUTIVE KPI METRICS BAR */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Exam Papers</span>
            <BookOpen className="w-4 h-4 text-slate-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900 font-mono">{uniqueExams.length}</span>
            <span className="text-xs text-slate-500">Portfolios</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-500">
            Across 7 Academic Standards (VI - XII)
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-emerald-200 p-4 shadow-2xs relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-50 rounded-bl-full pointer-events-none -mr-4 -mt-4 opacity-70"></div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live / Active
            </span>
            <Unlock className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-emerald-700 font-mono">{activeCount}</span>
            <span className="text-xs font-bold text-emerald-600">Active Papers</span>
          </div>
          <p className="mt-1 text-[11px] text-emerald-800 font-medium">
            Class VI October Maths (27.10.2026)
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Submissions</span>
            <Users className="w-4 h-4 text-slate-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900 font-mono">{totalSubmissions}</span>
            <span className="text-xs text-slate-500">Recorded</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-500">
            {closedCount} Papers securely archived
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Router Status</span>
            <FileSpreadsheet className="w-4 h-4 text-slate-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-sm font-black text-slate-900 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
              Synchronized
            </span>
          </div>
          <p className="mt-1 text-[11px] text-slate-500 truncate" title="AY 2026-27 Master Router">
            54 Router entries loaded
          </p>
        </div>
      </section>

      {/* 3. MULTI-PARAMETER FILTER & SEARCH CONTROL CENTER */}
      <section className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
        
        {/* Top Control Line: Search Bar + Status Filter + View Toggle */}
        <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
          
          {/* Real-Time Exam & Keyword Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by exam title, subject, class, code, teacher email (e.g. Maths, Thulir, VI A, dharani)..."
              className="w-full pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer p-0.5"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Filters Row */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Status Segmented Control */}
            <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
              <button
                onClick={() => setStatusFilter('ALL')}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                  statusFilter === 'ALL' 
                    ? 'bg-white text-slate-900 shadow-2xs' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All ({uniqueExams.length})
              </button>
              <button
                onClick={() => setStatusFilter('ACTIVE')}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                  statusFilter === 'ACTIVE' 
                    ? 'bg-emerald-600 text-white shadow-2xs font-bold' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Active ({activeCount})</span>
              </button>
              <button
                onClick={() => setStatusFilter('CLOSED')}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                  statusFilter === 'CLOSED' 
                    ? 'bg-slate-700 text-white shadow-2xs' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Closed ({closedCount})
              </button>
            </div>

            {/* Subject Dropdown Filter */}
            <select
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 rounded-xl px-3 py-2 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="ALL">All Subjects ({availableSubjects.length})</option>
              {availableSubjects.map(sub => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 rounded-xl px-3 py-2 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="CLASS">Sort: Class & Sec</option>
              <option value="STATUS">Sort: Active First</option>
              <option value="TITLE">Sort: Exam Title</option>
              <option value="SUBMISSIONS">Sort: Submissions Count</option>
            </select>

            {/* View Mode Toggle: Table vs Cards */}
            <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
              <button
                onClick={() => setViewMode('TABLE')}
                className={`p-1.5 rounded-lg transition cursor-pointer ${
                  viewMode === 'TABLE' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Structured Table View"
              >
                <Table className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('CARDS')}
                className={`p-1.5 rounded-lg transition cursor-pointer ${
                  viewMode === 'CARDS' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Card Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Class Filter Bar: Segmented Buttons for Instant Class Switching */}
        <div className="border-t border-slate-100 pt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            <span className="text-xs font-bold text-slate-500 mr-1 shrink-0 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              Class:
            </span>
            <button
              onClick={() => { setClassFilter('ALL'); setSectionFilter('ALL'); }}
              className={`text-xs px-2.5 py-1 rounded-lg font-bold transition shrink-0 cursor-pointer ${
                classFilter === 'ALL'
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              All Classes ({classCounts['ALL'] || 0})
            </button>
            {CLASS_STANDARDS.map(cls => (
              <button
                key={cls}
                onClick={() => { setClassFilter(cls); }}
                className={`text-xs px-2.5 py-1 rounded-lg font-bold transition shrink-0 cursor-pointer ${
                  classFilter === cls
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                Class {cls} {classCounts[cls] ? `(${classCounts[cls]})` : ''}
              </button>
            ))}
          </div>

          {/* Section Filter Buttons */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-xs font-bold text-slate-500 mr-1">Sec:</span>
            <button
              onClick={() => setSectionFilter('ALL')}
              className={`text-xs px-2 py-0.5 rounded-md font-bold transition cursor-pointer ${
                sectionFilter === 'ALL'
                  ? 'bg-slate-800 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All
            </button>
            {SECTIONS.map(sec => (
              <button
                key={sec}
                onClick={() => setSectionFilter(sec)}
                className={`text-xs px-2 py-0.5 rounded-md font-bold transition cursor-pointer ${
                  sectionFilter === sec
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {sec}
              </button>
            ))}
          </div>
        </div>

        {/* Active Filter Summary Bar */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-50">
          <div>
            Showing <strong className="text-slate-900">{filteredExams.length}</strong> of{' '}
            <strong className="text-slate-900">{uniqueExams.length}</strong> examinations
            {classFilter !== 'ALL' && <span> · Standard <strong className="text-indigo-600">Class {classFilter}</strong></span>}
            {sectionFilter !== 'ALL' && <span> · Section <strong className="text-indigo-600">{sectionFilter}</strong></span>}
            {subjectFilter !== 'ALL' && <span> · Subject <strong className="text-indigo-600">{subjectFilter}</strong></span>}
            {statusFilter !== 'ALL' && <span> · Status <strong className="text-indigo-600">{statusFilter}</strong></span>}
            {searchQuery && <span> · Matching query &ldquo;<strong className="text-indigo-600">{searchQuery}</strong>&rdquo;</span>}
          </div>

          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </section>

      {/* 4. EXAMINATION DATA PRESENTATION: TABLE VIEW OR CARD GRID */}
      {filteredExams.length === 0 ? (
        /* Empty State */
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-xs">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-3">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">No examination papers match your filters</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
            Try adjusting your search query, selecting another class standard, or clearing active filters to see all 54 papers.
          </p>
          <button
            onClick={handleResetFilters}
            className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition cursor-pointer"
          >
            <span>Reset All Filters</span>
          </button>
        </div>
      ) : viewMode === 'TABLE' ? (
        /* STRUCTURED TABLE VIEW */
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-4 w-28">Class & Sec</th>
                  <th className="py-3.5 px-4">Examination Paper & Subject</th>
                  <th className="py-3.5 px-4 w-32">Format</th>
                  <th className="py-3.5 px-4 w-28 text-center">Submissions</th>
                  <th className="py-3.5 px-4 w-36">Portal Access</th>
                  <th className="py-3.5 px-4 w-36">Score Embargo</th>
                  <th className="py-3.5 px-4 w-32 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredExams.map((ex, idx) => {
                  const examSubs = submissionCounts.get(ex.id) || 0;
                  const isActive = ex.status === 'ACTIVE';
                  const isReleased = ex.scoreStatus === 'RELEASED';
                  const isProcessing = updatingExamId === ex.id;

                  return (
                    <tr 
                      key={ex.id ? `${ex.id}-${idx}` : `exam-${idx}`}
                      className={`hover:bg-slate-50/80 transition ${isActive ? 'bg-emerald-50/20' : ''}`}
                    >
                      {/* 1. Class & Section Badge */}
                      <td className="py-3.5 px-4 align-middle">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-black border ${getClassBadgeStyle(ex.classSec)}`}>
                          {ex.classSec || 'General'}
                        </span>
                      </td>

                      {/* 2. Paper Title & Subject */}
                      <td className="py-3.5 px-4 align-middle">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-1">
                              {ex.title}
                            </div>
                            <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] text-slate-500">
                              <span className="font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 px-1.5 py-0.2 rounded-sm">
                                {ex.subject}
                              </span>
                              {ex.code && (
                                <span className="font-mono text-slate-400">
                                  #{ex.code}
                                </span>
                              )}
                              {ex.allowedTeachers && ex.allowedTeachers.length > 0 && (
                                <span className="text-slate-400 truncate max-w-xs" title={`Teachers: ${ex.allowedTeachers.join(', ')}`}>
                                  · {ex.allowedTeachers[0].replace('@spicschool.com', '')}
                                  {ex.allowedTeachers.length > 1 ? ` +${ex.allowedTeachers.length - 1}` : ''}
                                </span>
                              )}
                            </div>
                          </div>

                          {ex.targetUrl && (
                            <a 
                              href={ex.targetUrl} 
                              target="_blank" 
                              rel="noreferrer"
                              className="text-slate-400 hover:text-emerald-700 transition p-1 shrink-0"
                              title="Open Associated Google Sheet"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </td>

                      {/* 3. Format: Mins & Questions */}
                      <td className="py-3.5 px-4 align-middle text-slate-600 font-mono text-[11px]">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>{ex.examMins} mins</span>
                        </div>
                        <div className="text-slate-400 text-[10px]">
                          {ex.qCount} Questions
                        </div>
                      </td>

                      {/* 4. Submissions Metric */}
                      <td className="py-3.5 px-4 align-middle text-center">
                        <span className={`inline-flex items-center gap-1 font-mono font-bold text-xs px-2 py-0.5 rounded-md ${
                          examSubs > 0 
                            ? 'bg-indigo-50 text-indigo-800 border border-indigo-100' 
                            : 'text-slate-400'
                        }`}>
                          <Users className="w-3 h-3" />
                          <span>{examSubs}</span>
                        </span>
                      </td>

                      {/* 5. Exam Status Switch */}
                      <td className="py-3.5 px-4 align-middle">
                        <button
                          id={`btn-toggle-status-${ex.id}`}
                          onClick={() => handleStatusToggle(ex.id, ex.status)}
                          disabled={isProcessing}
                          className={`w-full text-[11px] font-bold px-2.5 py-1.5 rounded-lg border transition flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 ${
                            isActive
                              ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-300 shadow-2xs'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                          }`}
                          title={isActive ? 'Click to close examination' : 'Click to open examination for students'}
                        >
                          {isActive ? (
                            <>
                              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                              <span>Active</span>
                            </>
                          ) : (
                            <>
                              <Lock className="w-3 h-3 text-slate-400" />
                              <span>Closed</span>
                            </>
                          )}
                        </button>
                      </td>

                      {/* 6. Score Embargo Switch */}
                      <td className="py-3.5 px-4 align-middle">
                        <button
                          id={`btn-toggle-score-${ex.id}`}
                          onClick={() => handleScoreToggle(ex.id, ex.scoreStatus)}
                          disabled={isProcessing}
                          className={`w-full text-[11px] font-bold px-2.5 py-1.5 rounded-lg border transition flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 ${
                            isReleased
                              ? 'bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border-indigo-200'
                              : 'bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-200'
                          }`}
                          title={isReleased ? 'Scores are visible to students' : 'Scores auto-embargoed for 12 hours'}
                        >
                          <Megaphone className="w-3 h-3" />
                          <span className="truncate">{isReleased ? 'Released' : '12h Auto'}</span>
                        </button>
                      </td>

                      {/* 7. Action Button */}
                      <td className="py-3.5 px-4 align-middle text-right">
                        <button
                          id={`btn-admin-report-${ex.id}`}
                          onClick={() => onOpenReport(ex)}
                          className="inline-flex items-center gap-1 bg-slate-900 hover:bg-slate-800 text-amber-300 text-xs font-bold px-2.5 py-1.5 rounded-lg shadow-2xs transition cursor-pointer"
                          title="Open Real-Time Analytics & Student Scoreboard"
                        >
                          <BarChart3 className="w-3.5 h-3.5 text-amber-400" />
                          <span>Analytics</span>
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
        /* CARD GRID VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredExams.map((ex, idx) => {
            const examSubs = submissionCounts.get(ex.id) || 0;
            const isActive = ex.status === 'ACTIVE';
            const isReleased = ex.scoreStatus === 'RELEASED';
            const isProcessing = updatingExamId === ex.id;

            return (
              <div 
                key={ex.id ? `${ex.id}-${idx}` : `exam-${idx}`}
                className={`bg-white rounded-2xl border p-4 shadow-2xs hover:shadow-sm transition flex flex-col justify-between ${
                  isActive ? 'border-emerald-300 ring-1 ring-emerald-300/40' : 'border-slate-200'
                }`}
              >
                <div>
                  {/* Card Header: Class badge and Status */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-black border ${getClassBadgeStyle(ex.classSec)}`}>
                      Class {ex.classSec}
                    </span>
                    <span className={`inline-flex items-center gap-1 text-[10px] uppercase font-black px-2 py-0.5 rounded-full ${
                      isActive 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {isActive ? '● Active' : 'Closed'}
                    </span>
                  </div>

                  {/* Title & Subject */}
                  <h3 className="font-bold text-sm text-slate-900 line-clamp-2 leading-snug">
                    {ex.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1.5 text-xs text-indigo-700 font-semibold">
                    <span>{ex.subject}</span>
                    {ex.code && <span className="text-slate-400 font-mono text-[10px]">#{ex.code}</span>}
                  </div>

                  {/* Metadata */}
                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {ex.examMins}m · {ex.qCount} Qs
                    </span>
                    <span className="flex items-center gap-1 font-bold text-slate-700">
                      <Users className="w-3.5 h-3.5 text-indigo-600" />
                      {examSubs} submissions
                    </span>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleStatusToggle(ex.id, ex.status)}
                      disabled={isProcessing}
                      className={`text-xs font-bold py-1.5 px-2 rounded-lg border transition flex items-center justify-center gap-1 cursor-pointer disabled:opacity-50 ${
                        isActive
                          ? 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                      }`}
                    >
                      {isActive ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                      <span>{isActive ? 'Close' : 'Activate'}</span>
                    </button>

                    <button
                      onClick={() => handleScoreToggle(ex.id, ex.scoreStatus)}
                      disabled={isProcessing}
                      className={`text-xs font-bold py-1.5 px-2 rounded-lg border transition flex items-center justify-center gap-1 cursor-pointer disabled:opacity-50 ${
                        isReleased
                          ? 'bg-indigo-50 text-indigo-800 border-indigo-200 hover:bg-indigo-100'
                          : 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
                      }`}
                    >
                      <Megaphone className="w-3 h-3" />
                      <span>{isReleased ? 'Released' : '12h Auto'}</span>
                    </button>
                  </div>

                  <button
                    onClick={() => onOpenReport(ex)}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-amber-300 text-xs font-bold py-2 rounded-lg transition flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
                  >
                    <BarChart3 className="w-3.5 h-3.5 text-amber-400" />
                    <span>Real-Time Analytics →</span>
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

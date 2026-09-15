import React, { useState, useMemo } from 'react';
import { ExamDocument, SubmissionDocument } from '../types';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { 
  BarChart3, 
  FileSpreadsheet, 
  Printer, 
  RefreshCw, 
  ArrowLeft, 
  Users, 
  Award, 
  Clock, 
  Search, 
  TrendingUp, 
  AlertCircle,
  ShieldCheck,
  AlertTriangle 
} from 'lucide-react';

interface RealTimeAnalyticsViewProps {
  exam: ExamDocument;
  submissions: SubmissionDocument[];
  onBack: () => void;
  onRefresh: () => void;
  isRefreshing: boolean;
}

const SCORE_BAND_COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

export const RealTimeAnalyticsView: React.FC<RealTimeAnalyticsViewProps> = ({
  exam,
  submissions,
  onBack,
  onRefresh,
  isRefreshing
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedViolationLogs, setSelectedViolationLogs] = useState<{
    name: string;
    admnNo: string;
    violations: string[];
    count: number;
    status: string;
  } | null>(null);

  // Filter submissions for this specific exam
  const examSubmissions = useMemo(() => {
    return submissions.filter(s => s.examId === exam.id);
  }, [submissions, exam.id]);

  // Search filtered submissions
  const filteredSubmissions = useMemo(() => {
    if (!searchTerm.trim()) return examSubmissions;
    const term = searchTerm.toLowerCase().trim();
    return examSubmissions.filter(s => 
      s.name.toLowerCase().includes(term) || 
      s.admnNo.toLowerCase().includes(term)
    );
  }, [examSubmissions, searchTerm]);

  // Aggregate Metrics
  const totalSubmissions = examSubmissions.length;
  
  const averageScoreNum = useMemo(() => {
    if (totalSubmissions === 0) return 0;
    const totalCorrect = examSubmissions.reduce((acc, curr) => acc + (curr.correct || 0), 0);
    return Math.round((totalCorrect / totalSubmissions) * 10) / 10;
  }, [examSubmissions, totalSubmissions]);

  const averageScorePercent = useMemo(() => {
    if (exam.qCount === 0 || totalSubmissions === 0) return 0;
    return Math.round((averageScoreNum / exam.qCount) * 100);
  }, [averageScoreNum, exam.qCount, totalSubmissions]);

  const highestScore = useMemo(() => {
    if (totalSubmissions === 0) return '0 / ' + exam.qCount;
    const max = Math.max(...examSubmissions.map(s => s.correct || 0));
    return `${max} / ${exam.qCount}`;
  }, [examSubmissions, totalSubmissions, exam.qCount]);

  const avgSecsConsumed = useMemo(() => {
    if (totalSubmissions === 0) return 0;
    const totalSecs = examSubmissions.reduce((acc, curr) => acc + (curr.secsConsumed || 0), 0);
    return Math.round(totalSecs / totalSubmissions);
  }, [examSubmissions, totalSubmissions]);

  const avgTimeStr = `${Math.floor(avgSecsConsumed / 60)}m ${avgSecsConsumed % 60}s`;

  // 1. Category Mastery Data (e.g. Physical Science vs Biological Science)
  const categoryMasteryData = useMemo(() => {
    const cats: Record<string, { totalQuestionsInExam: number; totalCorrectAccumulated: number }> = {};

    exam.questions.forEach(q => {
      const c = q.category || 'General';
      if (!cats[c]) cats[c] = { totalQuestionsInExam: 0, totalCorrectAccumulated: 0 };
      cats[c].totalQuestionsInExam++;
    });

    examSubmissions.forEach(sub => {
      // Parse category breakdown strings like "PHY: 4/5 | BIO: 5/5"
      const parts = (sub.categoryBreakdown || '').split('|');
      parts.forEach(part => {
        const [cName, scores] = part.split(':').map(s => s?.trim());
        if (cName && scores) {
          const [numStr] = scores.split('/');
          const cScore = parseInt(numStr) || 0;
          
          for (const key in cats) {
            if (key.toUpperCase().includes(cName.toUpperCase()) || cName.toUpperCase().includes(key.toUpperCase().slice(0, 3))) {
              cats[key].totalCorrectAccumulated += cScore;
            }
          }
        }
      });
    });

    return Object.keys(cats).map(key => {
      const maxPossible = cats[key].totalQuestionsInExam * Math.max(1, totalSubmissions);
      const accPercent = maxPossible > 0 
        ? Math.round((cats[key].totalCorrectAccumulated / maxPossible) * 100)
        : 0;
      return {
        category: key,
        accuracy: accPercent
      };
    });
  }, [exam.questions, examSubmissions, totalSubmissions]);

  // 2. Score Bands Distribution Data
  const scoreBandsData = useMemo(() => {
    const bands = [
      { name: 'Distinction (90-100%)', count: 0 },
      { name: 'First Class (75-89%)', count: 0 },
      { name: 'Second Class (50-74%)', count: 0 },
      { name: 'Needs Focus (<50%)', count: 0 }
    ];

    examSubmissions.forEach(sub => {
      const pct = (sub.correct / (exam.qCount || 1)) * 100;
      if (pct >= 90) bands[0].count++;
      else if (pct >= 75) bands[1].count++;
      else if (pct >= 50) bands[2].count++;
      else bands[3].count++;
    });

    return bands;
  }, [examSubmissions, exam.qCount]);

  // 3. Question Error Rate / Difficulty Index
  const questionDifficultyData = useMemo(() => {
    return exam.questions.map((q, idx) => {
      let correctCount = 0;
      examSubmissions.forEach(sub => {
        const ans = sub.detailedAnswers?.[q.id];
        const correctOptText = q.options.find(o => o.o === q.correctAnswer)?.t;
        if (ans === q.correctAnswer || ans === correctOptText) {
          correctCount++;
        }
      });

      const errorCount = totalSubmissions - correctCount;
      const errorPercent = totalSubmissions > 0 
        ? Math.round((errorCount / totalSubmissions) * 100) 
        : 0;

      return {
        question: `Q${idx + 1}`,
        errorRate: errorPercent,
        correctPercent: 100 - errorPercent,
        text: q.text.slice(0, 40) + '...'
      };
    });
  }, [exam.questions, examSubmissions, totalSubmissions]);

  // Export to Google Sheets / CSV Format (Option 3 Hybrid)
  const handleExportCsv = () => {
    if (examSubmissions.length === 0) {
      alert("No student submissions to export.");
      return;
    }

    const headers = [
      "Timestamp",
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

    const rows = examSubmissions.map(s => [
      new Date(s.submittedAt).toLocaleString(),
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
    link.setAttribute("download", `SPIC_${exam.classSec}_${exam.subject}_Scoreboard.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto min-h-[70vh]">
      
      {/* Top Navigation & Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-slate-200">
        <div>
          <button
            id="btn-report-back"
            onClick={onBack}
            className="text-xs font-bold text-indigo-700 hover:text-indigo-900 flex items-center gap-1.5 mb-2 cursor-pointer transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Dashboard</span>
          </button>
          
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Real-Time Analysis: Class {exam.classSec} — {exam.subject}
            </h2>
            <span className="flex items-center gap-1 bg-emerald-100 text-emerald-800 border border-emerald-300 px-2.5 py-0.5 rounded-full text-[10px] font-black font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
              LIVE DATA
            </span>
          </div>
          <p className="text-xs font-bold text-indigo-600 mt-0.5">
            Paper: {exam.title}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            id="btn-report-refresh"
            onClick={onRefresh}
            disabled={isRefreshing}
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border border-slate-300 cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Sync Latest</span>
          </button>

          <button
            id="btn-export-sheets"
            onClick={handleExportCsv}
            className="bg-emerald-700 hover:bg-emerald-800 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Export to Sheet (CSV)</span>
          </button>

          <button
            id="btn-print-report"
            onClick={() => window.print()}
            className="bg-indigo-900 hover:bg-indigo-800 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Gazette</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8">
        
        {/* Total Submissions */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 text-slate-500 text-[10px] sm:text-xs font-black uppercase tracking-wider mb-1">
            <Users className="w-3.5 h-3.5 text-indigo-600" />
            <span>Submissions</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-indigo-950 font-mono">
            {totalSubmissions}
          </div>
          <p className="text-[10px] text-slate-500 font-bold mt-1">
            Candidates locked in
          </p>
        </div>

        {/* Class Average Score */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 text-slate-500 text-[10px] sm:text-xs font-black uppercase tracking-wider mb-1">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
            <span>Average Score</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-700 font-mono">
            {averageScorePercent}%
          </div>
          <p className="text-[10px] text-slate-500 font-bold mt-1">
            {averageScoreNum} out of {exam.qCount} marks
          </p>
        </div>

        {/* Highest Score */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 text-slate-500 text-[10px] sm:text-xs font-black uppercase tracking-wider mb-1">
            <Award className="w-3.5 h-3.5 text-amber-500" />
            <span>Top Score</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-700 font-mono">
            {highestScore}
          </div>
          <p className="text-[10px] text-slate-500 font-bold mt-1">
            Highest marks obtained
          </p>
        </div>

        {/* Average Time Consumed */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 text-slate-500 text-[10px] sm:text-xs font-black uppercase tracking-wider mb-1">
            <Clock className="w-3.5 h-3.5 text-purple-600" />
            <span>Avg Time Taken</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-purple-900 font-mono">
            {avgTimeStr}
          </div>
          <p className="text-[10px] text-slate-500 font-bold mt-1">
            Allowed: {exam.examMins} Mins
          </p>
        </div>

      </div>

      {/* Real-Time Interactive Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        
        {/* Chart 1: Subject / Category Mastery Comparison */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-black text-sm text-slate-900 uppercase tracking-wider">
                Syllabus Category Mastery
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                Physical Science vs. Biological Science Accuracy %
              </p>
            </div>
            <span className="text-[10px] font-mono bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-md font-bold">
              Real-Time
            </span>
          </div>

          <div className="h-60 w-full">
            {categoryMasteryData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryMasteryData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="category" tick={{ fontSize: 10, fill: '#475569' }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#475569' }} unit="%" />
                  <Tooltip 
                    formatter={(val: any) => [`${val}% Accuracy`, 'Mastery']}
                    contentStyle={{ borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}
                  />
                  <Bar dataKey="accuracy" fill="#4f46e5" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-400 text-xs">
                Awaiting submissions...
              </div>
            )}
          </div>
        </div>

        {/* Chart 2: Question Error Rate / Difficulty Index */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-black text-sm text-slate-900 uppercase tracking-wider">
                Question Difficulty Index (% Error Rate)
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                Pinpointing questions students found most challenging
              </p>
            </div>
            <span className="text-[10px] font-mono bg-rose-50 text-rose-700 px-2 py-0.5 rounded-md font-bold">
              Item Analysis
            </span>
          </div>

          <div className="h-60 w-full">
            {questionDifficultyData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={questionDifficultyData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="question" tick={{ fontSize: 11, fill: '#475569' }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#475569' }} unit="%" />
                  <Tooltip 
                    formatter={(val: any) => [`${val}% Missed`, 'Error Rate']}
                    contentStyle={{ borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}
                  />
                  <Bar dataKey="errorRate" fill="#e11d48" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-400 text-xs">
                Awaiting submissions...
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Live Official Submissions Gazette / Scoreboard Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        
        <div className="p-4 sm:p-6 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h3 className="text-base font-black text-slate-900 uppercase tracking-wide">
              Official Candidate Scoreboard
            </h3>
            <p className="text-xs text-slate-500 font-bold">
              Synced with School Firestore Cluster
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search candidate name..."
              className="w-full pl-9 pr-3 py-1.5 text-xs font-bold border border-slate-300 rounded-xl bg-slate-50 focus:bg-white outline-none focus:border-indigo-600 transition"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-slate-600 border-collapse min-w-[700px]">
            <thead className="text-[10px] text-slate-800 uppercase bg-slate-100 font-black border-b border-slate-200 tracking-wider">
              <tr>
                <th className="px-4 py-3">Timestamp</th>
                <th className="px-4 py-3">Admn No</th>
                <th className="px-4 py-3">Student Name</th>
                <th className="px-4 py-3 text-indigo-700">Official Score</th>
                <th className="px-4 py-3 text-amber-700">Subject Breakdown</th>
                <th className="px-4 py-3">Time Used</th>
                <th className="px-4 py-3 text-center">Proctor Audit</th>
                <th className="px-4 py-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSubmissions.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-6 text-center text-slate-400 font-bold text-xs">
                    No submissions recorded yet for this examination.
                  </td>
                </tr>
              ) : (
                filteredSubmissions.map((sub, idx) => {
                  const subTime = new Date(sub.submittedAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  });
                  const strikes = sub.tabSwitchCount ?? 0;
                  const isFlagged = sub.proctorStatus === 'FLAGGED_VIOLATION' || strikes >= 3;

                  return (
                    <tr key={sub.id ? `${sub.id}-${idx}` : `sub-${idx}`} className="hover:bg-slate-50/80 transition">
                      <td className="px-4 py-3 font-mono text-[11px] text-slate-500">
                        {subTime}
                      </td>
                      <td className="px-4 py-3 font-mono font-bold text-slate-900">
                        {sub.admnNo}
                      </td>
                      <td className="px-4 py-3 font-bold text-slate-900">
                        {sub.name}
                      </td>
                      <td className="px-4 py-3 font-black text-indigo-600 text-sm font-mono">
                        {sub.score}
                      </td>
                      <td className="px-4 py-3">
                        <span className="bg-amber-100 text-amber-900 border border-amber-300/80 px-2.5 py-0.5 rounded-md text-[10px] font-black tracking-wide font-mono inline-block">
                          {sub.categoryBreakdown || '-'}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-mono text-[11px] text-slate-600">
                        {sub.timeUsed}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {strikes === 0 ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                            <ShieldCheck className="w-3 h-3 text-emerald-600" />
                            <span>Clean (0)</span>
                          </span>
                        ) : isFlagged ? (
                          <button
                            onClick={() => setSelectedViolationLogs({
                              name: sub.name,
                              admnNo: sub.admnNo,
                              violations: sub.proctorViolations || [],
                              count: strikes,
                              status: 'FLAGGED_VIOLATION'
                            })}
                            className="inline-flex items-center gap-1 text-[10px] font-black text-rose-800 bg-rose-50 border border-rose-300 px-2 py-0.5 rounded-full hover:bg-rose-100 animate-pulse cursor-pointer"
                            title="Click to view violation logs"
                          >
                            <AlertCircle className="w-3 h-3 text-rose-600" />
                            <span>FLAGGED ({strikes})</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => setSelectedViolationLogs({
                              name: sub.name,
                              admnNo: sub.admnNo,
                              violations: sub.proctorViolations || [],
                              count: strikes,
                              status: 'WARNED'
                            })}
                            className="inline-flex items-center gap-1 text-[10px] font-black text-amber-800 bg-amber-50 border border-amber-300 px-2 py-0.5 rounded-full hover:bg-amber-100 cursor-pointer"
                            title="Click to view violation logs"
                          >
                            <AlertTriangle className="w-3 h-3 text-amber-600" />
                            <span>{strikes} Strikes</span>
                          </button>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                          Verified ✓
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* Modal for viewing student's proctoring violation logs */}
      {selectedViolationLogs && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 text-left border border-slate-300">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-black text-slate-900 text-sm uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Proctoring Audit Log</span>
              </h3>
              <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase ${
                selectedViolationLogs.status === 'FLAGGED_VIOLATION'
                  ? 'bg-rose-100 text-rose-800'
                  : 'bg-amber-100 text-amber-800'
              }`}>
                {selectedViolationLogs.count} Strikes
              </span>
            </div>

            <p className="text-xs font-bold text-slate-600 mb-4">
              Candidate: <span className="text-slate-900 font-black">{selectedViolationLogs.name}</span> ({selectedViolationLogs.admnNo})
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 max-h-60 overflow-y-auto mb-4 space-y-2 text-xs font-mono">
              {selectedViolationLogs.violations.length === 0 ? (
                <p className="text-slate-400 font-sans italic text-[11px]">
                  Tab switch or window blur events were logged during the session.
                </p>
              ) : (
                selectedViolationLogs.violations.map((v, i) => (
                  <div key={i} className="flex items-start gap-2 text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
                    <span className="text-rose-500 font-bold">⚠️</span>
                    <span className="leading-tight">{v}</span>
                  </div>
                ))
              )}
            </div>

            <button
              onClick={() => setSelectedViolationLogs(null)}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black rounded-xl text-xs uppercase tracking-wider border border-slate-300 cursor-pointer"
            >
              Close Audit
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

import React, { useState, useMemo } from 'react';
import { StudentUser, ExamDocument, SubmissionDocument, ActiveStudentExamCard } from '../types';
import { 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  Lock, 
  Play, 
  RefreshCw, 
  AlertCircle,
  Award,
  HelpCircle,
  FileText,
  ShieldCheck,
  Check,
  X as XIcon,
  MinusCircle
} from 'lucide-react';

interface StudentDashboardProps {
  user: StudentUser;
  exams: ExamDocument[];
  submissions: SubmissionDocument[];
  onStartExam: (exam: ExamDocument) => void;
  onRefresh: () => void;
  isRefreshing: boolean;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  user,
  exams,
  submissions,
  onStartExam,
  onRefresh,
  isRefreshing
}) => {
  const [activeTab, setActiveTab] = useState<'ALL' | 'ACTIVE' | 'COMPLETED'>('ALL');

  // Filter exams that match this student's class and ensure unique items
  const classExams = useMemo(() => {
    const seen = new Set<string>();
    return exams.filter((e, idx) => {
      const key = e.id || e.code || `exam-${idx}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return e.classSec.trim().toLowerCase() === user.classSec.trim().toLowerCase();
    });
  }, [exams, user.classSec]);

  // Build card states with score and embargo computation
  const cards: ActiveStudentExamCard[] = useMemo(() => {
    return classExams.map(ex => {
      // Check if this student already submitted
      const sub = submissions.find(
        s => s.examId === ex.id && s.admnNo.trim().toLowerCase() === user.admnNo.trim().toLowerCase()
      );

      if (sub) {
        // Completed state
        let embargoed = false;
        let unlockTime = '';
        let displayScore = sub.score;

        if (ex.scoreStatus === 'RELEASED') {
          embargoed = false;
          displayScore = sub.score;
        } else {
          // Auto 12 hours embargo check
          const subDate = new Date(sub.submittedAt);
          if (!isNaN(subDate.getTime())) {
            const hoursElapsed = (Date.now() - subDate.getTime()) / (1000 * 60 * 60);
            if (hoursElapsed < 12) {
              embargoed = true;
              const unlockDate = new Date(subDate.getTime() + 12 * 60 * 60 * 1000);
              unlockTime = `${unlockDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} (${unlockDate.toLocaleDateString()})`;
            }
          }
        }

        return {
          id: ex.id,
          subject: ex.subject,
          title: ex.title,
          url: ex.targetUrl,
          state: 'COMPLETED',
          score: displayScore,
          embargoed,
          unlockTime,
          qCount: ex.qCount,
          examMins: ex.examMins,
          status: ex.status,
          submission: sub
        };
      }

      // Active or Closed state (pending attempt)
      return {
        id: ex.id,
        subject: ex.subject,
        title: ex.title,
        url: ex.targetUrl,
        state: 'ACTIVE',
        score: '',
        embargoed: false,
        unlockTime: '',
        qCount: ex.qCount,
        examMins: ex.examMins,
        status: ex.status
      };
    });
  }, [classExams, submissions, user.admnNo]);

  // Split cards by state
  const availablePapers = useMemo(() => cards.filter(c => c.state === 'ACTIVE'), [cards]);
  const completedPapers = useMemo(() => cards.filter(c => c.state === 'COMPLETED'), [cards]);

  // Filtered list based on active tab
  const displayedCards = useMemo(() => {
    if (activeTab === 'ACTIVE') return availablePapers;
    if (activeTab === 'COMPLETED') return completedPapers;
    return cards;
  }, [activeTab, availablePapers, completedPapers, cards]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto min-h-[70vh] flex flex-col gap-6">
      
      {/* 1. Candidate Identity & Hall Ticket Header */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
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
              Online Examination Portal · Candidate Desk
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-0.5">
              {user.name}
            </h1>
            <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-slate-300">
              <span className="font-mono bg-slate-800 text-slate-200 border border-slate-700 px-2 py-0.5 rounded">
                Admn: {user.admnNo}
              </span>
              <span className="text-slate-500">·</span>
              <span className="font-mono bg-slate-800 text-slate-200 border border-slate-700 px-2 py-0.5 rounded">
                Roll: {user.examNo}
              </span>
              <span className="text-slate-500">·</span>
              <span className="font-mono font-bold text-amber-300 bg-indigo-950 border border-indigo-700 px-2 py-0.5 rounded">
                Class {user.classSec}
              </span>
            </div>
          </div>
        </div>

        {/* Live Sync and Session Control */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-slate-800 pt-3 md:pt-0">
          <div className="text-left md:text-right">
            <div className="text-[11px] text-slate-400">Class Registry</div>
            <div className="text-sm font-semibold text-white font-mono">
              Class {user.classSec}
            </div>
          </div>
          <button
            id="btn-sync-student"
            onClick={onRefresh}
            disabled={isRefreshing}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg shadow-sm transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50 whitespace-nowrap shrink-0"
            title="Check for schedule updates"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Sync</span>
          </button>
        </div>
      </div>

      {/* 2. Candidate Examination Notice Strip */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            <strong>Proctored Environment Active:</strong> Automatic response saving is enabled. Switching application tabs or minimizing this window will log security infractions.
          </span>
        </div>
        <div className="text-slate-500 text-[11px] font-medium whitespace-nowrap">
          Single Attempt Enforced
        </div>
      </div>

      {/* 3. Section Tabs & Paper Counts */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3 gap-2">
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg border border-slate-200">
          <button
            onClick={() => setActiveTab('ALL')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'ALL'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Papers ({cards.length})
          </button>
          <button
            onClick={() => setActiveTab('ACTIVE')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'ACTIVE'
                ? 'bg-white text-indigo-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Ready to Take ({availablePapers.length})
          </button>
          <button
            onClick={() => setActiveTab('COMPLETED')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'COMPLETED'
                ? 'bg-white text-emerald-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Completed ({completedPapers.length})
          </button>
        </div>

        <div className="text-xs text-slate-500 hidden sm:block">
          Class {user.classSec} Curriculum
        </div>
      </div>

      {/* 4. Examination Cards Display */}
      {cards.length === 0 ? (
        <div className="bg-white p-12 rounded-xl border border-slate-200 text-center shadow-xs">
          <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-slate-900 mb-1">
            No examination papers scheduled
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            There are currently no active or upcoming examination papers configured for Class {user.classSec}. Please check back with your subject teacher or invigilator.
          </p>
        </div>
      ) : displayedCards.length === 0 ? (
        <div className="bg-white p-10 rounded-xl border border-slate-200 text-center shadow-xs">
          <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
          <h3 className="text-sm font-semibold text-slate-900 mb-1">
            {activeTab === 'ACTIVE' ? 'All scheduled papers completed!' : 'No completed papers yet'}
          </h3>
          <p className="text-xs text-slate-500">
            {activeTab === 'ACTIVE' 
              ? 'You have submitted all available examination papers for Class ' + user.classSec + '.'
              : 'Select "Ready to Take" to begin your scheduled exams.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {displayedCards.map((card, idx) => {
            const rawExam = exams.find(e => e.id === card.id);

            // COMPLETED STATE
            if (card.state === 'COMPLETED') {
              return (
                <div
                  key={card.id ? `${card.id}-${idx}` : `card-${idx}`}
                  className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between gap-4"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Submitted</span>
                      </span>
                      <span className="text-xs font-mono text-slate-500 tabular-nums">
                        {card.qCount} Qs · {card.examMins} mins
                      </span>
                    </div>

                    <h3 className="font-bold text-base text-slate-900">
                      {card.subject}
                    </h3>
                    <p className="text-xs font-medium text-slate-600 mt-0.5">
                      {card.title}
                    </p>
                  </div>

                  {/* Scoreboard / Embargo Box */}
                  {card.embargoed ? (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3.5 text-center">
                      <div className="flex items-center justify-center gap-1.5 text-amber-900 text-xs font-semibold mb-1">
                        <Lock className="w-3.5 h-3.5 text-amber-700" />
                        <span>Score Verification in Progress</span>
                      </div>
                      <p className="text-[11px] text-slate-600">
                        Official score unlocks 12 hours post-submission:
                      </p>
                      <p className="text-xs font-mono font-bold text-slate-900 mt-1">
                        {card.unlockTime}
                      </p>
                    </div>
                  ) : (
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                          Official Score
                        </span>
                        <span className="text-xl font-bold font-mono tabular-nums text-indigo-700">
                          {card.score}
                        </span>
                      </div>

                      {card.submission && (
                        <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-slate-200 text-center text-xs">
                          <div className="bg-white py-1 px-2 rounded border border-slate-200">
                            <span className="text-[10px] text-slate-400 block">Correct</span>
                            <span className="font-mono font-semibold text-emerald-700">
                              {card.submission.correct}
                            </span>
                          </div>
                          <div className="bg-white py-1 px-2 rounded border border-slate-200">
                            <span className="text-[10px] text-slate-400 block">Wrong</span>
                            <span className="font-mono font-semibold text-rose-700">
                              {card.submission.wrong}
                            </span>
                          </div>
                          <div className="bg-white py-1 px-2 rounded border border-slate-200">
                            <span className="text-[10px] text-slate-400 block">Time</span>
                            <span className="font-mono font-semibold text-slate-700 text-[11px]">
                              {card.submission.timeUsed}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            }

            // ACTIVE / READY TO TAKE STATE
            const isClosed = card.status === 'CLOSED';

            return (
              <div
                key={card.id ? `${card.id}-${idx}` : `card-${idx}`}
                className="bg-white p-5 rounded-xl border border-slate-200 hover:border-slate-300 shadow-xs transition flex flex-col justify-between gap-4"
              >
                <div>
                  {/* Status header */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-semibold ${
                      isClosed 
                        ? 'bg-slate-100 text-slate-600 border border-slate-200' 
                        : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${isClosed ? 'bg-slate-400' : 'bg-emerald-600'}`} />
                      {isClosed ? 'Closed' : 'Active Now'}
                    </span>
                    <span className="text-xs font-mono text-slate-500 tabular-nums flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      {card.examMins} mins · {card.qCount} questions
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900">
                    {card.subject}
                  </h3>
                  <p className="text-xs font-medium text-indigo-700 mt-0.5">
                    {card.title}
                  </p>
                  
                  <div className="mt-3 text-xs text-slate-500">
                    Ensure a stable internet connection before beginning. Your timer will start immediately upon clicking below.
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  {isClosed ? (
                    <div className="bg-slate-100 text-slate-500 p-2.5 rounded-lg text-center text-xs font-medium border border-slate-200">
                      This paper has been closed by the examination administrator.
                    </div>
                  ) : (
                    <button
                      id={`btn-begin-exam-${card.id}`}
                      onClick={() => rawExam && onStartExam(rawExam)}
                      className="w-full px-4 py-2.5 text-xs font-semibold text-white bg-indigo-700 hover:bg-indigo-600 rounded-lg shadow-sm transition flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Begin Paper →</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};

import React from 'react';
import { StudentUser, ExamDocument, SubmissionDocument, ActiveStudentExamCard } from '../types';
import { BookOpen, Clock, CheckCircle2, Lock, Play, RefreshCw, AlertCircle } from 'lucide-react';

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
  // Filter exams that match this student's class and ensure unique items
  const classExams = React.useMemo(() => {
    const seen = new Set<string>();
    return exams.filter((e, idx) => {
      const key = e.id || e.code || `exam-${idx}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return e.classSec.trim().toLowerCase() === user.classSec.trim().toLowerCase();
    });
  }, [exams, user.classSec]);

  // Build card states
  const cards: ActiveStudentExamCard[] = React.useMemo(() => {
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
          // Auto 12 hours check
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
          status: ex.status
        };
      }

      // Active or Closed state
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

  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto min-h-[60vh]">
      
      {/* Student Profile Card */}
      <div className="bg-indigo-50 border border-indigo-200 p-5 rounded-3xl mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white p-1 border-2 border-amber-400 shadow-sm flex items-center justify-center shrink-0">
            <img 
              src="/school-logo.png" 
              alt="SPIC Nagar School Crest" 
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <span className="text-[10px] sm:text-xs font-black text-indigo-400 uppercase tracking-widest block mb-0.5">
              Logged in Candidate
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-indigo-950 leading-tight">
              {user.name}
            </h2>
            <div className="flex items-center gap-2 mt-1 text-xs text-indigo-700 font-mono font-bold">
              <span>Admn No: {user.admnNo}</span>
              <span>•</span>
              <span>Exam No: {user.examNo}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start sm:items-end w-full sm:w-auto gap-2">
          <div className="text-left sm:text-right">
            <span className="text-[10px] sm:text-xs font-black text-indigo-400 uppercase tracking-widest block mb-0.5">
              Target Class & Section
            </span>
            <div className="text-lg sm:text-xl font-black text-indigo-950 bg-white px-3 py-1 rounded-xl border border-indigo-200 inline-block shadow-2xs font-mono">
              Class {user.classSec}
            </div>
          </div>
          
          <button
            id="btn-sync-student"
            onClick={onRefresh}
            disabled={isRefreshing}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-1.5 rounded-xl text-[11px] font-black shadow-sm transition flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>LIVE SYNC</span>
          </button>
        </div>
      </div>

      {/* Examination Schedule */}
      <div className="flex justify-between items-center mb-4 border-b border-slate-200 pb-2">
        <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-600" />
          <span>Scheduled Examination Papers</span>
        </h3>
        <span className="text-xs text-slate-500 font-bold">
          {cards.length} Paper(s) Configured
        </span>
      </div>

      {cards.length === 0 ? (
        <div className="p-8 bg-slate-50 border border-slate-200 rounded-3xl text-center text-slate-500 font-bold text-xs sm:text-sm shadow-inner">
          No examination papers are currently scheduled for Class {user.classSec}. Please check back with your subject teacher.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {cards.map((card, idx) => {
            const rawExam = exams.find(e => e.id === card.id);

            if (card.state === 'COMPLETED') {
              return (
                <div
                  key={card.id ? `${card.id}-${idx}` : `card-${idx}`}
                  className="bg-slate-50/90 border border-slate-300 p-5 sm:p-6 rounded-3xl shadow-xs relative overflow-hidden"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-300 px-3 py-1 rounded-full font-black uppercase tracking-wider flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Submitted ✓
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 font-bold">
                      {card.qCount} Qs • {card.examMins} Mins
                    </span>
                  </div>

                  <h3 className="font-black text-lg text-slate-900 mb-0.5">
                    {card.subject}
                  </h3>
                  <p className="text-xs font-bold text-indigo-700 mb-4">
                    {card.title}
                  </p>

                  {card.embargoed ? (
                    <div className="bg-amber-50 border border-amber-200/90 p-3.5 rounded-2xl text-center shadow-inner">
                      <div className="flex items-center justify-center gap-1.5 text-amber-900 text-xs font-black uppercase tracking-wider mb-1">
                        <Lock className="w-3.5 h-3.5 text-amber-600" />
                        <span>Score Under Security Verification</span>
                      </div>
                      <p className="text-[11px] font-semibold text-slate-600">
                        Official score unlocks after 12 Hours:
                      </p>
                      <p className="text-xs font-mono font-black text-indigo-950 mt-0.5">
                        {card.unlockTime}
                      </p>
                    </div>
                  ) : (
                    <div className="bg-white border border-slate-200 p-4 rounded-2xl text-center shadow-sm">
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block mb-1">
                        Official Score Achieved
                      </span>
                      <span className="text-2xl font-black text-indigo-700 font-mono">
                        {card.score}
                      </span>
                    </div>
                  )}
                </div>
              );
            }

            // Not yet completed
            const isClosed = card.status === 'CLOSED';

            return (
              <div
                key={card.id ? `${card.id}-${idx}` : `card-${idx}`}
                className="bg-white border-2 border-slate-200 hover:border-indigo-500 p-5 sm:p-6 rounded-3xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-wider flex items-center gap-1 ${
                      isClosed 
                        ? 'bg-slate-200 text-slate-700' 
                        : 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                    }`}>
                      {isClosed ? 'Closed 🔒' : 'Active Now 🟢'}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 font-bold flex items-center gap-1">
                      <Clock className="w-3 h-3 text-indigo-600" />
                      {card.examMins} Mins • {card.qCount} Questions
                    </span>
                  </div>

                  <h3 className="font-black text-lg sm:text-xl text-slate-900 mb-0.5">
                    {card.subject}
                  </h3>
                  <p className="text-xs font-bold text-indigo-600 mb-4">
                    {card.title}
                  </p>
                </div>

                {isClosed ? (
                  <div className="bg-slate-100 text-slate-500 p-3 rounded-2xl text-center text-xs font-bold border border-slate-200">
                    This examination paper has been closed by the school administrator.
                  </div>
                ) : (
                  <button
                    id={`btn-begin-exam-${card.id}`}
                    onClick={() => rawExam && onStartExam(rawExam)}
                    className="w-full bg-indigo-700 hover:bg-indigo-800 text-white font-black py-3 rounded-2xl shadow-md transform active:scale-98 transition flex items-center justify-center gap-2 text-xs sm:text-sm uppercase tracking-wider cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>Begin Paper →</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};

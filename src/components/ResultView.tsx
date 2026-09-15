import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, Lock, ArrowLeft, Calendar, Clock, ShieldCheck, AlertTriangle } from 'lucide-react';
import { StudentUser, ExamDocument, SubmissionDocument } from '../types';

interface ResultViewProps {
  student: StudentUser;
  exam: ExamDocument;
  submission: SubmissionDocument | null;
  onReturn: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({
  student,
  exam,
  submission,
  onReturn
}) => {
  useEffect(() => {
    // Fire festive school success confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  }, []);

  const isEmbargoed = exam.scoreStatus !== 'RELEASED';

  return (
    <div className="p-6 sm:p-12 max-w-xl mx-auto min-h-[70vh] flex flex-col items-center justify-center text-center">
      
      {/* Success Badge */}
      <div className="w-20 h-20 rounded-3xl bg-emerald-100 border-2 border-emerald-300 flex items-center justify-center text-emerald-600 mb-6 shadow-md animate-bounce">
        <CheckCircle2 className="w-10 h-10" />
      </div>

      <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight mb-2">
        Examination Permanently Locked
      </h2>
      <p className="text-xs sm:text-sm font-semibold text-slate-500 mb-6 max-w-md">
        Your candidate responses have been welded into the school's official records.
      </p>

      {/* Candidate Card Summary */}
      <div className="w-full bg-slate-50 border border-slate-300 rounded-3xl p-5 sm:p-6 text-left mb-6 shadow-inner space-y-3">
        <div className="flex justify-between items-center border-b border-slate-200 pb-2.5">
          <span className="text-[11px] font-bold text-slate-500 uppercase">Candidate</span>
          <span className="text-xs sm:text-sm font-black text-slate-900">{student.name}</span>
        </div>

        <div className="flex justify-between items-center border-b border-slate-200 pb-2.5">
          <span className="text-[11px] font-bold text-slate-500 uppercase">Admission / Roll No</span>
          <span className="text-xs font-mono font-bold text-indigo-700">{student.admnNo}</span>
        </div>

        <div className="flex justify-between items-center border-b border-slate-200 pb-2.5">
          <span className="text-[11px] font-bold text-slate-500 uppercase">Class & Section</span>
          <span className="text-xs font-mono font-bold text-slate-800">Class {student.classSec}</span>
        </div>

        <div className="flex justify-between items-center border-b border-slate-200 pb-2.5">
          <span className="text-[11px] font-bold text-slate-500 uppercase">Examination Paper</span>
          <span className="text-xs font-bold text-slate-900">{exam.subject} — {exam.title}</span>
        </div>

        {submission && (
          <>
            <div className="flex justify-between items-center border-b border-slate-200 pb-2.5">
              <span className="text-[11px] font-bold text-slate-500 uppercase">Time Consumed</span>
              <span className="text-xs font-mono font-bold text-purple-700">{submission.timeUsed}</span>
            </div>

            <div className="flex justify-between items-center border-b border-slate-200 pb-2.5">
              <span className="text-[11px] font-bold text-slate-500 uppercase">Proctor Integrity</span>
              {(submission.tabSwitchCount ?? 0) === 0 ? (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>Verified Clean (0 Strikes)</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-300 px-2 py-0.5 rounded-full">
                  <AlertTriangle className="w-3 h-3 text-amber-600" />
                  <span>{submission.tabSwitchCount} Screen Changes Logged</span>
                </span>
              )}
            </div>

            {/* Score Disclosure or Embargo Message */}
            <div className="pt-2 text-center">
              {isEmbargoed ? (
                <div className="bg-amber-50 border border-amber-200 p-3 rounded-2xl">
                  <div className="flex items-center justify-center gap-1.5 text-amber-900 text-xs font-black uppercase mb-1">
                    <Lock className="w-3.5 h-3.5 text-amber-600" />
                    <span>Official Score Embargo Active</span>
                  </div>
                  <p className="text-[11px] text-slate-600 font-medium">
                    As per SPIC School rules, official marks are released after 12 hours of verification or upon teacher release.
                  </p>
                </div>
              ) : (
                <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-2xl">
                  <span className="text-[10px] font-black uppercase text-emerald-800 block mb-1">
                    Verified Final Score
                  </span>
                  <span className="text-2xl font-black text-emerald-700 font-mono">
                    {submission.score}
                  </span>
                  <p className="text-[10px] font-mono text-slate-500 mt-1">
                    Category Breakdown: {submission.categoryBreakdown}
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Return Button */}
      <button
        id="btn-return-dashboard"
        onClick={onReturn}
        className="w-full bg-indigo-900 hover:bg-indigo-800 text-white font-black py-3.5 rounded-2xl text-xs sm:text-sm uppercase tracking-wider shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Student Portal</span>
      </button>

    </div>
  );
};

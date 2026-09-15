import React from 'react';
import { X, Clock, Timer, Edit3, ShieldAlert, Palette, CheckCircle } from 'lucide-react';

interface InstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstructionsModal: React.FC<InstructionsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs transition-opacity duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full overflow-hidden border-2 border-amber-400 text-left flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-indigo-950 text-white p-5 sm:p-6 flex justify-between items-center border-b-4 border-amber-400">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🎒</span>
            <div>
              <h3 className="text-lg sm:text-xl font-black uppercase tracking-wider text-amber-300 leading-none">
                Candidate Instructions & Exam Rules
              </h3>
              <p className="text-xs text-indigo-200 font-bold mt-1">
                SPIC Nagar Higher Secondary School Assessment System
              </p>
            </div>
          </div>
          <button
            id="btn-close-rules-modal"
            onClick={onClose}
            className="bg-indigo-800 hover:bg-rose-600 text-white font-black w-8 h-8 rounded-full flex items-center justify-center text-sm transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto bg-slate-50 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Rule 1 */}
            <div className="bg-white p-4 rounded-2xl border-l-4 border-indigo-600 shadow-sm">
              <div className="flex items-center gap-2 mb-1.5">
                <Clock className="w-4 h-4 text-indigo-600" />
                <strong className="text-indigo-950 text-sm">1. Master Clock ⏳</strong>
              </div>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                You have a fixed total duration for the entire paper. The main countdown is shown at the top left of your screen. Keep an eye on it!
              </p>
            </div>

            {/* Rule 2 */}
            <div className="bg-white p-4 rounded-2xl border-l-4 border-amber-500 shadow-sm">
              <div className="flex items-center gap-2 mb-1.5">
                <Timer className="w-4 h-4 text-amber-600" />
                <strong className="text-amber-950 text-sm">2. Question Timer ⏱️</strong>
              </div>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Each question is dynamically timed. If the countdown reaches zero, the current question <b>automatically locks</b>, your choice is safely recorded, and you are advanced forward.
              </p>
            </div>

            {/* Rule 3 */}
            <div className="bg-white p-4 rounded-2xl border-l-4 border-emerald-600 shadow-sm">
              <div className="flex items-center gap-2 mb-1.5">
                <Edit3 className="w-4 h-4 text-emerald-600" />
                <strong className="text-emerald-950 text-sm">3. Answer Modification Cap ✏️</strong>
              </div>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Made a mistake? You can change your selected option, but you are strictly permitted <b>only 2 modifications</b> per question. After 2 edits, the answer choice remains locked.
              </p>
            </div>

            {/* Rule 4 */}
            <div className="bg-white p-4 rounded-2xl border-l-4 border-purple-600 shadow-sm">
              <div className="flex items-center gap-2 mb-1.5">
                <ShieldAlert className="w-4 h-4 text-purple-600" />
                <strong className="text-purple-950 text-sm">4. 5-Minute Grace Period 🛡️</strong>
              </div>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                When the master countdown expires, a bonus <b>5-minute global grace period</b> automatically activates to allow candidates to finalize any remaining unvisited questions.
              </p>
            </div>

            {/* Rule 5 */}
            <div className="bg-white p-4 rounded-2xl border-l-4 border-slate-600 shadow-sm md:col-span-2">
              <div className="flex items-center gap-2 mb-2">
                <Palette className="w-4 h-4 text-slate-700" />
                <strong className="text-slate-900 text-sm">5. Question Palette Color Indicators 🎨</strong>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px] font-bold text-slate-700">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-md bg-emerald-500 shadow-xs flex-shrink-0"></span>
                  <span>Answered (Safe)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-md bg-amber-500 shadow-xs flex-shrink-0"></span>
                  <span>Answer Changed</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-md bg-emerald-800 shadow-xs flex-shrink-0"></span>
                  <span>Time Up (Saved 🔒)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-md bg-rose-500 shadow-xs flex-shrink-0"></span>
                  <span>Time Up (Missed 🔒)</span>
                </div>
              </div>
              <p className="text-[11px] text-indigo-700 font-bold mt-3">
                💡 Tip: Click any number on the palette to jump directly to that question at any time.
              </p>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-slate-200 text-center flex justify-end">
          <button
            id="btn-confirm-rules-read"
            onClick={onClose}
            className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-black px-8 py-3 rounded-xl shadow-lg uppercase tracking-wider text-xs sm:text-sm transition cursor-pointer flex items-center gap-2"
          >
            <CheckCircle className="w-4 h-4" />
            <span>I Understand the Rules</span>
          </button>
        </div>

      </div>
    </div>
  );
};

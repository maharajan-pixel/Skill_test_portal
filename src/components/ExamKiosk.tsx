import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  StudentUser, 
  ExamDocument, 
  KioskQuestionState, 
  QuestionOption,
  ExamSessionBackup 
} from '../types';
import { extractMediaParts } from '../utils/mediaParser';
import { 
  Clock, 
  Timer, 
  Lock, 
  AlertTriangle, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle, 
  HelpCircle,
  ShieldAlert,
  ShieldCheck,
  Maximize2,
  Minimize2,
  Bookmark,
  RotateCcw,
  Check,
  Eye,
  AlertCircle
} from 'lucide-react';

interface ExamKioskProps {
  student: StudentUser;
  exam: ExamDocument;
  onSubmit: (
    userAnswers: Record<string, number | "SKIPPED">,
    secsConsumed: number,
    proctorMeta?: {
      tabSwitchCount: number;
      proctorViolations: string[];
      proctorStatus: 'CLEAN' | 'WARNED' | 'FLAGGED_VIOLATION';
    }
  ) => Promise<void>;
  onOpenHelp: () => void;
}

const BACKUP_STORAGE_KEY = 'spic_exam_backup_v2';
const MAX_ALLOWED_STRIKES = 3;

export const ExamKiosk: React.FC<ExamKioskProps> = ({
  student,
  exam,
  onSubmit,
  onOpenHelp
}) => {
  // Master Clock States
  const [masterTotalSecs, setMasterTotalSecs] = useState<number>(exam.examMins * 60);
  const [masterGraceSecs, setMasterGraceSecs] = useState<number>(300);
  const [isMasterGrace, setIsMasterGrace] = useState<boolean>(false);
  const [examStartTime, setExamStartTime] = useState<number>(Date.now());

  // Questions and Active Index
  const [qList, setQList] = useState<KioskQuestionState[]>([]);
  const [activeQIndex, setActiveQIndex] = useState<number>(0);

  // Submitting state and modal
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);

  // Toast notifications
  const [toast, setToast] = useState<{ title: string; message: string; type: 'success' | 'error' | 'warning' } | null>(null);

  // Proctoring & Security States
  const [tabSwitchCount, setTabSwitchCount] = useState<number>(0);
  const [proctorViolations, setProctorViolations] = useState<string[]>([]);
  const [showViolationModal, setShowViolationModal] = useState<boolean>(false);
  const [violationStrikeMessage, setViolationStrikeMessage] = useState<string>('');
  const [isAutoSubmittingViolation, setIsAutoSubmittingViolation] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Refs for timers & state synchronization
  const masterTimerRef = useRef<any>(null);
  const questionTimerRef = useRef<any>(null);
  const autoAdvanceRef = useRef<any>(null);
  const blurTimeoutRef = useRef<any>(null);
  const submittingRef = useRef<boolean>(false);
  const tabSwitchCountRef = useRef<number>(0);
  const proctorViolationsRef = useRef<string[]>([]);

  // Keep refs in sync with state for access in event listeners
  useEffect(() => {
    submittingRef.current = isSubmitting;
  }, [isSubmitting]);

  useEffect(() => {
    tabSwitchCountRef.current = tabSwitchCount;
  }, [tabSwitchCount]);

  useEffect(() => {
    proctorViolationsRef.current = proctorViolations;
  }, [proctorViolations]);

  const showKioskToast = (title: string, message: string, type: 'success' | 'error' | 'warning' = 'warning') => {
    setToast({ title, message, type });
    setTimeout(() => {
      setToast(null);
    }, 3800);
  };

  // Safe Fullscreen API wrapper
  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        if (document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        }
      }
    } catch (err) {
      console.warn("Fullscreen request restricted by browser/container iframe:", err);
      showKioskToast("Browser View", "Running in secure window mode.", "warning");
    }
  };

  // Record a proctoring violation strike
  const recordViolation = (reason: string) => {
    if (submittingRef.current) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const logEntry = `${timeStr}: ${reason}`;

    const newCount = tabSwitchCountRef.current + 1;
    const newLogs = [...proctorViolationsRef.current, logEntry];

    tabSwitchCountRef.current = newCount;
    proctorViolationsRef.current = newLogs;

    setTabSwitchCount(newCount);
    setProctorViolations(newLogs);

    if (newCount >= MAX_ALLOWED_STRIKES) {
      setIsAutoSubmittingViolation(true);
      setShowViolationModal(true);
      setViolationStrikeMessage(
        `CRITICAL SECURITY VIOLATION: You have accumulated ${newCount} security strikes (${reason}). Under official online examination standards, your test paper is being immediately locked and auto-submitted with a PROCTOR VIOLATION FLAG.`
      );

      // Auto-submit after 3.5 seconds
      setTimeout(() => {
        handleFinalSubmitExecution(newCount, newLogs, 'FLAGGED_VIOLATION');
      }, 3500);
    } else {
      setShowViolationModal(true);
      setViolationStrikeMessage(
        `SECURITY WARNING (Strike ${newCount} of ${MAX_ALLOWED_STRIKES}): Screen change / tab navigation detected (${reason}). Navigating away from the examination window or switching apps is strictly prohibited and logged. Reaching ${MAX_ALLOWED_STRIKES} strikes will result in automatic exam disqualification and immediate forced submission.`
      );
    }
  };

  // Fullscreen event listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      const active = !!document.fullscreenElement;
      setIsFullscreen(active);
      if (!active && !submittingRef.current) {
        // Exiting fullscreen triggers a warning
        recordViolation("Exited Fullscreen mode");
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Strict Anti-Cheating & Security Listeners (Screen change, copy/paste, context menu, shortcuts)
  useEffect(() => {
    // 1. Disable Context Menu (Right-Click)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      showKioskToast("Action Restricted 🛡️", "Right-click context menu is disabled during the examination.", "warning");
    };

    // 2. Disable Clipboard Operations
    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      showKioskToast("Action Restricted 🛡️", "Copying examination content is prohibited by security policy.", "warning");
    };
    const handleCut = (e: ClipboardEvent) => {
      e.preventDefault();
    };
    const handlePaste = (e: ClipboardEvent) => {
      e.preventDefault();
      showKioskToast("Action Restricted 🛡️", "Pasting into the examination kiosk is prohibited.", "warning");
    };

    // 3. Block Developer Tools & Unsafe Shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12 or Ctrl+Shift+I or Ctrl+Shift+J or Ctrl+Shift+C
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) ||
        (e.ctrlKey && (e.key === 'u' || e.key === 'U'))
      ) {
        e.preventDefault();
        showKioskToast("Developer Tools Blocked 🛡️", "Developer console inspection is strictly blocked.", "error");
        return;
      }

      // Prevent accidental Page Refresh (F5, Ctrl+R)
      if (e.key === 'F5' || (e.ctrlKey && (e.key === 'r' || e.key === 'R'))) {
        e.preventDefault();
        showKioskToast("Refresh Blocked 🛡️", "Do not refresh the page. Your active session is running safely.", "warning");
        return;
      }
    };

    // 4. Tab Visibility Detection (Tab switch / Backgrounding)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        recordViolation("Tab change / App backgrounded (Visibility Lost)");
      }
    };

    // 5. Window Blur (Switching apps or clicking outside window)
    const handleWindowBlur = () => {
      if (blurTimeoutRef.current) clearTimeout(blurTimeoutRef.current);
      // Small debounce (350ms) to avoid false triggers during browser native alerts
      blurTimeoutRef.current = setTimeout(() => {
        if (!document.hasFocus() && !submittingRef.current) {
          recordViolation("Window lost focus / Switched application");
        }
      }, 350);
    };

    // 6. Before Unload Alert (Tab closing prevention)
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!submittingRef.current) {
        e.preventDefault();
        e.returnValue = "Examination in progress! Leaving will void your attempt.";
        return "Examination in progress! Leaving will void your attempt.";
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('copy', handleCopy);
    document.addEventListener('cut', handleCut);
    document.addEventListener('paste', handlePaste);
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('cut', handleCut);
      document.removeEventListener('paste', handlePaste);
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      if (blurTimeoutRef.current) clearTimeout(blurTimeoutRef.current);
    };
  }, []);

  // Initialize or restore exam session
  useEffect(() => {
    const backupRaw = sessionStorage.getItem(BACKUP_STORAGE_KEY);
    let restored = false;

    if (backupRaw) {
      try {
        const backup: ExamSessionBackup = JSON.parse(backupRaw);
        if (backup.examId === exam.id && backup.currentUser.admnNo === student.admnNo) {
          setQList(backup.qList);
          setActiveQIndex(backup.activeQIndex);
          const startTime = backup.examStartTime || Date.now();
          setExamStartTime(startTime);

          // Wall-clock elapsed time calculation (prevents timer manipulation via page refresh)
          const totalExamSeconds = exam.examMins * 60;
          const elapsedSecs = Math.max(0, Math.floor((Date.now() - startTime) / 1000));
          const remainingMainSecs = totalExamSeconds - elapsedSecs;

          if (remainingMainSecs > 0) {
            setMasterTotalSecs(remainingMainSecs);
            setMasterGraceSecs(300);
            setIsMasterGrace(false);
          } else {
            const graceElapsed = Math.abs(remainingMainSecs);
            const remainingGraceSecs = 300 - graceElapsed;
            if (remainingGraceSecs > 0) {
              setMasterTotalSecs(0);
              setMasterGraceSecs(remainingGraceSecs);
              setIsMasterGrace(true);
            } else {
              setMasterTotalSecs(0);
              setMasterGraceSecs(0);
              setIsMasterGrace(true);
              setTimeout(() => {
                handleFinalSubmitExecution();
              }, 500);
            }
          }
          if (backup.tabSwitchCount !== undefined) {
            setTabSwitchCount(backup.tabSwitchCount);
            tabSwitchCountRef.current = backup.tabSwitchCount;
          }
          if (backup.proctorViolations) {
            setProctorViolations(backup.proctorViolations);
            proctorViolationsRef.current = backup.proctorViolations;
          }
          restored = true;
          showKioskToast("Session Restored ✅", "Your exam progress was safely recovered.", "success");
        }
      } catch (e) {}
    }

    if (!restored) {
      const stdTimePerQ = Math.max(30, Math.floor((exam.examMins * 60) / exam.questions.length));
      const initialList: KioskQuestionState[] = exam.questions.map((q, idx) => ({
        ...q,
        selectedOpt: null,
        isAnsweredOnce: false,
        editsLeft: 2,
        questionSecsLeft: stdTimePerQ,
        isTimeLocked: false,
        markedForReview: false,
        visited: idx === 0 // First question is visited immediately
      }));
      setQList(initialList);
      setActiveQIndex(0);
      setMasterTotalSecs(exam.examMins * 60);
      setMasterGraceSecs(300);
      setIsMasterGrace(false);
      setExamStartTime(Date.now());
      setTabSwitchCount(0);
      setProctorViolations([]);
    }
  }, [exam.id, student.admnNo]);

  // Mark current question as visited
  useEffect(() => {
    if (qList.length > 0 && !qList[activeQIndex]?.visited) {
      setQList(prev => {
        const updated = [...prev];
        if (updated[activeQIndex]) {
          updated[activeQIndex].visited = true;
        }
        return updated;
      });
    }
  }, [activeQIndex, qList.length]);

  // Master countdown timer
  useEffect(() => {
    if (isSubmitting) return;

    masterTimerRef.current = setInterval(() => {
      setMasterTotalSecs(prevTotal => {
        if (!isMasterGrace) {
          if (prevTotal <= 1) {
            setIsMasterGrace(true);
            showKioskToast("Standard Time Concluded ⏳", "You have entered the final 5-Minute Grace Period.", "warning");
            return 0;
          }
          return prevTotal - 1;
        }
        return prevTotal;
      });

      if (isMasterGrace) {
        setMasterGraceSecs(prevGrace => {
          if (prevGrace <= 1) {
            clearInterval(masterTimerRef.current);
            clearInterval(questionTimerRef.current);
            showKioskToast("Exam Concluded 🛑", "Grace time fully elapsed. Auto-submitting responses...", "error");
            handleFinalSubmitExecution();
            return 0;
          }
          return prevGrace - 1;
        });
      }
    }, 1000);

    return () => {
      if (masterTimerRef.current) clearInterval(masterTimerRef.current);
    };
  }, [isMasterGrace, isSubmitting]);

  // Backup state to sessionStorage on changes
  useEffect(() => {
    if (qList.length === 0 || isSubmitting) return;

    const backup: ExamSessionBackup = {
      currentUser: student,
      examId: exam.id,
      activeExamPaperName: `${exam.subject} - ${exam.title}`,
      activeExamMins: exam.examMins,
      masterTotalSecs,
      masterGraceSecs,
      isMasterGrace,
      qList,
      activeQIndex,
      examStartTime,
      tabSwitchCount,
      proctorViolations
    };
    sessionStorage.setItem(BACKUP_STORAGE_KEY, JSON.stringify(backup));
  }, [qList, activeQIndex, masterTotalSecs, masterGraceSecs, isMasterGrace, tabSwitchCount, proctorViolations]);

  // Question countdown timer for active question
  useEffect(() => {
    if (qList.length === 0 || isSubmitting) return;

    const currQ = qList[activeQIndex];
    if (!currQ || currQ.isTimeLocked) return;

    if (questionTimerRef.current) clearInterval(questionTimerRef.current);

    questionTimerRef.current = setInterval(() => {
      setQList(prevList => {
        const updated = [...prevList];
        const target = updated[activeQIndex];
        if (!target || target.isTimeLocked) return prevList;

        if (target.questionSecsLeft <= 1) {
          target.questionSecsLeft = 0;
          target.isTimeLocked = true;
          clearInterval(questionTimerRef.current);

          if (target.selectedOpt !== null) {
            showKioskToast("Answer Saved ✅", `Time up! Your answer for Question ${activeQIndex + 1} is locked securely. Forwarding...`, "success");
          } else {
            showKioskToast("Time Expired 🛑", `Question ${activeQIndex + 1} locked without an answer. Forwarding...`, "error");
          }

          // Auto advance after 2 seconds
          if (autoAdvanceRef.current) clearTimeout(autoAdvanceRef.current);
          autoAdvanceRef.current = setTimeout(() => {
            handleAutoAdvance(activeQIndex);
          }, 2000);

          return updated;
        }

        target.questionSecsLeft -= 1;
        return updated;
      });
    }, 1000);

    return () => {
      if (questionTimerRef.current) clearInterval(questionTimerRef.current);
    };
  }, [activeQIndex, qList[activeQIndex]?.isTimeLocked, isSubmitting]);

  const handleAutoAdvance = (fromIdx: number) => {
    setQList(latest => {
      let nextIdx = -1;
      // Search forward
      for (let i = fromIdx + 1; i < latest.length; i++) {
        if (!latest[i].isTimeLocked) {
          nextIdx = i;
          break;
        }
      }
      // Search wrap around
      if (nextIdx === -1) {
        for (let i = 0; i < fromIdx; i++) {
          if (!latest[i].isTimeLocked) {
            nextIdx = i;
            break;
          }
        }
      }

      if (nextIdx !== -1 && nextIdx !== fromIdx) {
        setActiveQIndex(nextIdx);
      } else {
        showKioskToast("All Questions Locked", "Please click FINISH to submit your paper.", "warning");
      }
      return latest;
    });
  };

  // Option selection with 2-edit modification limit
  const handleSelectOption = (chosenOpt: number) => {
    const currQ = qList[activeQIndex];
    if (!currQ || currQ.isTimeLocked) return;

    if (!currQ.isAnsweredOnce) {
      // First selection
      setQList(prev => {
        const updated = [...prev];
        updated[activeQIndex].isAnsweredOnce = true;
        updated[activeQIndex].selectedOpt = chosenOpt;
        return updated;
      });
    } else {
      // Already selected once
      if (currQ.selectedOpt === chosenOpt) return;

      if (currQ.editsLeft > 0) {
        setQList(prev => {
          const updated = [...prev];
          updated[activeQIndex].editsLeft -= 1;
          updated[activeQIndex].selectedOpt = chosenOpt;
          return updated;
        });
      } else {
        showKioskToast("Limit Reached 🛑", `You have exhausted your 2 permitted modifications for Question ${activeQIndex + 1}.`, "error");
      }
    }
  };

  // Standard CBT: Clear Response
  const handleClearResponse = () => {
    const currQ = qList[activeQIndex];
    if (!currQ || currQ.isTimeLocked) return;

    setQList(prev => {
      const updated = [...prev];
      updated[activeQIndex].selectedOpt = null;
      updated[activeQIndex].isAnsweredOnce = false;
      return updated;
    });
    showKioskToast("Response Cleared", `Option cleared for Question ${activeQIndex + 1}.`, "warning");
  };

  // Standard CBT: Toggle Mark for Review & Advance
  const handleMarkForReviewAndNext = () => {
    setQList(prev => {
      const updated = [...prev];
      const target = updated[activeQIndex];
      if (target) {
        target.markedForReview = !target.markedForReview;
      }
      return updated;
    });

    handleNavigate(1);
  };

  // Navigation
  const handleNavigate = (dir: number) => {
    if (autoAdvanceRef.current) clearTimeout(autoAdvanceRef.current);
    const target = activeQIndex + dir;
    if (target >= 0 && target < qList.length) {
      setActiveQIndex(target);
    }
  };

  const handleJump = (idx: number) => {
    if (autoAdvanceRef.current) clearTimeout(autoAdvanceRef.current);
    if (idx >= 0 && idx < qList.length) {
      setActiveQIndex(idx);
    }
  };

  // Initiate Final Submission
  const handleInitiateSubmit = () => {
    setShowSubmitModal(true);
  };

  const handleFinalSubmitExecution = async (
    forcedStrikes?: number,
    forcedLogs?: string[],
    forcedStatus?: 'CLEAN' | 'WARNED' | 'FLAGGED_VIOLATION'
  ) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    submittingRef.current = true;
    setShowSubmitModal(false);
    setShowViolationModal(false);

    if (masterTimerRef.current) clearInterval(masterTimerRef.current);
    if (questionTimerRef.current) clearInterval(questionTimerRef.current);
    if (autoAdvanceRef.current) clearTimeout(autoAdvanceRef.current);

    sessionStorage.removeItem(BACKUP_STORAGE_KEY);

    const compiledAnswers: Record<string, number | "SKIPPED"> = {};
    qList.forEach(q => {
      compiledAnswers[q.id] = q.selectedOpt !== null ? q.selectedOpt : "SKIPPED";
    });

    const secsConsumed = Math.max(1, Math.round((Date.now() - examStartTime) / 1000));
    
    const finalStrikes = forcedStrikes !== undefined ? forcedStrikes : tabSwitchCount;
    const finalLogs = forcedLogs !== undefined ? forcedLogs : proctorViolations;
    const finalStatus: 'CLEAN' | 'WARNED' | 'FLAGGED_VIOLATION' = 
      forcedStatus || (finalStrikes >= MAX_ALLOWED_STRIKES ? 'FLAGGED_VIOLATION' : finalStrikes > 0 ? 'WARNED' : 'CLEAN');

    await onSubmit(compiledAnswers, secsConsumed, {
      tabSwitchCount: finalStrikes,
      proctorViolations: finalLogs,
      proctorStatus: finalStatus
    });
  };

  // Question summary calculation for standard CBT palette
  const summaryCounts = useMemo(() => {
    let answered = 0;
    let notAnswered = 0;
    let markedReview = 0;
    let answeredAndMarked = 0;
    let notVisited = 0;

    qList.forEach(q => {
      if (q.isTimeLocked) {
        // Locked questions counted based on answer
        if (q.selectedOpt !== null) answered++;
        else notAnswered++;
      } else if (q.selectedOpt !== null && q.markedForReview) {
        answeredAndMarked++;
      } else if (q.markedForReview) {
        markedReview++;
      } else if (q.selectedOpt !== null) {
        answered++;
      } else if (q.visited) {
        notAnswered++;
      } else {
        notVisited++;
      }
    });

    return {
      answered,
      notAnswered,
      markedReview,
      answeredAndMarked,
      notVisited,
      total: qList.length
    };
  }, [qList]);

  const currentQ = qList[activeQIndex];
  if (!currentQ) {
    return (
      <div className="p-12 text-center text-slate-500 font-bold">
        Loading test bank...
      </div>
    );
  }

  // Format master clock display
  const clockSecs = isMasterGrace ? masterGraceSecs : masterTotalSecs;
  const masterMinutes = Math.floor(clockSecs / 60);
  const masterSeconds = clockSecs % 60;
  const masterTimeString = `${masterMinutes}:${masterSeconds < 10 ? '0' : ''}${masterSeconds}`;

  const { cleanText: questionText, imageUrls: questionImages } = extractMediaParts(currentQ.text);

  return (
    <div className="bg-slate-100 p-3 sm:p-5 md:p-6 min-h-[90vh] relative select-none">
      
      {/* Toast Banner */}
      {toast && (
        <div className="fixed top-4 right-4 sm:right-6 z-[160] max-w-sm w-full animate-in slide-in-from-top duration-300 pointer-events-none">
          <div className={`p-4 rounded-2xl shadow-2xl border flex items-center gap-3 ${
            toast.type === 'error'
              ? 'bg-rose-50 border-rose-300 text-rose-900'
              : toast.type === 'success'
              ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
              : 'bg-amber-50 border-amber-300 text-amber-900'
          }`}>
            <span className="text-xl">
              {toast.type === 'error' ? '🛑' : toast.type === 'success' ? '✅' : '⚠️'}
            </span>
            <div>
              <h4 className="font-black text-xs uppercase tracking-wider">{toast.title}</h4>
              <p className="text-[11px] font-bold opacity-90 leading-tight mt-0.5">{toast.message}</p>
            </div>
          </div>
        </div>
      )}

      {/* Official CBT Top Security & Proctoring Bar */}
      <div className="bg-slate-900 text-white p-3.5 sm:p-4 rounded-2xl mb-4 border-b-2 border-indigo-500 shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        
        {/* Left: Candidate & Paper details */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/30 border border-indigo-400/40 flex items-center justify-center text-lg">
            🧑‍🎓
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-white tracking-wide">
                {student.name}
              </span>
              <span className="text-[10px] font-mono font-bold bg-indigo-900/90 text-indigo-200 px-2 py-0.5 rounded border border-indigo-700">
                {student.admnNo}
              </span>
              <span className="text-[10px] font-bold text-slate-300">
                Class {student.classSec}
              </span>
            </div>
            <span className="text-[11px] font-extrabold text-amber-400 uppercase tracking-wide block mt-0.5">
              {exam.subject} — {exam.title}
            </span>
          </div>
        </div>

        {/* Right: Security Proctor Badges & Fullscreen Controls */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-between md:justify-end">
          
          {/* Proctoring Status Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-[11px] font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-slate-300">Proctor:</span>
            <span className="text-emerald-400 font-black uppercase tracking-wider">Active</span>
          </div>

          {/* Screen Changes / Strikes Badge */}
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[11px] font-black ${
            tabSwitchCount === 0
              ? 'bg-emerald-950/80 border-emerald-700/80 text-emerald-300'
              : tabSwitchCount < MAX_ALLOWED_STRIKES
              ? 'bg-amber-950/90 border-amber-600 text-amber-300 animate-pulse'
              : 'bg-rose-950 border-rose-600 text-rose-300 animate-bounce'
          }`}>
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Screen Changes:</span>
            <span className="font-mono text-xs">{tabSwitchCount} / {MAX_ALLOWED_STRIKES}</span>
          </div>

          {/* Fullscreen Toggle Button */}
          <button
            id="btn-kiosk-fullscreen"
            onClick={toggleFullscreen}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[11px] font-black transition cursor-pointer ${
              isFullscreen
                ? 'bg-indigo-900/70 border-indigo-500 text-indigo-200 hover:bg-indigo-800'
                : 'bg-rose-600 hover:bg-rose-700 border-rose-400 text-white animate-pulse'
            }`}
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="w-3.5 h-3.5" />
                <span>Fullscreen Locked</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Enter Fullscreen</span>
              </>
            )}
          </button>

          {/* Help Button */}
          <button
            id="btn-kiosk-help"
            onClick={onOpenHelp}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 cursor-pointer"
            title="Examination Assistance"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

        </div>

      </div>

      {/* Main Kiosk Area */}
      <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
        
        {/* Left Column: Timers & Question Card */}
        <div className="w-full md:w-3/4 space-y-4 flex flex-col">
          
          {/* Top Timers Bar */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 bg-white p-3.5 sm:p-4 border border-slate-300 rounded-2xl shadow-xs">
            
            {/* Master Clock */}
            <div className="border-b sm:border-b-0 sm:border-r border-slate-200 pb-2 sm:pb-0 sm:pr-4 w-full sm:w-1/2 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black text-slate-400 block uppercase tracking-wider">
                  {isMasterGrace ? 'GRACE TIME REMAINING 🛡️' : `Remaining Exam Time (${exam.examMins} Min)`}
                </span>
                <span className={`text-2xl sm:text-3xl font-mono font-black tracking-tight ${
                  isMasterGrace ? 'text-rose-600 animate-pulse' : 'text-slate-800'
                }`}>
                  {masterTimeString}
                </span>
              </div>
              <Clock className="w-6 h-6 text-slate-300 hidden sm:block" />
            </div>

            {/* Question Timer & Modifications Left */}
            <div className="flex justify-between items-center w-full sm:w-1/2 sm:pl-2">
              <div>
                <span className="text-[10px] font-black text-slate-400 block uppercase tracking-wider">
                  Question Time
                </span>
                <span className={`text-2xl sm:text-3xl font-mono font-black tracking-tight ${
                  currentQ.isTimeLocked ? 'text-rose-600' : 'text-indigo-600'
                }`}>
                  {currentQ.isTimeLocked ? 'LOCKED' : `${currentQ.questionSecsLeft}s`}
                </span>
              </div>

              <div className="text-right">
                <span className={`text-[10px] sm:text-xs font-extrabold px-3 py-1.5 rounded-full border shadow-2xs whitespace-nowrap block ${
                  currentQ.editsLeft === 0 
                    ? 'bg-rose-50 text-rose-700 border-rose-200' 
                    : 'bg-amber-50 text-amber-800 border-amber-200'
                }`}>
                  Changes left: {currentQ.editsLeft}
                </span>
              </div>
            </div>

          </div>

          {/* Active Question Card */}
          <div className="bg-white p-5 sm:p-7 border border-slate-300 rounded-2xl shadow-xs flex-1 flex flex-col justify-between relative overflow-hidden">
            
            {/* Lock Overlay when question time expired */}
            {currentQ.isTimeLocked && (
              <div className="absolute inset-0 bg-slate-900/10 backdrop-blur-[1.5px] z-10 flex items-center justify-center pointer-events-none">
                <div className="bg-white/95 px-6 py-3 rounded-full shadow-xl border border-slate-200 text-slate-800 font-black text-xs sm:text-sm flex items-center gap-2">
                  <Lock className="w-4 h-4 text-rose-600" />
                  <span>QUESTION TIME EXPIRED — LOCKED SECURELY</span>
                </div>
              </div>
            )}

            <div>
              {/* Question Header & Category */}
              <div className="flex justify-between items-center mb-4 relative z-20">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black tracking-widest bg-indigo-100 text-indigo-900 px-3 py-1 rounded-full uppercase shadow-2xs font-mono">
                    {currentQ.category || 'ASSESSMENT'}
                  </span>
                  {currentQ.markedForReview && (
                    <span className="text-[10px] font-black tracking-wider bg-purple-100 text-purple-900 border border-purple-300 px-2.5 py-0.5 rounded-full uppercase flex items-center gap-1">
                      <Bookmark className="w-3 h-3 fill-purple-600 text-purple-600" />
                      <span>Marked for Review</span>
                    </span>
                  )}
                </div>

                <span className="text-xs font-black text-slate-400 font-mono">
                  Question {activeQIndex + 1} of {qList.length}
                </span>
              </div>

              {/* Question Text */}
              <h2 className="text-base sm:text-lg md:text-xl font-bold text-slate-900 mb-5 leading-relaxed relative z-20">
                {questionText}
              </h2>

              {/* Inline Images if any */}
              {questionImages.length > 0 && (
                <div className="mb-5 flex flex-wrap gap-3">
                  {questionImages.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt="Question asset"
                      className="max-h-40 object-contain rounded-xl border border-slate-200 shadow-sm"
                      referrerPolicy="no-referrer"
                    />
                  ))}
                </div>
              )}

              {/* Options List */}
              <div className="space-y-3 relative z-20">
                {currentQ.options.map((optObj: QuestionOption) => {
                  const isChecked = currentQ.selectedOpt === optObj.o;
                  const isDisabled = currentQ.isTimeLocked;
                  const { cleanText: optText, imageUrls: optImages } = extractMediaParts(optObj.t);

                  return (
                    <label
                      key={optObj.o}
                      className={`flex items-center p-3.5 sm:p-4 border-2 rounded-xl transition-all ${
                        isDisabled
                          ? 'bg-slate-100 opacity-70 cursor-not-allowed border-slate-200'
                          : isChecked
                          ? 'bg-indigo-50/90 border-indigo-600 shadow-xs cursor-pointer'
                          : 'bg-white hover:bg-slate-50 border-slate-200 cursor-pointer'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`q_${currentQ.id}`}
                        value={optObj.o}
                        checked={isChecked}
                        disabled={isDisabled}
                        onChange={() => handleSelectOption(optObj.o)}
                        className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600 focus:ring-indigo-500 cursor-pointer disabled:cursor-not-allowed flex-shrink-0"
                      />
                      <div className="ml-3 sm:ml-4 flex-1">
                        <span className={`text-xs sm:text-sm font-bold leading-snug ${
                          isChecked ? 'text-indigo-950 font-black' : 'text-slate-800'
                        }`}>
                          {optText}
                        </span>
                        {optImages.length > 0 && (
                          <div className="mt-2 flex gap-2">
                            {optImages.map((src, i) => (
                              <img
                                key={i}
                                src={src}
                                alt="Option asset"
                                className="max-h-24 object-contain rounded-lg border"
                                referrerPolicy="no-referrer"
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Standard CBT Bottom Action Controls */}
            <div className="mt-7 pt-4 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-3 relative z-20">
              
              {/* Left group: Previous & Clear Response */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  id="btn-kiosk-prev"
                  onClick={() => handleNavigate(-1)}
                  disabled={activeQIndex === 0}
                  className="px-4 sm:px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition text-xs shadow-2xs border border-slate-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <button
                  id="btn-kiosk-clear"
                  onClick={handleClearResponse}
                  disabled={currentQ.selectedOpt === null || currentQ.isTimeLocked}
                  className="px-3 sm:px-4 py-2.5 bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-700 font-bold rounded-xl transition text-xs border border-slate-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1 cursor-pointer"
                  title="Clear selected option"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Clear Response</span>
                </button>
              </div>

              {/* Right group: Mark for Review & Save / Next */}
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  id="btn-kiosk-review"
                  onClick={handleMarkForReviewAndNext}
                  className={`px-4 sm:px-5 py-2.5 font-black rounded-xl transition text-xs flex items-center justify-center gap-1.5 border cursor-pointer ${
                    currentQ.markedForReview
                      ? 'bg-purple-700 text-white border-purple-800 shadow-sm'
                      : 'bg-purple-50 hover:bg-purple-100 text-purple-800 border-purple-200'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>{currentQ.markedForReview ? 'Unmark Review' : 'Mark for Review & Next'}</span>
                </button>

                {activeQIndex === qList.length - 1 ? (
                  <button
                    id="btn-kiosk-finish"
                    onClick={handleInitiateSubmit}
                    className="px-6 sm:px-7 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl shadow-md transition text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>FINISH EXAM ✓</span>
                  </button>
                ) : (
                  <button
                    id="btn-kiosk-next"
                    onClick={() => handleNavigate(1)}
                    className="px-6 sm:px-7 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-xl shadow-md transition text-xs flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>Save & Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>

            </div>

          </div>
        </div>

        {/* Right Column: Standard CBT Question Palette */}
        <div className="w-full md:w-1/4 bg-white p-4 sm:p-5 border border-slate-300 rounded-2xl shadow-xs h-fit md:sticky top-6">
          
          <div className="flex justify-between items-center pb-3 mb-3 border-b border-slate-200">
            <h3 className="font-black text-xs text-slate-800 uppercase tracking-wider">
              Question Palette
            </h3>
            <button
              id="btn-palette-finish"
              onClick={handleInitiateSubmit}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-black px-3.5 py-1.5 rounded-xl shadow-sm transition animate-pulse cursor-pointer uppercase"
            >
              FINISH ✓
            </button>
          </div>

          {/* Standard CBT Status Count Chips */}
          <div className="grid grid-cols-2 gap-2 mb-4 text-[10px] font-bold">
            <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900">
              <span className="w-4 h-4 rounded-full bg-emerald-600 text-white font-mono flex items-center justify-center text-[9px] font-black">
                {summaryCounts.answered}
              </span>
              <span className="truncate">Answered</span>
            </div>

            <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-900">
              <span className="w-4 h-4 rounded-full bg-rose-600 text-white font-mono flex items-center justify-center text-[9px] font-black">
                {summaryCounts.notAnswered}
              </span>
              <span className="truncate">Not Answered</span>
            </div>

            <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-purple-50 border border-purple-200 text-purple-900">
              <span className="w-4 h-4 rounded-full bg-purple-600 text-white font-mono flex items-center justify-center text-[9px] font-black">
                {summaryCounts.markedReview}
              </span>
              <span className="truncate">Review</span>
            </div>

            <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-slate-100 border border-slate-300 text-slate-700">
              <span className="w-4 h-4 rounded-full bg-slate-400 text-white font-mono flex items-center justify-center text-[9px] font-black">
                {summaryCounts.notVisited}
              </span>
              <span className="truncate">Not Visited</span>
            </div>
          </div>

          {/* Number Grid */}
          <div className="grid grid-cols-5 md:grid-cols-4 lg:grid-cols-5 gap-2 font-mono text-xs font-bold">
            {qList.map((q, i) => {
              const isActive = i === activeQIndex;
              let btnClass = "bg-slate-100 text-slate-700 border-slate-300";
              let statusSymbol: React.ReactNode = null;

              if (q.isTimeLocked) {
                if (q.selectedOpt !== null) {
                  btnClass = "bg-emerald-800 text-white border-emerald-950 shadow-inner";
                } else {
                  btnClass = "bg-rose-500 text-white border-rose-600 shadow-2xs";
                }
                statusSymbol = <span className="text-[10px] ml-0.5">🔒</span>;
              } else if (q.selectedOpt !== null && q.markedForReview) {
                // Answered & Marked for Review (Purple with check)
                btnClass = "bg-purple-700 text-white border-purple-900";
                statusSymbol = <span className="text-[9px] ml-0.5 font-bold">✓</span>;
              } else if (q.markedForReview) {
                // Marked for Review (Purple)
                btnClass = "bg-purple-500 text-white border-purple-700";
              } else if (q.selectedOpt !== null) {
                // Answered (Green)
                btnClass = "bg-emerald-600 text-white border-emerald-700";
              } else if (q.visited) {
                // Not Answered (Visited but no selection) (Red)
                btnClass = "bg-rose-500 text-white border-rose-700";
              } else {
                // Not Visited (Grey)
                btnClass = "bg-slate-100 text-slate-600 border-slate-300";
              }

              return (
                <button
                  key={q.id}
                  id={`btn-palette-q-${i + 1}`}
                  onClick={() => handleJump(i)}
                  className={`w-full h-10 rounded-xl border font-mono font-bold transition flex items-center justify-center text-xs cursor-pointer relative ${btnClass} ${
                    isActive ? 'ring-3 ring-indigo-500 ring-offset-2 scale-105 z-10' : ''
                  }`}
                >
                  <span>{i + 1}</span>
                  {statusSymbol}
                </button>
              );
            })}
          </div>

          {/* Palette Legend */}
          <div className="mt-5 pt-3 border-t border-slate-200 text-[10px] font-bold text-slate-600 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-emerald-600"></span>
              <span>Answered</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-rose-500"></span>
              <span>Not Answered</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-purple-500"></span>
              <span>Marked for Review</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-purple-700 flex items-center justify-center text-white text-[8px]">✓</span>
              <span>Answered & Marked (Evaluated)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-slate-200 border border-slate-300"></span>
              <span>Not Visited</span>
            </div>
          </div>
        </div>

      </div>

      {/* Proctor Security Violation Modal */}
      {showViolationModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-8 text-center border-2 border-rose-500">
            
            <div className="w-16 h-16 rounded-full bg-rose-100 border border-rose-300 text-rose-600 flex items-center justify-center mx-auto mb-4 text-3xl animate-bounce">
              <ShieldAlert className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-black text-rose-950 mb-2 uppercase tracking-wide">
              {tabSwitchCount >= MAX_ALLOWED_STRIKES ? 'Exam Disqualification Lock' : 'Security Proctor Warning'}
            </h3>

            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 mb-4 text-left">
              <div className="flex justify-between items-center mb-1 font-mono text-xs font-black text-rose-900">
                <span>SECURITY VIOLATION</span>
                <span>Strike {tabSwitchCount} of {MAX_ALLOWED_STRIKES}</span>
              </div>
              <p className="text-xs text-rose-800 leading-relaxed font-semibold">
                {violationStrikeMessage}
              </p>
            </div>

            <p className="text-[11px] text-slate-500 font-bold mb-6">
              All screen change timestamps and blur events are permanently recorded in the school's central audit database.
            </p>

            {tabSwitchCount >= MAX_ALLOWED_STRIKES ? (
              <div className="w-full py-3.5 bg-rose-600 text-white font-black rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 animate-pulse">
                <span>Locking & Auto-Submitting Paper...</span>
              </div>
            ) : (
              <button
                id="btn-dismiss-violation"
                onClick={async () => {
                  setShowViolationModal(false);
                  await toggleFullscreen();
                }}
                className="w-full py-3.5 bg-indigo-900 hover:bg-indigo-800 text-white font-black rounded-xl text-xs uppercase tracking-wider shadow-md transition cursor-pointer"
              >
                Acknowledge & Resume Fullscreen Exam
              </button>
            )}

          </div>
        </div>
      )}

      {/* Submit Confirmation Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-[190] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-8 text-center border border-slate-300">
            <div className="text-4xl mb-3">📋</div>

            <h3 className="text-xl font-black text-slate-900 mb-1 leading-snug">
              Confirm Paper Submission
            </h3>
            <p className="text-xs font-medium text-slate-500 mb-5">
              Review your examination summary before final submission.
            </p>

            {/* Detailed summary matrix */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-6 text-left space-y-2 text-xs font-bold">
              <div className="flex justify-between text-slate-700">
                <span>Total Questions:</span>
                <span className="font-mono">{qList.length}</span>
              </div>
              <div className="flex justify-between text-emerald-700">
                <span>Questions Answered:</span>
                <span className="font-mono">{summaryCounts.answered + summaryCounts.answeredAndMarked}</span>
              </div>
              <div className="flex justify-between text-purple-700">
                <span>Marked for Review:</span>
                <span className="font-mono">{summaryCounts.markedReview + summaryCounts.answeredAndMarked}</span>
              </div>
              <div className="flex justify-between text-rose-700">
                <span>Unanswered / Missed:</span>
                <span className="font-mono">{summaryCounts.notAnswered + summaryCounts.notVisited}</span>
              </div>
              <div className="flex justify-between text-slate-700 pt-2 border-t border-slate-200">
                <span>Proctoring Security Strikes:</span>
                <span className={`font-mono ${tabSwitchCount > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                  {tabSwitchCount} / {MAX_ALLOWED_STRIKES}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="w-full sm:flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black py-3 rounded-xl text-xs uppercase tracking-wider border border-slate-300 cursor-pointer"
              >
                Return to Exam
              </button>
              <button
                id="btn-confirm-final-submit"
                onClick={() => handleFinalSubmitExecution()}
                className="w-full sm:flex-1 bg-indigo-900 hover:bg-indigo-800 text-white font-black py-3 rounded-xl text-xs uppercase tracking-wider shadow-md cursor-pointer"
              >
                Confirm & Submit
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

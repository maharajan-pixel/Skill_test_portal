import React, { useState, useEffect } from 'react';
import { AuthUser } from '../types';
import { Shield, BookOpen, Clock, LogOut, HelpCircle, RefreshCw } from 'lucide-react';

interface NavbarProps {
  user: AuthUser | null;
  onLogout: () => void;
  onOpenHelp: () => void;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  onLogout,
  onOpenHelp,
  onRefresh,
  isRefreshing = false
}) => {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="bg-indigo-950 text-white border-b-4 border-amber-500 shadow-xl transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
          {/* School Brand */}
          <div className="text-center md:text-left flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-400 text-2xl font-black shadow-inner">
              🎓
            </div>
            <div>
              <h1 className="text-lg sm:text-2xl font-black tracking-wider uppercase text-indigo-50 leading-none">
                SPIC NAGAR HIGHER SECONDARY SCHOOL
              </h1>
              <div className="flex items-center gap-2 mt-1 justify-center md:justify-start">
                <span className="text-[10px] sm:text-xs font-bold text-amber-400 tracking-widest uppercase">
                  Universal Digital Assessment Portal
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[9px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full font-mono font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Real-Time Engine Active
                </span>
              </div>
            </div>
          </div>

          {/* Right Header Badges */}
          <div className="flex items-center gap-2.5 sm:gap-4 text-xs font-medium">
            {/* Live Clock */}
            <div className="hidden lg:flex items-center gap-1.5 bg-indigo-900/80 border border-indigo-700/60 px-3 py-1.5 rounded-xl font-mono text-indigo-200 text-xs">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{timeStr}</span>
            </div>

            {/* Help Button */}
            <button
              id="btn-header-help"
              onClick={onOpenHelp}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-3 sm:px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 shadow-md transform active:scale-95 transition text-[11px] sm:text-xs uppercase tracking-wide cursor-pointer"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Rules & Help</span>
            </button>

            {/* User Session Info / Logout */}
            {user && (
              <div className="flex items-center gap-2 bg-indigo-900/90 border border-indigo-800 px-3 py-1.5 rounded-xl">
                <div className="text-right">
                  <div className="text-[11px] font-bold text-indigo-100 flex items-center gap-1 justify-end">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span className="truncate max-w-[130px] sm:max-w-[180px]">{user.name}</span>
                  </div>
                  <div className="text-[9px] font-mono text-amber-400 uppercase">
                    {user.role === 'STUDENT' ? `Class ${(user as any).classSec}` : user.role}
                  </div>
                </div>

                {onRefresh && (
                  <button
                    id="btn-nav-refresh"
                    onClick={onRefresh}
                    disabled={isRefreshing}
                    title="Live Refresh"
                    className="p-1.5 rounded-lg bg-indigo-800 hover:bg-indigo-700 text-indigo-200 hover:text-white transition disabled:opacity-50 cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-amber-400' : ''}`} />
                  </button>
                )}

                <button
                  id="btn-nav-logout"
                  onClick={onLogout}
                  title="Logout"
                  className="p-1.5 rounded-lg bg-rose-600/80 hover:bg-rose-600 text-white transition cursor-pointer ml-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

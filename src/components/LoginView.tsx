import React, { useState } from 'react';
import { UserRole, AuthUser } from '../types';
import { authenticateUser, DEFAULT_STUDENTS, DEFAULT_TEACHERS, DEFAULT_ADMIN } from '../services/firebase';
import { Eye, EyeOff, KeyRound, User, Lock, Sparkles, CheckCircle2 } from 'lucide-react';

interface LoginViewProps {
  onLoginSuccess: (user: AuthUser) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess }) => {
  const [role, setRole] = useState<UserRole>('STUDENT');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      // Authenticate against our secure service
      const user = authenticateUser(role, userId, password);
      onLoginSuccess(user);
    } catch (err: any) {
      setErrorMessage(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  // Demo credential autofill helper
  const handleQuickFill = (targetRole: UserRole, targetId: string, targetPass: string) => {
    setRole(targetRole);
    setUserId(targetId);
    setPassword(targetPass);
    setErrorMessage('');
  };

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto min-h-[60vh] flex flex-col justify-center">
      
      {/* Quick Demo Selector */}
      <div className="mb-6 bg-amber-50/80 border border-amber-200/80 rounded-2xl p-3 sm:p-4 shadow-xs">
        <div className="flex items-center gap-2 mb-2 text-amber-900 font-black text-xs uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>Quick Switch Test Accounts (1-Click Auto-Fill)</span>
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          <button
            type="button"
            onClick={() => handleQuickFill('STUDENT', DEFAULT_STUDENTS[0].examNo, DEFAULT_STUDENTS[0].dob)}
            className="px-3 py-1.5 bg-white hover:bg-amber-100/60 border border-amber-300/80 rounded-xl font-bold text-slate-800 transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
            Student: S. Arun Kumar (10 A)
          </button>
          <button
            type="button"
            onClick={() => handleQuickFill('TEACHER', 'maharajan@spicschool.com', 'Teacher@2026')}
            className="px-3 py-1.5 bg-white hover:bg-indigo-100/60 border border-indigo-200 rounded-xl font-bold text-slate-800 transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <span className="w-2 h-2 rounded-full bg-purple-600"></span>
            Teacher: maharajan@spicschool.com
          </button>
          <button
            type="button"
            onClick={() => handleQuickFill('TEACHER', 'teacher.science@spicschool.com', 'Teacher@2026')}
            className="px-3 py-1.5 bg-white hover:bg-indigo-100/60 border border-indigo-200 rounded-xl font-bold text-slate-800 transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <span className="w-2 h-2 rounded-full bg-purple-600"></span>
            Teacher: Mrs. Jayashree
          </button>
          <button
            type="button"
            onClick={() => handleQuickFill('ADMIN', 'admin', DEFAULT_ADMIN.pass)}
            className="px-3 py-1.5 bg-white hover:bg-rose-100/60 border border-rose-200 rounded-xl font-bold text-slate-800 transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <span className="w-2 h-2 rounded-full bg-rose-600"></span>
            Master Admin
          </button>
        </div>
      </div>

      <div className="max-w-xl mx-auto w-full">
        {/* Domain email guidance note */}
        {role === 'TEACHER' && (
          <div className="mb-4 p-3 bg-indigo-50 border border-indigo-200 rounded-2xl text-[11px] text-indigo-950 font-bold flex items-center justify-between">
            <div>
              <span>🏫 <strong>School Domain Login:</strong> Use your <code>@spicschool.com</code> email with password <code>Teacher@2026</code>.</span>
            </div>
          </div>
        )}
        {role === 'STUDENT' && (
          <div className="mb-4 p-3 bg-slate-100 border border-slate-200 rounded-2xl text-[11px] text-slate-800 font-bold flex items-center justify-between">
            <div>
              <span>🎓 <strong>Student Login:</strong> Enter your Exam No (e.g. <code>EX1001</code>) and Date of Birth (<code>DD/MM/YYYY</code>).</span>
            </div>
          </div>
        )}
        {/* Role Tabs */}
        <div className="flex bg-slate-100 rounded-xl p-1.5 mb-6 border border-slate-200 gap-1 overflow-x-auto shadow-inner">
          <button
            id="btn-tab-student"
            type="button"
            onClick={() => { setRole('STUDENT'); setErrorMessage(''); }}
            className={`flex-1 min-w-[100px] py-2.5 sm:py-3 font-black text-xs sm:text-sm rounded-lg transition-all cursor-pointer ${
              role === 'STUDENT'
                ? 'bg-white shadow text-indigo-700'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Student Login
          </button>
          <button
            id="btn-tab-teacher"
            type="button"
            onClick={() => { setRole('TEACHER'); setErrorMessage(''); }}
            className={`flex-1 min-w-[100px] py-2.5 sm:py-3 font-black text-xs sm:text-sm rounded-lg transition-all cursor-pointer ${
              role === 'TEACHER'
                ? 'bg-white shadow text-indigo-700'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Teacher Login
          </button>
          <button
            id="btn-tab-admin"
            type="button"
            onClick={() => { setRole('ADMIN'); setErrorMessage(''); }}
            className={`flex-1 min-w-[100px] py-2.5 sm:py-3 font-black text-xs sm:text-sm rounded-lg transition-all cursor-pointer ${
              role === 'ADMIN'
                ? 'bg-white shadow text-indigo-700'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Admin Login
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
          
          {/* User ID Field */}
          <div>
            <label className="block text-[11px] font-black text-slate-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-indigo-600" />
              {role === 'STUDENT' ? 'Exam Number' : role === 'TEACHER' ? 'Teacher Email' : 'Master Admin ID'}
            </label>
            <input
              id="login-id"
              type={role === 'TEACHER' ? 'email' : 'text'}
              required
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder={role === 'STUDENT' ? 'e.g. EX1001' : role === 'TEACHER' ? 'e.g. teacher.science@spicschool.com' : 'e.g. admin'}
              className="w-full border-2 border-slate-200 rounded-xl p-3 sm:p-3.5 bg-slate-50 font-bold text-slate-900 focus:border-indigo-600 focus:bg-white outline-none transition text-sm"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-[11px] font-black text-slate-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-indigo-600" />
              {role === 'STUDENT' ? 'Password (Date of Birth: DD/MM/YYYY)' : 'Secure Password'}
            </label>
            <div className="relative">
              <input
                id="login-pass"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={role === 'STUDENT' ? 'DD/MM/YYYY (e.g. 15/08/2008)' : '••••••••'}
                className="w-full border-2 border-slate-200 rounded-xl p-3 sm:p-3.5 pr-12 bg-slate-50 font-bold text-slate-900 focus:border-indigo-600 focus:bg-white outline-none transition text-sm font-mono"
              />
              <button
                type="button"
                id="btn-toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center px-4 text-slate-400 hover:text-indigo-600 transition cursor-pointer"
                tabIndex={-1}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-bold leading-relaxed">
              ⚠️ {errorMessage}
            </div>
          )}

          {/* Submit Button */}
          <button
            id="btn-login"
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-700 hover:bg-indigo-800 text-white font-black tracking-widest uppercase py-3.5 sm:py-4 rounded-xl shadow-lg mt-2 transition transform active:scale-98 text-xs sm:text-sm cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
          >
            <KeyRound className="w-4 h-4" />
            <span>{isLoading ? 'AUTHENTICATING...' : 'AUTHENTICATE & ENTER'}</span>
          </button>
        </form>
      </div>

      {/* Step-by-Step Student Guide on Login Screen (Matching original design) */}
      {role === 'STUDENT' && (
        <div className="mt-8 sm:mt-12 bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-inner">
          <h3 className="text-base sm:text-lg font-black text-indigo-950 mb-4 flex items-center gap-2 border-b border-slate-200 pb-3">
            <span>📋</span> Step-by-Step Student Guide
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-2xl border-l-4 border-indigo-500 shadow-xs">
              <strong className="text-indigo-900 block mb-1 text-xs sm:text-sm font-bold">1. The Master Clock ⏳</strong>
              <span className="text-xs text-slate-600 font-medium">You have a fixed total time for the whole paper. Keep an eye on the master clock at top left.</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border-l-4 border-amber-500 shadow-xs">
              <strong className="text-amber-900 block mb-1 text-xs sm:text-sm font-bold">2. The Question Timer ⏱️</strong>
              <span className="text-xs text-slate-600 font-medium">Each question is dynamically timed. When it hits zero, your response locks and automatically forwards.</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border-l-4 border-emerald-500 shadow-xs">
              <strong className="text-emerald-900 block mb-1 text-xs sm:text-sm font-bold">3. Changing Answers ✏️</strong>
              <span className="text-xs text-slate-600 font-medium">Changed your mind? You can pick a new option, but you are strictly allowed <b>2 changes</b> per question.</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border-l-4 border-purple-500 shadow-xs">
              <strong className="text-purple-900 block mb-1 text-xs sm:text-sm font-bold">4. The Grace Period 🛡️</strong>
              <span className="text-xs text-slate-600 font-medium">If main time runs out, don't panic! A 5-minute global grace window lets you complete unvisited questions.</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

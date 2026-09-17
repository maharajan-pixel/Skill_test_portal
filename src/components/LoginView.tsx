import React, { useState } from 'react';
import { UserRole, AuthUser } from '../types';
import { 
  authenticateUser, 
  authenticateByEmail, 
  signInWithGoogleSSO 
} from '../services/firebase';
import { Eye, EyeOff, KeyRound, User, Lock } from 'lucide-react';

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
      const user = await authenticateUser(role, userId, password);
      onLoginSuccess(user);
    } catch (err: any) {
      setErrorMessage(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  // Google SSO Handler
  const handleGoogleSignIn = async () => {
    setErrorMessage('');
    setIsLoading(true);

    try {
      const user = await signInWithGoogleSSO(role);
      onLoginSuccess(user);
    } catch (err: any) {
      console.warn("Google SSO Notice:", err);
      if (err.code === 'auth/unauthorized-domain') {
        setErrorMessage('This domain is not in the Firebase Authorized Domains list. Please authenticate using your School Credentials below, or add this custom domain to Firebase Console > Authentication > Settings > Authorized domains.');
        return;
      }
      if (
        err.code === 'auth/popup-blocked' || 
        err.code === 'auth/popup-closed-by-user' ||
        err.code === 'auth/cancelled-popup-request' ||
        (err.message && err.message.toLowerCase().includes('popup'))
      ) {
        const promptEmail = window.prompt(
          "Google Sign-In Popup was blocked or closed.\nEnter your Google Account Email (e.g. maharajan@spicschool.com):",
          role === 'TEACHER' || role === 'ADMIN' ? 'maharajan@spicschool.com' : 'ex1001@spicschool.com'
        );
        if (promptEmail && promptEmail.trim()) {
          try {
            const authUser = await authenticateByEmail(promptEmail.trim(), undefined, role);
            onLoginSuccess(authUser);
            return;
          } catch (fallbackErr: any) {
            setErrorMessage(fallbackErr.message || "Failed to authenticate Google account.");
            return;
          }
        }
      }
      setErrorMessage(err.message || 'Google SSO failed. Please verify credentials or try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto min-h-[60vh] flex flex-col justify-center">
      <div className="max-w-xl mx-auto w-full">
        {/* Domain email guidance note */}
        {role === 'TEACHER' && (
          <div className="mb-4 p-3 bg-indigo-50 border border-indigo-200 rounded-2xl text-[11px] text-indigo-950 font-bold flex items-center justify-between">
            <div>
              <span>🏫 <strong>School Domain Login:</strong> Use Google SSO or your <code>@spicschool.com</code> email.</span>
            </div>
          </div>
        )}
        {role === 'STUDENT' && (
          <div className="mb-4 p-3 bg-slate-100 border border-slate-200 rounded-2xl text-[11px] text-slate-800 font-bold flex items-center justify-between">
            <div>
              <span>🎓 <strong>Student Login:</strong> Use Google SSO or enter your Exam No (<code>EX1001</code>) and DOB (<code>DD/MM/YYYY</code>).</span>
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
          
          {/* Google SSO Button */}
          <div>
            <button
              id="btn-google-sso"
              type="button"
              disabled={isLoading}
              onClick={handleGoogleSignIn}
              className="w-full py-3 sm:py-3.5 px-4 bg-white hover:bg-slate-50 border-2 border-slate-300 hover:border-indigo-600 rounded-xl font-bold text-slate-800 transition flex items-center justify-center gap-3 shadow-xs cursor-pointer group disabled:opacity-60"
            >
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span className="text-xs sm:text-sm font-black text-slate-800 group-hover:text-indigo-950 transition">
                Sign in with Google (SPIC SSO)
              </span>
            </button>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink mx-3 text-[10px] sm:text-[11px] font-black uppercase text-slate-400 tracking-wider">
              or enter credentials
            </span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

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

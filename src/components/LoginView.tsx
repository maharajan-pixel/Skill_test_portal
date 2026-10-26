import React, { useState, useRef } from 'react';
import { UserRole, AuthUser } from '../types';
import { 
  authenticateUser, 
  authenticateByEmail, 
  signInWithGoogleSSO 
} from '../services/firebase';
import { 
  Eye, 
  EyeOff, 
  KeyRound, 
  User, 
  Lock, 
  ShieldCheck, 
  GraduationCap, 
  School, 
  Calendar, 
  CalendarDays, 
  RotateCcw,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';

interface LoginViewProps {
  onLoginSuccess: (user: AuthUser) => void;
}

const MONTHS = [
  { value: '01', name: 'Jan', label: '01 - Jan' },
  { value: '02', name: 'Feb', label: '02 - Feb' },
  { value: '03', name: 'Mar', label: '03 - Mar' },
  { value: '04', name: 'Apr', label: '04 - Apr' },
  { value: '05', name: 'May', label: '05 - May' },
  { value: '06', name: 'Jun', label: '06 - Jun' },
  { value: '07', name: 'Jul', label: '07 - Jul' },
  { value: '08', name: 'Aug', label: '08 - Aug' },
  { value: '09', name: 'Sep', label: '09 - Sep' },
  { value: '10', name: 'Oct', label: '10 - Oct' },
  { value: '11', name: 'Nov', label: '11 - Nov' },
  { value: '12', name: 'Dec', label: '12 - Dec' },
];

const DAYS = Array.from({ length: 31 }, (_, i) => {
  const d = i + 1;
  return d < 10 ? `0${d}` : `${d}`;
});

// School student birth years (spanning Class 1 through Class 12 / alumni)
const YEARS = Array.from({ length: 30 }, (_, i) => `${2024 - i}`);

export const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess }) => {
  const [role, setRole] = useState<UserRole>('STUDENT');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Student Date of Birth states for child-friendly picker
  const [isoDate, setIsoDate] = useState('');
  const [dobDay, setDobDay] = useState('');
  const [dobMonth, setDobMonth] = useState('');
  const [dobYear, setDobYear] = useState('');
  const [manualDobMode, setManualDobMode] = useState(false);
  const dateInputRef = useRef<HTMLInputElement>(null);

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    setErrorMessage('');
    setPassword('');
    setIsoDate('');
    setDobDay('');
    setDobMonth('');
    setDobYear('');
    setManualDobMode(false);
  };

  const handleIsoDateChange = (val: string) => {
    setIsoDate(val);
    if (!val) {
      setDobDay('');
      setDobMonth('');
      setDobYear('');
      setPassword('');
      return;
    }
    const parts = val.split('-');
    if (parts.length === 3) {
      const [y, m, d] = parts;
      setDobYear(y);
      setDobMonth(m);
      setDobDay(d);
      setPassword(`${d}/${m}/${y}`);
    }
  };

  const handlePartChange = (type: 'day' | 'month' | 'year', val: string) => {
    const nextDay = type === 'day' ? val : dobDay;
    const nextMonth = type === 'month' ? val : dobMonth;
    const nextYear = type === 'year' ? val : dobYear;

    if (type === 'day') setDobDay(val);
    if (type === 'month') setDobMonth(val);
    if (type === 'year') setDobYear(val);

    if (nextDay && nextMonth && nextYear) {
      setPassword(`${nextDay}/${nextMonth}/${nextYear}`);
      setIsoDate(`${nextYear}-${nextMonth}-${nextDay}`);
    } else {
      setPassword('');
      setIsoDate('');
    }
  };

  const handleManualDobChange = (text: string) => {
    // Retain only digits and slashes
    let cleaned = text.replace(/[^\d/]/g, '');

    // Auto-insert slashes if continuous digits are typed
    if (!cleaned.includes('/') && cleaned.length > 2) {
      if (cleaned.length <= 4) {
        cleaned = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
      } else {
        cleaned = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4, 8)}`;
      }
    }

    if (cleaned.length > 10) {
      cleaned = cleaned.slice(0, 10);
    }

    setPassword(cleaned);

    const parts = cleaned.split('/');
    if (parts.length === 3 && parts[0].length === 2 && parts[1].length === 2 && parts[2].length === 4) {
      const [d, m, y] = parts;
      setDobDay(d);
      setDobMonth(m);
      setDobYear(y);
      setIsoDate(`${y}-${m}-${d}`);
    }
  };

  const handleClearDob = () => {
    setPassword('');
    setIsoDate('');
    setDobDay('');
    setDobMonth('');
    setDobYear('');
  };

  const openDatePicker = () => {
    if (dateInputRef.current) {
      try {
        if ('showPicker' in HTMLInputElement.prototype) {
          dateInputRef.current.showPicker();
        } else {
          dateInputRef.current.focus();
        }
      } catch {
        dateInputRef.current.focus();
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (role === 'STUDENT') {
      if (!password || !password.trim()) {
        setErrorMessage('Please select or enter your Date of Birth.');
        return;
      }
      const parts = password.trim().split(/[-/]/);
      if (parts.length !== 3 || !parts[0] || !parts[1] || !parts[2] || parts[2].length < 4) {
        setErrorMessage('Please select a complete Date of Birth (Day, Month, and Year).');
        return;
      }
    }

    setIsLoading(true);

    try {
      // Authenticate against our secure service
      const user = await authenticateUser(role, userId, password);
      onLoginSuccess(user);
    } catch (err: any) {
      const rawMsg = err?.message || '';
      if (rawMsg.includes('Unexpected token') || rawMsg.includes('is not valid JSON') || rawMsg.includes('<!DOCTYPE') || rawMsg.includes('<html')) {
        setErrorMessage('Unable to connect to authentication server. Please verify your credentials and try again.');
      } else {
        setErrorMessage(rawMsg || 'Authentication failed. Please verify your credentials.');
      }
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
      if (err.code === 'auth/unauthorized-domain' || (err.message && err.message.includes('unauthorized-domain'))) {
        setErrorMessage('Domain Authorization pending: Ensure "skilltest.spicschool.com" and "auth.spicschool.com" are added to Firebase Console > Authentication > Settings > Authorized domains.');
        return;
      }
      if (
        err.code === 'auth/popup-blocked' || 
        err.code === 'auth/popup-closed-by-user' ||
        err.code === 'auth/cancelled-popup-request' ||
        (err.message && err.message.toLowerCase().includes('popup'))
      ) {
        const promptEmail = window.prompt(
          "Google Sign-In Popup was blocked or closed.\nEnter your registered Google Account Email (e.g. yourname@spicschool.com):"
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
        {/* Portal Authentication Header (Eliminating redundant school crest since top Navbar displays official crest) */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-950 text-amber-400 border-2 border-amber-400/60 shadow-md mb-3 ring-4 ring-indigo-950/10">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-indigo-950 uppercase tracking-tight">
            Portal Authentication
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">
            Sign in to access your digital examination and assessment workspace
          </p>
        </div>

        {/* Role-specific guidance notes */}
        {role === 'STUDENT' && (
          <div className="mb-4 p-3.5 bg-sky-50 border border-sky-200 rounded-2xl text-[11px] sm:text-xs text-sky-950 font-semibold flex items-center justify-between gap-2.5 shadow-xs">
            <div className="flex items-center gap-2.5">
              <GraduationCap className="w-5 h-5 text-sky-700 shrink-0" />
              <span><strong>Candidate Portal:</strong> Enter your Exam Number and registered Date of Birth (DOB) as password.</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setUserId('6105');
                setDobDay('12');
                setDobMonth('07');
                setDobYear('2015');
                setPassword('12/07/2015');
                setIsoDate('2015-07-12');
              }}
              className="hidden sm:inline-flex items-center text-[11px] bg-sky-100 hover:bg-sky-200 text-sky-800 font-bold px-2.5 py-1 rounded-lg transition cursor-pointer shrink-0 border border-sky-200"
              title="Quick fill test credentials (Exam: 6105, DOB: 12/07/2015)"
            >
              Demo Fill
            </button>
          </div>
        )}
        {role === 'TEACHER' && (
          <div className="mb-4 p-3 bg-indigo-50 border border-indigo-200 rounded-2xl text-[11px] sm:text-xs text-indigo-950 font-semibold flex items-center gap-2 shadow-xs">
            <School className="w-4 h-4 text-indigo-700 shrink-0" />
            <span><strong>Faculty Portal:</strong> Sign in with your registered school email address or Google SSO.</span>
          </div>
        )}
        {role === 'ADMIN' && (
          <div className="mb-4 p-3 bg-purple-50 border border-purple-200 rounded-2xl text-[11px] sm:text-xs text-purple-950 font-semibold flex items-center gap-2 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-purple-700 shrink-0" />
            <span><strong>Administrative Access:</strong> Sign in with administrator credentials to manage papers, rosters, and live sync.</span>
          </div>
        )}

        {/* Role Tabs */}
        <div className="flex bg-slate-100 rounded-2xl p-1.5 mb-6 border border-slate-200 gap-1.5 overflow-x-auto shadow-inner">
          <button
            id="btn-tab-student"
            type="button"
            onClick={() => handleRoleChange('STUDENT')}
            className={`flex-1 min-w-[110px] py-2.5 sm:py-3 px-3 font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              role === 'STUDENT'
                ? 'bg-white shadow-sm text-indigo-900 border border-slate-200/80 font-black'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <GraduationCap className={`w-4 h-4 ${role === 'STUDENT' ? 'text-indigo-600' : 'text-slate-400'}`} />
            <span>Student</span>
          </button>
          <button
            id="btn-tab-teacher"
            type="button"
            onClick={() => handleRoleChange('TEACHER')}
            className={`flex-1 min-w-[110px] py-2.5 sm:py-3 px-3 font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              role === 'TEACHER'
                ? 'bg-white shadow-sm text-indigo-900 border border-slate-200/80 font-black'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <School className={`w-4 h-4 ${role === 'TEACHER' ? 'text-indigo-600' : 'text-slate-400'}`} />
            <span>Teacher</span>
          </button>
          <button
            id="btn-tab-admin"
            type="button"
            onClick={() => handleRoleChange('ADMIN')}
            className={`flex-1 min-w-[110px] py-2.5 sm:py-3 px-3 font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              role === 'ADMIN'
                ? 'bg-white shadow-sm text-indigo-900 border border-slate-200/80 font-black'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <ShieldCheck className={`w-4 h-4 ${role === 'ADMIN' ? 'text-indigo-600' : 'text-slate-400'}`} />
            <span>Admin</span>
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
          
          {/* Google Sign-in Button (Staff Only - Students do not need SSO) */}
          {role !== 'STUDENT' && (
            <>
              <div>
                <button
                  id="btn-google-sso"
                  type="button"
                  disabled={isLoading}
                  onClick={handleGoogleSignIn}
                  className="w-full py-3 sm:py-3.5 px-4 bg-white hover:bg-slate-50 border border-slate-300 hover:border-indigo-600 rounded-xl font-bold text-slate-800 transition flex items-center justify-center gap-3 shadow-xs cursor-pointer group disabled:opacity-60"
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
                    Sign in with Google
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
            </>
          )}

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
              placeholder={role === 'STUDENT' ? 'e.g. 6105 or S26105' : role === 'TEACHER' ? 'e.g. teacher@spicschool.com' : 'e.g. administrator'}
              className="w-full h-12 border-2 border-slate-200 rounded-xl px-3.5 bg-slate-50 font-bold text-slate-900 focus:border-indigo-600 focus:bg-white outline-none transition text-sm shadow-xs"
            />
          </div>

          {/* Password / DOB Field */}
          {role === 'STUDENT' ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-black text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Date of Birth (Password)</span>
                </label>
                <button
                  type="button"
                  onClick={() => setManualDobMode(!manualDobMode)}
                  className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 transition cursor-pointer flex items-center gap-1 hover:underline"
                >
                  {manualDobMode ? (
                    <span>Use Dropdown Selectors</span>
                  ) : (
                    <span>Type DD/MM/YYYY</span>
                  )}
                </button>
              </div>

              {!manualDobMode ? (
                <div className="space-y-2">
                  <div className="grid grid-cols-12 gap-2">
                    {/* Day Dropdown */}
                    <div className="col-span-3">
                      <label htmlFor="dob-day-select" className="sr-only">Birth Day</label>
                      <div className="relative">
                        <select
                          id="dob-day-select"
                          value={dobDay}
                          onChange={(e) => handlePartChange('day', e.target.value)}
                          className="w-full h-12 border-2 border-slate-200 hover:border-slate-300 focus:border-indigo-600 focus:bg-white rounded-xl pl-3 pr-6 sm:pr-7 bg-slate-50 font-bold text-slate-900 text-xs sm:text-sm outline-none transition cursor-pointer shadow-xs appearance-none"
                          aria-label="Select Birth Day"
                        >
                          <option value="">DD</option>
                          {DAYS.map(d => (
                            <option key={d} value={d}>{d}</option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-slate-400">
                          <ChevronDown className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>

                    {/* Month Dropdown */}
                    <div className="col-span-4">
                      <label htmlFor="dob-month-select" className="sr-only">Birth Month</label>
                      <div className="relative">
                        <select
                          id="dob-month-select"
                          value={dobMonth}
                          onChange={(e) => handlePartChange('month', e.target.value)}
                          className="w-full h-12 border-2 border-slate-200 hover:border-slate-300 focus:border-indigo-600 focus:bg-white rounded-xl pl-2.5 sm:pl-3 pr-6 sm:pr-7 bg-slate-50 font-bold text-slate-900 text-xs sm:text-sm outline-none transition cursor-pointer shadow-xs appearance-none truncate"
                          aria-label="Select Birth Month"
                        >
                          <option value="">Month</option>
                          {MONTHS.map(m => (
                            <option key={m.value} value={m.value}>{m.label}</option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-slate-400">
                          <ChevronDown className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>

                    {/* Year Dropdown */}
                    <div className="col-span-3">
                      <label htmlFor="dob-year-select" className="sr-only">Birth Year</label>
                      <div className="relative">
                        <select
                          id="dob-year-select"
                          value={dobYear}
                          onChange={(e) => handlePartChange('year', e.target.value)}
                          className="w-full h-12 border-2 border-slate-200 hover:border-slate-300 focus:border-indigo-600 focus:bg-white rounded-xl pl-2 sm:pl-3 pr-6 sm:pr-7 bg-slate-50 font-bold text-slate-900 text-xs sm:text-sm outline-none transition cursor-pointer shadow-xs appearance-none"
                          aria-label="Select Birth Year"
                        >
                          <option value="">YYYY</option>
                          {YEARS.map(y => (
                            <option key={y} value={y}>{y}</option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-slate-400">
                          <ChevronDown className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>

                    {/* Integrated Calendar Trigger */}
                    <div className="col-span-2">
                      <input
                        ref={dateInputRef}
                        id="student-dob-picker"
                        type="date"
                        min="1995-01-01"
                        max="2024-12-31"
                        value={isoDate}
                        onChange={(e) => handleIsoDateChange(e.target.value)}
                        className="sr-only"
                        tabIndex={-1}
                        aria-hidden="true"
                      />
                      <button
                        type="button"
                        id="btn-open-calendar-picker"
                        onClick={openDatePicker}
                        title="Choose date from calendar popup"
                        className="w-full h-12 bg-slate-50 hover:bg-indigo-50 border-2 border-slate-200 hover:border-indigo-400 active:scale-95 rounded-xl flex items-center justify-center text-indigo-600 hover:text-indigo-800 transition cursor-pointer shadow-xs"
                      >
                        <CalendarDays className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Feedback indicator */}
                  {password ? (
                    <div className="flex items-center justify-between px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs shadow-xs animate-in fade-in duration-200">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="text-slate-700 font-semibold">
                          DOB Password: <strong className="font-mono text-indigo-950 font-black">{password}</strong>
                          {dobDay && dobMonth && dobYear && (
                            <span className="text-slate-500 ml-1.5 hidden sm:inline">
                              ({dobDay} {MONTHS.find(m => m.value === dobMonth)?.name} {dobYear})
                            </span>
                          )}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleClearDob}
                        className="text-[11px] font-bold text-slate-500 hover:text-rose-600 flex items-center gap-1 cursor-pointer transition"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Clear</span>
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between text-[11px] text-slate-400 px-1 font-medium">
                      <span>Select Day, Month, Year or tap calendar icon</span>
                      <span className="font-mono">DD/MM/YYYY</span>
                    </div>
                  )}
                </div>
              ) : (
                /* Direct formatted input mode */
                <div className="space-y-1.5">
                  <div className="relative">
                    <input
                      id="login-pass-manual"
                      type="text"
                      required
                      maxLength={10}
                      value={password}
                      onChange={(e) => handleManualDobChange(e.target.value)}
                      placeholder="DD/MM/YYYY (e.g. 12/07/2015)"
                      className="w-full h-12 border-2 border-slate-200 rounded-xl px-3.5 pr-12 bg-slate-50 font-bold text-slate-900 focus:border-indigo-600 focus:bg-white outline-none transition text-sm font-mono shadow-xs"
                    />
                    <button
                      type="button"
                      onClick={openDatePicker}
                      title="Choose from calendar dialog"
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-indigo-600 transition cursor-pointer"
                    >
                      <CalendarDays className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-500 px-1 font-medium">
                    Format: 2-digit day, 2-digit month, 4-digit year (e.g. <code>12/07/2015</code>)
                  </p>
                </div>
              )}

              {/* Form accessibility hidden reference */}
              <input id="login-pass" type="hidden" value={password} />
            </div>
          ) : (
            /* Staff (Teacher & Admin) Secure Password Input */
            <div>
              <label className="block text-[11px] font-black text-slate-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-indigo-600" />
                <span>Secure Password</span>
              </label>
              <div className="relative">
                <input
                  id="login-pass"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-12 border-2 border-slate-200 rounded-xl px-3.5 pr-12 bg-slate-50 font-bold text-slate-900 focus:border-indigo-600 focus:bg-white outline-none transition text-sm font-mono shadow-xs"
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
          )}

          {/* Error Banner */}
          {errorMessage && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs font-medium leading-relaxed shadow-xs">
              <div className="font-bold flex items-start gap-1.5">
                <span className="text-base">⚠️</span>
                <span>{errorMessage}</span>
              </div>
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

import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import type { Role } from '../../types';
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Hexagon,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ChevronLeft,
  Smartphone,
  KeyRound,
  ShoppingBag,
  Flower2,
  FlaskConical,
  Building2,
} from 'lucide-react';

interface RoleAuthProps {
  targetRole?: Role;
}

export const RoleAuth: React.FC<RoleAuthProps> = ({ targetRole }) => {
  const {
    role: activeRole,
    setRole,
    setCustomerTab,
    setBeekeeperTab,
    setLabTab,
    setAdminTab,
  } = useApp();

  const currentRole = targetRole || activeRole || 'customer';

  // Role Configuration Setup
  const roleConfig = {
    customer: {
      roleTitle: 'Customer',
      loginSubtitle: 'Access honey batch traceability & lab quality certificates',
      registerSubtitle: 'Sign up to unlock 100% verified pure honey history',
      themeGradient: 'from-amber-500 via-amber-400 to-amber-600',
      badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
      btnBg: 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950',
      icon: <ShoppingBag className="w-8 h-8 text-white" />,
      accentColor: 'text-amber-700',
      onAuthSuccess: () => setCustomerTab('home'),
    },
    beekeeper: {
      roleTitle: 'Beekeeper',
      loginSubtitle: 'Manage smart IoT hives, track production & submit honey batches',
      registerSubtitle: 'Register your apiary to connect with HONIVA direct supply chain',
      themeGradient: 'from-emerald-600 via-emerald-500 to-teal-700',
      badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      btnBg: 'bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white',
      icon: <Flower2 className="w-8 h-8 text-white" />,
      accentColor: 'text-emerald-700',
      onAuthSuccess: () => setBeekeeperTab('dashboard'),
    },
    lab: {
      roleTitle: 'Lab Officer',
      loginSubtitle: 'Verify FSSAI specs, HPLC spectrometry & write blockchain certs',
      registerSubtitle: 'Register NABL accredited lab profile for quality signing',
      themeGradient: 'from-purple-600 via-purple-500 to-indigo-700',
      badgeBg: 'bg-purple-100 text-purple-900 border-purple-300',
      btnBg: 'bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white',
      icon: <FlaskConical className="w-8 h-8 text-white" />,
      accentColor: 'text-purple-700',
      onAuthSuccess: () => setLabTab('dashboard'),
    },
    admin: {
      roleTitle: 'System Admin',
      loginSubtitle: 'Regional hive telemetry, multi-district analytics & ledger governance',
      registerSubtitle: 'Register administrative supervisor account for HONIVA network',
      themeGradient: 'from-slate-800 via-blue-900 to-slate-900',
      badgeBg: 'bg-blue-100 text-blue-900 border-blue-300',
      btnBg: 'bg-gradient-to-r from-blue-700 to-slate-900 hover:from-blue-800 hover:to-slate-950 text-white',
      icon: <Building2 className="w-8 h-8 text-white" />,
      accentColor: 'text-blue-800',
      onAuthSuccess: () => setAdminTab('dashboard'),
    },
  }[currentRole as 'customer' | 'beekeeper' | 'lab' | 'admin'] || {
    roleTitle: 'Customer',
    loginSubtitle: 'Access honey batch traceability & lab quality certificates',
    registerSubtitle: 'Sign up to unlock 100% verified pure honey history',
    themeGradient: 'from-amber-500 via-amber-400 to-amber-600',
    badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
    btnBg: 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950',
    icon: <Hexagon className="w-8 h-8 text-white" />,
    accentColor: 'text-amber-700',
    onAuthSuccess: () => setCustomerTab('home'),
  };

  // Auth Mode: 'login' | 'register'
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  // Login Method: 'email' | 'phone'
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');

  // Email/Password State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Phone/OTP State
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpDigits, setOtpDigits] = useState(['', '', '', '']);
  const [resendTimer, setResendTimer] = useState(30);

  // Register Form State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Validation & Loading Feedback
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // OTP Resend Countdown Timer
  useEffect(() => {
    let interval: any = null;
    if (otpSent && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else if (resendTimer === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [otpSent, resendTimer]);

  // Handle Send OTP
  const handleSendOtp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!phone || phone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile phone number.');
      return;
    }
    setErrorMsg(null);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setOtpSent(true);
      setResendTimer(30);
      setOtpDigits(['4', '8', '2', '9']); // Auto pre-fill demo OTP
      setSuccessMsg('Verification OTP code sent to +91 ' + phone);
    }, 600);
  };

  // Handle OTP digit input change
  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otpDigits];
    newOtp[index] = value.slice(-1);
    setOtpDigits(newOtp);

    if (value && index < 3) {
      const nextInput = document.getElementById(`role-otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  // Handle Email Login Submission
  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!email || !password) {
      setErrorMsg('Please enter both your email address and password.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMsg(`Welcome back to ${roleConfig.roleTitle} portal! Redirecting...`);
      setTimeout(() => {
        roleConfig.onAuthSuccess();
      }, 600);
    }, 800);
  };

  // Handle Phone/OTP Login Submission
  const handlePhoneLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const enteredOtp = otpDigits.join('');
    if (enteredOtp.length < 4) {
      setErrorMsg('Please enter the 4-digit OTP sent to your phone.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMsg('OTP verified successfully!');
      setTimeout(() => {
        roleConfig.onAuthSuccess();
      }, 600);
    }, 800);
  };

  // Handle Registration Submission
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!regName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!regEmail.trim() || !regEmail.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!regPassword || regPassword.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setErrorMsg('Passwords do not match. Please verify your confirm password.');
      return;
    }
    if (!agreeTerms) {
      setErrorMsg('You must agree to the Terms of Service & Privacy Policy.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMsg(`Registration complete! Welcome to ${roleConfig.roleTitle} portal.`);
      setTimeout(() => {
        roleConfig.onAuthSuccess();
      }, 800);
    }, 900);
  };

  // Quick Demo Skip for Prototyping Evaluation
  const handleQuickDemoLogin = () => {
    setSuccessMsg(`Signing in as ${roleConfig.roleTitle}...`);
    setTimeout(() => {
      roleConfig.onAuthSuccess();
    }, 500);
  };

  return (
    <div className="w-full min-h-[85vh] bg-[#FAF8F5] p-4 sm:p-6 flex flex-col justify-between max-w-md mx-auto font-sans select-none rounded-3xl shadow-xl border border-slate-200">
      
      {/* Header Bar */}
      <div>
        <div className="flex items-center justify-between pt-2 pb-4">
          <button
            onClick={() => setRole('role_select')}
            className="p-2 rounded-xl bg-slate-200/80 hover:bg-slate-300 text-slate-800 transition-colors flex items-center gap-1 text-xs font-bold"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Roles</span>
          </button>

          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${roleConfig.badgeBg}`}>
            <Hexagon className="w-3.5 h-3.5" />
            <span>{roleConfig.roleTitle} Gateway</span>
          </div>

          <button
            onClick={handleQuickDemoLogin}
            className="px-3 py-1.5 rounded-xl bg-slate-900 text-amber-300 text-xs font-bold hover:bg-amber-600 hover:text-slate-950 transition-colors flex items-center gap-1 shadow-xs"
            title="Fast track login as demo user"
          >
            <Sparkles className="w-3 h-3" />
            <span>Demo Skip</span>
          </button>
        </div>

        {/* Brand Banner */}
        <div className="text-center my-3">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-tr ${roleConfig.themeGradient} mx-auto flex items-center justify-center text-white shadow-lg mb-2 border border-white/40`}>
            {roleConfig.icon}
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 font-serif">
            {authMode === 'login' ? `${roleConfig.roleTitle} Sign In` : `Register ${roleConfig.roleTitle}`}
          </h2>
          <p className="text-xs text-slate-600 mt-1 font-medium max-w-xs mx-auto">
            {authMode === 'login' ? roleConfig.loginSubtitle : roleConfig.registerSubtitle}
          </p>
        </div>

        {/* Status Messages */}
        {errorMsg && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2 animate-shake">
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* ================= LOGIN MODE ================= */}
        {authMode === 'login' && (
          <div className="space-y-4">
            {/* Method Tabs */}
            <div className="grid grid-cols-2 p-1 bg-slate-200/70 rounded-2xl border border-slate-300/60">
              <button
                type="button"
                onClick={() => {
                  setLoginMethod('email');
                  setErrorMsg(null);
                }}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  loginMethod === 'email'
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-300'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email & Password</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setLoginMethod('phone');
                  setErrorMsg(null);
                }}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  loginMethod === 'phone'
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-300'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Phone & OTP</span>
              </button>
            </div>

            {/* TAB 1: EMAIL LOGIN */}
            {loginMethod === 'email' && (
              <form onSubmit={handleEmailLogin} className="space-y-3.5 pt-1">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-slate-700">
                      Password
                    </label>
                    <a
                      href="#forgot"
                      onClick={(e) => {
                        e.preventDefault();
                        setSuccessMsg('Password recovery link dispatched.');
                      }}
                      className={`text-[11px] font-bold ${roleConfig.accentColor} hover:underline`}
                    >
                      Forgot Password?
                    </a>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-3 bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-600 font-medium">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 accent-amber-600 rounded"
                    />
                    <span>Remember this device</span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-3.5 px-6 rounded-2xl font-extrabold text-sm shadow-md flex items-center justify-center gap-2 transition-transform active:scale-98 cursor-pointer mt-2 ${roleConfig.btnBg}`}
                >
                  {isLoading ? (
                    <span>Authenticating...</span>
                  ) : (
                    <>
                      <span>Login to {roleConfig.roleTitle} Portal</span>
                      <ArrowRight className="w-4 h-4 stroke-[3]" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* TAB 2: PHONE & OTP LOGIN */}
            {loginMethod === 'phone' && (
              <form onSubmit={otpSent ? handlePhoneLogin : handleSendOtp} className="space-y-4 pt-1">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mobile Phone Number
                  </label>
                  <div className="relative flex items-center">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 font-bold text-xs">
                      +91
                    </div>
                    <input
                      type="tel"
                      placeholder="98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      disabled={otpSent}
                      className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 font-mono font-bold"
                    />
                    {otpSent && (
                      <button
                        type="button"
                        onClick={() => setOtpSent(false)}
                        className={`absolute right-3 text-[10px] font-bold ${roleConfig.accentColor} hover:underline`}
                      >
                        Change
                      </button>
                    )}
                  </div>
                </div>

                {otpSent && (
                  <div className="space-y-3 pt-1 animate-fade-in">
                    <div className="p-3 bg-slate-200/60 border border-slate-300 rounded-xl text-center">
                      <div className="text-[11px] font-bold text-slate-900 flex items-center justify-center gap-1">
                        <KeyRound className="w-3.5 h-3.5 text-slate-700" />
                        <span>Enter 4-Digit OTP Code</span>
                      </div>
                      <p className="text-[10px] text-slate-600 mt-0.5">
                        Demo verification code: <strong className="font-mono text-slate-900 font-bold">4829</strong>
                      </p>
                    </div>

                    <div className="flex items-center justify-center gap-3">
                      {otpDigits.map((digit, idx) => (
                        <input
                          key={idx}
                          id={`role-otp-input-${idx}`}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(idx, e.target.value)}
                          className="w-12 h-14 bg-white border-2 border-slate-300 rounded-2xl text-center text-xl font-bold font-mono text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 shadow-xs"
                        />
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs px-1 text-slate-500">
                      <span>Didn't receive OTP?</span>
                      {resendTimer > 0 ? (
                        <span className={`font-mono font-bold text-[11px] ${roleConfig.accentColor}`}>
                          Resend in {resendTimer}s
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleSendOtp()}
                          className={`font-bold hover:underline text-[11px] ${roleConfig.accentColor}`}
                        >
                          Resend OTP Code
                        </button>
                      )}
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-3.5 px-6 rounded-2xl font-extrabold text-sm shadow-md flex items-center justify-center gap-2 transition-transform active:scale-98 cursor-pointer mt-2 ${roleConfig.btnBg}`}
                >
                  {isLoading ? (
                    <span>Verifying...</span>
                  ) : otpSent ? (
                    <>
                      <span>Verify OTP & Login</span>
                      <CheckCircle2 className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      <span>Send Verification OTP</span>
                      <ArrowRight className="w-4 h-4 stroke-[3]" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Bottom Register Redirection */}
            <div className="pt-4 mt-2 border-t border-slate-200/80 text-center">
              <p className="text-xs text-slate-600 font-medium">
                New user?{' '}
                <button
                  onClick={() => {
                    setAuthMode('register');
                    setErrorMsg(null);
                    setSuccessMsg(null);
                  }}
                  className={`font-extrabold ${roleConfig.accentColor} hover:opacity-80 uppercase tracking-wider underline cursor-pointer ml-1`}
                >
                  REGISTER HERE
                </button>
              </p>
            </div>
          </div>
        )}

        {/* ================= REGISTER MODE ================= */}
        {authMode === 'register' && (
          <form onSubmit={handleRegister} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  placeholder="e.g. Ramesh Kumar"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  placeholder="ramesh@example.com"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showRegPassword ? 'text' : 'password'}
                  placeholder="At least 6 characters"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowRegPassword(!showRegPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showRegPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-700">
                  Confirm Password
                </label>
                {regConfirmPassword && (
                  <span
                    className={`text-[10px] font-bold ${
                      regPassword === regConfirmPassword ? 'text-emerald-600' : 'text-red-500'
                    }`}
                  >
                    {regPassword === regConfirmPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
                  </span>
                )}
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showRegPassword ? 'text' : 'password'}
                  placeholder="Re-enter password"
                  value={regConfirmPassword}
                  onChange={(e) => setRegConfirmPassword(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 bg-white border rounded-2xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none font-medium ${
                    regConfirmPassword && regPassword !== regConfirmPassword
                      ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                      : 'border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200'
                  }`}
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1 text-xs text-slate-600">
              <input
                type="checkbox"
                id="role-terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 accent-amber-600 rounded"
              />
              <label htmlFor="role-terms" className="cursor-pointer leading-tight">
                I agree to the <span className={`font-bold hover:underline ${roleConfig.accentColor}`}>Terms of Service</span> &{' '}
                <span className={`font-bold hover:underline ${roleConfig.accentColor}`}>Privacy Policy</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3.5 px-6 rounded-2xl font-extrabold text-sm shadow-md flex items-center justify-center gap-2 transition-transform active:scale-98 cursor-pointer mt-3 ${roleConfig.btnBg}`}
            >
              {isLoading ? (
                <span>Creating Account...</span>
              ) : (
                <>
                  <span>Register & Access {roleConfig.roleTitle} Portal</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </>
              )}
            </button>

            <div className="pt-3 border-t border-slate-200/80 text-center">
              <p className="text-xs text-slate-600 font-medium">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('login');
                    setErrorMsg(null);
                    setSuccessMsg(null);
                  }}
                  className={`font-extrabold ${roleConfig.accentColor} hover:opacity-80 uppercase tracking-wider underline cursor-pointer ml-1`}
                >
                  LOGIN HERE
                </button>
              </p>
            </div>
          </form>
        )}
      </div>

      {/* Footer Security Badge */}
      <div className="pt-4 text-center border-t border-slate-200/60 mt-4">
        <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
          <span>Secured by HONIVA Blockchain Identity Protocol</span>
        </div>
      </div>
    </div>
  );
};

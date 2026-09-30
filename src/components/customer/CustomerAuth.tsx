import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
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
} from 'lucide-react';

export const CustomerAuth: React.FC = () => {
  const { setRole, setCustomerTab } = useApp();

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

  // Status & Validation Feedback
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // OTP Timer Countdown
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

    // Auto focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
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
      setSuccessMsg('Login successful! Redirecting...');
      setTimeout(() => {
        setCustomerTab('home');
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
        setCustomerTab('home');
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
      setSuccessMsg('Account created successfully! Welcome to HONIVA.');
      setTimeout(() => {
        setCustomerTab('home');
      }, 800);
    }, 900);
  };

  // Quick Instant Login for Evaluation
  const handleQuickDemoLogin = () => {
    setSuccessMsg('Logging in as Verified Demo Customer...');
    setTimeout(() => {
      setCustomerTab('home');
    }, 500);
  };

  return (
    <div className="w-full min-h-[85vh] bg-[#FAF8F5] p-4 sm:p-6 flex flex-col justify-between max-w-md mx-auto font-sans select-none rounded-3xl shadow-xl border border-amber-200/60">
      
      {/* Top Header Navigation */}
      <div>
        <div className="flex items-center justify-between pt-2 pb-4">
          <button
            onClick={() => setRole('role_select')}
            className="p-2 rounded-xl bg-amber-100/80 hover:bg-amber-200 text-amber-900 transition-colors flex items-center gap-1 text-xs font-bold"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Roles</span>
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 rounded-full text-amber-900 text-xs font-bold border border-amber-300">
            <Hexagon className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
            <span>HONIVA App</span>
          </div>

          <button
            onClick={handleQuickDemoLogin}
            className="px-3 py-1.5 rounded-xl bg-slate-900 text-amber-300 text-xs font-bold hover:bg-amber-600 hover:text-slate-950 transition-colors flex items-center gap-1 shadow-xs"
            title="Fast track login as demo customer"
          >
            <Sparkles className="w-3 h-3" />
            <span>Demo Skip</span>
          </button>
        </div>

        {/* Brand Banner */}
        <div className="text-center my-3">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-300 mx-auto flex items-center justify-center text-white shadow-honey mb-2 border border-amber-300">
            <Hexagon className="w-10 h-10 stroke-[2.5]" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 font-serif">
            {authMode === 'login' ? 'Customer Sign In' : 'Create Customer Account'}
          </h2>
          <p className="text-xs text-slate-600 mt-1 font-medium">
            {authMode === 'login'
              ? 'Access honey batch traceability & lab quality certificates'
              : 'Sign up to unlock 100% verified pure honey history'}
          </p>
        </div>

        {/* Success / Error Notification Messages */}
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

        {/* ================= LOGIN FORM MODE ================= */}
        {authMode === 'login' && (
          <div className="space-y-4">
            {/* Method Toggle Tabs (Email vs Phone OTP) */}
            <div className="grid grid-cols-2 p-1 bg-amber-100/70 rounded-2xl border border-amber-200/80">
              <button
                type="button"
                onClick={() => {
                  setLoginMethod('email');
                  setErrorMsg(null);
                }}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  loginMethod === 'email'
                    ? 'bg-white text-slate-900 shadow-sm border border-amber-300'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Mail className="w-3.5 h-3.5 text-amber-600" />
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
                    ? 'bg-white text-slate-900 shadow-sm border border-amber-300'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5 text-amber-600" />
                <span>Phone & OTP</span>
              </button>
            </div>

            {/* TAB 1: EMAIL & PASSWORD LOGIN */}
            {loginMethod === 'email' && (
              <form onSubmit={handleEmailLogin} className="space-y-3.5 pt-1">
                {/* Email Input */}
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

                {/* Password Input */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-slate-700">
                      Password
                    </label>
                    <a
                      href="#forgot"
                      onClick={(e) => {
                        e.preventDefault();
                        setSuccessMsg('Reset password instructions sent to your email.');
                      }}
                      className="text-[11px] font-bold text-amber-700 hover:underline"
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

                {/* Remember Me Checkbox */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-600 font-medium">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 accent-amber-600 rounded"
                    />
                    <span>Keep me logged in</span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold text-sm shadow-honey flex items-center justify-center gap-2 transition-transform active:scale-98 cursor-pointer mt-2"
                >
                  {isLoading ? (
                    <span>Authenticating...</span>
                  ) : (
                    <>
                      <span>Login to HONIVA</span>
                      <ArrowRight className="w-4 h-4 stroke-[3]" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* TAB 2: PHONE & OTP LOGIN */}
            {loginMethod === 'phone' && (
              <form onSubmit={otpSent ? handlePhoneLogin : handleSendOtp} className="space-y-4 pt-1">
                {/* Phone Number Input */}
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
                        className="absolute right-3 text-[10px] font-bold text-amber-700 hover:underline"
                      >
                        Change
                      </button>
                    )}
                  </div>
                </div>

                {/* OTP Input Boxes (Appears after clicking Send OTP) */}
                {otpSent && (
                  <div className="space-y-3 pt-1 animate-fade-in">
                    <div className="p-3 bg-amber-100/70 border border-amber-300/80 rounded-xl text-center">
                      <div className="text-[11px] font-bold text-amber-900 flex items-center justify-center gap-1">
                        <KeyRound className="w-3.5 h-3.5 text-amber-700" />
                        <span>Enter 4-Digit OTP Code</span>
                      </div>
                      <p className="text-[10px] text-amber-800 mt-0.5">
                        Demo verification code: <strong className="font-mono text-amber-950 font-bold">4829</strong>
                      </p>
                    </div>

                    <div className="flex items-center justify-center gap-3">
                      {otpDigits.map((digit, idx) => (
                        <input
                          key={idx}
                          id={`otp-input-${idx}`}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(idx, e.target.value)}
                          className="w-12 h-14 bg-white border-2 border-amber-300 rounded-2xl text-center text-xl font-bold font-mono text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 shadow-xs"
                        />
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs px-1 text-slate-500">
                      <span>Didn't receive OTP?</span>
                      {resendTimer > 0 ? (
                        <span className="font-mono text-amber-700 font-bold text-[11px]">Resend in {resendTimer}s</span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleSendOtp()}
                          className="font-bold text-amber-700 hover:underline text-[11px]"
                        >
                          Resend OTP Code
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Primary Action Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold text-sm shadow-honey flex items-center justify-center gap-2 transition-transform active:scale-98 cursor-pointer mt-2"
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

            {/* Bottom Register Redirection Callout Banner */}
            <div className="pt-4 mt-2 border-t border-slate-200/80 text-center">
              <p className="text-xs text-slate-600 font-medium">
                New user?{' '}
                <button
                  onClick={() => {
                    setAuthMode('register');
                    setErrorMsg(null);
                    setSuccessMsg(null);
                  }}
                  className="font-extrabold text-amber-700 hover:text-amber-800 uppercase tracking-wider underline cursor-pointer ml-1"
                >
                  REGISTER HERE
                </button>
              </p>
            </div>
          </div>
        )}

        {/* ================= REGISTER FORM MODE ================= */}
        {authMode === 'register' && (
          <form onSubmit={handleRegister} className="space-y-3.5">
            {/* Full Name */}
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
                  placeholder="e.g. Ananya Sharma"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 font-medium"
                />
              </div>
            </div>

            {/* Email Address */}
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
                  placeholder="ananya@example.com"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 font-medium"
                />
              </div>
            </div>

            {/* Password */}
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

            {/* Confirm Password */}
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

            {/* Terms Checkbox */}
            <div className="flex items-center gap-2 pt-1 text-xs text-slate-600">
              <input
                type="checkbox"
                id="terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 accent-amber-600 rounded"
              />
              <label htmlFor="terms" className="cursor-pointer leading-tight">
                I agree to the <span className="text-amber-700 font-bold hover:underline">Terms of Service</span> &{' '}
                <span className="text-amber-700 font-bold hover:underline">Privacy Policy</span>
              </label>
            </div>

            {/* Submit Registration Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold text-sm shadow-honey flex items-center justify-center gap-2 transition-transform active:scale-98 cursor-pointer mt-3"
            >
              {isLoading ? (
                <span>Creating Account...</span>
              ) : (
                <>
                  <span>Create Account & Register</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </>
              )}
            </button>

            {/* Back to Login Link */}
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
                  className="font-extrabold text-amber-700 hover:text-amber-800 uppercase tracking-wider underline cursor-pointer ml-1"
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

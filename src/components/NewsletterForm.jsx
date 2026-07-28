import { useState } from 'react';
import { Send, CheckCircle, Mail, Sparkles } from 'lucide-react';

export const NewsletterForm = ({ compact = false, className = '' }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('لطفاً یک آدرس ایمیل معتبر وارد کنید.');
      return;
    }

    setStatus('loading');
    
    // Simulate API subscription delay
    setTimeout(() => {
      setStatus('success');
      setMessage('اشتراک شما با موفقیت فعال شد! به خانواده Tech Magazine خوش آمدید.');
      setEmail('');
      
      // Reset message after 5 seconds
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    }, 600);
  };

  if (compact) {
    return (
      <div className={`space-y-3 ${className}`}>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-grow">
            <Mail className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === 'error') setStatus('idle');
              }}
              placeholder="آدرس ایمیل شما..."
              className="w-full bg-[#161822] border border-[#2e3346] focus:border-purple-500 rounded-xl py-2.5 pr-10 pl-3 text-xs text-slate-200 placeholder-slate-500 outline-none transition-all shadow-inner"
            />
          </div>
          <button 
            type="submit"
            disabled={status === 'loading'}
            className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 active:scale-[0.98] text-white font-bold text-xs transition-all flex items-center justify-center gap-2 flex-shrink-0 shadow-lg shadow-purple-600/30 disabled:opacity-50"
          >
            <span>{status === 'loading' ? 'در حال ثبت...' : 'عضویت'}</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

        {status === 'success' && (
          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium flex items-center gap-2 animate-in fade-in">
            <CheckCircle className="w-4 h-4 flex-shrink-0" />
            <span>{message}</span>
          </div>
        )}

        {status === 'error' && (
          <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-medium animate-in fade-in">
            {message}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#161824] via-[#11131c] to-[#0d0f17] border border-purple-500/25 shadow-2xl ${className}`}>
      {/* Background Accent glow */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-purple-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-2xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
          <span>خبرنامه اختصاصی فناوری و هوش مصنوعی</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-black text-slate-100 leading-tight">
          جدیدترین تحلیل‌ها و مقالات تخصصی را در ایمیل خود دریافت کنید
        </h3>

        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
          با عضویت در خبرنامه رایگان Tech Magazine، هفته‌ای یک‌بار برگزیده مقالات تکنولوژی، هوش مصنوعی و آموزش‌های کاربردی را دریافت خواهید کرد. (بدون تبلیغات و اسپم)
        </p>

        <form onSubmit={handleSubmit} className="pt-2 max-w-lg mx-auto flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-grow">
            <Mail className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === 'error') setStatus('idle');
              }}
              placeholder="آدرس ایمیل شما (مثال: email@example.com)..."
              className="w-full bg-[#0d0f17] border border-[#2e3346] focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 rounded-2xl py-3.5 pr-10 pl-4 text-xs sm:text-sm text-slate-100 placeholder-slate-500 outline-none transition-all shadow-inner"
            />
          </div>
          <button 
            type="submit"
            disabled={status === 'loading'}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 active:scale-[0.98] text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 flex-shrink-0 shadow-lg shadow-purple-600/30 disabled:opacity-50"
          >
            <span>{status === 'loading' ? 'در حال ثبت نام...' : 'اشتراک در خبرنامه'}</span>
            <Send className="w-4 h-4" />
          </button>
        </form>

        {status === 'success' && (
          <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 animate-in fade-in">
            <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{message}</span>
          </div>
        )}

        {status === 'error' && (
          <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold animate-in fade-in">
            {message}
          </div>
        )}

        <div className="pt-1 flex items-center justify-center gap-4 text-[11px] text-slate-500">
          <span>🔒 حفظ کامل حریم خصوصی</span>
          <span>•</span>
          <span>✉️ لغو اشتراک در هر زمان با یک کلیک</span>
        </div>
      </div>
    </div>
  );
};

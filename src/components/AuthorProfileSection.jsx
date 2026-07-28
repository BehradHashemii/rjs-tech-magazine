import { CheckCircle2, Send, Mail, Sparkles } from 'lucide-react';
import { AUTHOR_BEHRAD } from '../data/articles';

export const AuthorProfileSection = ({ author = AUTHOR_BEHRAD, className = '' }) => {
  const socials = author.socials || {
    github: 'https://github.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
    telegram: 'https://t.me',
    email: 'mailto:behrad@example.com'
  };

  return (
    <div className={`p-6 sm:p-8 rounded-3xl bg-[#13151c] border border-purple-500/25 shadow-xl relative overflow-hidden ${className}`}>
      {/* Decorative subtle background glow */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-purple-600/10 rounded-full blur-2xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-right">
        {/* Author Avatar with Ring & Status */}
        <div className="relative flex-shrink-0 group">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl p-1 bg-gradient-to-tr from-purple-600 via-indigo-500 to-cyan-400 shadow-lg shadow-purple-900/20">
            <img 
              src={author.avatar} 
              alt={author.name} 
              className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="absolute -bottom-1 -left-1 px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-black text-[10px] flex items-center gap-1 shadow-md border border-[#13151c]">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-ping"></span>
            <span>فعال</span>
          </span>
        </div>

        {/* Bio & Details */}
        <div className="flex-grow space-y-3">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
            <h3 className="text-lg sm:text-xl font-black text-slate-100 flex items-center gap-1.5">
              <span>{author.name}</span>
              <CheckCircle2 className="w-4 h-4 text-cyan-400 fill-cyan-400/20" />
            </h3>
            <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-bold flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>{author.role || 'سردبیر ارشد مجله'}</span>
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
            {author.bio}
          </p>

          {/* Social Links Bar */}
          <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-2.5">
            <span className="text-xs font-bold text-slate-400 ml-1">شبکه‌های اجتماعی:</span>

            {socials.github && (
              <a 
                href={socials.github} 
                target="_blank" 
                rel="noopener noreferrer"
                title="گیت‌هاب"
                className="w-9 h-9 rounded-xl bg-[#1a1d28] border border-[#2e3346] hover:border-purple-500 hover:bg-purple-600/20 text-slate-300 hover:text-purple-300 transition-all flex items-center justify-center"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>
            )}

            {socials.twitter && (
              <a 
                href={socials.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                title="توییتر / X"
                className="w-9 h-9 rounded-xl bg-[#1a1d28] border border-[#2e3346] hover:border-cyan-500 hover:bg-cyan-600/20 text-slate-300 hover:text-cyan-300 transition-all flex items-center justify-center"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            )}

            {socials.linkedin && (
              <a 
                href={socials.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                title="لینکدین"
                className="w-9 h-9 rounded-xl bg-[#1a1d28] border border-[#2e3346] hover:border-blue-500 hover:bg-blue-600/20 text-slate-300 hover:text-blue-300 transition-all flex items-center justify-center"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.72a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26z"/>
                </svg>
              </a>
            )}

            {socials.telegram && (
              <a 
                href={socials.telegram} 
                target="_blank" 
                rel="noopener noreferrer"
                title="تلگرام"
                className="w-9 h-9 rounded-xl bg-[#1a1d28] border border-[#2e3346] hover:border-sky-500 hover:bg-sky-600/20 text-slate-300 hover:text-sky-300 transition-all flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </a>
            )}

            {socials.email && (
              <a 
                href={socials.email} 
                title="ارسال ایمیل مستقیم"
                className="w-9 h-9 rounded-xl bg-[#1a1d28] border border-[#2e3346] hover:border-rose-500 hover:bg-rose-600/20 text-slate-300 hover:text-rose-300 transition-all flex items-center justify-center"
              >
                <Mail className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

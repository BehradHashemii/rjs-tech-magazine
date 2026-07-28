import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { NewsletterForm } from './NewsletterForm';

export const Footer = ({ onOpenSecretEditor }) => {
  const [clickCount, setClickCount] = useState(0);

  const handleSecretClick = () => {
    const nextCount = clickCount + 1;
    setClickCount(nextCount);
    if (nextCount >= 3) {
      setClickCount(0);
      if (onOpenSecretEditor) onOpenSecretEditor();
    }
  };

  return (
    <footer className="bg-[#181a20] border-t border-[#2e3446] text-slate-400 text-xs mt-20">
      {/* Newsletter Section */}
      <div className="border-b border-[#2e3446] bg-[#1d2029] py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <NewsletterForm />
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        
        {/* Magazine Identity */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-600 flex items-center justify-center font-black text-white text-xs">
              TECH
            </div>
            <div>
              <div className="font-bold text-base text-slate-100">Tech Magazine</div>
              <div className="text-[11px] text-purple-400 font-medium">مجله تخصصی فناوری و وب</div>
            </div>
          </div>

          <p className="text-slate-400 leading-relaxed text-xs">
            پایگاه تخصصی تحلیل فناوری، هوش مصنوعی، امنیت سایبری و راهنماهای کاربردی برنامه‌نویسی و علوم رایانه.
          </p>
        </div>

        {/* Dynamic Category Columns */}
        {CATEGORIES.map((category) => (
          <div key={category.id} className="space-y-3">
            <h4 className="font-bold text-slate-200 text-sm border-b border-[#2e3446] pb-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-500"></span>
              <Link to={`/${category.slug}`} className="hover:text-purple-300">{category.title}</Link>
            </h4>
            <ul className="space-y-2">
              {category.subcategories.map((sub) => (
                <li key={sub.id}>
                  <Link 
                    to={`/${category.slug}/${sub.slug}`}
                    className="text-slate-400 hover:text-purple-300 transition-colors flex items-center gap-1.5 py-0.5"
                  >
                    <span>•</span>
                    <span>{sub.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#2e3446] py-6 px-4 bg-[#14161c]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-[11px]">
          <div onClick={handleSecretClick} className="cursor-pointer select-none">
            تمام حقوق این مجله متعلق به <strong>Tech Magazine</strong> می‌باشد. © ۱۴۰۵
          </div>
          <div className="flex items-center gap-4">
            <Link to="/" className="hover:text-slate-200">صفحه اصلی</Link>
            <span>•</span>
            <Link to="/editor-picks" className="hover:text-slate-200">پیشنهاد ویژه</Link>
            <span>•</span>
            <button
              onClick={onOpenSecretEditor}
              title="پنل مدیریت نویسنده (مخفی)"
              className="text-slate-600 hover:text-purple-400 transition-colors p-1 rounded-md"
            >
              <Lock className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};


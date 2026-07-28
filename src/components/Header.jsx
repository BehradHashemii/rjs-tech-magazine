import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Search, Cpu, Globe, ShieldCheck, Rocket, Wrench, Atom, 
  Sparkles, Terminal, Smartphone, ChevronDown, Menu, X, 
  BookOpen, ArrowLeft, Flame
} from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { ARTICLES } from '../data/articles';

export const Header = ({ onOpenSearchModal }) => {
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const closeMenus = () => {
    setActiveMegaMenu(null);
    setMobileMenuOpen(false);
  };

  const getSubcategoryIcon = (iconName) => {
    switch (iconName) {
      case 'Cpu': return <Cpu className="w-4 h-4 text-purple-400" />;
      case 'Globe': return <Globe className="w-4 h-4 text-purple-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-4 h-4 text-purple-400" />;
      case 'Rocket': return <Rocket className="w-4 h-4 text-cyan-400" />;
      case 'Wrench': return <Wrench className="w-4 h-4 text-cyan-400" />;
      case 'Atom': return <Atom className="w-4 h-4 text-cyan-400" />;
      case 'Sparkles': return <Sparkles className="w-4 h-4 text-amber-400" />;
      case 'Terminal': return <Terminal className="w-4 h-4 text-amber-400" />;
      case 'Smartphone': return <Smartphone className="w-4 h-4 text-amber-400" />;
      default: return <BookOpen className="w-4 h-4 text-purple-400" />;
    }
  };

  return (
    <header className={`sticky top-0 z-50 transition-colors duration-200 ${
      scrolled 
        ? 'bg-[#181a20]/95 backdrop-blur-md border-b border-[#2e3446] shadow-xl' 
        : 'bg-[#181a20] border-b border-[#2a2f3f]'
    }`}>
      {/* Single Unified Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20" ref={navRef}>
          
          {/* Main Logo (Only One Logo in Header) */}
          <Link to="/" onClick={closeMenus} className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-purple-600 flex items-center justify-center font-black text-white text-xs sm:text-sm tracking-wider shadow-md">
              TECH
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-100 group-hover:text-purple-300 transition-colors">
                Tech Magazine
              </span>
              <span className="text-[10px] text-slate-400 font-medium hidden sm:inline">مجله تخصصی وب و تکنولوژی</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link 
              to="/" 
              onClick={closeMenus}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                location.pathname === '/' 
                  ? 'text-purple-300 bg-purple-600/20 border border-purple-500/30' 
                  : 'text-slate-300 hover:text-white hover:bg-[#202432]'
              }`}
            >
              صفحه اصلی
            </Link>

            {CATEGORIES.map((category) => {
              const isActive = location.pathname.startsWith(`/${category.slug}`);
              const isMegaOpen = activeMegaMenu === category.slug;

              return (
                <div 
                  key={category.id} 
                  className="relative"
                  onMouseEnter={() => setActiveMegaMenu(category.slug)}
                  onMouseLeave={() => setActiveMegaMenu(null)}
                >
                  <Link
                    to={`/${category.slug}`}
                    onClick={closeMenus}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                      isActive || isMegaOpen
                        ? 'text-purple-300 bg-purple-600/20 border border-purple-500/30'
                        : 'text-slate-300 hover:text-white hover:bg-[#202432]'
                    }`}
                  >
                    <span>{category.title}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isMegaOpen ? 'rotate-180 text-purple-400' : 'text-slate-400'}`} />
                  </Link>

                  {/* Mega Menu Dropdown */}
                  {isMegaOpen && (
                    <div className="absolute top-full right-0 w-[580px] pt-2 z-50 animate-in fade-in duration-150">
                      <div className="bg-[#202432] border border-[#2e3446] rounded-2xl shadow-2xl p-5 grid grid-cols-12 gap-5">
                        {/* Subcategories Column */}
                        <div className="col-span-7 space-y-2">
                          <div className="flex items-center justify-between pb-2 border-b border-[#2e3446]">
                            <span className="text-xs font-bold text-slate-400">
                              دسته‌بندی‌های {category.title}
                            </span>
                            <Link 
                              to={`/${category.slug}`}
                              onClick={closeMenus}
                              className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 font-medium"
                            >
                              مشاهده همه
                              <ArrowLeft className="w-3 h-3" />
                            </Link>
                          </div>

                          {category.subcategories.map((sub) => (
                            <Link
                              key={sub.id}
                              to={`/${category.slug}/${sub.slug}`}
                              onClick={closeMenus}
                              className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-[#282d3e] border border-transparent hover:border-[#343b4f] transition-all group/sub"
                            >
                              <div className="p-1.5 rounded-lg bg-[#181a20] group-hover/sub:bg-purple-600/20 transition-colors">
                                {getSubcategoryIcon(sub.iconName)}
                              </div>
                              <div>
                                <h4 className="text-xs font-bold text-slate-200 group-hover/sub:text-purple-300 transition-colors">
                                  {sub.title}
                                </h4>
                                <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                                  {sub.description}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>

                        {/* Article Preview Box */}
                        <div className="col-span-5 bg-[#181a20] border border-[#2e3446] rounded-xl p-3.5 flex flex-col justify-between">
                          <div>
                            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-purple-600/20 text-purple-300 mb-2">
                              مقاله پیشنهادی {category.title}
                            </span>
                            {(() => {
                              const catArticle = ARTICLES.find(a => a.categorySlug === category.slug) || ARTICLES[0];
                              return (
                                <>
                                  <img 
                                    src={catArticle.coverImage} 
                                    alt={catArticle.title}
                                    className="w-full h-24 object-cover rounded-lg mb-2 border border-[#2e3446]" 
                                    referrerPolicy="no-referrer"
                                  />
                                  <Link to={`/article/${catArticle.slug}`} onClick={closeMenus}>
                                    <h5 className="text-xs font-bold text-slate-200 hover:text-purple-300 line-clamp-2 leading-snug">
                                      {catArticle.title}
                                    </h5>
                                  </Link>
                                </>
                              );
                            })()}
                          </div>
                        </div>

                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            <Link 
              to="/editor-picks"
              onClick={closeMenus}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-amber-300 hover:bg-amber-500/10 transition-colors"
            >
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
              <span>پیشنهاد ویژه</span>
            </Link>
          </nav>

          {/* Header Controls: Single Search Trigger Button + Mobile Menu Toggle */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenSearchModal}
              className="flex items-center justify-between gap-2.5 bg-[#202432] border border-[#2e3446] hover:border-purple-500/50 rounded-xl py-2 px-3 text-xs text-slate-300 hover:text-white cursor-pointer transition-all shadow-sm group w-auto sm:w-52"
              title="جستجو در مقالات (Ctrl+K)"
            >
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-slate-400 group-hover:text-purple-400 transition-colors" />
                <span className="hidden sm:inline font-medium text-slate-300">جستجو در مقالات...</span>
                <span className="sm:hidden font-medium text-slate-300">جستجو</span>
              </div>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-[#181a20] border border-[#2e3446] rounded">
                Ctrl+K
              </kbd>
            </button>

            {/* Mobile / Tablet Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 sm:p-2.5 rounded-xl bg-[#202432] border border-[#2e3446] text-slate-200 hover:text-white hover:border-purple-500/50 transition-all flex items-center gap-1.5"
              aria-label="باز کردن منو"
            >
              <Menu className="w-5 h-5 text-purple-400" />
            </button>
          </div>

        </div>
      </div>

      {/* FULL-SCREEN MOBILE OVERLAY MENU */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-[#181a20] flex flex-col h-screen w-screen overflow-hidden animate-in fade-in duration-200">
          
          {/* Mobile Overlay Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#2e3446] bg-[#202432] flex-shrink-0">
            <Link to="/" onClick={closeMenus} className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center font-black text-white text-xs">
                TECH
              </div>
              <span className="font-bold text-slate-100 text-sm">منوی اصلی</span>
            </Link>

            <button
              onClick={closeMenus}
              className="p-2 rounded-xl bg-[#181a20] border border-[#2e3446] text-slate-300 hover:text-white hover:bg-rose-500/20 transition-all"
              aria-label="بستن منو"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Menu Body */}
          <div className="flex-grow overflow-y-auto p-5 space-y-5">
            <button
              onClick={() => {
                closeMenus();
                onOpenSearchModal();
              }}
              className="w-full bg-[#202432] border border-[#2e3446] hover:border-purple-500 rounded-xl p-3.5 text-slate-200 flex items-center justify-between shadow-sm transition-all text-xs font-bold"
            >
              <div className="flex items-center gap-2.5">
                <Search className="w-4 h-4 text-purple-400" />
                <span>جستجو در مقالات مجله...</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-purple-600/20 text-purple-300 text-[10px]">
                Ctrl+K
              </span>
            </button>

            <div className="grid grid-cols-2 gap-2.5">
              <Link 
                to="/" 
                onClick={closeMenus}
                className="p-3 rounded-xl bg-[#202432] border border-[#2e3446] text-slate-200 font-bold text-xs flex items-center gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                <span>صفحه اصلی</span>
              </Link>

              <Link 
                to="/editor-picks" 
                onClick={closeMenus}
                className="p-3 rounded-xl bg-[#202432] border border-amber-500/30 text-amber-300 font-bold text-xs flex items-center gap-2"
              >
                <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
                <span>پیشنهاد ویژه</span>
              </Link>
            </div>

            <div className="space-y-3 pt-1">
              <span className="text-xs font-bold text-slate-400">دسته‌بندی‌های موضوعی</span>

              <div className="space-y-3">
                {CATEGORIES.map((cat) => (
                  <div key={cat.id} className="p-3.5 rounded-xl bg-[#202432] border border-[#2e3446] space-y-2.5">
                    <div className="flex items-center justify-between pb-1.5 border-b border-[#2e3446]">
                      <span className="font-bold text-slate-100 text-xs">{cat.title}</span>
                      <Link 
                        to={`/${cat.slug}`} 
                        onClick={closeMenus} 
                        className="text-[11px] text-purple-400 font-bold flex items-center gap-1"
                      >
                        <span>همه</span>
                        <ArrowLeft className="w-3 h-3" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 gap-1.5">
                      {cat.subcategories.map((sub) => (
                        <Link
                          key={sub.id}
                          to={`/${cat.slug}/${sub.slug}`}
                          onClick={closeMenus}
                          className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-[#282d3e] text-slate-300 hover:text-purple-300 text-xs transition-all"
                        >
                          {getSubcategoryIcon(sub.iconName)}
                          <span className="font-medium">{sub.title}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          <div className="p-4 bg-[#202432] border-t border-[#2e3446] flex-shrink-0">
            <button
              onClick={closeMenus}
              className="w-full py-2.5 rounded-xl bg-[#181a20] text-slate-300 font-bold text-xs flex items-center justify-center gap-2"
            >
              <X className="w-4 h-4 text-rose-400" />
              <span>بستن منو</span>
            </button>
          </div>

        </div>
      )}
    </header>
  );
};

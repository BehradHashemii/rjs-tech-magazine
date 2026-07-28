import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Clock, ArrowLeft } from 'lucide-react';
import { useArticles } from '../data/articleStore';

export const SearchModal = ({ isOpen, onClose }) => {
  const articles = useArticles();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = query.trim() === '' 
    ? articles.slice(0, 4) 
    : articles.filter(a => 
        a.title.includes(query) || 
        a.excerpt.includes(query) || 
        a.tags.some(t => t.includes(query))
      );


  const handleSelectArticle = (slug) => {
    navigate(`/article/${slug}`);
    onClose();
  };

  const handleFullSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-[#181a20]/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#202432] border border-[#2e3446] rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Search Header Form */}
        <form onSubmit={handleFullSearch} className="relative p-4 border-b border-[#2e3446] flex items-center gap-3">
          <Search className="w-5 h-5 text-purple-400 flex-shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="جستجو در مقالات، هوش مصنوعی، امنیت، شبکه..."
            className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-400 outline-none"
          />
          <button 
            type="button" 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#181a20]"
          >
            <X className="w-5 h-5" />
          </button>
        </form>

        {/* Search Results / Suggestions */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>{query.trim() === '' ? 'مقالات پیشنهادی و پربازدید' : `نتایج یافت شده (${filtered.length.toLocaleString('fa-IR')})`}</span>
            {query.trim() !== '' && (
              <button 
                type="button" 
                onClick={handleFullSearch}
                className="text-purple-400 hover:underline flex items-center gap-1"
              >
                مشاهده همه نتایج
                <ArrowLeft className="w-3 h-3" />
              </button>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-xs">
              هیچ مقاله‌ای با عبارت «{query}» یافت نشد.
            </div>
          ) : (
            filtered.map((article) => (
              <div
                key={article.id}
                onClick={() => handleSelectArticle(article.slug)}
                className="p-3 rounded-xl hover:bg-[#181a20] border border-transparent hover:border-[#2e3446] cursor-pointer transition-all flex items-center gap-4 group"
              >
                <img 
                  src={article.coverImage} 
                  alt={article.title} 
                  className="w-16 h-12 rounded-lg object-cover flex-shrink-0 bg-[#181a20]"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-grow min-w-0">
                  <h4 className="text-xs font-bold text-slate-200 group-hover:text-purple-300 transition-colors line-clamp-1">
                    {article.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                    {article.excerpt}
                  </p>
                </div>
                <div className="text-[10px] text-slate-400 flex items-center gap-1 flex-shrink-0">
                  <Clock className="w-3 h-3 text-cyan-400" />
                  <span>{article.readTimeMinutes} دقیقه</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Search Footer */}
        <div className="p-3 bg-[#181a20] border-t border-[#2e3446] text-[11px] text-slate-400 flex items-center justify-between">
          <span>برای بسته شدن کلید <kbd className="px-1.5 py-0.5 rounded bg-[#202432] text-slate-300 border border-[#2e3446]">ESC</kbd> را بفشارید.</span>
          <span className="text-purple-400 font-medium">Tech Magazine Search</span>
        </div>

      </div>
    </div>
  );
};

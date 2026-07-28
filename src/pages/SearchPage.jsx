import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useArticles } from '../data/articleStore';
import { ArticleCard } from '../components/ArticleCard';

export const SearchPage = () => {
  const articles = useArticles();
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);

  const results = query.trim() === ''
    ? articles
    : articles.filter(a => 
        a.title.includes(query) ||
        a.excerpt.includes(query) ||
        a.content.includes(query) ||
        a.tags.some(t => t.includes(query))
      );


  return (
    <div className="space-y-8 py-8 min-h-screen">
      
      {/* Search Header */}
      <div className="bg-[#13151c] border border-[#2a2e3d] rounded-3xl p-8 space-y-4 text-center max-w-3xl mx-auto shadow-2xl">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-100">نتایج جستجو در Tech Magazine</h1>
        <p className="text-xs text-slate-400">جستجو در تمام مقالات نگارش شده توسط بهراد هاشمی</p>

        <form onSubmit={(e) => e.preventDefault()} className="relative max-w-xl mx-auto">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="عبارت مورد نظر خود را تایپ کنید..."
            className="w-full bg-[#0b0c10] border border-[#2a2e3d] focus:border-purple-500 rounded-2xl py-3 pr-11 pl-4 text-xs text-slate-200 placeholder-slate-500 outline-none shadow-inner"
          />
          <Search className="w-4 h-4 text-purple-400 absolute right-4 top-1/2 -translate-y-1/2" />
        </form>

        <div className="text-xs text-slate-400 pt-2">
          یافت شده: <strong className="text-purple-300 font-bold">{results.length.toLocaleString('fa-IR')}</strong> مقاله
        </div>
      </div>

      {/* Grid of Results */}
      {results.length === 0 ? (
        <div className="text-center py-16 bg-[#13151c] rounded-3xl border border-[#2a2e3d] text-slate-400 space-y-3">
          <p className="text-base font-bold text-slate-200">نتیجه‌ای یافت نشد.</p>
          <p className="text-xs">عبارت دیگری را جستجو کنید یا از منوی بالای صفحه موضوع متفاوتی را انتخاب کنید.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {results.map((art) => (
            <ArticleCard key={art.id} article={art} />
          ))}
        </div>
      )}

    </div>
  );
};

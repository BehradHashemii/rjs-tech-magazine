import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Cpu, Globe, ShieldCheck, Rocket, Wrench, Atom, 
  Sparkles, Terminal, Smartphone, BookOpen, Search
} from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { useArticles } from '../data/articleStore';
import { ArticleCard } from '../components/ArticleCard';

export const CategoryPage = () => {
  const articles = useArticles();
  const { categorySlug, subcategorySlug } = useParams();
  const [filterQuery, setFilterQuery] = useState('');

  // Find matching category
  const currentCategory = CATEGORIES.find(c => c.slug === categorySlug) || CATEGORIES[0];
  
  // Find subcategory if present
  const currentSubcategory = subcategorySlug 
    ? currentCategory.subcategories.find(s => s.slug === subcategorySlug)
    : null;

  // Filter articles
  let filteredArticles = articles.filter(a => {
    if (subcategorySlug) {
      return a.categorySlug === categorySlug && a.subcategorySlug === subcategorySlug;
    }
    return a.categorySlug === categorySlug;
  });


  if (filterQuery.trim()) {
    filteredArticles = filteredArticles.filter(a => 
      a.title.includes(filterQuery) || 
      a.excerpt.includes(filterQuery) ||
      a.tags.some(t => t.includes(filterQuery))
    );
  }

  const getSubcategoryIcon = (iconName) => {
    switch (iconName) {
      case 'Cpu': return <Cpu className="w-5 h-5 text-purple-400" />;
      case 'Globe': return <Globe className="w-5 h-5 text-purple-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-purple-400" />;
      case 'Rocket': return <Rocket className="w-5 h-5 text-cyan-400" />;
      case 'Wrench': return <Wrench className="w-5 h-5 text-cyan-400" />;
      case 'Atom': return <Atom className="w-5 h-5 text-cyan-400" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-amber-400" />;
      case 'Terminal': return <Terminal className="w-5 h-5 text-amber-400" />;
      case 'Smartphone': return <Smartphone className="w-5 h-5 text-amber-400" />;
      default: return <BookOpen className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <div className="space-y-10 py-6 min-h-screen">
      
      {/* Category Banner */}
      <div className="bg-[#13151c] border border-[#2a2e3d] rounded-3xl p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl -z-0"></div>

        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="flex items-center gap-2 text-xs text-purple-400 font-semibold">
            <Link to="/" className="hover:underline text-slate-400">خانه</Link>
            <span>/</span>
            <Link to={`/${currentCategory.slug}`} className="hover:underline">{currentCategory.title}</Link>
            {currentSubcategory && (
              <>
                <span>/</span>
                <span className="text-purple-300 font-bold">{currentSubcategory.title}</span>
              </>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-100">
            {currentSubcategory ? currentSubcategory.title : currentCategory.title}
          </h1>

          <p className="text-slate-400 text-sm leading-relaxed">
            {currentSubcategory ? currentSubcategory.description : currentCategory.description}
          </p>

          <div className="pt-2 flex items-center gap-4 text-xs text-slate-500">
            <span>تعداد مقالات: <strong className="text-slate-200">{filteredArticles.length.toLocaleString('fa-IR')}</strong></span>
            <span>•</span>
            <span>نویسنده همه مقالات: <strong className="text-purple-300 font-bold">بهراد هاشمی</strong></span>
          </div>
        </div>
      </div>

      {/* Subcategory Pills Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#202330]">
        <div className="flex flex-wrap gap-2">
          <Link
            to={`/${currentCategory.slug}`}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              !subcategorySlug
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                : 'bg-[#13151c] hover:bg-[#1a1d26] text-slate-300 border border-[#2a2e3d]'
            }`}
          >
            همه مقالات {currentCategory.title}
          </Link>

          {currentCategory.subcategories.map((sub) => {
            const isSubActive = subcategorySlug === sub.slug;
            return (
              <Link
                key={sub.id}
                to={`/${currentCategory.slug}/${sub.slug}`}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isSubActive
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                    : 'bg-[#13151c] hover:bg-[#1a1d26] text-slate-300 border border-[#2a2e3d]'
                }`}
              >
                {getSubcategoryIcon(sub.iconName)}
                <span>{sub.title}</span>
              </Link>
            );
          })}
        </div>

        {/* Filter input in category */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="فیلتر مقالات این بخش..."
            className="w-full bg-[#13151c] border border-[#2a2e3d] focus:border-purple-500 rounded-xl py-2 pr-9 pl-3 text-xs text-slate-200 placeholder-slate-500 outline-none"
          />
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length === 0 ? (
        <div className="text-center py-16 bg-[#13151c] rounded-3xl border border-[#2a2e3d] text-slate-400 space-y-3">
          <p className="text-base font-bold text-slate-300">هیچ مقاله‌ای در این دسته‌بندی یافت نشد.</p>
          <p className="text-xs">لطفا عبارات فیلتر را تغییر دهید یا به سایر دسته‌ها مراجعه کنید.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredArticles.map((art) => (
            <ArticleCard key={art.id} article={art} />
          ))}
        </div>
      )}

    </div>
  );
};

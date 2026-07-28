import { Link } from 'react-router-dom';
import { Flame, Sparkles, ArrowLeft, Quote } from 'lucide-react';
import { ArticleCard } from './ArticleCard';

export const EditorsChoice = ({ articles = [] }) => {
  const editorPicks = articles.filter(a => a.isEditorsPick);
  const primaryPick = editorPicks[0] || articles[0];
  const sidePicks = editorPicks.slice(1, 4);

  if (!primaryPick) return null;

  return (
    <section className="my-12">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#2e3446] gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1.5">
            <Flame className="w-4 h-4 fill-amber-400" />
            <span>پیشنهاد ویژه</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">
            مقالات برگزیده مجله
          </h2>
        </div>

        {/* Editor Note Quote Box */}
        <div className="bg-[#202432] border border-[#2e3446] rounded-2xl p-3.5 max-w-md flex items-center gap-3 shadow-md">
          <Quote className="w-6 h-6 text-amber-400 flex-shrink-0 opacity-80" />
          <p className="text-xs text-slate-300 italic leading-snug">
            «مقالات انتخابی این بخش شامل مهم‌ترین تحولات و عمیق‌ترین تحلیل‌های فنی هفته در دنیای تکنولوژی و وب هستند.»
          </p>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Primary Featured Pick (7 cols) */}
        <div className="lg:col-span-7">
          <div className="relative group bg-[#202432] border border-[#2e3446] hover:border-amber-400/60 rounded-2xl overflow-hidden transition-all duration-300 shadow-md h-full flex flex-col justify-between">
            <div className="relative aspect-[16/9] lg:aspect-[16/10] sm:h-72 lg:h-80 w-full overflow-hidden bg-[#181a20] flex-shrink-0">
              <img 
                src={primaryPick.coverImage} 
                alt={primaryPick.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              
              <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500 text-slate-950 font-bold text-xs shadow-md">
                <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
                <span>برگزیده شماره ۱</span>
              </div>
            </div>

            <div className="p-6 sm:p-7 flex-grow flex flex-col justify-between relative z-10">
              <div>
                <Link to={`/article/${primaryPick.slug}`}>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-100 group-hover:text-amber-300 transition-colors leading-tight mb-3">
                    {primaryPick.title}
                  </h3>
                </Link>

                <p className="text-slate-300 text-xs sm:text-sm line-clamp-3 leading-relaxed mb-6">
                  {primaryPick.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-[#2e3446] flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="text-slate-200 font-medium">{primaryPick.author.name}</span>
                </div>

                <Link 
                  to={`/article/${primaryPick.slug}`}
                  className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-bold text-xs"
                >
                  <span>مطالعه مقاله کامل</span>
                  <ArrowLeft className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Side Picks Column (5 cols) */}
        <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
          {sidePicks.map((pick) => (
            <ArticleCard key={pick.id} article={pick} variant="horizontal" />
          ))}
        </div>

      </div>
    </section>
  );
};

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, TrendingUp, ArrowLeft, Cpu, Rocket, CheckCircle2, MessageSquare, Zap
} from 'lucide-react';
import { AUTHOR_BEHRAD } from '../data/articles';
import { useArticles } from '../data/articleStore';
import { CATEGORIES } from '../data/categories';
import { ArticleCard } from '../components/ArticleCard';
import { EditorsChoice } from '../components/EditorsChoice';

export const HomePage = () => {
  const articles = useArticles();
  const [pollSelectedOption, setPollSelectedOption] = useState(null);
  const [pollVoted, setPollVoted] = useState(false);

  const heroArticle = articles.find(a => a.isHeroFeatured) || articles[0];
  const sideHeroArticles = articles.filter(a => a.id !== heroArticle.id).slice(0, 3);
  const trendingArticles = [...articles].sort((a, b) => b.viewsCount - a.viewsCount).slice(0, 5);

  const techArticles = articles.filter(a => a.categorySlug === 'tech').slice(0, 3);
  const scienceArticles = articles.filter(a => a.categorySlug === 'science').slice(0, 3);
  const howtoArticles = articles.filter(a => a.categorySlug === 'howto').slice(0, 3);


  const pollOptions = [
    { id: 1, text: 'استدلال چندعاملی و سیستم‌های خودمختار (Multi-Agent Systems)', votes: 48 },
    { id: 2, text: 'رایانش کوانتومی بدون خطا (Fault-tolerant Quantum Computing)', votes: 27 },
    { id: 3, text: 'شبکه‌های نسل جدید HTTP/3 و QUIC', votes: 15 },
    { id: 4, text: 'گداخت هسته‌ای و خورشید مصنوعی', votes: 10 },
  ];

  const handlePollVote = (id) => {
    setPollSelectedOption(id);
    setPollVoted(true);
  };

  return (
    <div className="min-h-screen space-y-16 pb-12">
      
      {/* HERO FEATURED SECTION */}
      <section className="pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Hero Article */}
          <div className="lg:col-span-8 pt-12">
            <ArticleCard article={heroArticle} variant="featured" />
          </div>

          {/* Secondary Hero Articles Stack */}
          <div className="lg:col-span-4 space-y-4 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-2 border-b border-[#2e3446]">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-purple-400" />
                مطالب داغ روز
              </span>
            </div>

            {sideHeroArticles.map((art) => (
              <ArticleCard key={art.id} article={art} variant="horizontal" />
            ))}
          </div>

        </div>
      </section>

      {/* EDITOR'S CHOICE SECTION */}
      <EditorsChoice articles={articles} />

      {/* CATEGORY 1: TECH HIGHLIGHTS */}
      <section className="space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#2e3446]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-600/20 border border-purple-500/30 text-purple-400">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-100">فناوری و زیرساخت‌های هوشمند</h2>
              <p className="text-xs text-slate-400 mt-0.5">هوش مصنوعی، اینترنت و شبکه، امنیت و حریم خصوصی</p>
            </div>
          </div>

          <Link 
            to="/tech" 
            className="flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 font-bold hover:underline"
          >
            <span>مشاهده همه</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        {/* Subcategories Navigation Chips */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES[0].subcategories.map((sub) => (
            <Link
              key={sub.id}
              to={`/tech/${sub.slug}`}
              className="px-3.5 py-1.5 rounded-full bg-[#202432] hover:bg-purple-600/20 border border-[#2e3446] hover:border-purple-500/40 text-slate-300 hover:text-purple-300 text-xs font-medium transition-all"
            >
              {sub.title}
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {techArticles.map((art) => (
            <ArticleCard key={art.id} article={art} />
          ))}
        </div>
      </section>

      {/* TRENDING / MOST VIEWED RANKING SECTION */}
      <section className="bg-[#202432] border border-[#2e3446] rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-lg">
        <div className="relative z-10 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#2e3446]">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-cyan-400" />
              <h2 className="text-2xl font-bold text-slate-100">پربازدیدترین مقالات مجله</h2>
            </div>
            <span className="text-xs text-slate-400">بر اساس بیشترین مطالعه</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {trendingArticles.map((art, index) => (
              <div 
                key={art.id}
                className="bg-[#181a20] border border-[#2e3446] hover:border-purple-500/40 rounded-xl p-4 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-7 h-7 rounded-lg bg-purple-600 text-white font-bold text-xs flex items-center justify-center">
                      {(index + 1).toLocaleString('fa-IR')}
                    </span>
                    <span className="text-[10px] text-cyan-400 font-bold">
                      {art.viewsCount.toLocaleString('fa-IR')} بازدید
                    </span>
                  </div>

                  <Link to={`/article/${art.slug}`}>
                    <h3 className="text-xs font-bold text-slate-200 group-hover:text-purple-300 transition-colors line-clamp-3 leading-snug mb-2">
                      {art.title}
                    </h3>
                  </Link>
                </div>

                <div className="pt-3 border-t border-[#2e3446] flex items-center justify-between text-[10px] text-slate-400">
                  <span>{art.readTimeMinutes} دقیقه مطالعه</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORY 2: SCIENCE HIGHLIGHTS */}
      <section className="space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#2e3446]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-600/20 border border-cyan-500/30 text-cyan-400">
              <Rocket className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-100">مرزهای دانش و علوم فضایی</h2>
              <p className="text-xs text-slate-400 mt-0.5">هوا و فضا، مهندسی پیشرفته، علوم پایه و کیهان‌شناسی</p>
            </div>
          </div>

          <Link 
            to="/science" 
            className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-bold hover:underline"
          >
            <span>مشاهده مقالات علم</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {scienceArticles.map((art) => (
            <ArticleCard key={art.id} article={art} />
          ))}
        </div>
      </section>

      {/* CATEGORY 3: HOW-TO TUTORIALS */}
      <section className="space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#2e3446]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-600/20 border border-amber-500/30 text-amber-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-100">راهنماهای کاربردی و آموزشی</h2>
              <p className="text-xs text-slate-400 mt-0.5">آموزش هوش مصنوعی، لینوکس و سیستم‌های کامپیوتر و موبایل</p>
            </div>
          </div>

          <Link 
            to="/howto" 
            className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-bold hover:underline"
          >
            <span>مشاهده همه آموزش‌ها</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {howtoArticles.map((art) => (
            <ArticleCard key={art.id} article={art} />
          ))}
        </div>
      </section>

      {/* INTERACTIVE POLL & SINGLE AUTHOR SPOTLIGHT ON HOMEPAGE */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Community Poll Box */}
        <div className="lg:col-span-7 bg-[#202432] border border-[#2e3446] rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-md">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-purple-400 tracking-wider flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4" />
                نظرسنجی تخصصی هفته
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-slate-100 mb-6 leading-snug">
              به نظر شما کدام رویداد تکنولوژی بیشترین تاثیر انقلابی را بر دنیای برنامه‌نویسی و وب تا پایان دهه خواهد داشت؟
            </h3>

            <div className="space-y-3">
              {pollOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handlePollVote(opt.id)}
                  disabled={pollVoted}
                  className={`w-full p-3.5 rounded-xl border text-right transition-all flex items-center justify-between ${
                    pollSelectedOption === opt.id
                      ? 'bg-purple-600/20 border-purple-500 text-purple-300'
                      : 'bg-[#181a20] border-[#2e3446] hover:border-slate-500 text-slate-300'
                  }`}
                >
                  <span className="text-xs font-semibold">{opt.text}</span>
                  {pollVoted && (
                    <span className="text-xs font-bold text-purple-400 font-mono">
                      {opt.votes}%
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {pollVoted && (
            <div className="mt-4 pt-4 border-t border-[#2e3446] text-xs text-emerald-400 font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>رای شما با موفقیت ثبت شد. متشکریم!</span>
            </div>
          )}
        </div>

        {/* Single Author Spotlight Box on Homepage */}
        <div className="lg:col-span-5 bg-[#202432] border border-[#2e3446] rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-md">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img 
                src={AUTHOR_BEHRAD.avatar} 
                alt={AUTHOR_BEHRAD.name} 
                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-purple-500/40"
                referrerPolicy="no-referrer"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-100">{AUTHOR_BEHRAD.name}</h3>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-purple-600/20 text-purple-300 font-bold border border-purple-500/30">
                    سردبیر
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">{AUTHOR_BEHRAD.role}</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-5">
              {AUTHOR_BEHRAD.bio}
            </p>

            <div className="p-3.5 rounded-xl bg-[#181a20] border border-[#2e3446] space-y-2 text-xs text-slate-400">
              <div className="flex justify-between">
                <span>تعداد مقالات:</span>
                <strong className="text-slate-200">۱۰ مقاله تخصصی</strong>
              </div>
              <div className="flex justify-between">
                <span>حوزه اصلی:</span>
                <strong className="text-purple-300">هوش مصنوعی و وب</strong>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-[#2e3446] text-center">
            <span className="text-[11px] text-slate-400">
              Tech Magazine • مجله تخصصی فناوری و توسعه وب
            </span>
          </div>
        </div>

      </section>

    </div>
  );
};

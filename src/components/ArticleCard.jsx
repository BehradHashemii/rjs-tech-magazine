import { Link } from "react-router-dom";
import { Eye, Clock, Calendar, ArrowLeft, Sparkles } from "lucide-react";
import formatPersianDate from "../utils/formatPersianDate";
import e2p from "../utils/persianNumber";

export const ArticleCard = ({ article, variant = "standard" }) => {
  const getSubcategoryName = (subSlug) => {
    switch (subSlug) {
      case "ai-articles":
        return "هوش مصنوعی";
      case "internet-network":
        return "اینترنت و شبکه";
      case "security":
        return "امنیت و حریم خصوصی";
      case "space":
        return "هوا و فضا";
      case "engineering":
        return "مهندسی";
      case "fundamental-science":
        return "علوم پایه";
      case "ai-tutorials":
        return "آموزش هوش مصنوعی";
      case "computer-learning":
        return "آموزش کامپیوتر";
      case "mobile-learning":
        return "آموزش موبایل";
      default:
        return "فناوری";
    }
  };

  const getSubcategoryLink = (catSlug, subSlug) => {
    return `/${catSlug}/${subSlug}`;
  };

  if (variant === "featured") {
    return (
      <div className="relative group overflow-hidden rounded-2xl bg-[#202432] border border-[#2e3446] hover:border-purple-500/50 transition-all duration-300 shadow-lg flex flex-col lg:flex-row min-h-[420px]">
        {/* Background Overlay */}
        <div className="lg:w-7/12 flex-shrink-0 min-h-[260px] lg:min-h-[420px] relative overflow-hidden bg-[#181a20]">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-64 lg:h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            referrerPolicy="no-referrer"
          />

          {article.isEditorsPick && (
            <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-600 text-white text-xs font-bold shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>پیشنهاد ویژه</span>
            </div>
          )}
        </div>

        <div className="lg:w-5/12 p-6 lg:p-8 flex flex-col justify-between relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Link
                to={getSubcategoryLink(
                  article.categorySlug,
                  article.subcategorySlug,
                )}
                className="px-3 py-1 rounded-full text-xs font-bold bg-purple-600/20 text-purple-300 border border-purple-500/30"
              >
                {getSubcategoryName(article.subcategorySlug)}
              </Link>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {formatPersianDate(article.publishDate)}
              </span>
            </div>

            <Link to={`/article/${article.slug}`}>
              <h2 className="text-xl lg:text-2xl font-extrabold text-slate-100 group-hover:text-purple-300 transition-colors leading-snug mb-3">
                {article.title}
              </h2>
            </Link>

            <p className="text-slate-300 text-xs sm:text-sm line-clamp-3 mb-6 leading-relaxed">
              {article.excerpt}
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between pt-4 border-t border-[#2e3446] text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="text-slate-300 font-medium">
                  {article.author.name}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-purple-400" />
                  {article.viewsCount.toLocaleString("fa-IR")}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  {e2p(e2p(e2p(e2p(article.readTimeMinutes))))} دقیقه
                </span>
              </div>
            </div>

            <Link
              to={`/article/${article.slug}`}
              className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white transition-all text-xs font-bold border border-purple-500/30"
            >
              <span>ادامه مطالعه مقاله</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "horizontal") {
    return (
      <div className="group bg-[#202432] border border-[#2e3446] hover:border-purple-500/40 rounded-xl p-3 flex gap-4 transition-all hover:bg-[#282d3e]">
        <Link
          to={`/article/${article.slug}`}
          className="w-28 sm:w-36 h-24 flex-shrink-0 rounded-lg overflow-hidden relative bg-[#181a20]"
        >
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            referrerPolicy="no-referrer"
          />
        </Link>
        <div className="flex flex-col justify-between flex-grow min-w-0">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Link
                to={getSubcategoryLink(
                  article.categorySlug,
                  article.subcategorySlug,
                )}
                className="text-[11px] text-purple-400 font-bold hover:underline"
              >
                {getSubcategoryName(article.subcategorySlug)}
              </Link>
              <span className="text-slate-500">•</span>
              <span className="text-[11px] text-slate-400">
                {formatPersianDate(article.publishDate)}
              </span>
            </div>
            <Link to={`/article/${article.slug}`}>
              <h3 className="text-xs sm:text-sm font-bold text-slate-200 group-hover:text-purple-300 transition-colors line-clamp-2 leading-snug">
                {article.title}
              </h3>
            </Link>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-2">
            <span>{article.author.name}</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-cyan-400" />
              {e2p(article.readTimeMinutes)} دقیقه
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group bg-[#202432] border border-[#2e3446] hover:border-purple-500/40 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-0.5 shadow-md flex flex-col justify-between">
      <div>
        <div className="relative aspect-[16/9] overflow-hidden bg-[#181a20]">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            referrerPolicy="no-referrer"
          />

          <Link
            to={getSubcategoryLink(
              article.categorySlug,
              article.subcategorySlug,
            )}
            className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#181a20]/90 text-purple-300 border border-[#2e3446]"
          >
            {getSubcategoryName(article.subcategorySlug)}
          </Link>

          {article.isEditorsPick && (
            <span className="absolute top-3 left-3 bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
              ویژه
            </span>
          )}
        </div>

        <div className="p-5">
          <Link to={`/article/${article.slug}`}>
            <h3 className="text-sm font-bold text-slate-100 group-hover:text-purple-300 transition-colors line-clamp-2 leading-snug mb-2.5">
              {article.title}
            </h3>
          </Link>
          <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed mb-4">
            {article.excerpt}
          </p>
        </div>
      </div>

      <div className="px-5 pb-4 pt-2 border-t border-[#2e3446] flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-1.5">
          <span className="text-slate-300 text-[11px] font-medium">
            {article.author.name}
          </span>
        </div>

        <div className="flex items-center gap-3 text-[11px]">
          <span className="flex items-center gap-1 text-slate-400">
            <Eye className="w-3 h-3 text-purple-400" />
            {article.viewsCount.toLocaleString("fa-IR")}
          </span>
          <span className="flex items-center gap-1 text-slate-400">
            <Clock className="w-3 h-3 text-cyan-400" />
            {e2p(article.readTimeMinutes)} دقیقه
          </span>
        </div>
      </div>
    </div>
  );
};

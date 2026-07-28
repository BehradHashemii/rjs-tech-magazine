import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Markdown from "react-markdown";
import {
  Eye,
  Clock,
  Bookmark,
  Share2,
  Sparkles,
  Check,
  Heart,
  BookOpen,
  X,
  Copy,
  Calendar,
} from "lucide-react";
import { useArticles } from "../data/articleStore";
import { ArticleCard } from "../components/ArticleCard";
import { CommentSection } from "../components/CommentSection";
import formatPersianDate from "../utils/formatPersianDate";
const cleanMarkdown = (content) => {
  if (!content) return "";
  const lines = content.split("\n");
  let minIndent = Infinity;
  for (const line of lines) {
    if (line.trim().length > 0) {
      const match = line.match(/^(\s*)/);
      if (match && match[1].length < minIndent) {
        minIndent = match[1].length;
      }
    }
  }
  if (minIndent > 0 && minIndent !== Infinity) {
    return lines
      .map((line) =>
        line.length >= minIndent ? line.slice(minIndent) : line.trim(),
      )
      .join("\n");
  }
  return content;
};

export const ArticleDetailPage = () => {
  const articles = useArticles();
  const { slug } = useParams();

  const [fontSize, setFontSize] = useState("normal");
  const [copied, setCopied] = useState(false);
  const [copiedCodeId, setCopiedCodeId] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isReadingMode, setIsReadingMode] = useState(false);

  const article = articles.find((a) => a.slug === slug) || articles[0];

  // Related articles logic: 3 articles from same category or fallback to other top articles
  let relatedArticles = articles.filter(
    (a) => a.id !== article.id && a.categorySlug === article.categorySlug,
  );
  if (relatedArticles.length < 3) {
    const additional = articles.filter(
      (a) => a.id !== article.id && !relatedArticles.some((r) => r.id === a.id),
    );
    relatedArticles = [...relatedArticles, ...additional].slice(0, 3);
  } else {
    relatedArticles = relatedArticles.slice(0, 3);
  }

  const [likedArticles, setLikedArticles] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      if (totalHeight > 0) {
        const currentScroll = window.scrollY;
        const progress = Math.min(
          100,
          Math.max(0, (currentScroll / totalHeight) * 100),
        );
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [slug]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const hasLiked = !!likedArticles[article.id];
  const currentLikes = article.likesCount + (hasLiked ? 1 : 0);

  const handleLike = () => {
    if (!hasLiked) {
      setLikedArticles((prev) => ({ ...prev, [article.id]: true }));
    }
  };

  const getFontSizeStyle = () => {
    switch (fontSize) {
      case "large":
        return {
          "--article-base-size": "1.2rem",
          "--article-h2-size": "1.65rem",
          "--article-h3-size": "1.38rem",
          "--article-line-height": "2.0",
          fontSize: "1.2rem",
          lineHeight: "2.0",
        };
      case "xlarge":
        return {
          "--article-base-size": "1.4rem",
          "--article-h2-size": "1.95rem",
          "--article-h3-size": "1.6rem",
          "--article-line-height": "2.2",
          fontSize: "1.4rem",
          lineHeight: "2.2",
        };
      default:
        return {
          "--article-base-size": "1rem",
          "--article-h2-size": "1.4rem",
          "--article-h3-size": "1.18rem",
          "--article-line-height": "1.85",
          fontSize: "1rem",
          lineHeight: "1.85",
        };
    }
  };

  const markdownComponents = {
    h1: ({ children }) => (
      <h1
        className="font-black text-slate-100 mt-8 mb-4 border-r-4 border-purple-500 pr-3 leading-snug"
        style={{ fontSize: "calc(var(--article-base-size, 1rem) * 1.75)" }}
      >
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2
        className="font-bold text-slate-100 mt-7 mb-3 border-r-4 border-purple-500 pr-3 leading-snug"
        style={{ fontSize: "var(--article-h2-size, 1.4rem)" }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        className="font-bold text-purple-300 mt-6 mb-2"
        style={{ fontSize: "var(--article-h3-size, 1.18rem)" }}
      >
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p
        className="my-4 text-slate-300 font-normal"
        style={{
          fontSize: "var(--article-base-size, 1rem)",
          lineHeight: "var(--article-line-height, 1.85)",
        }}
      >
        {children}
      </p>
    ),
    strong: ({ children }) => (
      <strong className="font-bold text-purple-300 bg-purple-950/40 px-1.5 py-0.5 rounded border border-purple-800/40">
        {children}
      </strong>
    ),
    blockquote: ({ children }) => (
      <blockquote
        className="my-5 p-4 rounded-xl bg-[#202432] border-r-4 border-purple-500 text-slate-200 italic font-medium"
        style={{ fontSize: "calc(var(--article-base-size, 1rem) * 1.05)" }}
      >
        {children}
      </blockquote>
    ),
    ul: ({ children }) => (
      <ul
        className="my-4 space-y-2 list-disc list-inside text-slate-300 pr-2"
        style={{
          fontSize: "var(--article-base-size, 1rem)",
          lineHeight: "var(--article-line-height, 1.85)",
        }}
      >
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol
        className="my-4 space-y-2 list-decimal list-inside text-slate-300 pr-2"
        style={{
          fontSize: "var(--article-base-size, 1rem)",
          lineHeight: "var(--article-line-height, 1.85)",
        }}
      >
        {children}
      </ol>
    ),
    pre: ({ children }) => <>{children}</>,
    code: ({ className, children }) => {
      const match = /language-(\w+)/.exec(className || "");
      const isMultiLine = String(children).includes("\n") || Boolean(match);

      if (!isMultiLine && !match) {
        return (
          <code
            className="bg-[#202432] text-purple-300 font-mono text-xs sm:text-sm px-2 py-0.5 rounded border border-[#2e3446] dir-ltr inline-block"
            dir="ltr"
          >
            {children}
          </code>
        );
      }

      const codeText = String(children).replace(/\n$/, "");

      return (
        <div
          className="my-6 rounded-2xl overflow-hidden border border-[#2e3446] bg-[#12141c] shadow-xl text-left dir-ltr"
          dir="ltr"
        >
          <div className="bg-[#1c1f2b] px-4 py-2 border-b border-[#2e3446] flex items-center justify-between text-xs text-slate-300 font-mono">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block"></span>
              <span className="text-purple-400 font-bold uppercase ml-2">
                {match ? match[1] : "کد"}
              </span>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(codeText);
                setCopiedCodeId(true);
                setTimeout(() => setCopiedCodeId(false), 2000);
              }}
              className="hover:text-white transition-colors flex items-center gap-1 bg-[#282d3e] px-2.5 py-1 rounded text-[11px] text-slate-300 border border-[#343b4f]"
            >
              <Copy className="w-3 h-3 text-purple-400" />
              <span>{copiedCodeId ? "کپی شد!" : "کپی کد"}</span>
            </button>
          </div>
          <pre
            className="p-4 overflow-x-auto text-slate-200 font-mono text-xs sm:text-sm leading-relaxed dir-ltr"
            dir="ltr"
          >
            <code>{codeText}</code>
          </pre>
        </div>
      );
    },
    a: ({ href, children }) => (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-purple-400 hover:text-purple-300 underline underline-offset-4 font-semibold"
      >
        {children}
      </a>
    ),
  };

  const isHtmlContent =
    article.content.includes("<p>") ||
    article.content.includes("<section>") ||
    article.content.includes("<div>");

  return (
    <article
      key={article.id}
      className={`py-8 mx-auto space-y-8 min-h-screen transition-all ${isReadingMode ? "max-w-3xl" : "max-w-4xl"}`}
    >
      {/* Top Fixed Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-[100] bg-slate-900/40 backdrop-blur-sm pointer-events-none">
        <div
          className="h-full bg-purple-500 transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Reading Mode Banner */}
      {isReadingMode && (
        <div className="sticky top-4 z-40 p-3.5 rounded-2xl bg-[#202432] border border-purple-500/50 text-purple-100 flex items-center justify-between shadow-2xl animate-fade-in">
          <div className="flex items-center gap-2.5 text-xs font-bold">
            <BookOpen className="w-4 h-4 text-purple-300" />
            <span>حالت مطالعه فعال است</span>
          </div>
          <button
            onClick={() => setIsReadingMode(false)}
            className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1"
          >
            <X className="w-3.5 h-3.5" />
            <span>خروج از حالت مطالعه</span>
          </button>
        </div>
      )}

      {/* Breadcrumb Navigation */}
      {!isReadingMode && (
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Link to="/" className="hover:text-purple-300">
            خانه
          </Link>
          <span>/</span>
          <Link
            to={`/${article.categorySlug}`}
            className="hover:text-purple-300"
          >
            {article.categorySlug === "tech"
              ? "فناوری"
              : article.categorySlug === "science"
                ? "علم"
                : "آموزشی"}
          </Link>
          <span>/</span>
          <span className="text-slate-200 font-semibold line-clamp-1">
            {article.title}
          </span>
        </div>
      )}

      {/* Article Header Info */}
      <div className="space-y-5">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-purple-600/20 text-purple-300 border border-purple-500/30 text-xs font-bold">
            {article.subcategorySlug}
          </span>
          {article.isEditorsPick && (
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              پیشنهاد ویژه
            </span>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-100 leading-tight">
          {article.title}
        </h1>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed border-r-4 border-purple-500 pr-4">
          {article.excerpt}
        </p>

        {/* Article Meta Details Bar */}
        <div className="p-5 rounded-2xl bg-[#202432] border border-[#2e3446] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="relative flex-shrink-0">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover ring-4 ring-purple-500/30 shadow-md"
                referrerPolicy="no-referrer"
              />
              <span className="absolute -bottom-1 -right-1 bg-purple-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-md border border-[#181a20]">
                سردبیر
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-slate-100 text-sm sm:text-base">
                  {article.author.name}
                </h3>
              </div>
              <p className="text-xs text-purple-300 font-medium mt-0.5">
                {article.author.role}
              </p>
              <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-2">
                <Calendar className="w-3 h-3 text-slate-400" />
                <span>{formatPersianDate(article.publishDate)}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 text-xs text-slate-300 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#2e3446] w-full sm:w-auto justify-between sm:justify-start">
            <span className="flex items-center gap-2 bg-[#181a20] px-3.5 py-2 rounded-xl border border-[#2e3446]">
              <Eye className="w-4 h-4 text-purple-400" />
              <span>
                <strong>
                  {(article.viewsCount + 1).toLocaleString("fa-IR")}
                </strong>{" "}
                بازدید
              </span>
            </span>
            <span className="flex items-center gap-2 bg-[#181a20] px-3.5 py-2 rounded-xl border border-[#2e3446]">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>
                <strong>{article.readTimeMinutes}</strong> دقیقه مطالعه
              </span>
            </span>
          </div>
        </div>

        {/* Toolbar Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 py-3 border-y border-[#2e3446] text-xs">
          <div className="flex items-center gap-2 text-slate-300 font-medium">
            <span className="text-slate-400 font-bold">اندازه قلم:</span>
            <button
              type="button"
              onClick={() => setFontSize("normal")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                fontSize === "normal"
                  ? "bg-purple-600 text-white border-purple-500 shadow-md ring-2 ring-purple-500/30"
                  : "bg-[#202432] border-[#2e3446] text-slate-300 hover:text-white hover:bg-[#282d3e]"
              }`}
            >
              عادی (۱۰۰٪)
            </button>
            <button
              type="button"
              onClick={() => setFontSize("large")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                fontSize === "large"
                  ? "bg-purple-600 text-white border-purple-500 shadow-md ring-2 ring-purple-500/30"
                  : "bg-[#202432] border-[#2e3446] text-slate-300 hover:text-white hover:bg-[#282d3e]"
              }`}
            >
              بزرگ (۱۲۰٪)
            </button>
            <button
              type="button"
              onClick={() => setFontSize("xlarge")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                fontSize === "xlarge"
                  ? "bg-purple-600 text-white border-purple-500 shadow-md ring-2 ring-purple-500/30"
                  : "bg-[#202432] border-[#2e3446] text-slate-300 hover:text-white hover:bg-[#282d3e]"
              }`}
            >
              خیلی بزرگ (۱۴۰٪)
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsReadingMode(!isReadingMode)}
              className={`px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 font-bold text-xs ${
                isReadingMode
                  ? "bg-purple-600 text-white border-purple-500"
                  : "bg-[#202432] border-[#2e3446] text-purple-300 hover:text-white"
              }`}
              title="حالت مطالعه بدون حواس‌پرتی"
            >
              <BookOpen className="w-4 h-4" />
              <span>{isReadingMode ? "خروج" : "حالت مطالعه"}</span>
            </button>

            <button
              onClick={() => setBookmarked(!bookmarked)}
              className={`p-2 rounded-xl border transition-all flex items-center gap-1 ${
                bookmarked
                  ? "bg-purple-600/20 border-purple-500 text-purple-300"
                  : "bg-[#202432] border-[#2e3446] text-slate-400"
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span className="hidden sm:inline">
                {bookmarked ? "ذخیره شد" : "نشان کردن"}
              </span>
            </button>

            <button
              onClick={handleCopyLink}
              className="p-2 rounded-xl bg-[#202432] border border-[#2e3446] text-slate-400 hover:text-white transition-all flex items-center gap-1"
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Share2 className="w-4 h-4" />
              )}
              <span className="hidden sm:inline">
                {copied ? "لینک کپی شد" : "اشتراک‌گذاری"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Cover Image */}
      <div className="rounded-2xl overflow-hidden border border-[#2e3446] shadow-xl relative aspect-[16/9]">
        <img
          src={article.coverImage}
          alt={article.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Article Body Content */}
      <div
        className="space-y-6 transition-all duration-200"
        style={getFontSizeStyle()}
      >
        <div className="p-5 rounded-2xl bg-[#202432] border border-purple-500/20 text-slate-200">
          <h4 className="text-xs sm:text-sm font-bold text-purple-300 mb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-300" />
            نکات کلیدی مقاله
          </h4>
          <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-slate-300">
            <li>تحلیل تخصصی موضوع بر اساس آخرین استانداردهای سال ۲۰۲۶</li>
            <li>بررسی ابعاد زیرساختی و راهکارهای اجرایی</li>
          </ul>
        </div>

        {/* Content Render */}
        {isHtmlContent ? (
          <div
            className="article-body"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        ) : (
          <div className="markdown-body text-slate-200">
            <Markdown components={markdownComponents}>
              {cleanMarkdown(article.content)}
            </Markdown>
          </div>
        )}
      </div>

      {/* Tags */}
      <div className="pt-6 border-t border-[#2e3446] flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-slate-400">برچسب‌ها:</span>
        {article.tags.map((tag, idx) => (
          <span
            key={idx}
            className="px-3 py-1 rounded-lg bg-[#202432] border border-[#2e3446] text-slate-300 text-xs font-medium"
          >
            #{tag}
          </span>
        ))}
      </div>

      {!isReadingMode && (
        <>
          {/* Author Showcase Card */}
          <div className="p-6 rounded-2xl bg-[#202432] border border-[#2e3446] shadow-xl flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-purple-500/30 flex-shrink-0 shadow-lg"
              referrerPolicy="no-referrer"
            />
            <div className="space-y-1.5 flex-grow">
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="text-base sm:text-lg font-bold text-slate-100">
                  {article.author.name}
                </h4>
                <span className="px-2.5 py-0.5 rounded-md bg-purple-600/20 text-purple-300 text-[11px] font-bold border border-purple-500/30">
                  {article.author.role}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {article.author.bio}
              </p>
            </div>
          </div>

          {/* Like Interaction Box */}
          <div className="p-6 rounded-2xl bg-[#202432] border border-[#2e3446] text-center space-y-3">
            <h4 className="text-sm font-bold text-slate-200">
              آیا این مقاله برای شما مفید بود؟
            </h4>
            <button
              onClick={handleLike}
              className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-xs transition-all ${
                hasLiked
                  ? "bg-rose-600 text-white"
                  : "bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white border border-purple-500/40"
              }`}
            >
              <Heart className={`w-4 h-4 ${hasLiked ? "fill-white" : ""}`} />
              <span>{currentLikes.toLocaleString("fa-IR")} پسندیدن مقاله</span>
            </button>
          </div>

          {/* RELATED ARTICLES */}
          {relatedArticles.length > 0 && (
            <section className="space-y-6 pt-10 border-t border-[#2e3446]">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-lg sm:text-xl font-bold text-slate-100 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  <span>مقالات مرتبط و پیشنهادی</span>
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((art) => (
                  <ArticleCard key={art.id} article={art} />
                ))}
              </div>
            </section>
          )}

          {/* COMMENT SECTION */}
          <CommentSection
            articleId={article.id}
            initialComments={article.comments}
          />
        </>
      )}
    </article>
  );
};

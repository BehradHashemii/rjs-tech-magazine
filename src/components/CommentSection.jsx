import { useState } from 'react';
import { MessageSquare, Send, CheckCircle2, ThumbsUp, ThumbsDown, Mail, User, ShieldCheck } from 'lucide-react';

export const CommentSection = ({ articleId, initialComments = [] }) => {
  const [comments, setComments] = useState(() => {
    const saved = localStorage.getItem(`article_comments_${articleId}`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return initialComments;
      }
    }
    return initialComments;
  });

  const [userReactions, setUserReactions] = useState(() => {
    const saved = localStorage.getItem(`user_comment_reactions_${articleId}`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return {};
      }
    }
    return {};
  });

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !content.trim()) return;

    setIsSubmitting(true);

    const now = new Date();
    const dateStr = now.toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const newComment = {
      id: `comment-${Date.now()}`,
      fullName: fullName.trim(),
      email: email.trim(),
      content: content.trim(),
      createdAt: dateStr,
      likes: 0,
      dislikes: 0
    };

    setTimeout(() => {
      const updated = [newComment, ...comments];
      setComments(updated);
      localStorage.setItem(`article_comments_${articleId}`, JSON.stringify(updated));

      setFullName('');
      setEmail('');
      setContent('');
      setIsSubmitting(false);
      setSubmittedSuccess(true);

      setTimeout(() => setSubmittedSuccess(false), 5000);
    }, 400);
  };

  const handleReaction = (commentId, type) => {
    const currentReaction = userReactions[commentId]; // 'like' | 'dislike' | undefined

    let newReaction = type;
    if (currentReaction === type) {
      // Toggle off
      newReaction = null;
    }

    const updatedComments = comments.map(c => {
      if (c.id !== commentId) return c;

      let likes = c.likes || 0;
      let dislikes = c.dislikes || 0;

      // Revert previous reaction
      if (currentReaction === 'like') likes = Math.max(0, likes - 1);
      if (currentReaction === 'dislike') dislikes = Math.max(0, dislikes - 1);

      // Apply new reaction
      if (newReaction === 'like') likes += 1;
      if (newReaction === 'dislike') dislikes += 1;

      return { ...c, likes, dislikes };
    });

    const updatedUserReactions = { ...userReactions, [commentId]: newReaction };

    setComments(updatedComments);
    setUserReactions(updatedUserReactions);

    localStorage.setItem(`article_comments_${articleId}`, JSON.stringify(updatedComments));
    localStorage.setItem(`user_comment_reactions_${articleId}`, JSON.stringify(updatedUserReactions));
  };

  return (
    <section className="mt-16 pt-12 border-t border-[#202330]">
      {/* Section Title */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-100">دیدگاه‌ها و نظرات کاربران</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              پرسش‌ها و نظرات خود درباره این مقاله را مطرح کنید
            </p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full bg-[#1a1d26] border border-[#2a2e3d] text-slate-300 text-xs font-semibold">
          {comments.length.toLocaleString('fa-IR')} دیدگاه
        </span>
      </div>

      {/* Comment Form Box */}
      <div className="bg-[#13151c] border border-[#2a2e3d] rounded-2xl p-6 sm:p-8 mb-12 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-purple-500 via-cyan-500 to-amber-500"></div>

        <h4 className="text-base font-bold text-slate-200 mb-6 flex items-center gap-2">
          <span>ارسال دیدگاه جدید</span>
          <span className="text-xs text-slate-500 font-normal">(ایمیل شما منتشر نخواهد شد)</span>
        </h4>

        {submittedSuccess && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <span>دیدگاه شما با موفقیت ثبت شد و در لیست نظرات نمایش داده می‌شود.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-purple-400" />
                <span>نام و نام خانوادگی <span className="text-rose-400">*</span></span>
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="مثال: بهراد هاشمی"
                className="w-full bg-[#0b0c10] border border-[#2a2e3d] focus:border-purple-500 rounded-xl py-2.5 px-4 text-xs text-slate-200 placeholder-slate-500 outline-none transition-all"
              />
            </div>

            {/* Email Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>آدرس ایمیل <span className="text-rose-400">*</span></span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="مثال: user@example.com"
                className="w-full bg-[#0b0c10] border border-[#2a2e3d] focus:border-purple-500 rounded-xl py-2.5 px-4 text-xs text-slate-200 placeholder-slate-500 outline-none transition-all"
              />
            </div>
          </div>

          {/* Comment Content Area */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
              <span>دیدگاه یا پرسش شما <span className="text-rose-400">*</span></span>
            </label>
            <textarea
              required
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="دیدگاه ارزشمند خود را بنویسید..."
              className="w-full bg-[#0b0c10] border border-[#2a2e3d] focus:border-purple-500 rounded-xl py-3 px-4 text-xs text-slate-200 placeholder-slate-500 outline-none transition-all resize-none"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] text-slate-500 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              حفظ حریم خصوصی اطلاعات شما تضمین می‌شود.
            </span>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 active:scale-95 text-white font-bold text-xs transition-all flex items-center gap-2 shadow-lg shadow-purple-600/30 disabled:opacity-50"
            >
              <span>{isSubmitting ? 'در حال ثبت...' : 'ثبت دیدگاه'}</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>

      {/* Existing Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-center py-10 bg-[#202432] rounded-2xl border border-[#2e3446] text-slate-400 text-xs">
            هنوز دیدگاهی برای این مقاله ثبت نشده است. اولین نفری باشید که دیدگاه خود را می‌نویسد!
          </div>
        ) : (
          comments.map((comment) => {
            const currentReaction = userReactions[comment.id];
            const likesCount = comment.likes || 0;
            const dislikesCount = comment.dislikes || 0;

            return (
              <div 
                key={comment.id}
                className="bg-[#202432] border border-[#2e3446] hover:border-purple-500/40 rounded-2xl p-5 transition-all space-y-3 shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-purple-600 flex items-center justify-center font-bold text-white text-xs shadow-md">
                      {comment.fullName ? comment.fullName.slice(0, 1) : 'ک'}
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-slate-200">{comment.fullName}</h5>
                      <span className="text-[10px] text-slate-400">{comment.createdAt}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Like Button */}
                    <button
                      type="button"
                      onClick={() => handleReaction(comment.id, 'like')}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-medium transition-all ${
                        currentReaction === 'like'
                          ? 'bg-purple-600/30 text-purple-300 border border-purple-500/50 shadow-sm'
                          : 'bg-[#181a22] hover:bg-purple-600/20 border border-[#2e3446] text-slate-400 hover:text-purple-300'
                      }`}
                      title="پسندیدم"
                    >
                      <ThumbsUp className={`w-3.5 h-3.5 ${currentReaction === 'like' ? 'fill-purple-300' : ''}`} />
                      <span>{likesCount.toLocaleString('fa-IR')}</span>
                    </button>

                    {/* Dislike Button */}
                    <button
                      type="button"
                      onClick={() => handleReaction(comment.id, 'dislike')}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-medium transition-all ${
                        currentReaction === 'dislike'
                          ? 'bg-rose-600/30 text-rose-300 border border-rose-500/50 shadow-sm'
                          : 'bg-[#181a22] hover:bg-rose-600/20 border border-[#2e3446] text-slate-400 hover:text-rose-300'
                      }`}
                      title="نپسندیدم"
                    >
                      <ThumbsDown className={`w-3.5 h-3.5 ${currentReaction === 'dislike' ? 'fill-rose-300' : ''}`} />
                      <span>{dislikesCount.toLocaleString('fa-IR')}</span>
                    </button>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pr-[#3rem]">
                  {comment.content}
                </p>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};

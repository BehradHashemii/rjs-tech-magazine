import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  PlusCircle, X, Sparkles, Image, Tag, Clock, FileText, Check, Eye, Lock, Key
} from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { createNewArticle } from '../data/articleStore';

const PRESET_IMAGES = [
  { label: 'هوش مصنوعی و داده', url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop' },
  { label: 'کدنویسی و توسعه وب', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop' },
  { label: 'شبکه و زیرساخت', url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1200&auto=format&fit=crop' },
  { label: 'علوم فضایی و کیهان', url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop' },
  { label: 'امنیت و هک', url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200&auto=format&fit=crop' },
];

export const AddArticleModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [passError, setPassError] = useState('');

  const [activeTab, setActiveTab] = useState('edit'); // 'edit' | 'preview'
  const [successMsg, setSuccessMsg] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    categorySlug: 'tech',
    subcategorySlug: 'ai-articles',
    coverImage: PRESET_IMAGES[0].url,
    readTimeMinutes: 5,
    tags: 'هوش مصنوعی, فناوری, آموزش',
    isEditorsPick: false,
    isHeroFeatured: false
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode === '1234' || passcode === 'admin' || passcode === 'editor' || passcode.trim() === '') {
      setAuthenticated(true);
      setPassError('');
    } else {
      setPassError('رمز عبور اشتباه است (رمز پیش‌فرض: 1234 یا خالی بگذارید)');
    }
  };

  const handleTitleChange = (val) => {
    setFormData(prev => ({
      ...prev,
      title: val,
      // Auto generate slug from title if slug not manually customized
      slug: prev.slug === '' || prev.slug.startsWith('art-') 
        ? val.toLowerCase().trim().replace(/[^\w\u0600-\u06FF\s-]/g, '').replace(/\s+/g, '-')
        : prev.slug
    }));
  };

  const currentCatObj = CATEGORIES.find(c => c.slug === formData.categorySlug) || CATEGORIES[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('لطفاً عنوان و محتوای اصلی مقاله را وارد کنید.');
      return;
    }

    const created = createNewArticle({
      ...formData,
      slug: formData.slug || `art-${Date.now()}`
    });

    setSuccessMsg('مقاله جدید با موفقیت منتشر شد!');
    setTimeout(() => {
      setSuccessMsg('');
      onClose();
      navigate(`/article/${created.slug}`);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-[#0b0c10]/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="w-full max-w-4xl bg-[#1d202d] border border-[#2e3446] rounded-3xl shadow-2xl overflow-hidden my-8">
        
        {/* Header Bar */}
        <div className="px-6 py-4 bg-[#181a20] border-b border-[#2e3446] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-slate-100 flex items-center gap-2">
                <span>پنل مخفی افزودن مقاله جدید</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-purple-600/20 text-purple-300 font-bold border border-purple-500/30">
                  Secret Console
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">ثبت مقاله تخصصی در دیتابیس مجله با قابلیت انتشار لحظه‌ای</p>
            </div>
          </div>

          <button 
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-[#202432] text-slate-400 hover:text-white hover:bg-rose-500/20 transition-all border border-[#2e3446]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Secret Passcode Screen */}
        {!authenticated ? (
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-purple-600/20 border border-purple-500/40 text-purple-400 mx-auto flex items-center justify-center shadow-lg">
              <Lock className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-100 mb-1">ورود به پنل نویسنده ارشد</h4>
              <p className="text-xs text-slate-400">جهت دسترسی به فرم ارسال مقاله، رمز عبور یا دکمه ورود سریع را انتخاب کنید.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 text-right">
              <div>
                <label className="text-xs font-bold text-slate-300 mb-1.5 block">رمز عبور نویسنده:</label>
                <div className="relative">
                  <input
                    type="password"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="رمز ورود (مثلا: 1234 یا خالی)"
                    className="w-full bg-[#181a20] border border-[#2e3446] focus:border-purple-500 rounded-xl py-3 px-4 pr-10 text-xs text-slate-100 outline-none"
                  />
                  <Key className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2" />
                </div>
                {passError && <p className="text-[11px] text-rose-400 mt-1">{passError}</p>}
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-grow py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-all shadow-md"
                >
                  تایید و ورود
                </button>
                <button
                  type="button"
                  onClick={() => setAuthenticated(true)}
                  className="px-4 py-3 rounded-xl bg-[#282d3e] text-purple-300 font-bold text-xs hover:bg-[#32384e] transition-all border border-[#343b4f]"
                >
                  ورود مستقیم
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Main Article Form */
          <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
            
            {successMsg && (
              <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 text-xs font-bold flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Editor Tabs: Form vs Preview */}
            <div className="flex items-center justify-between border-b border-[#2e3446] pb-3">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('edit')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    activeTab === 'edit'
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'bg-[#181a20] text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>ویرایش متنی مقاله</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('preview')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    activeTab === 'preview'
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'bg-[#181a20] text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Eye className="w-4 h-4" />
                  <span>پیش‌نمایش خروجی</span>
                </button>
              </div>

              <span className="text-[11px] text-slate-400 hidden sm:inline">
                نویسنده: <strong>بهراد هاشمی (سردبیر)</strong>
              </span>
            </div>

            {activeTab === 'edit' ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Title & Slug */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-200 mb-1.5">
                      عنوان اصلی مقاله <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="مثال: آموزش توسعه هوش مصنوعی مولد با Python"
                      className="w-full bg-[#181a20] border border-[#2e3446] focus:border-purple-500 rounded-xl py-2.5 px-3.5 text-xs text-slate-100 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-200 mb-1.5">
                      نام یکتای آدرس (Slug انگلیسی)
                    </label>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      placeholder="مثال: python-generative-ai-guide"
                      className="w-full bg-[#181a20] border border-[#2e3446] focus:border-purple-500 rounded-xl py-2.5 px-3.5 text-xs text-slate-100 outline-none dir-ltr"
                      dir="ltr"
                    />
                  </div>
                </div>

                {/* Excerpt */}
                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1.5">
                    خلاصه یا چکیده مقاله <span className="text-rose-400">*</span>
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    placeholder="یک یا دو جمله جذاب در توصیف موضوع مقاله..."
                    className="w-full bg-[#181a20] border border-[#2e3446] focus:border-purple-500 rounded-xl py-2.5 px-3.5 text-xs text-slate-100 outline-none resize-none"
                  />
                </div>

                {/* Categories & Read time */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-200 mb-1.5">
                      دسته‌بندی اصلی
                    </label>
                    <select
                      value={formData.categorySlug}
                      onChange={(e) => {
                        const newCat = e.target.value;
                        const defaultSub = CATEGORIES.find(c => c.slug === newCat)?.subcategories[0]?.slug || 'ai-articles';
                        setFormData({ ...formData, categorySlug: newCat, subcategorySlug: defaultSub });
                      }}
                      className="w-full bg-[#181a20] border border-[#2e3446] focus:border-purple-500 rounded-xl py-2.5 px-3.5 text-xs text-slate-100 outline-none cursor-pointer"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat.id} value={cat.slug}>{cat.title}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-200 mb-1.5">
                      زیردسته‌بندی
                    </label>
                    <select
                      value={formData.subcategorySlug}
                      onChange={(e) => setFormData({ ...formData, subcategorySlug: e.target.value })}
                      className="w-full bg-[#181a20] border border-[#2e3446] focus:border-purple-500 rounded-xl py-2.5 px-3.5 text-xs text-slate-100 outline-none cursor-pointer"
                    >
                      {currentCatObj.subcategories.map((sub) => (
                        <option key={sub.id} value={sub.slug}>{sub.title}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-200 mb-1.5 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      <span>زمان مطالعه (دقیقه)</span>
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={60}
                      value={formData.readTimeMinutes}
                      onChange={(e) => setFormData({ ...formData, readTimeMinutes: Number(e.target.value) })}
                      className="w-full bg-[#181a20] border border-[#2e3446] focus:border-purple-500 rounded-xl py-2.5 px-3.5 text-xs text-slate-100 outline-none"
                    />
                  </div>
                </div>

                {/* Image Selection & URL */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-200 flex items-center gap-1.5">
                    <Image className="w-3.5 h-3.5 text-purple-400" />
                    <span>آدرس تصویر کاور (Cover Image)</span>
                  </label>

                  <div className="flex gap-2">
                    <input
                      type="url"
                      required
                      value={formData.coverImage}
                      onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                      placeholder="https://images.unsplash.com/..."
                      className="flex-grow bg-[#181a20] border border-[#2e3446] focus:border-purple-500 rounded-xl py-2.5 px-3.5 text-xs text-slate-100 outline-none dir-ltr"
                      dir="ltr"
                    />
                  </div>

                  {/* Preset Images Chips */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="text-[11px] text-slate-400">تصاویر آماده:</span>
                    {PRESET_IMAGES.map((img, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setFormData({ ...formData, coverImage: img.url })}
                        className={`text-[10px] px-2.5 py-1 rounded-lg border transition-all ${
                          formData.coverImage === img.url 
                            ? 'bg-purple-600/30 border-purple-500 text-purple-300 font-bold' 
                            : 'bg-[#181a20] border-[#2e3446] text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {img.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1.5 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-amber-400" />
                    <span>برچسب‌ها (با کاما جدا کنید)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="هوش مصنوعی, برنامه نویسی, پایتون"
                    className="w-full bg-[#181a20] border border-[#2e3446] focus:border-purple-500 rounded-xl py-2.5 px-3.5 text-xs text-slate-100 outline-none"
                  />
                </div>

                {/* Checkboxes */}
                <div className="flex flex-wrap gap-6 p-3 rounded-xl bg-[#181a20] border border-[#2e3446]">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-200">
                    <input
                      type="checkbox"
                      checked={formData.isEditorsPick}
                      onChange={(e) => setFormData({ ...formData, isEditorsPick: e.target.checked })}
                      className="w-4 h-4 accent-purple-600 rounded"
                    />
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>نمایش در پیشنهاد ویژه سردبیر</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-200">
                    <input
                      type="checkbox"
                      checked={formData.isHeroFeatured}
                      onChange={(e) => setFormData({ ...formData, isHeroFeatured: e.target.checked })}
                      className="w-4 h-4 accent-purple-600 rounded"
                    />
                    <span>مقاله اصلی بنر بالای سایت</span>
                  </label>
                </div>

                {/* Main Content Area */}
                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1.5">
                    محتوای کامل مقاله (پشتیبانی از HTML / Markdown) <span className="text-rose-400">*</span>
                  </label>
                  <textarea
                    rows={10}
                    required
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="محتوای مقاله را بنویسید. می‌توانید از تگ‌های <h2>، <p>، <ul> و کد <pre><code> استفاده کنید..."
                    className="w-full bg-[#181a20] border border-[#2e3446] focus:border-purple-500 rounded-2xl p-4 text-xs text-slate-100 outline-none font-sans leading-relaxed resize-y"
                  />
                </div>

                {/* Submit Action Bar */}
                <div className="pt-4 border-t border-[#2e3446] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2.5 rounded-xl bg-[#181a20] text-slate-300 hover:text-white text-xs font-bold"
                  >
                    انصراف
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg transition-all flex items-center gap-2"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>انتشار مقاله در سایت</span>
                  </button>
                </div>

              </form>
            ) : (
              /* Live Preview Mode */
              <div className="space-y-6 bg-[#181a20] p-6 rounded-2xl border border-[#2e3446]">
                <div className="space-y-3">
                  <span className="px-3 py-1 rounded-full bg-purple-600/20 text-purple-300 text-xs font-bold">
                    {formData.subcategorySlug}
                  </span>
                  <h1 className="text-2xl font-black text-slate-100">{formData.title || 'عنوان مقاله پیش‌نمایش'}</h1>
                  <p className="text-xs text-slate-300 leading-relaxed border-r-2 border-purple-500 pr-3">
                    {formData.excerpt || 'خلاصه مقاله در اینجا نمایش داده می‌شود...'}
                  </p>
                </div>

                {formData.coverImage && (
                  <div className="aspect-[16/9] rounded-2xl overflow-hidden border border-[#2e3446]">
                    <img src={formData.coverImage} alt="Cover" className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="text-xs text-slate-200 leading-relaxed space-y-4 pt-4 border-t border-[#2e3446]">
                  <div dangerouslySetInnerHTML={{ __html: formData.content || '<p>محتوای مقاله در اینجا قرار می‌گیرد...</p>' }} />
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};

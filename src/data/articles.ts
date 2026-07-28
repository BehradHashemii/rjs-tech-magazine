export interface Comment {
  id: string;
  fullName: string;
  email: string;
  content: string;
  createdAt: string;
  likes: number;
  dislikes?: number;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  categorySlug: "tech" | "science" | "howto";
  subcategorySlug: string;
  coverImage: string;
  author: {
    name: string;
    role: string;
    avatar: string;
    bio: string;
  };
  publishDate: string;
  readTimeMinutes: number;
  viewsCount: number;
  likesCount: number;
  isEditorsPick?: boolean;
  isHeroFeatured?: boolean;
  isTrending?: boolean;
  trendingRank?: number;
  tags: string[];
  comments: Comment[];
}

export const AUTHOR_BEHRAD = {
  name: "بهراد هاشمی",
  role: "سردبیر ارشد و پژوهشگر فناوری‌های نوین",
  avatar: "/me.jpg",
  bio: "مهندس برق، پژوهشگر حوزه هوش مصنوعی و تحلیل‌گر زیرساخت‌های وب با بیش ۵سال تجربه در رسانه‌های تخصصی تکنولوژی.",
  socials: {
    github: "https://github.com",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    telegram: "https://t.me",
    email: "mailto:behrad@example.com",
  },
};

export const ARTICLES: Article[] = [
  {
    id: "art-1",
    slug: "what-is-ai-everything-you-need-know-about-artificial-intelligence",
    title: "درک عمیق هوش مصنوعی: فراتر از جادو و به سوی ریاضیات",
    excerpt:
      "اگر میان انبوهی از سوالات و نحوه کارکرد هوش مصنوعی و مدل های زبانی بزرگ گیر کرده اید جواب شما در این مقاله‌ست",
    content: `<p>اگر میان انبوهی از سوالات و نحوه کارکرد هوش مصنوعی و مدل های زبانی بزرگ گیر کرده اید جواب شما در این مقاله‌ست</p>
<section>
  <h2>عبور از جادو به سمت ریاضیات</h2>
  <p>بسیاری از مردم فکر می‌کنند هوش مصنوعی (AI) یک "مغز دیجیتال" است که مانند انسان فکر می‌کند، یا روحی در کالبد کدهای برنامه‌نویسی است. اما حقیقت، هم ساده‌تر و هم شگفت‌انگیزتر است. هوش مصنوعی، به‌ویژه مدل‌هایی مثل ChatGPT، در واقع ماشین‌های پیش‌بینی فوق‌پیشرفته هستند که بر پایه ریاضیات، آمار و مقادیر عظیمی از داده‌ها بنا شده‌اند.</p>
</section>
<p>در این مقاله، ما لایه‌های این پیاز تکنولوژیک را باز می‌کنیم تا ببینیم در پشت صحنه چه می‌گذرد.</p>
<section>
  <h2>زیربنای هوش مصنوعی؛ شبکه‌های عصبی (Neural Networks)</h2>
  <p>برای درک مدل‌های زبانی، ابتدا باید بدانیم هوش مصنوعی مدرن از چه چیزی ساخته شده است. ساختار اصلی، شبکه‌های عصبی مصنوعی نام دارد که با الهام از ساختار بیولوژیکی مغز انسان طراحی شده است.</p>
  <ul>
    <strong>ساختار شبکه عصبی</strong>
    <p>یک شبکه عصبی از لایه‌های مختلفی تشکیل شده است:</p>
    <li><strong>لایه ورودی (Input Layer):</strong> جایی که داده‌ها (مثل یک عکس یا یک کلمه) وارد می‌شوند.</li>
    <li><strong>لایه‌های پنهان (Hidden Layers):</strong> جایی که پردازش اصلی و محاسبات ریاضی پیچیده (مانند y = wx + b) انجام می‌شود.</li>
    <li><strong>لایه خروجی (Output Layer):</strong> نتیجه نهایی (مثل تشخیص اینکه تصویر متعلق به یک گربه است یا سگ).</li>
  </ul>
  <p>در هر لایه، "نرون‌هایی" وجود دارند که در واقع توابع ریاضی کوچکی هستند. این نرون‌ها با هم در ارتباط‌اند و هر ارتباط یک وزن (Weight) دارد. آموزش دادن هوش مصنوعی یعنی تنظیم دقیق این وزن‌ها تا ماشین یاد بگیرد کدام الگوها به نتیجه درست ختم می‌شوند.</p>
</section>
<section>
  <h2>مدل زبانی چیست؟ (بازیِ حدسِ کلمه بعدی)</h2>
  <p>یک مدل زبانی (Language Model) در اصل یک سیستم است که یاد می‌گیرد "احتمال" وقوع یک دنباله از کلمات را تخمین بزند.</p>
  <strong>مثال ساده</strong>
  <p>وقتی شما در گوشی خود تایپ می‌کنید "سلام، چطوری..." و گوشی پیشنهاد می‌دهد "عزیزم" یا "هستی؟"، این یک مدل زبانی بسیار ساده است. مدل‌های بزرگ (Large) مثل GPT-4، همین کار را در مقیاسی میلیاردها برابر بزرگتر انجام می‌دهند.</p>
  <p><strong>نکته تخصصی:</strong> مدل‌های زبانی "معنا" را مانند ما نمی‌فهمند؛ آن‌ها همبستگی‌های آماری (Statistical Correlations) بین کلمات را می‌شناسند.</p>
</section>
<section>
  <h2>انقلاب ترنسفورمر (Transformer)؛ جادوی "توجه"</h2>
  <p>تا قبل از سال ۲۰۱۷، مدل‌های زبانی در فهم جملات طولانی مشکل داشتند. اما با معرفی معماری Transformer توسط گوگل، همه‌چیز تغییر کرد. قلب تپنده این معماری، مکانیزمی به نام خود-توجهی (Self-Attention) است.</p>
  <p><strong>مکانیزم توجه (Attention) چیست؟</strong><br />در مدل‌های قدیمی، کلمات به ترتیب پردازش می‌شدند. اما ترنسفورمرها کل جمله را به صورت یکجا می‌بینند. مکانیزم توجه به مدل اجازه می‌دهد بفهمد کدام کلمات در جمله به هم مرتبط هستند.</p>
</section>
<section>
  <h2>فرآیند آموزش (از نوزادی تا استادی)</h2>
  <p>ساخت یک مدل زبانی بزرگ شامل دو مرحله اصلی است:</p>
  <p><strong>۱. پیش‌آموزش (Pre-training)</strong><br />در این مرحله، مدل را در اقیانوسی از داده‌ها رها می‌کنند تا ساختار زبان را یاد بگیرد.</p>
  <p><strong>۲. آموزش تکمیلی یا تراز کردن (Fine-tuning & RLHF)</strong><br />در مرحله RLHF، انسان‌ها به پاسخ‌های مدل امتیاز می‌دهند تا مدل یاد بگیرد دستیار مفید و مودب باشد.</p>
</section>`,
    categorySlug: "tech",
    subcategorySlug: "ai-articles",
    coverImage:
      "https://noushinrostamifar.ir/varia/images/what-is-ai-everything-you-need-know-about-artificial-intelligence.webp",
    author: AUTHOR_BEHRAD,
    publishDate: "2025-09-20T18:19:31Z",
    readTimeMinutes: 8,
    viewsCount: 3420,
    likesCount: 189,
    isHeroFeatured: true,
    tags: ["هوش مصنوعی", "مدل زبانی", "ترنسفورمر"],
    comments: [],
  },
  {
    id: "art-2",
    slug: "why-python-choice-is-the-best-for-ai",
    title: "چرا پایتون بهترین انتخاب برای هوش مصنوعی است؟",
    excerpt:
      "پایتون به عنوان زبان استاندارد و بدون رقیب در دنیای هوش مصنوعی و یادگیری ماشین شناخته می‌شود.",
    content: `<p>پایتون به عنوان زبان استاندارد و بدون رقیب در دنیای هوش مصنوعی (AI) و یادگیری ماشین (ML) شناخته می‌شود. این محبوبیت اتفاقی نیست و نتیجه ترکیب چندین عامل کلیدی است که آینده دشوار و پیچیده توسعه سیستم‌های هوشمند را آسان‌تر، سریع‌تر و کارآمدتر می‌کند.</p>
<div>
  <h2>اکوسیستم غنی از کتابخانه‌ها و فریم‌ورک‌های تخصصی</h2>
  <p>این شاید مهم‌ترین دلیل باشد. پایتون دارای مجموعه‌ای عظیم از کتابخانه‌های پیش‌ساخته مانند TensorFlow, PyTorch, Scikit-learn است که به طور اختصاصی برای وظایف مختلف هوش مصنوعی طراحی شده‌اند.</p>
</div>
<div>
  <h2>سادگی، خوانایی و سینتکس کاربرپسند</h2>
  <p>هوش مصنوعی ذاتاً با ریاضیات پیچیده و الگوریتم‌های دشوار سر و کار دارد. پایتون با داشتن سینتکس بسیار ساده و شبیه به زبان انگلیسی، بار ذهنی برنامه‌نویس را کم می‌کند.</p>
  <ul>
    <li><strong>تمرکز بر مسئله، نه زبان:</strong> توسعه‌دهندگان به جای درگیر شدن با مدیریت حافظه، تمام تمرکز خود را روی حل مسئله می‌گذارند.</li>
    <li><strong>کد کمتر، کارایی بیشتر:</strong> فرآیند نوشتن و تست نمونه‌های اولیه (Prototyping) در پایتون بسیار سریع‌تر است.</li>
  </ul>
</div>
<div>
  <h2>پشتیبانی جامعه بزرگ و فعال (Community)</h2>
  <p>پایتون یکی از محبوب‌ترین زبان‌های برنامه‌نویسی دنیاست و در زمینه هوش مصنوعی، بزرگ‌ترین جامعه برنامه‌نویسان را دارد.</p>
</div>`,
    categorySlug: "tech",
    subcategorySlug: "ai-articles",
    coverImage: "https://noushinrostamifar.ir/varia/images/python-for-ai.webp",
    author: AUTHOR_BEHRAD,
    publishDate: "2025-10-22T10:46:11Z",
    readTimeMinutes: 6,
    viewsCount: 2840,
    likesCount: 145,
    isTrending: true,
    trendingRank: 1,
    tags: ["هوش مصنوعی", "پایتون", "یادگیری ماشین"],
    comments: [],
  },
  {
    id: "art-3",
    slug: "best-of-point-using-tailwind",
    title: "مزایای استفاده از Tailwind CSS در پروژه‌های بزرگ",
    excerpt:
      "چگونه فریم‌ورک Tailwind CSS مدیریت استایل در پروژه‌های مقیاس‌بزرگ فرانت‌اند را ساده و سریع می‌کند؟",
    content: `<p>سلام به شما توسعه‌دهندگان و مهندسان فرانت‌اند! اگر تا به حال روی یک پروژه بزرگ کار کرده باشید، احتمالاً با فایل‌های CSS حجیم، کلاس‌های تکراری و مشکلات نگهداری استایل‌ها روبه‌رو شده‌اید. در این مقاله به صورت تخصصی بررسی می‌کنیم که چرا Tailwind می‌تواند انتخابی هوشمندانه باشد.</p>
<h2>Tailwind CSS چه تفاوتی با رویکرد سنتی دارد؟</h2>
<p>در روش‌های سنتی، توسعه‌دهندگان معمولاً ابتدا کلاس‌های CSS را در فایل‌های جداگانه تعریف می‌کنند. اما در Tailwind، استایل‌ها به صورت کلاس‌های utility کوچک و قابل ترکیب در HTML استفاده می‌شوند.</p>
<h2>۱. افزایش سرعت توسعه رابط کاربری</h2>
<p>به جای نوشتن CSS جدید برای هر کامپوننت، می‌توانید از کلاس‌های آماده استفاده کنید:</p>
<pre><code class="language-css">/* Example utility composition */
.card {
  @apply p-6 bg-slate-800 rounded-2xl border border-slate-700 shadow-xl transition-all;
}</code></pre>
<pre><code class="language-html"><div class="p-6 bg-slate-800 rounded-2xl border border-slate-700 shadow-xl">
  <h3 class="text-xl font-bold text-white">عنوان کارت نمونه</h3>
</div></code></pre>
<h2>۲. مقیاس‌پذیری و عدم تداخل استایل‌ها</h2>
<p>Tailwind با ارائه سیستم طراحی استاندارد و حذف کلاس‌های استفاده نشده در مرحله Build، حجم فایل نهایی CSS را بسیار کوچک نگه می‌دارد.</p>`,
    categorySlug: "howto",
    subcategorySlug: "computer-learning",
    coverImage: "https://noushinrostamifar.ir/varia/images/tailwindcss.webp",
    author: AUTHOR_BEHRAD,
    publishDate: "2025-12-01T10:46:11Z",
    readTimeMinutes: 5,
    viewsCount: 1920,
    likesCount: 98,
    isEditorsPick: true,
    tags: ["frontend", "css", "tailwind"],
    comments: [],
  },
  {
    id: "art-4",
    slug: "important-command-git",
    title: "دستورات کاربردی و پیشرفته Git",
    excerpt:
      "راهنمای جامع مدیریت نسخه پیشرفته شامل Stash, Rebase, Cherry-pick برای برنامه‌نویسان و تیم‌های نرم‌افزاری",
    content: `<p>مطمئنم برای شما هم پیش آمده که در میان کدهای یک پروژه تیمی بزرگ، با تداخل کدها (Conflict) یا نیاز به جابجایی ناگهانی بین شاخه‌ها (Branches) مواجه شوید. امروز می‌خواهیم شما را با ابزارهای پیشرفته گیت آشنا کنیم.</p>
<h2>۱. جادوی Git Stash: مدیریت سریع تغییرات ناتمام</h2>
<p>ذخیره موقت تغییرات بدون کامیت کردن کدهای ناقص:</p>
<pre><code class="language-bash"># ذخیره تغییرات فعلی در استش
git stash save "work in progress on feature X"

# مشاهده لیست استش‌ها
git stash list

# بازیابی آخرین تغییرات ذخیره شده
git stash pop</code></pre>
<h2>۲. هنر Git Rebase: تاریخچه‌ای یکپارچه و خطی</h2>
<pre><code class="language-bash"># به‌روزرسانی شاخه فعلی بر اساس آخرین کامیت‌های main
git checkout feature-branch
git rebase main</code></pre>
<h2>۳. گلچین کردن با Git Cherry-pick</h2>
<pre><code class="language-bash"># انتقال یک کامیت مشخص به شاخه فعلی
git cherry-pick a1b2c3d4</code></pre>`,
    categorySlug: "howto",
    subcategorySlug: "computer-learning",
    coverImage: "https://noushinrostamifar.ir/varia/images/git-command.webp",
    author: AUTHOR_BEHRAD,
    publishDate: "2026-01-01T14:15:49Z",
    readTimeMinutes: 7,
    viewsCount: 3100,
    likesCount: 210,
    isTrending: true,
    trendingRank: 2,
    tags: ["گیت", "سورس کنترل", "برنامه‌نویسی"],
    comments: [],
  },
  {
    id: "art-5",
    slug: "top-iranian-ai-chatbots",
    title: "چت‌بات‌های هوش مصنوعی ایرانی که در قطعی اینترنت در دسترس هستند",
    excerpt:
      "معرفی کاربردی‌ترین چت‌بات‌ها و دستیارهای هوش مصنوعی داخلی مثل زیگپ، گپ‌جی‌پی‌تی و روبو",
    content: `<p>از ChatGPT و جمنای گرفته تا کوپایلت و پرپلکسیتی، چت‌بات‌های هوش مصنوعی به‌قدری در زندگی روزمره‌مان نفوذ کرده‌اند که در قطعی‌های اینترنت خلأ آن‌ها حس می‌شود. در این مقاله سرویس‌های هوش مصنوعی ایرانی را معرفی می‌کنیم که کارکرد بهتری به‌نمایش می‌گذارند.</p>
<h2>زیگپ (Zigap)</h2>
<p>زیگپ از جمله‌ی محبوب‌ترین اپلیکیشن‌های ایرانی هوش مصنوعی است که امکاناتی همچون چت صوتی، تبدیل متن به عکس، و دستیار هوشمند ارائه می‌دهد.</p>
<h2>گپ‌جی‌پی‌تی (GapGPT)</h2>
<p>گپ‌جی‌پی‌تی مدل‌های زبانی متعددی را در اختیار کاربر قرار می‌دهد که از جمله‌ی آن‌ها می‌توان به GPT-5.2 و Gemini 3.1 و Claude Sonnet اشاره کرد.</p>
<h2>روبو (Robo)</h2>
<p>سرویسی پردانلود با پشتیبانی از مدل‌های متنوع متنی و تصویرساز برای تولید محتوا و کدنویسی.</p>`,
    categorySlug: "tech",
    subcategorySlug: "ai-articles",
    coverImage:
      "https://noushinrostamifar.ir/varia/images/ai-tools-692eb80b2017c0b719e16ce5.webp",
    author: AUTHOR_BEHRAD,
    publishDate: "2026-03-28T19:06:49Z",
    readTimeMinutes: 9,
    viewsCount: 4890,
    likesCount: 312,
    isEditorsPick: true,
    tags: ["هوش مصنوعی", "چت‌بات", "ابزارهای ایرانی"],
    comments: [],
  },
  {
    id: "art-6",
    slug: "music-websites-app-national-internet",
    title: "چطور بدون دسترسی به اینترنت بین‌الملل موزیک گوش کنیم؟",
    excerpt:
      "معرفی وب‌سایت‌ها و اپلیکیشن‌های پخش موسیقی فعال روی شبکه ملی اطلاعات",
    content: `<p>اگر تنها به نت ملی دسترسی دارید و می‌خواهید به موسیقی گوش دهید، سرویس‌ها و وب‌سایت‌های زیر می‌توانند نیاز شما را برطرف کنند:</p>
<h2>۱. اپلیکیشن ملودیفای</h2>
<p>یک اپلیکیشن کاربردی برای پخش موسیقی که نسخه‌های مختلفی برای اندروید، آیفون، ویندوز و مک دارد.</p>
<h2>۲. والا موزیک (VMusic)</h2>
<p>مرجع تخصصی موسیقی‌های بیکلام، کلاسیک، مدرن و موسیقی فیلم با کیفیت عالی.</p>
<h2>۳. آوا پدیا</h2>
<p>سرویس جستجو و پخش آنلاین موسیقی‌های ایرانی و بین‌المللی همراه با متن ترانه‌ها.</p>`,
    categorySlug: "howto",
    subcategorySlug: "mobile-learning",
    coverImage:
      "https://noushinrostamifar.ir/varia/images/oneplus-13-music-player.webp",
    author: AUTHOR_BEHRAD,
    publishDate: "2026-03-31T18:19:31Z",
    readTimeMinutes: 4,
    viewsCount: 2650,
    likesCount: 134,
    tags: ["موسیقی", "اینترنت", "برنامه‌های کاربردی"],
    comments: [],
  },
  {
    id: "art-7",
    slug: "ai-helping-f-35-spot-enemy-air-defenses",
    title: "جنگنده F-35 اکنون به کمک هوش مصنوعی پدافندها را شناسایی می‌کند",
    excerpt:
      "جزئیات ادغام هوش مصنوعی در سیستم‌های جنگ الکترونیک و شناسایی هوشمند جنگنده F-35 لاکهید مارتین",
    content: `<p>شرکت لاکهید مارتین جزئیات جدیدی را درباره‌ی نحوه‌ی استفاده از هوش مصنوعی برای کمک به خلبانان جنگنده‌ی F-35 به اشتراک گذاشت. این جنگنده‌ی نسل پنجمی از فناوری AI برای شناسایی سریع‌تر و دقیق‌تر پدافندهای هوایی استفاده می‌کند.</p>
<h2>شناسایی رزمی مستقل روی کلاه ایمنی خلبان</h2>
<p>جنگنده‌ی F-35 اطلاعات تهدیدها را مستقیماً روی کلاه ایمنی خلبان و نمایشگر عریض کابین نشان می‌دهد. مدل هوش مصنوعی ابهامات شناسایی میان فرستنده‌های سیگنال را برطرف کرده و آگاهی محیطی خلبان را افزایش می‌دهد.</p>`,
    categorySlug: "science",
    subcategorySlug: "engineering",
    coverImage:
      "https://noushinrostamifar.ir/varia/images/ai-helping-f-35-spot-enemy-air-defenses.webp",
    author: AUTHOR_BEHRAD,
    publishDate: "2026-04-01T18:19:31Z",
    readTimeMinutes: 8,
    viewsCount: 3820,
    likesCount: 245,
    isTrending: true,
    trendingRank: 3,
    tags: ["مهندسی", "هوش مصنوعی", "هوا و فضا"],
    comments: [],
  },
  {
    id: "art-8",
    slug: "foreign-datacenters-connection-reason",
    title: "ماجرای برقراری ارتباط شبکه اینترنت با دیتاسنترهای خارجی چیست؟",
    excerpt:
      "تحلیل شواهد و تغییر وضعیت رادارهای ابرآروان در اتصال به دیتاسنترهای خارجی",
    content: `<p>رادار ابرآروان تغییر وضعیتی را نشان داد: سرویس‌های ایرانی در دیتاسنترهای ایران به‌تدریج در حال وصل شدن به دیتاسنترهای جهانی هستند.</p>
<p>کارشناسان می‌گویند در حال حاضر به شکل وایت‌لیستی برخی سرویس‌ها و دامنه‌های خارجی در حال باز شدن در شبکه اینترنت کشور هستند که می‌تواند مقدمه بازگشایی شبکه باشد.</p>`,
    categorySlug: "tech",
    subcategorySlug: "internet-network",
    coverImage:
      "https://api2.zoomit.ir/media/internet-connection2-63b52929745f73edafcd31cd?w=1200&q=80",
    author: {
      name: "هانیه کلهر",
      role: "تحلیل‌گر شبکه و وب",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
      bio: "روزنامه‌نگار و پژوهشگر حوزه زیرساخت‌های شبکه و اینترنت",
    },
    publishDate: "2026-04-13T18:19:31Z",
    readTimeMinutes: 5,
    viewsCount: 5120,
    likesCount: 410,
    tags: ["اینترنت", "شبکه", "دیتاسنتر"],
    comments: [
      {
        id: "comm-8-1",
        fullName: "محمد صادق هاشمیان",
        email: "sadegh@example.com",
        content: "پشماممممم",
        createdAt: "۲۴ فروردین ۱۴۰۵، ۲۰:۱۹",
        likes: 12,
        dislikes: 1,
      },
    ],
  },
  {
    id: "art-9",
    slug: "ssl-internet-blackout",
    title: "معمای قفل‌های دیجیتال: تقاطع گواهی SSL و قطعی اینترنت",
    excerpt:
      "بررسی علل فنی قطعی سامانه‌های مهم و خطاهای SSL و DNS در دوران محدودیت‌های اینترنتی",
    content: `<p>تعداد وب‌سایت‌های دولتی و خدماتی که این روزها با مشکلاتی روبه‌رو شده‌اند زیاد است. بسیاری از آن‌ها خطای SSL یا DNS نشان می‌دهند.</p>
<h2>۱. منقضی شدن گواهی امنیت (SSL)</h2>
<p>علت اصلی، دسترسی نداشتن سرورها به سرویس‌های صادرکننده گواهی مانند Lets Encrypt برای تمدید خودکار SSL است.</p>
<h2>۲. تنظیم نشدن دی‌ان‌اس (DNS)</h2>
<p>به دلیل قطعی ارتباط با CDN‌های بین‌المللی مثل کلودفلر، آدرس‌دهی سرورها با اختلال مواجه می‌شود.</p>`,
    categorySlug: "tech",
    subcategorySlug: "security",
    coverImage:
      "https://api2.zoomit.ir/media/126-697772681f7be142ad6524bf?w=1080&q=80",
    author: AUTHOR_BEHRAD,
    publishDate: "2026-04-22T09:15:24Z",
    readTimeMinutes: 7,
    viewsCount: 4230,
    likesCount: 318,
    tags: ["اینترنت", "امنیت", "SSL", "شبکه"],
    comments: [
      {
        id: "comm-9-1",
        fullName: "بهنام نوروزیان",
        email: "behnam@example.com",
        content: "اینترنت میخواهم 🥲💔",
        createdAt: "۲ اردیبهشت ۱۴۰۵، ۰۹:۳۵",
        likes: 45,
        dislikes: 2,
      },
      {
        id: "comm-9-2",
        fullName: "سارا بساطی",
        email: "sara@example.com",
        content: "آه 💔💔💔",
        createdAt: "۳ اردیبهشت ۱۴۰۵، ۱۰:۳۵",
        likes: 28,
        dislikes: 0,
      },
    ],
  },
  {
    id: "art-10",
    slug: "building-electrical-wiring-system",
    title: "تحلیل، استانداردها و رویکردهای اجرایی تاسیسات الکتریکی ساختمان",
    excerpt:
      "بررسی کامل مقررات ملی ساختمان (مبحث ۱۳)، محاسبات بار، ارتینگ، کلید محافظ جان و هوشمندسازی",
    content: `<p>تاسیسات الکتریکی ساختمان، دانشی میان‌رشته‌ای است که مفاهیم فیزیک الکتریسیته را با استانداردهای مهندسی ساختمان، اصول ایمنی و فناوری‌های نوین پیوند می‌دهد.</p>
<h2>چارچوب‌های قانونی و استانداردهای مبحث ۱۳</h2>
<p>طراحی و اجرای تاسیسات برقی در ایران تحت حاکمیت مطلق "مبحث سیزدهم مقررات ملی ساختمان" قرار دارد که تمامی الزامات فنی را مشخص می‌کند.</p>
<h2>سیستم اتصال به زمین (ارتینگ) و کلید محافظ جان</h2>
<p>سیستم ارتینگ با ایجاد مسیر کم‌مقاومت به زمین، از شوک الکتریکی جلوگیری می‌کند. کلید محافظ جان (RCCB) نیز نشتی جریان بالای ۳۰ میلی‌آمپر را در کسری از ثانیه قطع می‌کند.</p>`,
    categorySlug: "science",
    subcategorySlug: "engineering",
    coverImage:
      "https://noushinrostamifar.ir/varia/images/2026-building-electrical-wiring-system.webp",
    author: AUTHOR_BEHRAD,
    publishDate: "2026-05-06T18:16:21Z",
    readTimeMinutes: 12,
    viewsCount: 1850,
    likesCount: 120,
    tags: ["برق", "مهندسی برق", "فنی و مهندسی"],
    comments: [
      {
        id: "comm-10-1",
        fullName: "متین جعفری",
        email: "matin@example.com",
        content: "چقدر عالی بود ممنون از شما",
        createdAt: "۱۶ اردیبهشت ۱۴۰۵، ۲۱:۳۵",
        likes: 8,
        dislikes: 0,
      },
      {
        id: "comm-10-2",
        fullName: "محمد صادق هاشمیان",
        email: "sadegh@example.com",
        content: "چه مقاله کاملی بود سپاس از نوشتن شما",
        createdAt: "۱۶ اردیبهشت ۱۴۰۵، ۲۲:۵۵",
        likes: 14,
        dislikes: 0,
      },
    ],
  },
  {
    id: "art-11",
    slug: "prompt-engineering-mastery-gpt4o-claude35",
    title: "راهنمای جامع پرامپت‌نویسی حرفه‌ای برای مدل‌های GPT-4o و Claude 3.5",
    excerpt:
      "تکنیک‌های پیشرفته مهندسی پرامپت از جمله Few-Shot Prompting، Chain-of-Thought و ساخت دستورالعمل‌های سیستمی ساختاریافته",
    content: `<p>مهندسی پرامپت (Prompt Engineering) تنها هنر «خوب سوال پرسیدن» نیست؛ بلکه علم تنظیم دقیق ورودی‌ها برای هدایت رفتار آماری مدل‌های زبانی بزرگ است.</p>
<h2>۱. ساختار پرامپت طلایی (The Golden Prompt Framework)</h2>
<p>یک پرامپت حرفه‌ای شامل ۵ مولفه اصلی است:</p>
<ul>
  <li><strong>نقش (Role):</strong> تعیین شخصیت هوش مصنوعی (مثلاً: «تو یک معمار ارشد سیستم با ۱۵ سال تجربه هستی»)</li>
  <li><strong>بستر (Context):</strong> توضیح صورت مسئله و زمینه کاری</li>
  <li><strong>وظیفه (Task):</strong> دستور دقیق و شفاف بدون ابهام</li>
  <li><strong>محدودیت‌ها (Constraints):</strong> خروجی در چه قالبی باشد، شامل چه چیزهایی نباشد</li>
  <li><strong>نمونه‌ها (Examples / Few-Shot):</strong> ارائه ۱ تا ۳ نمونه ورودی/خروجی مطلوب</li>
</ul>
<h2>۲. تکنیک زنجیره تفکر (Chain-of-Thought - CoT)</h2>
<p>با اضافه کردن عبارت ساده «گام به گام فکر کن و مراحل استدلالت را بنویس»، دقت مدل در مسائل منطقی و محاسباتی تا بیش از ۴۰ درصد افزایش می‌یابد.</p>
<h2>۳. کد پرامپت سیستمی پیشنهادی</h2>
<pre><code># System Directive
Role: Senior AI Architect
Instruction: Think step-by-step before producing output.
Output Format: Markdown with JSON payload for data structures.
Constraints: Avoid vague advice, provide production-ready examples.</code></pre>
<p>با رعایت این اصول، می‌توانید از مدل‌های پیشرفته نهایت بهره‌وری را کسب کنید.</p>`,
    categorySlug: "howto",
    subcategorySlug: "ai-tutorials",
    coverImage:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop",
    author: AUTHOR_BEHRAD,
    publishDate: "2026-05-18T14:30:00Z",
    readTimeMinutes: 10,
    viewsCount: 2890,
    likesCount: 245,
    isEditorsPick: true,
    tags: ["هوش مصنوعی", "پرامپت نویسی", "ChatGPT", "Claude", "آموزش"],
    comments: [
      {
        id: "comm-11-1",
        fullName: "رضا علوی",
        email: "reza@example.com",
        content:
          "تکنیک زنجیره تفکر فوق‌العاده بود! روی پروژه خودم تست کردم پاسخش کاملا تغییر کرد.",
        createdAt: "۲۹ اردیبهشت ۱۴۰۵، ۱۶:۱۰",
        likes: 19,
        dislikes: 0,
      },
    ],
  },
  {
    id: "art-12",
    slug: "building-ai-agents-python-langchain",
    title: "آموزش عملی ساخت عامل‌های هوشمند (AI Agents) با پایتون و LangChain",
    excerpt:
      "راهنمای قدم به قدم توسعه عامل‌های خودمختار با قابلیت فراخوانی ابزارها (Tool Calling)، حافظه کوتاه‌مدت و تصمیم‌گیری زنجیره‌ای",
    content: `<p>عامل‌های هوشمند (AI Agents) گام بعدی در تحول هوش مصنوعی هستند. آن‌ها بر خلاف چت‌بات‌های معمولی، قادرند ابزارهای مختلف را فراخوانی کرده و کارهای واقعی انجام دهند.</p>
<h2>معماری یک Agent واقعی</h2>
<p>یک Agent استاندارد از ۴ بخش تشکیل شده است:</p>
<ul>
  <li><strong>مغز (LLM):</strong> مدل زبانی برای تصمیم‌گیری</li>
  <li><strong>ابزارها (Tools):</strong> توابعی مانند جستجو در وب، محاسبه‌گر یا دسترسی به API</li>
  <li><strong>حافظه (Memory):</strong> نگهداری تاریخچه مکالمات</li>
  <li><strong>برنامه‌ریز (Planner):</strong> تقسیم اهداف بزرگ به گام‌های کوچک</li>
</ul>
<h2>نمونه کد ساخت Agent با Python</h2>
<pre><code>from langchain_openai import ChatOpenAI
from langchain.agents import initialize_agent, Tool
from langchain.tools import DuckDuckGoSearchRun

search = DuckDuckGoSearchRun()
tools = [
    Tool(
        name="Search",
        func=search.run,
        description="Useful for searching online current info"
    )
]

llm = ChatOpenAI(model="gpt-4o", temperature=0)
agent = initialize_agent(tools, llm, agent="zero-shot-react-description")

response = agent.run("آخرین قیمت بیت‌کوین و اخبار مربوط به آن را پیدا کن")
print(response)</code></pre>
<p>با ترکیب این ابزارها، عامل‌ها می‌توانند وظایف پیچیده اداری و فنی را خودکارسازی کنند.</p>`,
    categorySlug: "howto",
    subcategorySlug: "ai-tutorials",
    coverImage:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
    author: AUTHOR_BEHRAD,
    publishDate: "2026-05-24T10:15:00Z",
    readTimeMinutes: 12,
    viewsCount: 3120,
    likesCount: 290,
    isTrending: true,
    tags: ["پایتون", "LangChain", "AI Agents", "برنامه‌نویسی", "آموزش"],
    comments: [
      {
        id: "comm-12-1",
        fullName: "امیرحسین امیری",
        email: "amir@example.com",
        content:
          "آموزش بسیار روانی بود. برای پروژه اتوماسیون شرکتمون ازش استفاده کردم.",
        createdAt: "۵ خرداد ۱۴۰۵، ۱۱:۴۰",
        likes: 15,
        dislikes: 0,
      },
    ],
  },
  {
    id: "art-13",
    slug: "understanding-rag-architecture-enterprise-ai",
    title:
      "تحلیل معماری RAG (تولید بازیابی‌افزوده): اتصال هوش مصنوعی به داده‌های سازمانی",
    excerpt:
      "چگونه با استفاده از دیتابیس‌های برداری (Vector DB) و الگوریتم‌های چانکینگ، مشکل هالوژنیشن در مدل‌های زبانی بزرگ را حل کنیم؟",
    content: `<p>بزرگ‌ترین چالش مدل‌های زبانی بزرگ در محیط‌های سازمانی، نداشتن دسترسی به داده‌های محرمانه و خطر هالوژنیشن (توهم) است. راهکار استاندارد صنعت برای این چالش، معماری RAG است.</p>
<h2>فرآیند ۳ مرحله‌ای RAG</h2>
<p><strong>۱. ایندکس‌گذاری (Indexing):</strong> سندها شکسته‌شده (Chunking) و تبدیل به بردارهای عددی (Embeddings) می‌شوند.<br />
<strong>۲. بازیابی (Retrieval):</strong> پرامپت کاربر تبدیل به بردار شده و شبیه‌ترین مستندات از Vector DB بازیابی می‌شوند.<br />
<strong>۳. تولید (Generation):</strong> مستندات بازیابی‌شده به همراه سوال کاربر به LLM ارسال می‌شود تا پاسخی دقیق و مستند تولید گردد.</p>
<h2>مقایسه دیتابیس‌های برداری برتر</h2>
<ul>
  <li><strong>Qdrant:</strong> عملکرد فوق‌العاده با Rust و مناسب سیستم‌های توزیع‌شده</li>
  <li><strong>Pinecone:</strong> سرویس ابری بدون نیاز به مدیریت زیرساخت</li>
  <li><strong>PGVector:</strong> افزونه عالی برای PostgreSQL موجود</li>
</ul>`,
    categorySlug: "tech",
    subcategorySlug: "ai-articles",
    coverImage:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop",
    author: AUTHOR_BEHRAD,
    publishDate: "2026-06-01T08:00:00Z",
    readTimeMinutes: 9,
    viewsCount: 2600,
    likesCount: 210,
    tags: ["هوش مصنوعی", "RAG", "Vector DB", "زیرساخت", "داده"],
    comments: [],
  },
  {
    id: "art-14",
    slug: "complete-linux-guide-for-developers",
    title:
      "آموزش جامع لینوکس برای توسعه‌دهندگان: فرمان‌های کلیدی، سرور و Bash Scripting",
    excerpt:
      "راهنمای تسلط بر ترمینال لینوکس، مدیریت پروسه‌ها، تنظیمات شبکه و خودکارسازی وظایف با اسکریپت‌های باش",
    content: `<p>لینوکس سیستم‌عامل اصلی زیرساخت‌های ابری و سرورهای دنیاست. تسلط بر لینوکس برای هر توسعه‌دهنده‌ای یک مهارت حیاتی محسوب می‌شود.</p>
<h2>دستورات فرماندهی و مدیریت سرور</h2>
<p>فرمان‌های روزمره ترمینال که باید ملکه ذهن شما باشند:</p>
<pre><code># بررسی وضعیت پروسه‌ها و منابع سیستم
htop
# جستجوی خطوط در فایل‌ها با قدرت بالا
grep -rnw '/var/log/' -e 'ERROR'
# مدیریت سرویس‌ها با Systemd
sudo systemctl status nginx
sudo systemctl restart nginx</code></pre>
<h2>خودکارسازی با Bash Scripting</h2>
<p>یک نمونه اسکریپت ساده جهت بکاپ‌گیری خودکار دیتابیس و ارسال اعلان:</p>
<pre><code>#!/bin/bash
BACKUP_DIR="/var/backups/db"
DATE=$(date +%Y%m%d_%H%m)
mkdir -p $BACKUP_DIR
pg_dump -U postgres myapp > "$BACKUP_DIR/backup_$DATE.sql"
echo "Backup created successfully at $DATE"</code></pre>`,
    categorySlug: "howto",
    subcategorySlug: "computer-learning",
    coverImage:
      "https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=1200&auto=format&fit=crop",
    author: AUTHOR_BEHRAD,
    publishDate: "2026-06-10T12:20:00Z",
    readTimeMinutes: 11,
    viewsCount: 3890,
    likesCount: 310,
    tags: ["لینوکس", "ترمینال", "سرور", "برنامه‌نویسی", "کامپیوتر"],
    comments: [],
  },
  {
    id: "art-15",
    slug: "generative-video-sora-veo-midjourney-v7",
    title:
      "هوش مصنوعی مولد ویدیو و تصویر: بررسی معماری فنی Sora، Veo 2 و Midjourney v7",
    excerpt:
      "کالبدشکافی تکنولوژی مدل‌های پخش چندبعدی (Latent Diffusion) و ترنسفورمرهای ویدیویی در خلق تصاویر و ویدیوهای شبیه‌سازی فیزیکی",
    content: `<p>دنیای هوش مصنوعی مولد از تولید متن و کد عبور کرده و وارد عصر شبیه‌سازی کامل جهان بصری با مدل‌های ویدیو و تصویر شده است.</p>
<h2>معماری Diffusion Transformers (DiT)</h2>
<p>نمونه‌هایی مانند OpenAI Sora و Google Veo 2 از ترکیب Diffusion Models با Transformers استفاده می‌کنند. این ترکیب امکان درک پدیده‌های فیزیکی، انعکاس نور و ثبات اشیاء در طول زمان را فراهم کرده است.</p>
<h2>تکنولوژی Midjourney v7</h2>
<p>نسخه جدید Midjourney با کنترل کامل بر پرسپکتیو، نورپردازی واقعی استودیویی و پایبندی ۹۹ درصدی به متن ورودی، تحولی بزرگ در صنعت طراحی گرافیک و سینما ایجاد کرده است.</p>`,
    categorySlug: "tech",
    subcategorySlug: "ai-articles",
    coverImage:
      "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=1200&auto=format&fit=crop",
    author: AUTHOR_BEHRAD,
    publishDate: "2026-06-15T17:45:00Z",
    readTimeMinutes: 8,
    viewsCount: 4100,
    likesCount: 380,
    isEditorsPick: true,
    tags: ["هوش مصنوعی", "Sora", "مولد ویدیو", "Midjourney", "فناوری"],
    comments: [],
  },
];

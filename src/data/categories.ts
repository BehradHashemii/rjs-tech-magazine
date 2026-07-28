export interface SubCategory {
  id: string;
  slug: string;
  title: string;
  description: string;
  iconName: string;
}

export interface Category {
  id: string;
  slug: string;
  title: string;
  description: string;
  subcategories: SubCategory[];
  accentColor: string;
}

export const CATEGORIES: Category[] = [
  {
    id: 'tech',
    slug: 'tech',
    title: 'فناوری',
    description: 'جدیدترین دستاوردها و اخبار هوش مصنوعی، شبکه، اینترنت و امنیت دیجیتال',
    accentColor: 'var(--accent-purple)',
    subcategories: [
      {
        id: 'ai-articles',
        slug: 'ai-articles',
        title: 'هوش مصنوعی',
        description: 'تحلیل مدل‌های زبانی، یادگیری عمیق، پردازش تصویر و هوش مصنوعی مولد',
        iconName: 'Cpu',
      },
      {
        id: 'internet-network',
        slug: 'internet-network',
        title: 'اینترنت و شبکه',
        description: 'معماری وب، پروتکل‌های ارتباطی، پردازش ابری و زیرساخت شبکه',
        iconName: 'Globe',
      },
      {
        id: 'security',
        slug: 'security',
        title: 'امنیت و حریم خصوصی',
        description: 'تست نفوذ، رمزارزها، امنیت سایبری و حفاظت از داده‌ها',
        iconName: 'ShieldCheck',
      },
    ],
  },
  {
    id: 'science',
    slug: 'science',
    title: 'علم',
    description: 'کشف رازهای کیهان، نوآوری‌های مهندسی و مرزهای دانش پایه',
    accentColor: 'var(--accent-cyan)',
    subcategories: [
      {
        id: 'space',
        slug: 'space',
        title: 'هوا و فضا',
        description: 'کاوش‌های کیهانی، تلسکوپ‌ها، مأموریت‌های مریخ و فناوری‌های فضایی',
        iconName: 'Rocket',
      },
      {
        id: 'engineering',
        slug: 'engineering',
        title: 'مهندسی',
        description: 'رباتیک، کوانتوم کمپیوپتینگ، انرژی‌های پاک و الکترونیک پیشرفته',
        iconName: 'Wrench',
      },
      {
        id: 'fundamental-science',
        slug: 'fundamental-science',
        title: 'علوم پایه',
        description: 'فیزیک نظری، زیست‌شناسی محاسباتی و شیمی کوانتومی',
        iconName: 'Atom',
      },
    ],
  },
  {
    id: 'howto',
    slug: 'howto',
    title: 'آموزشی',
    description: 'راهنماهای کاربردی گام‌به‌گام برای یادگیری ابزارهای دیجیتال و برنامه‌نویسی',
    accentColor: 'var(--accent-amber)',
    subcategories: [
      {
        id: 'ai-tutorials',
        slug: 'ai-tutorials',
        title: 'آموزش هوش مصنوعی',
        description: 'نحوه کار با مدل‌های زبانی، مهندسی پرامپت و توسعه برنامه‌های مبتنی بر LLM',
        iconName: 'Sparkles',
      },
      {
        id: 'computer-learning',
        slug: 'computer-learning',
        title: 'آموزش کامپیوتر',
        description: 'برنامه‌نویسی وب، لینوکس، مدیریت سرور و نرم‌افزارهای تخصصی',
        iconName: 'Terminal',
      },
      {
        id: 'mobile-learning',
        slug: 'mobile-learning',
        title: 'آموزش موبایل',
        description: 'توسعه اپلیکیشن اندروید و iOS، ترفندهای موبایل و امنیت سیستم‌عامل‌های همراه',
        iconName: 'Smartphone',
      },
    ],
  },
];

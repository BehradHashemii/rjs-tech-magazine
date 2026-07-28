import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { AddArticleModal } from './components/AddArticleModal';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { SearchPage } from './pages/SearchPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function SecretRouteHandler({ onOpenModal }) {
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname === '/admin' || pathname === '/admin/add-article' || pathname === '/secret-editor') {
      onOpenModal();
    }
  }, [pathname, onOpenModal]);
  return null;
}

export function App() {
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [addArticleModalOpen, setAddArticleModalOpen] = useState(false);

  // Global secret shortcut listener: Ctrl + Shift + A or Cmd + Shift + A
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a' || e.key === 'ش')) {
        e.preventDefault();
        setAddArticleModalOpen(prev => !prev);
      }
    };

    const handleCustomEvent = () => {
      setAddArticleModalOpen(true);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-secret-editor', handleCustomEvent);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-secret-editor', handleCustomEvent);
    };
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <SecretRouteHandler onOpenModal={() => setAddArticleModalOpen(true)} />

      <div className="min-h-screen bg-[#0b0c10] text-[#f8fafc] font-['Vazirmatn',sans-serif] flex flex-col justify-between selection:bg-purple-500/30 selection:text-purple-300">
        
        {/* Top Header Navigation with Mega Menu */}
        <Header 
          onOpenSearchModal={() => setSearchModalOpen(true)} 
          onOpenSecretEditor={() => setAddArticleModalOpen(true)}
        />

        {/* Search Modal */}
        <SearchModal 
          isOpen={searchModalOpen} 
          onClose={() => setSearchModalOpen(false)} 
        />

        {/* Hidden Article Creation Modal */}
        <AddArticleModal
          isOpen={addArticleModalOpen}
          onClose={() => setAddArticleModalOpen(false)}
        />

        {/* Main Content Area */}
        <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex-grow">
          <Routes>
            {/* Home Page */}
            <Route path="/" element={<HomePage />} />

            {/* Main Category Routes */}
            <Route path="/:categorySlug" element={<CategoryPage />} />

            {/* Subcategory Specific Routes */}
            <Route path="/:categorySlug/:subcategorySlug" element={<CategoryPage />} />

            {/* Article Detail Page */}
            <Route path="/article/:slug" element={<ArticleDetailPage />} />

            {/* Search Results Page */}
            <Route path="/search" element={<SearchPage />} />

            {/* Editor's Choice Dedicated View */}
            <Route path="/editor-picks" element={<HomePage />} />

            {/* Secret Admin Editor Route */}
            <Route path="/admin" element={<HomePage />} />
            <Route path="/admin/add-article" element={<HomePage />} />
            <Route path="/secret-editor" element={<HomePage />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer onOpenSecretEditor={() => setAddArticleModalOpen(true)} />

      </div>
    </BrowserRouter>
  );
}

export default App;


import { useState, useEffect } from 'react';
import { ARTICLES as DEFAULT_ARTICLES, AUTHOR_BEHRAD } from './articles';

const STORAGE_KEY = 'tech_mag_custom_articles_v1';

export function getCustomArticles() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Failed to load custom articles from localStorage', e);
    return [];
  }
}

export function saveCustomArticles(articles) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
    window.dispatchEvent(new Event('tech-mag-articles-updated'));
  } catch (e) {
    console.error('Failed to save custom articles to localStorage', e);
  }
}

export function getAllArticles() {
  const custom = getCustomArticles();
  return [...custom, ...DEFAULT_ARTICLES];
}

export function useArticles() {
  const [articles, setArticles] = useState(() => getAllArticles());

  useEffect(() => {
    const handleUpdate = () => {
      setArticles(getAllArticles());
    };
    window.addEventListener('tech-mag-articles-updated', handleUpdate);
    return () => window.removeEventListener('tech-mag-articles-updated', handleUpdate);
  }, []);

  return articles;
}

export function createNewArticle(articleData) {
  const newSlug = articleData.slug || `art-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const newArticle = {
    id: `custom-art-${Date.now()}`,
    slug: newSlug,
    title: articleData.title,
    excerpt: articleData.excerpt,
    content: articleData.content,
    categorySlug: articleData.categorySlug || 'tech',
    subcategorySlug: articleData.subcategorySlug || 'ai-articles',
    coverImage: articleData.coverImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    author: AUTHOR_BEHRAD,
    publishDate: new Date().toISOString(),
    readTimeMinutes: Number(articleData.readTimeMinutes) || 5,
    viewsCount: 1,
    likesCount: 0,
    isEditorsPick: Boolean(articleData.isEditorsPick),
    isHeroFeatured: Boolean(articleData.isHeroFeatured),
    tags: Array.isArray(articleData.tags) 
      ? articleData.tags 
      : (articleData.tags || '').split(',').map(t => t.trim()).filter(Boolean),
    comments: []
  };

  const existingCustom = getCustomArticles();
  const updated = [newArticle, ...existingCustom];
  saveCustomArticles(updated);
  return newArticle;
}

export function deleteCustomArticle(id) {
  const existingCustom = getCustomArticles();
  const updated = existingCustom.filter(a => a.id !== id);
  saveCustomArticles(updated);
}


import { useState, useEffect } from 'react';
import { newsApi, News } from '../lib/api/news';

interface UseNewsReturn {
  news: News[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  fetchByCategory: (category: string) => Promise<void>;
  fetchFeatured: () => Promise<void>;
}

export const useNews = (): UseNewsReturn => {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchNews = async () => {
    try {
      console.log('Starting to fetch news...');
      setLoading(true);
      setError(null);
      const data = await newsApi.getAll();
      console.log('Successfully fetched news:', data);
      setNews(data);
    } catch (err) {
      console.error('Error in useNews.fetchNews:', {
        error: err,
        message: err instanceof Error ? err.message : 'Unknown error',
        stack: err instanceof Error ? err.stack : undefined
      });
      setError(err instanceof Error ? err : new Error('An error occurred'));
    } finally {
      setLoading(false);
    }
  };

  const fetchNewsByCategory = async (category: string) => {
    try {
      console.log('Starting to fetch news by category:', category);
      setLoading(true);
      const data = await newsApi.getByCategory(category);
      console.log('Successfully fetched news by category:', data);
      setNews(data);
      setError(null);
    } catch (err) {
      console.error('Error in useNews.fetchNewsByCategory:', {
        error: err,
        message: err instanceof Error ? err.message : 'Unknown error',
        stack: err instanceof Error ? err.stack : undefined,
        category
      });
      setError(err instanceof Error ? err : new Error('An error occurred'));
    } finally {
      setLoading(false);
    }
  };

  const fetchFeaturedNews = async () => {
    try {
      console.log('Starting to fetch featured news...');
      setLoading(true);
      const data = await newsApi.getFeatured();
      console.log('Successfully fetched featured news:', data);
      setNews(data);
      setError(null);
    } catch (err) {
      console.error('Error in useNews.fetchFeaturedNews:', {
        error: err,
        message: err instanceof Error ? err.message : 'Unknown error',
        stack: err instanceof Error ? err.stack : undefined
      });
      setError(err instanceof Error ? err : new Error('An error occurred'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('useNews hook mounted, fetching initial news...');
    fetchNews();
  }, []);

  return {
    news,
    loading,
    error,
    refetch: fetchNews,
    fetchByCategory: fetchNewsByCategory,
    fetchFeatured: fetchFeaturedNews
  };
}; 
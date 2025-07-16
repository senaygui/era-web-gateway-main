import { API_CONFIG } from '../../config/api';

export interface News {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  published_date: string;
  category: string;
  tags: string[];
  is_featured: boolean;
  view_count: number;
  author: string;
  thumbnail_url: string | null;
  created_at: string;
  updated_at: string;
}

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    console.error('API Error Response:', {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
      body: error
    });
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

const fetchWithConfig = (url: string) => {
  console.log('Making request to:', url);
  console.log('Request configuration:', {
    method: 'GET',
    headers: {
      ...API_CONFIG.headers,
      'Origin': window.location.origin
    },
    mode: 'cors'
  });

  return fetch(url, {
    method: 'GET',
    headers: {
      ...API_CONFIG.headers,
      'Origin': window.location.origin
    },
    mode: 'cors'
  }).catch(error => {
    console.error('Fetch error:', {
      message: error.message,
      type: error.name,
      stack: error.stack
    });
    throw error;
  });
};

export const newsApi = {
  getAll: async (): Promise<News[]> => {
    try {
      console.log('Fetching news from:', `${API_CONFIG.baseURL}/news`);
      const response = await fetchWithConfig(`${API_CONFIG.baseURL}/news`);
      return handleResponse(response);
    } catch (error) {
      console.error('Error in newsApi.getAll:', {
        error,
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });
      throw error;
    }
  },

  getById: async (slug: string): Promise<News> => {
    try {
      const response = await fetchWithConfig(`${API_CONFIG.baseURL}/news/${slug}`);
      return handleResponse(response);
    } catch (error) {
      console.error('Error in newsApi.getById:', {
        error,
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });
      throw error;
    }
  },

  getFeatured: async (): Promise<News[]> => {
    try {
      const response = await fetchWithConfig(`${API_CONFIG.baseURL}/news?featured=true`);
      return handleResponse(response);
    } catch (error) {
      console.error('Error in newsApi.getFeatured:', {
        error,
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });
      throw error;
    }
  },

  getByCategory: async (category: string): Promise<News[]> => {
    try {
      const response = await fetchWithConfig(`${API_CONFIG.baseURL}/news?category=${category}`);
      return handleResponse(response);
    } catch (error) {
      console.error('Error in newsApi.getByCategory:', {
        error,
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });
      throw error;
    }
  }
}; 
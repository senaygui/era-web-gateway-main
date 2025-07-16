import React from 'react';
import { useNews } from '../hooks/useNews';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

export const NewsList: React.FC = () => {
  const { news, loading, error, refetch } = useNews();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4">
        <p className="text-red-600 mb-4">Error loading news: {error.message}</p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-era-blue text-white rounded hover:bg-era-blue/90 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!news.length) {
    return (
      <div className="text-center p-4">
        <p className="text-era-gray">No news articles available.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {news.map((article) => (
        <Card key={article.id} className="overflow-hidden hover:shadow-md transition-shadow">
          <div className="aspect-video relative overflow-hidden">
              <img
                src={article.image_url}
                alt={article.title}
              className="object-cover w-full h-full transition-transform hover:scale-105 duration-300"
            />
            <div className="absolute top-3 left-3 bg-era-blue text-white text-xs px-2 py-1 rounded">
              {article.category}
            </div>
          </div>
          <CardHeader>
            <div className="flex items-center text-sm text-era-gray mb-2">
              <Calendar className="h-4 w-4 mr-2" />
              {new Date(article.published_date).toLocaleDateString()}
        </div>
            <CardTitle className="text-xl line-clamp-2 hover:text-era-blue transition-colors">
              <Link to={`/news/${article.id}`}>
                {article.title}
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-era-gray line-clamp-3">
              {article.excerpt}
            </p>
          </CardContent>
          <CardFooter className="flex flex-wrap gap-2">
            {article.tags?.map(tag => (
              <span 
                key={tag} 
                className="text-xs bg-era-light px-2 py-1 rounded-full text-era-gray cursor-pointer hover:bg-era-blue hover:text-white transition-colors"
              >
                #{tag}
              </span>
            ))}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}; 
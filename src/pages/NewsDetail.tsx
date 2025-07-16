import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock, Share2, ArrowLeft, Tag, User } from 'lucide-react';
import { useNews } from '../hooks/useNews';

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { news, loading, error } = useNews();

  // Find the current news article
  const article = news?.find(item => item.id === Number(id));

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4">
        <p className="text-red-600 mb-4">Error loading article: {error.message}</p>
        <Button 
          onClick={() => window.location.reload()}
          className="bg-era-blue hover:bg-era-blue/90"
        >
          Try Again
        </Button>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="text-center p-4">
        <h2 className="text-2xl font-bold mb-4">Article Not Found</h2>
        <p className="text-era-gray mb-4">The article you're looking for doesn't exist or has been removed.</p>
        <Button 
          onClick={() => navigate('/news')}
          className="bg-era-blue hover:bg-era-blue/90"
        >
          Back to News
        </Button>
      </div>
    );
  }

  // Get related articles (excluding current article)
  const relatedArticles = news
    ?.filter(item => 
      item.id !== article.id && 
      (item.category === article.category || 
       item.tags?.some(tag => article.tags?.includes(tag)))
    )
    .slice(0, 3);

  return (
    <>
      <PageHeader
        title={article.title}
        description={article.excerpt}
        breadcrumbItems={[
          { label: 'News', href: '/news' },
          { label: article.title, href: `/news/${article.id}` }
        ]}
      />

      <motion.section 
        className="py-12 bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Back Button */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Button
                  variant="ghost"
                  className="mb-6 hover:bg-era-light"
                  onClick={() => navigate('/news')}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to News
                </Button>
              </motion.div>

              {/* Article Header */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="mb-6">
                  <div className="flex items-center gap-4 text-sm text-era-gray mb-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date(article.published_date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      {new Date(article.published_date).toLocaleTimeString()}
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      {article.author || 'ERA Staff'}
                    </div>
                  </div>
                  <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
                  <div className="flex items-center gap-2">
                    <span className="bg-era-blue text-white text-xs px-3 py-1 rounded-full">
                      {article.category}
                    </span>
                    {article.tags?.map(tag => (
                      <span 
                        key={tag}
                        className="bg-era-light text-era-gray text-xs px-3 py-1 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Featured Image */}
                <motion.div 
                  className="relative aspect-video mb-8 rounded-lg overflow-hidden"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <img
                    src={article.image_url}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Article Content */}
                <motion.div
                  className="prose prose-lg max-w-none"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div dangerouslySetInnerHTML={{ __html: article.content || article.excerpt }} />
                </motion.div>

                {/* Share Section */}
                <motion.div
                  className="mt-8 pt-8 border-t"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Share2 className="h-4 w-4 text-era-gray" />
                      <span className="text-era-gray">Share this article:</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="hover:bg-era-light">
                        Facebook
                      </Button>
                      <Button variant="outline" size="sm" className="hover:bg-era-light">
                        Twitter
                      </Button>
                      <Button variant="outline" size="sm" className="hover:bg-era-light">
                        LinkedIn
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <motion.div
              className="lg:col-span-1 space-y-8"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              {/* Related Articles */}
              {relatedArticles && relatedArticles.length > 0 && (
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold mb-4">Related Articles</h3>
                    <div className="space-y-4">
                      {relatedArticles.map(relatedArticle => (
                        <motion.div
                          key={relatedArticle.id}
                          className="group"
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Link to={`/news/${relatedArticle.id}`} className="flex gap-4">
                            <div className="w-20 h-20 flex-shrink-0 rounded overflow-hidden">
                              <motion.img
                                src={relatedArticle.image_url}
                                alt={relatedArticle.title}
                                className="w-full h-full object-cover"
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.3 }}
                              />
                            </div>
                            <div>
                              <h4 className="font-medium text-sm line-clamp-2 group-hover:text-era-blue transition-colors">
                                {relatedArticle.title}
                              </h4>
                              <div className="text-xs text-era-gray mt-1">
                                {new Date(relatedArticle.published_date).toLocaleDateString()}
                              </div>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Categories */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4">Categories</h3>
                  <div className="space-y-2">
                    {Array.from(new Set(news?.map(item => item.category))).map(category => (
                      <motion.div
                        key={category}
                        className="flex items-center justify-between"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Button 
                          variant="ghost" 
                          className="text-left p-0 hover:bg-transparent hover:text-era-blue"
                          onClick={() => navigate(`/news?category=${category}`)}
                        >
                          {category}
                        </Button>
                        <span className="text-era-gray text-sm bg-era-light px-2 py-1 rounded-full">
                          {news?.filter(item => item.category === category).length || 0}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Popular Tags */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4">Popular Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {Array.from(new Set(news?.flatMap(item => item.tags || [])))
                      .slice(0, 10)
                      .map(tag => (
                        <motion.span
                          key={tag}
                          className="text-sm bg-era-light px-3 py-1 rounded-full text-era-gray cursor-pointer hover:bg-era-blue hover:text-white transition-colors"
                          onClick={() => navigate(`/news?tag=${tag}`)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          #{tag}
                        </motion.span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default NewsDetail; 
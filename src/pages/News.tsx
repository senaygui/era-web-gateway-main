import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Calendar, ArrowRight } from 'lucide-react';
import { NewsList } from '../components/NewsList';
import { useNews } from '../hooks/useNews';
import { motion, AnimatePresence } from 'framer-motion';

const ITEMS_PER_PAGE = 6;

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const News = () => {
  const { news, loading, error } = useNews();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  // Get unique categories from the news data
  const categories = ["All", ...Array.from(new Set(news?.map(item => item.category) || []))];

  // Filter news based on search term and category
  const filteredNews = news?.filter(newsItem => {
    const matchesSearch = newsItem.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         newsItem.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         newsItem.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = activeCategory === "All" || newsItem.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  }) || [];

  // Calculate pagination
  const totalPages = Math.ceil(filteredNews.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedNews = filteredNews.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Get most popular tags
  const allTags = news?.flatMap(newsItem => newsItem.tags || []) || [];
  const tagCounts = allTags.reduce((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1;
    return acc;
  }, {});
  
  const popularTags = Object.keys(tagCounts)
    .map(tag => ({ tag, count: tagCounts[tag] }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeCategory]);

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
        <p className="text-red-600 mb-4">Error loading news: {error.message}</p>
        <Button 
          onClick={() => window.location.reload()}
          className="bg-era-blue hover:bg-era-blue/90"
        >
          Try Again
        </Button>
      </div>
    );
  }

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      // Calculate start and end of visible pages
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      
      // Adjust if at the start
      if (currentPage <= 2) {
        end = 4;
      }
      // Adjust if at the end
      if (currentPage >= totalPages - 1) {
        start = totalPages - 3;
      }
      
      // Add ellipsis if needed
      if (start > 2) {
        pages.push('...');
      }
      
      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      // Add ellipsis if needed
      if (end < totalPages - 1) {
        pages.push('...');
      }
      
      // Always show last page
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <>
      <PageHeader
        title="News & Updates"
        description="Stay informed about the latest news, announcements, and updates from Ethiopian Roads Administration."
        breadcrumbItems={[{ label: 'News', href: '/news' }]}
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
              {/* Search Bar */}
              <motion.div 
                className="mb-8 relative"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Input
                  type="text"
                  placeholder="Search news..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 py-6"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-era-gray" />
              </motion.div>

              {/* Category Filters */}
              <motion.div 
                className="mb-8 flex flex-wrap gap-2"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={activeCategory === category ? "default" : "outline"}
                    className={activeCategory === category ? "bg-era-blue hover:bg-era-blue/90" : ""}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </motion.div>

              {/* No Results */}
              <AnimatePresence>
              {filteredNews.length === 0 && (
                  <motion.div 
                    className="text-center py-12 bg-gray-50 rounded-lg"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                  <h3 className="text-xl font-bold mb-2">No Results Found</h3>
                  <p className="text-era-gray mb-4">
                    We couldn't find any news articles matching your search criteria.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchTerm("");
                      setActiveCategory("All");
                    }}
                  >
                    Clear Filters
                  </Button>
                  </motion.div>
              )}
              </AnimatePresence>

              {/* News Articles Grid */}
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                key={currentPage} // Re-trigger animation on page change
              >
                <AnimatePresence mode="wait">
                  {paginatedNews.map((newsItem) => (
                    <motion.div
                      key={newsItem.id}
                      variants={itemVariants}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="aspect-video relative overflow-hidden">
                          <motion.img 
                            src={newsItem.image_url} 
                            alt={newsItem.title}
                        className="object-cover w-full h-full transition-transform hover:scale-105 duration-300"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                      />
                      <div className="absolute top-3 left-3 bg-era-blue text-white text-xs px-2 py-1 rounded">
                            {newsItem.category}
                      </div>
                    </div>
                    <CardHeader>
                      <div className="flex items-center text-sm text-era-gray mb-2">
                        <Calendar className="h-4 w-4 mr-2" />
                            {new Date(newsItem.published_date).toLocaleDateString()}
                      </div>
                      <CardTitle className="text-xl line-clamp-2 hover:text-era-blue transition-colors">
                            <Link to={`/news/${newsItem.id}`}>
                              {newsItem.title}
                        </Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-era-gray line-clamp-3">
                            {newsItem.excerpt}
                      </p>
                    </CardContent>
                    <CardFooter className="flex flex-wrap gap-2">
                          {newsItem.tags?.map(tag => (
                            <motion.span 
                          key={tag} 
                          className="text-xs bg-era-light px-2 py-1 rounded-full text-era-gray cursor-pointer hover:bg-era-blue hover:text-white transition-colors"
                          onClick={() => setSearchTerm(tag)}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                        >
                          #{tag}
                            </motion.span>
                      ))}
                    </CardFooter>
                  </Card>
                    </motion.div>
                ))}
                </AnimatePresence>
              </motion.div>

              {/* Pagination */}
              <AnimatePresence>
              {filteredNews.length > 0 && (
                  <motion.div 
                    className="flex justify-center mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                  <nav className="flex items-center space-x-2" aria-label="Pagination">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      >
                      <span className="sr-only">Previous page</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </Button>
                      
                      {getPageNumbers().map((page, index) => (
                        page === '...' ? (
                          <span key={`ellipsis-${index}`} className="px-4">...</span>
                        ) : (
                          <motion.div
                            key={page}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button
                              variant={currentPage === page ? "default" : "outline"}
                              className={currentPage === page ? "bg-era-blue hover:bg-era-blue/90" : ""}
                              onClick={() => setCurrentPage(page)}
                            >
                              {page}
                            </Button>
                          </motion.div>
                        )
                      ))}

                      <Button 
                        variant="outline" 
                        size="icon"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      >
                      <span className="sr-only">Next page</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </Button>
                  </nav>
                  </motion.div>
              )}
              </AnimatePresence>
            </div>

            {/* Sidebar */}
            <motion.div 
              className="lg:col-span-1 space-y-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {/* Featured Article */}
              {news && news.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
              <Card className="overflow-hidden">
                <div className="relative">
                  <div className="absolute top-0 left-0 bg-era-blue text-white px-3 py-1">
                    Featured
                  </div>
                      <motion.img 
                        src={news[0].image_url} 
                    alt="Featured article"
                    className="w-full h-48 object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg hover:text-era-blue transition-colors">
                        <Link to={`/news/${news[0].id}`}>
                          {news[0].title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-era-gray text-sm">
                        {news[0].excerpt}
                  </p>
                </CardContent>
                <CardFooter>
                      <Link to={`/news/${news[0].id}`} className="text-era-blue hover:underline text-sm flex items-center">
                    Read full article
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </CardFooter>
              </Card>
                </motion.div>
              )}

              {/* Categories */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {categories.filter(cat => cat !== "All").map(category => (
                        <motion.li 
                          key={category} 
                          className="flex items-center justify-between"
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                        <Button 
                          variant="ghost" 
                          className="text-left p-0 hover:bg-transparent hover:text-era-blue"
                          onClick={() => setActiveCategory(category)}
                        >
                          {category}
                        </Button>
                        <span className="text-era-gray text-sm bg-era-light px-2 py-1 rounded-full">
                            {news?.filter(newsItem => newsItem.category === category).length || 0}
                        </span>
                        </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              </motion.div>

              {/* Popular Tags */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Popular Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map(({ tag }) => (
                        <motion.span 
                        key={tag} 
                        className="text-sm bg-era-light px-3 py-1 rounded-full text-era-gray cursor-pointer hover:bg-era-blue hover:text-white transition-colors"
                        onClick={() => setSearchTerm(tag)}
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

              {/* Recent Posts */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Posts</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4 divide-y">
                      {news?.slice(0, 4).map(newsItem => (
                        <motion.li 
                          key={newsItem.id} 
                          className="pt-4 first:pt-0"
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Link to={`/news/${newsItem.id}`} className="flex group">
                          <div className="w-16 h-16 flex-shrink-0 rounded overflow-hidden mr-3">
                              <motion.img 
                                src={newsItem.image_url} 
                                alt={newsItem.title}
                              className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.3 }}
                            />
                          </div>
                          <div>
                            <h4 className="font-medium text-sm line-clamp-2 group-hover:text-era-blue transition-colors">
                                {newsItem.title}
                            </h4>
                              <div className="text-xs text-era-gray mt-1">
                                {new Date(newsItem.published_date).toLocaleDateString()}
                              </div>
                          </div>
                        </Link>
                        </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              </motion.div>

              {/* Newsletter */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
              <Card className="bg-era-blue text-white">
                <CardHeader>
                  <CardTitle className="text-lg text-white">Subscribe to Newsletter</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 mb-4 text-sm">
                    Get the latest news and updates directly to your inbox.
                  </p>
                  <div className="space-y-3">
                    <Input 
                      type="email" 
                      placeholder="Your email address" 
                      className="bg-white/10 border-white/20 placeholder:text-white/50 text-white"
                    />
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                    <Button className="w-full bg-white text-era-blue hover:bg-white/90">
                      Subscribe
                    </Button>
                      </motion.div>
                  </div>
                </CardContent>
              </Card>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default News;

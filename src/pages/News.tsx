
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Calendar, ArrowRight } from 'lucide-react';

const News = () => {
  // Mock data for news articles
  const allNews = [
    {
      id: 1,
      title: 'ERA Completes 250km Road Construction in Southern Ethiopia',
      excerpt: 'The Ethiopian Roads Administration has successfully completed a 250km road construction project connecting major cities in Southern Ethiopia. This project is expected to significantly improve transportation and boost economic activities in the region.',
      date: 'April 2, 2025',
      image: 'https://www.era.gov.et/documents/20182/21705/abbay+bridge/bfa6e473-8126-485f-9283-9e1b339be737?version=1.0&t=1717133982000',
      category: 'Projects',
      tags: ['road construction', 'southern region', 'infrastructure development']
    },
    {
      id: 2,
      title: 'New Budget Allocated for Rural Road Development',
      excerpt: 'The Ethiopian government has allocated a significant budget for rural road development to enhance connectivity in remote areas. This initiative aims to improve access to markets, healthcare, and education for rural communities.',
      date: 'March 28, 2025',
      image: 'https://www.era.gov.et/documents/20182/21705/Dire+Dawa-Dewele.jpg/2b51630a-1928-4c4c-94a8-305fa1005685?version=1.0&t=1606372171000',
      category: 'Budget',
      tags: ['rural development', 'budget allocation', 'accessibility']
    },
    {
      id: 3,
      title: 'ERA Signs Partnership Agreement with International Firms',
      excerpt: 'The Ethiopian Roads Administration has signed a partnership agreement with multiple international firms to boost road infrastructure. The collaboration will bring advanced technologies and expertise to Ethiopia\'s road construction projects.',
      date: 'March 20, 2025',
      image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&h=500',
      category: 'Partnership',
      tags: ['international partnership', 'technology transfer', 'collaboration']
    },
    {
      id: 4,
      title: 'Road Safety Campaign Launched Nationwide',
      excerpt: 'ERA has launched a comprehensive road safety campaign to reduce traffic accidents across the country. The initiative includes educational programs, improved signage, and enhanced enforcement of traffic regulations.',
      date: 'March 15, 2025',
      image: 'https://www.era.gov.et/documents/20182/21901/photo_2025-03-27_09-56-51.jpg/76252460-10db-439f-b987-96cca2a04d0f?t=1743146821232',
      category: 'Safety',
      tags: ['road safety', 'public awareness', 'accident prevention']
    },
    {
      id: 5,
      title: 'ERA Introduces New Quality Control Standards',
      excerpt: 'The Ethiopian Roads Administration has introduced new quality control standards for road construction projects. These standards align with international best practices and will ensure durability and sustainability of road infrastructure.',
      date: 'March 10, 2025',
      image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&h=500',
      category: 'Standards',
      tags: ['quality control', 'standards', 'sustainability']
    },
    {
      id: 6,
      title: 'Annual Road Maintenance Program Announced',
      excerpt: 'ERA has announced its annual road maintenance program targeting over 5,000 kilometers of roads across Ethiopia. The program includes routine maintenance, rehabilitation, and emergency repairs to ensure road network reliability.',
      date: 'March 5, 2025',
      image: 'https://www.era.gov.et/documents/20182/21705/Eteya-Robe.jpg/c640eb4f-16a7-464e-a7e8-3096933962f6?version=1.0&t=1606372172000',
      category: 'Maintenance',
      tags: ['road maintenance', 'rehabilitation', 'annual program']
    }
  ];

  // State for search and filtering
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // Get unique categories
  const categories = ["All", ...Array.from(new Set(allNews.map(item => item.category)))];

  // Filter news based on search term and category
  const filteredNews = allNews.filter(news => {
    const matchesSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          news.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          news.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = activeCategory === "All" || news.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Get most popular tags
  const allTags = allNews.flatMap(news => news.tags);
  const tagCounts = allTags.reduce((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1;
    return acc;
  }, {});
  
  const popularTags = Object.keys(tagCounts)
    .map(tag => ({ tag, count: tagCounts[tag] }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  return (
    <>
      <PageHeader
        title="News & Updates"
        description="Stay informed about the latest news, announcements, and updates from Ethiopian Roads Administration."
        breadcrumbItems={[{ label: 'News', href: '/news' }]}
      />

      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Search Bar */}
              <div className="mb-8 relative">
                <Input
                  type="text"
                  placeholder="Search news..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 py-6"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-era-gray" />
              </div>

              {/* Category Filters */}
              <div className="mb-8 flex flex-wrap gap-2">
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
              </div>

              {/* No Results */}
              {filteredNews.length === 0 && (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
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
                </div>
              )}

              {/* News Articles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredNews.map((news) => (
                  <Card key={news.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="aspect-video relative overflow-hidden">
                      <img 
                        src={news.image} 
                        alt={news.title}
                        className="object-cover w-full h-full transition-transform hover:scale-105 duration-300"
                      />
                      <div className="absolute top-3 left-3 bg-era-blue text-white text-xs px-2 py-1 rounded">
                        {news.category}
                      </div>
                    </div>
                    <CardHeader>
                      <div className="flex items-center text-sm text-era-gray mb-2">
                        <Calendar className="h-4 w-4 mr-2" />
                        {news.date}
                      </div>
                      <CardTitle className="text-xl line-clamp-2 hover:text-era-blue transition-colors">
                        <Link to={`/news/${news.id}`}>
                          {news.title}
                        </Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-era-gray line-clamp-3">
                        {news.excerpt}
                      </p>
                    </CardContent>
                    <CardFooter className="flex flex-wrap gap-2">
                      {news.tags.map(tag => (
                        <span 
                          key={tag} 
                          className="text-xs bg-era-light px-2 py-1 rounded-full text-era-gray cursor-pointer hover:bg-era-blue hover:text-white transition-colors"
                          onClick={() => setSearchTerm(tag)}
                        >
                          #{tag}
                        </span>
                      ))}
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {/* Pagination (static for demo) */}
              {filteredNews.length > 0 && (
                <div className="flex justify-center mt-12">
                  <nav className="flex items-center space-x-2" aria-label="Pagination">
                    <Button variant="outline" size="icon" disabled>
                      <span className="sr-only">Previous page</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </Button>
                    <Button variant="default" className="bg-era-blue hover:bg-era-blue/90">1</Button>
                    <Button variant="outline">2</Button>
                    <Button variant="outline">3</Button>
                    <span className="mx-1">...</span>
                    <Button variant="outline">8</Button>
                    <Button variant="outline" size="icon">
                      <span className="sr-only">Next page</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </Button>
                  </nav>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              {/* Featured Article */}
              <Card className="overflow-hidden">
                <div className="relative">
                  <div className="absolute top-0 left-0 bg-era-blue text-white px-3 py-1">
                    Featured
                  </div>
                  <img 
                    src="https://www.era.gov.et/image/journal/article?img_id=75928&t=1744103741532" 
                    alt="Featured article"
                    className="w-full h-48 object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg hover:text-era-blue transition-colors">
                    <Link to="/news/1">
                      Ethiopia's Largest Highway Project Set to Begin Next Month
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-era-gray text-sm">
                    The ambitious project will connect the eastern and western regions of the country, facilitating trade and movement.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link to="/news/1" className="text-era-blue hover:underline text-sm flex items-center">
                    Read full article
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </CardFooter>
              </Card>

              {/* Categories */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {categories.filter(cat => cat !== "All").map(category => (
                      <li key={category} className="flex items-center justify-between">
                        <Button 
                          variant="ghost" 
                          className="text-left p-0 hover:bg-transparent hover:text-era-blue"
                          onClick={() => setActiveCategory(category)}
                        >
                          {category}
                        </Button>
                        <span className="text-era-gray text-sm bg-era-light px-2 py-1 rounded-full">
                          {allNews.filter(news => news.category === category).length}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Popular Tags */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Popular Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map(({ tag }) => (
                      <span 
                        key={tag} 
                        className="text-sm bg-era-light px-3 py-1 rounded-full text-era-gray cursor-pointer hover:bg-era-blue hover:text-white transition-colors"
                        onClick={() => setSearchTerm(tag)}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Posts */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Posts</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4 divide-y">
                    {allNews.slice(0, 4).map(news => (
                      <li key={news.id} className="pt-4 first:pt-0">
                        <Link to={`/news/${news.id}`} className="flex group">
                          <div className="w-16 h-16 flex-shrink-0 rounded overflow-hidden mr-3">
                            <img 
                              src={news.image} 
                              alt={news.title}
                              className="w-full h-full object-cover transition-transform group-hover:scale-105"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium text-sm line-clamp-2 group-hover:text-era-blue transition-colors">
                              {news.title}
                            </h4>
                            <div className="text-xs text-era-gray mt-1">{news.date}</div>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Newsletter */}
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
                    <Button className="w-full bg-white text-era-blue hover:bg-white/90">
                      Subscribe
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default News;

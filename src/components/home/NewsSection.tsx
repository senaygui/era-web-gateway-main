import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { NewsItem } from './tabs/NewsTab';
import { ScrollAnimation } from '@/components/ui/ScrollAnimation';
import { useLanguage } from '@/contexts/LanguageContext';

interface NewsSectionProps {
  news: NewsItem[];
}

const NewsSection: React.FC<NewsSectionProps> = ({ news }) => {
  const { t } = useLanguage();
  
  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container-custom">
        <ScrollAnimation>
          <SectionHeading 
            title={t('home.news.title')} 
            subtitle={t('home.news.subtitle')}
            className="mb-8"
          />
        </ScrollAnimation>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((newsItem, index) => (
            <ScrollAnimation key={newsItem.id}>
              <Card className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={newsItem.image} 
                    alt={newsItem.title}
                    className="object-cover w-full h-full transition-transform hover:scale-105 duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-era-orange text-white text-xs px-2 py-1 rounded">
                    {newsItem.category}
                  </div>
                </div>
                <CardHeader>
                  <div className="text-sm text-era-gray mb-2">{newsItem.date}</div>
                  <CardTitle className="text-xl">{newsItem.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-era-gray line-clamp-3">{newsItem.excerpt}</p>
                </CardContent>
                <CardFooter>
                  <Link to={`/news/${newsItem.id}`}>
                    <Button variant="ghost" className="text-era-orange p-0 hover:bg-transparent hover:underline">
                      <span>{t('common.readMore')}</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </ScrollAnimation>
          ))}
        </div>
        
        <ScrollAnimation>
          <div className="flex justify-center mt-8">
            <Link to="/news">
              <Button className="bg-era-orange hover:bg-era-orange/90">
                {t('common.viewAll')} {t('nav.news')}
              </Button>
            </Link>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default NewsSection;

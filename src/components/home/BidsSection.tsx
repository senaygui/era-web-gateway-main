import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { BidItem } from './tabs/BidsTab';
import { ScrollAnimation } from '@/components/ui/ScrollAnimation';
import { useLanguage } from '@/contexts/LanguageContext';

interface BidsSectionProps {
  bids: BidItem[];
}

const BidsSection: React.FC<BidsSectionProps> = ({ bids }) => {
  const { t } = useLanguage();
  
  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container-custom">
        <ScrollAnimation>
          <SectionHeading 
            title={t('home.bids.title')} 
            subtitle={t('home.bids.subtitle')}
            className="mb-8"
          />
        </ScrollAnimation>
        
        <ScrollAnimation>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="divide-y">
              {bids.map((bid) => (
                <div key={bid.id} className="p-4 md:p-6 hover:bg-era-orange/5 transition-colors">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                    <div className="mb-3 md:mb-0">
                      <h3 className="font-medium text-lg mb-1">{bid.title}</h3>
                      <div className="text-era-gray text-sm">{bid.category}</div>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center gap-3">
                      <div className="text-red-500 font-medium text-sm">
                        {t('common.deadline')}: {bid.deadline}
                      </div>
                      <Link to={`/bids/${bid.id}`}>
                        <Button size="sm" className="w-full md:w-auto bg-era-orange hover:bg-era-orange/90">
                          {t('common.viewDetails')}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollAnimation>
        
        <ScrollAnimation>
          <div className="flex justify-center mt-8">
            <Link to="/bids">
              <Button className="bg-era-orange hover:bg-era-orange/90">
                {t('common.viewAll')} {t('nav.bids')}
              </Button>
            </Link>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default BidsSection;

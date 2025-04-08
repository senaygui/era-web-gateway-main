
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SectionHeading } from '@/components/ui/SectionHeading';
import NewsTab, { NewsItem } from './tabs/NewsTab';
import EventsTab, { EventItem } from './tabs/EventsTab';
import BidsTab, { BidItem } from './tabs/BidsTab';

interface FeaturedContentProps {
  news: NewsItem[];
  events: EventItem[];
  bids: BidItem[];
}

const FeaturedContent: React.FC<FeaturedContentProps> = ({ news, events, bids }) => {
  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container-custom">
        <Tabs defaultValue="news" className="space-y-8">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <SectionHeading 
              title="Latest Updates" 
              subtitle="Stay informed about our latest news, events, and opportunities"
              className="mb-0"
            />
            <TabsList>
              <TabsTrigger value="news">News</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="bids">Bids</TabsTrigger>
            </TabsList>
          </div>

          {/* News Tab */}
          <TabsContent value="news" className="m-0">
            <NewsTab news={news} />
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="m-0">
            <EventsTab events={events} />
          </TabsContent>

          {/* Bids Tab */}
          <TabsContent value="bids" className="m-0">
            <BidsTab bids={bids} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default FeaturedContent;


import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export interface EventItem {
  id: number;
  title: string;
  date: string;
  location: string;
  image: string;
}

interface EventsTabProps {
  events: EventItem[];
}

const EventsTab: React.FC<EventsTabProps> = ({ events }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((event) => (
          <Card key={event.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row h-full">
              <div className="md:w-1/3 relative">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="object-cover w-full h-full min-h-[160px]"
                />
              </div>
              <div className="md:w-2/3 flex flex-col">
                <CardHeader>
                  <CardTitle className="text-xl">{event.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex items-center text-era-gray mb-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center text-era-gray">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{event.location}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link to={`/events/${event.id}`}>
                    <Button variant="ghost" className="text-era-orange p-0 hover:bg-transparent hover:underline">
                      <span>Event Details</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Link to="/events">
          <Button className="bg-era-orange hover:bg-era-orange/90">
            View All Events
          </Button>
        </Link>
      </div>
    </>
  );
};

export default EventsTab;

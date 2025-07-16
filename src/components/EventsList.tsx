import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, MapPin } from 'lucide-react';
import { useEvents } from '@/hooks/useEvents';
import { Spinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

interface EventsListProps {
  page?: number;
  perPage?: number;
  eventType?: string | null;
}

export const EventsList: React.FC<EventsListProps> = ({ page = 1, perPage = 6, eventType }) => {
  const { events = [], loading, error, meta } = useEvents(page, perPage, eventType);

  console.log('EventsList: events', events);
  console.log('EventsList: loading', loading);
  console.log('EventsList: error', error);
  console.log('EventsList: meta', meta);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spinner className="w-8 h-8" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 mb-4">{error}</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  if (!events || events.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No events found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {events.map((event) => (
        <Link to={`/events/${event.slug}`} key={event.id}>
          <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
            <div className="relative aspect-video">
              <img
                src={event.image || '/images/event-placeholder.jpg'}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-era-blue text-white px-3 py-1 rounded-full text-sm">
                  {event.event_type}
                </span>
              </div>
            </div>
            <CardContent className="p-6">
              <CardTitle className="text-lg mb-2 line-clamp-2">{event.title}</CardTitle>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.excerpt}</p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{format(new Date(event.start_date), "MMMM d, yyyy")}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{event.location}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-6 pt-0 flex justify-between items-center">
              <span className={`px-3 py-1 rounded-full text-sm ${
                event.status === 'upcoming' ? 'bg-green-100 text-green-800' :
                event.status === 'ongoing' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
              </span>
              {event.registration_required && event.registration_open && (
                <span className="text-era-blue text-sm">Registration Open</span>
              )}
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
}; 
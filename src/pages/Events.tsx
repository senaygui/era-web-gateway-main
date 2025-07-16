import React, { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { Calendar as CalendarIcon, Clock, MapPin, Search, Users } from 'lucide-react';
import { useEvents, useUpcomingEvents, Event } from '@/hooks/useEvents';
import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';
import { Spinner } from '@/components/ui/spinner';

const Events = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const { events, loading, error, meta } = useEvents(currentPage, 6);
  const { events: upcomingEvents, loading: upcomingLoading } = useUpcomingEvents();
  const { toast } = useToast();

  // Filter events based on search and date
  const filterEvents = (eventList: Event[]) => {
    return eventList.filter(event => {
      const matchesSearch = searchQuery === '' || 
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.event_type.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesDate = !date || (
        new Date(parseISO(event.start_date)).getDate() === date.getDate() &&
        new Date(parseISO(event.start_date)).getMonth() === date.getMonth() && 
        new Date(parseISO(event.start_date)).getFullYear() === date.getFullYear()
      );
      
      return matchesSearch && matchesDate;
    });
  };

  const filteredEvents = filterEvents(events);

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

  // Function to generate Google Calendar link
  const generateGoogleCalendarLink = (event: Event): string => {
    const start = format(parseISO(event.start_date), 'yyyyMMdd\'T\'HHmmss');
    const end = format(parseISO(event.end_date), 'yyyyMMdd\'T\'HHmmss');
    
    const details = [
      event.description,
      Array.isArray(event.agenda) && event.agenda.length > 0 ? '\n\nAgenda:\n' + event.agenda.map(item => `- ${item}`).join('\n') : '',
      Array.isArray(event.speakers) && event.speakers.length > 0 ? '\n\nSpeakers:\n' + event.speakers.map(speaker => `- ${speaker}`).join('\n') : '',
    ].filter(Boolean).join('\n');

    const googleLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${start}/${end}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(event.location)}&sf=true&output=xml`;

    return googleLink;
  };

  return (
    <div>
      <PageHeader
        title="Events & Workshops"
        description="Stay updated with the latest events, workshops, and public consultations organized by the Ethiopian Roads Administration."
        breadcrumbItems={[{ label: 'Events', href: '/events' }]}
      />

      <div className="container-custom py-12">
        {/* Search and Date Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "justify-start text-left font-normal md:w-[240px]",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Filter by date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
              {date && (
                <div className="p-3 border-t border-border">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setDate(undefined)}
                    className="w-full"
                  >
                    Clear date
                  </Button>
                </div>
              )}
            </PopoverContent>
          </Popover>
        </div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <Card key={event.id} className="flex flex-col h-full hover:border-era-blue transition-colors">
                <CardHeader className="pb-4">
                  <div className="relative h-48 -mt-6 -mx-6 mb-4 rounded-t-lg overflow-hidden">
                    <img 
                      src={event.image_url ? event.image_url : '/images/event-placeholder.jpg'} 
                      alt={event.title} 
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute top-0 right-0 bg-era-blue text-white px-3 py-1 m-2 rounded-md text-sm font-medium">
                      {event.event_type}
                    </div>
                  </div>
                  <CardTitle className="text-xl">{event.title}</CardTitle>
                  <CardDescription className="text-base">
                    {format(new Date(parseISO(event.start_date)), "MMMM d, yyyy")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-4 flex-grow">
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {event.excerpt}
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-era-blue" />
                      <span>{format(new Date(parseISO(event.start_date)), "h:mm a")} - {format(new Date(parseISO(event.end_date)), "h:mm a")}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-era-blue mt-0.5" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-era-blue" />
                      <span>Capacity: {typeof event.capacity === 'number' && event.capacity > 0
    ? `${event.capacity} attendees`
    : 'N/A'}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0 flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full">View Details</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-xl">{event.title}</DialogTitle>
                      </DialogHeader>

                      <div className="space-y-8 mt-4">
                        {/* Description */}
                        <div>
                          <h3 className="text-2xl font-semibold mb-4">Description</h3>
                          <p className="text-gray-700 text-lg">
                            {event.description || 'No description available.'}
                          </p>
                        </div>
                        
                        {/* Agenda */}
                        <div>
                          <h3 className="text-2xl font-semibold mb-4">Agenda</h3>
                          <div className="space-y-2">
                            {Array.isArray(event.agenda) && event.agenda.length > 0 ? (
                              event.agenda.map((item, index) => (
                                <div key={index} className="flex items-start">
                                  <div className="flex-shrink-0 w-1 bg-blue-600 h-full mr-4"></div>
                                  <p className="text-gray-700">{item}</p>
                                </div>
                              ))
                            ) : (
                              <p className="text-gray-500">No agenda provided.</p>
                            )}
                          </div>
                        </div>
                        
                        {/* Speakers */}
                        <div>
                          <h3 className="text-2xl font-semibold mb-4">Speakers</h3>
                          <div className="space-y-2">
                            {Array.isArray(event.speakers) && event.speakers.length > 0 ? (
                              <ul className="list-disc pl-5 space-y-2">
                                {event.speakers.map((speaker, index) => (
                                  <li key={index} className="text-gray-700">{speaker}</li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-gray-500">No speakers listed.</p>
                            )}
                          </div>
                        </div>

                        {/* Event Details */}
                        <div className="bg-gray-50 p-6 rounded-lg">
                          <h3 className="text-2xl font-semibold mb-6">Event Details</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-start gap-3">
                              <CalendarIcon className="h-6 w-6 text-blue-600 mt-1" />
                              <div>
                                <p className="font-semibold text-gray-900">Date</p>
                                <p className="text-gray-700">{format(new Date(parseISO(event.start_date)), "MMMM d, yyyy")}</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <Clock className="h-6 w-6 text-blue-600 mt-1" />
                              <div>
                                <p className="font-semibold text-gray-900">Time</p>
                                <p className="text-gray-700">{format(new Date(parseISO(event.start_date)), "h:mm a")} - {format(new Date(parseISO(event.end_date)), "h:mm a")}</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <MapPin className="h-6 w-6 text-blue-600 mt-1" />
                              <div>
                                <p className="font-semibold text-gray-900">Location</p>
                                <p className="text-gray-700">{event.location}</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <Users className="h-6 w-6 text-blue-600 mt-1" />
                              <div>
                                <p className="font-semibold text-gray-900">Capacity</p>
                                <p>{typeof event.capacity === 'number' && event.capacity > 0
    ? `${event.capacity} attendees`
    : 'N/A'}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Register Button */}
                        <div className="flex justify-end">
                          <Button 
                            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-2 text-lg"
                            onClick={() => window.open(generateGoogleCalendarLink(event), '_blank')}
                          >
                            Register Now
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button 
                    className="bg-orange-500 hover:bg-orange-600 text-white w-full" 
                    onClick={() => window.open(generateGoogleCalendarLink(event), '_blank')}
                  >
                    Register Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-muted/30 rounded-lg">
            <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">No Events Found</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              There are no events matching your criteria. 
              Please try a different search or check back later.
            </p>
          </div>
        )}

        {/* Calendar Section */}
        <div className="mt-16 bg-muted/50 rounded-lg p-6 md:p-8">
          <SectionHeading 
            title="Event Calendar" 
            subtitle="View our upcoming events calendar to plan your participation."
            align="center"
            className="mb-8"
          />
          
          <div className="max-w-md mx-auto">
            <CalendarComponent
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border mx-auto"
              disabled={{ before: new Date() }}
            />
            
            <div className="mt-6 text-center">
              <Button 
                variant="outline" 
                onClick={() => setDate(undefined)}
                disabled={!date}
              >
                Clear Selection
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;

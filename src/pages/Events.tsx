
import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Calendar, Clock, MapPin, Users, Calendar as CalendarIcon, Search } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

// Sample event data
const events = [
  {
    id: 1,
    title: "Annual Road Sector Review Meeting",
    date: new Date(2025, 3, 25), // April 25, 2025
    time: "9:00 AM - 5:00 PM",
    location: "Hyatt Regency, Addis Ababa",
    type: "Conference",
    description: "The Annual Road Sector Review Meeting brings together stakeholders from government agencies, development partners, contractors, and consultants to review the performance of Ethiopia's road sector over the past year and discuss strategic priorities for the coming year.",
    agenda: [
      "8:30 AM - 9:00 AM: Registration",
      "9:00 AM - 9:30 AM: Opening Remarks by ERA Director General",
      "9:30 AM - 10:30 AM: Presentation of Annual Performance Report",
      "10:30 AM - 11:00 AM: Coffee Break",
      "11:00 AM - 12:30 PM: Panel Discussion on Challenges and Opportunities",
      "12:30 PM - 2:00 PM: Lunch",
      "2:00 PM - 3:30 PM: Breakout Sessions",
      "3:30 PM - 4:00 PM: Coffee Break",
      "4:00 PM - 5:00 PM: Presentation of Recommendations and Closing Remarks"
    ],
    speakers: [
      "Director General, Ethiopian Roads Administration",
      "State Minister, Ministry of Transport",
      "Representatives from World Bank, African Development Bank",
      "Chairperson, Ethiopian Contractors Association",
      "Director of Planning, ERA"
    ],
    capacity: 150,
    registrationRequired: true,
    image: "https://placehold.co/600x400/e5edff/1a44b8?text=Annual+Road+Review"
  },
  {
    id: 2,
    title: "Road Design Standards Workshop",
    date: new Date(2025, 4, 10), // May 10, 2025
    time: "10:00 AM - 3:00 PM",
    location: "ERA Training Center, Addis Ababa",
    type: "Workshop",
    description: "This technical workshop focuses on updated road design standards and specifications. Participants will gain insights into recent changes in design parameters, safety features, and climate-resilient design approaches adopted by ERA.",
    agenda: [
      "9:30 AM - 10:00 AM: Registration",
      "10:00 AM - 11:30 AM: Presentation on Updated Design Standards",
      "11:30 AM - 12:00 PM: Q&A Session",
      "12:00 PM - 1:00 PM: Lunch",
      "1:00 PM - 2:30 PM: Practical Applications and Case Studies",
      "2:30 PM - 3:00 PM: Closing Remarks and Certificate Distribution"
    ],
    speakers: [
      "Director of Design, ERA",
      "Senior Highway Engineer, ERA",
      "International Road Design Consultant"
    ],
    capacity: 50,
    registrationRequired: true,
    image: "https://placehold.co/600x400/e5edff/1a44b8?text=Design+Workshop"
  },
  {
    id: 3,
    title: "Road Asset Management System Launch",
    date: new Date(2025, 4, 20), // May 20, 2025
    time: "2:00 PM - 4:30 PM",
    location: "Skylight Hotel, Addis Ababa",
    type: "Launch Event",
    description: "ERA is launching its new integrated Road Asset Management System (RAMS), a digital platform for monitoring and managing Ethiopia's road network. The event will include a demonstration of the system and discussion of its benefits for road maintenance planning and budgeting.",
    agenda: [
      "1:30 PM - 2:00 PM: Registration",
      "2:00 PM - 2:30 PM: Opening Remarks",
      "2:30 PM - 3:30 PM: Presentation and Demo of RAMS",
      "3:30 PM - 4:00 PM: Q&A Session",
      "4:00 PM - 4:30 PM: Networking Reception"
    ],
    speakers: [
      "Director of Maintenance, ERA",
      "IT Systems Manager, ERA",
      "Representative from System Developer"
    ],
    capacity: 80,
    registrationRequired: true,
    image: "https://placehold.co/600x400/e5edff/1a44b8?text=RAMS+Launch"
  },
  {
    id: 4,
    title: "Public Consultation: Addis-Adama Expressway Expansion",
    date: new Date(2025, 5, 5), // June 5, 2025
    time: "9:00 AM - 12:00 PM",
    location: "Adama City Administration Hall",
    type: "Public Consultation",
    description: "This public consultation session aims to gather input from communities, businesses, and local authorities regarding the planned expansion of the Addis-Adama Expressway. ERA representatives will present the project plans and environmental assessment findings.",
    agenda: [
      "8:30 AM - 9:00 AM: Registration",
      "9:00 AM - 9:30 AM: Project Overview Presentation",
      "9:30 AM - 10:00 AM: Environmental and Social Impact Assessment",
      "10:00 AM - 10:15 AM: Break",
      "10:15 AM - 11:45 AM: Public Comments and Questions",
      "11:45 AM - 12:00 PM: Next Steps and Closing"
    ],
    speakers: [
      "Project Manager, Expressway Expansion Project",
      "Environmental Specialist, ERA",
      "Social Safeguards Expert, ERA",
      "Representative from Adama City Administration"
    ],
    capacity: 100,
    registrationRequired: false,
    image: "https://placehold.co/600x400/e5edff/1a44b8?text=Public+Consultation"
  },
  {
    id: 5,
    title: "Road Maintenance Training for Regional Authorities",
    date: new Date(2025, 5, 15), // June 15, 2025
    time: "9:00 AM - 4:00 PM",
    location: "ERA Training Center, Addis Ababa",
    type: "Training",
    description: "A specialized training program for engineers and technicians from regional road authorities on routine and periodic maintenance practices. The training will cover planning, implementation, and quality control of maintenance activities.",
    agenda: [
      "8:30 AM - 9:00 AM: Registration",
      "9:00 AM - 10:30 AM: Maintenance Planning and Prioritization",
      "10:30 AM - 10:45 AM: Break",
      "10:45 AM - 12:15 PM: Maintenance Techniques and Best Practices",
      "12:15 PM - 1:15 PM: Lunch",
      "1:15 PM - 2:45 PM: Quality Control and Monitoring",
      "2:45 PM - 3:00 PM: Break",
      "3:00 PM - 4:00 PM: Practical Exercises and Case Studies"
    ],
    speakers: [
      "Head of Maintenance Division, ERA",
      "Senior Maintenance Engineer, ERA",
      "Regional Roads Coordinator"
    ],
    capacity: 40,
    registrationRequired: true,
    image: "https://placehold.co/600x400/e5edff/1a44b8?text=Maintenance+Training"
  }
];

// Past events (modified versions of the above events with past dates)
const pastEvents = [
  {
    ...events[0],
    id: 6,
    date: new Date(2024, 10, 15), // November 15, 2024
    title: "Road Sector Performance Review 2024"
  },
  {
    ...events[1],
    id: 7,
    date: new Date(2024, 11, 5), // December 5, 2024
    title: "Highway Design Workshop"
  },
  {
    ...events[2],
    id: 8,
    date: new Date(2025, 0, 20), // January 20, 2025
    title: "Digital Transformation in Road Management"
  }
];

const Events = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [registrationInfo, setRegistrationInfo] = useState({
    name: '',
    email: '',
    organization: '',
    phone: ''
  });
  const { toast } = useToast();

  // Filter events based on search and date
  const filterEvents = (eventList: typeof events) => {
    return eventList.filter(event => {
      const matchesSearch = searchQuery === '' || 
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.type.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesDate = !date || (
        event.date.getDate() === date.getDate() &&
        event.date.getMonth() === date.getMonth() && 
        event.date.getFullYear() === date.getFullYear()
      );
      
      return matchesSearch && matchesDate;
    });
  };

  const filteredUpcomingEvents = filterEvents(events);
  const filteredPastEvents = filterEvents(pastEvents);

  // Handle registration submission
  const handleRegistration = (eventId: number) => {
    toast({
      title: "Registration Successful",
      description: "You have been registered for the event. A confirmation email will be sent shortly.",
    });
    console.log("Registered for event ID:", eventId, "with info:", registrationInfo);
    setRegistrationInfo({
      name: '',
      email: '',
      organization: '',
      phone: ''
    });
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

        {/* Tabs for Upcoming and Past Events */}
        <Tabs defaultValue="upcoming" className="mb-8">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
            <TabsTrigger value="past">Past Events</TabsTrigger>
          </TabsList>
          
          {/* Upcoming Events Tab */}
          <TabsContent value="upcoming" className="mt-6">
            {filteredUpcomingEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUpcomingEvents.map((event) => (
                  <Card key={event.id} className="flex flex-col h-full hover:border-era-blue transition-colors">
                    <CardHeader className="pb-4">
                      <div className="relative h-48 -mt-6 -mx-6 mb-4 rounded-t-lg overflow-hidden">
                        <img 
                          src={event.image} 
                          alt={event.title} 
                          className="object-cover w-full h-full"
                        />
                        <div className="absolute top-0 right-0 bg-era-blue text-white px-3 py-1 m-2 rounded-md text-sm font-medium">
                          {event.type}
                        </div>
                      </div>
                      <CardTitle className="text-xl">{event.title}</CardTitle>
                      <CardDescription className="text-base">
                        {format(event.date, "MMMM d, yyyy")}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-4 flex-grow">
                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {event.description}
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-era-blue" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-era-blue mt-0.5" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-era-blue" />
                          <span>Capacity: {event.capacity} attendees</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <div className="flex flex-col sm:flex-row w-full gap-3">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" className="flex-1">View Details</Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="text-xl">{event.title}</DialogTitle>
                              <DialogDescription className="text-base">
                                {format(event.date, "MMMM d, yyyy")} | {event.time} | {event.location}
                              </DialogDescription>
                            </DialogHeader>
                            
                            <div className="space-y-4 mt-4">
                              <div>
                                <h4 className="font-semibold mb-2">Description</h4>
                                <p>{event.description}</p>
                              </div>
                              
                              <div>
                                <h4 className="font-semibold mb-2">Agenda</h4>
                                <ul className="space-y-1">
                                  {event.agenda.map((item, index) => (
                                    <li key={index} className="border-l-2 border-era-blue pl-3 py-1">
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              
                              <div>
                                <h4 className="font-semibold mb-2">Speakers</h4>
                                <ul className="list-disc pl-5 space-y-1">
                                  {event.speakers.map((speaker, index) => (
                                    <li key={index}>{speaker}</li>
                                  ))}
                                </ul>
                              </div>
                              
                              <div className="bg-muted p-4 rounded-md">
                                <h4 className="font-semibold mb-2">Event Details</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  <div className="flex items-center gap-2">
                                    <Calendar className="h-5 w-5 text-era-blue" />
                                    <div>
                                      <p className="font-medium">Date</p>
                                      <p>{format(event.date, "MMMM d, yyyy")}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Clock className="h-5 w-5 text-era-blue" />
                                    <div>
                                      <p className="font-medium">Time</p>
                                      <p>{event.time}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-start gap-2">
                                    <MapPin className="h-5 w-5 text-era-blue mt-0.5" />
                                    <div>
                                      <p className="font-medium">Location</p>
                                      <p>{event.location}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-start gap-2">
                                    <Users className="h-5 w-5 text-era-blue mt-0.5" />
                                    <div>
                                      <p className="font-medium">Capacity</p>
                                      <p>{event.capacity} attendees</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <DialogFooter className="mt-6">
                              {event.registrationRequired ? (
                                <Button onClick={() => handleRegistration(event.id)}>
                                  Register Now
                                </Button>
                              ) : (
                                <Button variant="outline" disabled>
                                  No Registration Required
                                </Button>
                              )}
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        
                        {event.registrationRequired ? (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button className="flex-1">Register</Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Register for Event</DialogTitle>
                                <DialogDescription>
                                  Fill out the form below to register for {event.title} on {format(event.date, "MMMM d, yyyy")}.
                                </DialogDescription>
                              </DialogHeader>
                              
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="name" className="text-right">Name</Label>
                                  <Input
                                    id="name"
                                    value={registrationInfo.name}
                                    onChange={(e) => setRegistrationInfo({...registrationInfo, name: e.target.value})}
                                    className="col-span-3"
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="email" className="text-right">Email</Label>
                                  <Input
                                    id="email"
                                    type="email"
                                    value={registrationInfo.email}
                                    onChange={(e) => setRegistrationInfo({...registrationInfo, email: e.target.value})}
                                    className="col-span-3"
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="organization" className="text-right">Organization</Label>
                                  <Input
                                    id="organization"
                                    value={registrationInfo.organization}
                                    onChange={(e) => setRegistrationInfo({...registrationInfo, organization: e.target.value})}
                                    className="col-span-3"
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="phone" className="text-right">Phone</Label>
                                  <Input
                                    id="phone"
                                    value={registrationInfo.phone}
                                    onChange={(e) => setRegistrationInfo({...registrationInfo, phone: e.target.value})}
                                    className="col-span-3"
                                  />
                                </div>
                              </div>
                              
                              <DialogFooter>
                                <Button onClick={() => handleRegistration(event.id)}>
                                  Complete Registration
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        ) : (
                          <Button variant="outline" disabled className="flex-1">
                            No Registration Required
                          </Button>
                        )}
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-muted/30 rounded-lg">
                <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">No Upcoming Events Found</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  There are no upcoming events matching your criteria. 
                  Please try a different search or check back later.
                </p>
              </div>
            )}
          </TabsContent>
          
          {/* Past Events Tab */}
          <TabsContent value="past" className="mt-6">
            {filteredPastEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPastEvents.map((event) => (
                  <Card key={event.id} className="flex flex-col h-full opacity-90 hover:opacity-100 transition-opacity">
                    <CardHeader className="pb-4">
                      <div className="relative h-48 -mt-6 -mx-6 mb-4 rounded-t-lg overflow-hidden">
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white text-lg font-medium">
                          Past Event
                        </div>
                        <img 
                          src={event.image} 
                          alt={event.title} 
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <CardTitle className="text-xl">{event.title}</CardTitle>
                      <CardDescription className="text-base">
                        {format(event.date, "MMMM d, yyyy")}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-4 flex-grow">
                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {event.description}
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-era-blue" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-era-blue mt-0.5" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="w-full">View Details</Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="text-xl">{event.title}</DialogTitle>
                            <DialogDescription className="text-base">
                              {format(event.date, "MMMM d, yyyy")} | {event.time} | {event.location}
                            </DialogDescription>
                          </DialogHeader>
                          
                          <div className="space-y-4 mt-4">
                            <div>
                              <h4 className="font-semibold mb-2">Description</h4>
                              <p>{event.description}</p>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold mb-2">Agenda</h4>
                              <ul className="space-y-1">
                                {event.agenda.map((item, index) => (
                                  <li key={index} className="border-l-2 border-era-blue pl-3 py-1">
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold mb-2">Speakers</h4>
                              <ul className="list-disc pl-5 space-y-1">
                                {event.speakers.map((speaker, index) => (
                                  <li key={index}>{speaker}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-muted/30 rounded-lg">
                <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">No Past Events Found</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  There are no past events matching your criteria. 
                  Please try a different search.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>

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
              disabled={{ before: new Date(2024, 10, 1) }}
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

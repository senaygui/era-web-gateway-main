import React from 'react';
import { 
  FileText, 
  Calendar, 
  Bell,
  BookOpen 
} from 'lucide-react';
import HeroCarousel, { CarouselSlide } from '@/components/home/HeroCarousel';
import QuickLinks, { QuickLinkItem } from '@/components/home/QuickLinks';
import MissionSection from '@/components/home/MissionSection';
import SearchSection from '@/components/home/SearchSection';
import NewsSection from '@/components/home/NewsSection';
import EventsSection from '@/components/home/EventsSection';
import BidsSection from '@/components/home/BidsSection';
import { AdminUsersList } from '../components/AdminUsersList';

const Home = () => {
  // Mock data for the homepage sections
  const featuredNews = [
    {
      id: 1,
      title: 'ERA Completes 250km Road Construction in Southern Ethiopia',
      excerpt: 'The Ethiopian Roads Administration has successfully completed a 250km road construction project connecting major cities in Southern Ethiopia.',
      date: 'April 2, 2025',
      image: 'https://www.era.gov.et/documents/20182/21901/photo_2025-03-27_09-56-51.jpg/76252460-10db-439f-b987-96cca2a04d0f?t=1743146821232',
      category: 'Projects'
    },
    {
      id: 2,
      title: 'New Budget Allocated for Rural Road Development',
      excerpt: 'The Ethiopian government has allocated a significant budget for rural road development to enhance connectivity in remote areas.',
      date: 'March 28, 2025',
      image: 'https://www.era.gov.et/documents/20182/21901/photo_2025-04-04_01-37-07.jpg/e945559d-d175-4d75-8142-15f0185c3f49?t=1743774489872',
      category: 'Budget'
    },
    {
      id: 3,
      title: 'ERA Signs Partnership Agreement with International Firms',
      excerpt: 'The Ethiopian Roads Administration has signed a partnership agreement with multiple international firms to boost road infrastructure.',
      date: 'March 20, 2025',
      image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&h=500',
      category: 'Partnership'
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Annual Road Infrastructure Conference',
      date: 'May 15-17, 2025',
      location: 'Addis Ababa, Ethiopia',
      image: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=800&h=500'
    },
    {
      id: 2,
      title: 'Public Consultation: Upcoming Road Projects',
      date: 'April 25, 2025',
      location: 'Bahir Dar, Ethiopia',
      image: 'https://www.era.gov.et/documents/20182/21705/Dire+Dawa-Dewele.jpg/2b51630a-1928-4c4c-94a8-305fa1005685?version=1.0&t=1606372171000'
    }
  ];

  const carouselSlides: CarouselSlide[] = [
    {
      id: 1,
      title: "Building Ethiopia's Future Through Road Infrastructure",
      description: "The Ethiopian Roads Administration is committed to developing and maintaining a sustainable road network that connects communities and drives economic growth.",
      image: "https://www.era.gov.et/documents/20182/21705/abbay+bridge/bfa6e473-8126-485f-9283-9e1b339be737?version=1.0&t=1717133982000",
      ctaText: "Learn About ERA",
      ctaLink: "/about",
      ctaSecondaryText: "Get in Touch",
      ctaSecondaryLink: "/contact"
    },
    ...featuredNews.map(news => ({
      id: news.id + 10,
      title: news.title,
      description: news.excerpt,
      image: news.image,
      ctaText: "Read More",
      ctaLink: `/news/${news.id}`,
      category: news.category
    })),
    ...upcomingEvents.map(event => ({
      id: event.id + 20,
      title: event.title,
      description: `${event.date} • ${event.location}`,
      image: event.image,
      ctaText: "Event Details",
      ctaLink: `/events/${event.id}`,
      category: "Event"
    }))
  ];

  const activeBids = [
    {
      id: 1,
      title: 'Rehabilitation of Addis Ababa - Adama Expressway',
      deadline: 'April 30, 2025',
      category: 'Road Construction'
    },
    {
      id: 2,
      title: 'Supply of Heavy Machinery for Northern Region',
      deadline: 'May 5, 2025',
      category: 'Equipment'
    },
    {
      id: 3,
      title: 'Consultancy Services for New Highway Planning',
      deadline: 'May 12, 2025',
      category: 'Consultancy'
    }
  ];

  const quickLinks: QuickLinkItem[] = [
    {
      title: 'Bids & Tenders',
      description: 'Access current and archived bid announcements',
      icon: <FileText className="h-6 w-6 text-era-orange" />,
      link: '/bids'
    },
    {
      title: 'Events & Workshops',
      description: 'View upcoming ERA events and workshops',
      icon: <Calendar className="h-6 w-6 text-era-orange" />,
      link: '/events'
    },
    {
      title: 'Publications',
      description: 'Download reports, studies, and guidelines',
      icon: <BookOpen className="h-6 w-6 text-era-orange" />,
      link: '/publications'
    },
    {
      title: 'Vacancies',
      description: 'Browse current job opportunities at ERA',
      icon: <Bell className="h-6 w-6 text-era-orange" />,
      link: '/vacancies'
    }
  ];

  return (
    <>
      <HeroCarousel slides={carouselSlides} />
      <QuickLinks links={quickLinks} />
      <NewsSection news={featuredNews} />
      <EventsSection events={upcomingEvents} />
      <BidsSection bids={activeBids} />
      <MissionSection />
      <SearchSection />
      <AdminUsersList />
    </>
  );
};

export default Home;

import { useState, useEffect } from 'react';
import axios from '@/lib/axios';

export interface Event {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  description: string;
  image_url: string;
  start_date: string;
  end_date: string;
  location: string;
  event_type: string;
  status: string;
  registration_required: boolean;
  registration_open: boolean;
  capacity: number;
  agenda: string[];
  speakers: string[];
}

interface EventsResponse {
  events: Event[];
  meta: {
    current_page: number;
    total_pages: number;
    total_count: number;
  };
}

export const useEvents = (page = 1, perPage = 6, eventType?: string | null) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState<EventsResponse['meta'] | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams({
          page: page.toString(),
          per_page: perPage.toString(),
        });
        
        if (eventType) {
          params.append('event_type', eventType);
        }

        console.log('useEvents: fetching with params', params.toString());
        const response = await axios.get<EventsResponse>(`/events?${params.toString()}`);
        console.log('useEvents: API response data', response.data);

        setEvents(response.data.events || []);
        setMeta(response.data.meta);
        setError(null);
      } catch (err) {
        setError('Failed to fetch events');
        console.error('useEvents: Error fetching events:', err);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [page, perPage, eventType]);

  return { events, loading, error, meta };
};

export const useFeaturedEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedEvents = async () => {
      try {
        setLoading(true);
        const response = await axios.get<EventsResponse>('/events/featured');
        console.log('useFeaturedEvents: API response data', response.data);
        setEvents(response.data.events || []);
        setError(null);
      } catch (err) {
        setError('Failed to fetch featured events');
        console.error('useFeaturedEvents: Error fetching featured events:', err);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedEvents();
  }, []);

  return { events, loading, error };
};

export const useUpcomingEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        setLoading(true);
        const response = await axios.get<EventsResponse>('/events/upcoming');
        console.log('useUpcomingEvents: API response data', response.data);
        setEvents(response.data.events || []);
        setError(null);
      } catch (err) {
        setError('Failed to fetch upcoming events');
        console.error('useUpcomingEvents: Error fetching upcoming events:', err);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingEvents();
  }, []);

  return { events, loading, error };
};

export const useEvent = (slug: string) => {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const response = await axios.get<Event>(`/events/${slug}`);
        console.log('useEvent: API response data', response.data);
        console.log('useEvent: Agenda type:', typeof response.data.agenda);
        console.log('useEvent: Agenda is array?', Array.isArray(response.data.agenda));
        console.log('useEvent: Speakers type:', typeof response.data.speakers);
        console.log('useEvent: Speakers is array?', Array.isArray(response.data.speakers));
        
        // Ensure agenda and speakers are arrays
        const processedData = {
          ...response.data,
          agenda: Array.isArray(response.data.agenda) ? response.data.agenda : [],
          speakers: Array.isArray(response.data.speakers) ? response.data.speakers : []
        };
        
        console.log('useEvent: Processed data', processedData);
        setEvent(processedData);
        setError(null);
      } catch (err) {
        setError('Failed to fetch event details');
        console.error('useEvent: Error fetching event details:', err);
        setEvent(null);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchEvent();
    }
  }, [slug]);

  return { event, loading, error };
};
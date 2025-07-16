import { useState, useEffect } from 'react';
import axios from 'axios';

export interface District {
  id: string;
  name: string;
  address: string;
  map_embed: string;
  phone_numbers: string[];
  emails: string[];
  social_media_links: string[];
  district_overview: string;
  detail_description: string;
  is_published: boolean;
  meta_title: string;
  meta_description: string;
  meta_keywords: string[];
  published_by: string;
  updated_by: string;
  main_image_url?: string;
  gallery_images_urls?: string[];
}

interface DistrictsResponse {
  districts: District[];
  meta: {
    current_page: number;
    total_pages: number;
    total_count: number;
  };
}

const useDistricts = (page: number = 1, perPage: number = 10) => {
  const [districts, setDistricts] = useState<District[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState<DistrictsResponse['meta'] | null>(null);

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        setLoading(true);
        const response = await axios.get<DistrictsResponse>(`/api/v1/districts`, {
          params: {
            page,
            per_page: perPage
          }
        });
        setDistricts(response.data.districts);
        setMeta(response.data.meta);
        setError(null);
      } catch (err) {
        setError('Failed to fetch districts');
        console.error('Error fetching districts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDistricts();
  }, [page, perPage]);

  return { districts, loading, error, meta };
};

export const useDistrict = (id: string) => {
  const [district, setDistrict] = useState<District | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDistrict = async () => {
      if (!id) {
        setError('District ID is missing');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get<District>(`/api/v1/districts/${id}`);
        setDistrict(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching district:', err);
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 404) {
            setError('District not found');
          } else if (err.response?.status === 401) {
            setError('Unauthorized access');
          } else {
            setError(err.response?.data?.error || 'Failed to fetch district details');
          }
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDistrict();
  }, [id]);

  return { district, loading, error };
};

export default useDistricts; 
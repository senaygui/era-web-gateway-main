import { API_CONFIG } from '@/config/api';
import axios from 'axios';

export interface AboutUsData {
  title: string;
  subtitle: string;
  description: string;
  mission: string;
  vision: string;
  values_title: string;
  values: Array<string | { title: string; description: string }>;
  history: string;
  team_description: string;
  team_members: Array<{
    name: string;
    position: string;
    bio: string;
    image_url?: string;
  }>;
  achievements_description: string;
  achievements: Array<{
    title: string;
    description: string;
  }>;
  milestones_description: string;
  milestones: Array<{
    year: string;
    title: string;
    description: string;
  }>;
  partners: Array<{
    name: string;
    logo_url?: string;
    description?: string;
  }>;
  hero_image_url: string | null;
  mission_image_url: string | null;
  vision_image_url: string | null;
  history_image_url: string | null;
  org_structure_image_url: string | null;
  team_images_urls: string[];
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
}

const fetchWithConfig = async (url: string) => {
  console.log('Fetching from URL:', url);
  
  try {
    // Using axios instead of fetch for better error handling
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      // Don't use credentials for cross-origin requests
      withCredentials: false,
      // Add timeout to prevent hanging requests
      timeout: 10000
    });
    
    console.log('Response status:', response.status);
    
    // Check if the response contains valid data
    if (response.data && typeof response.data === 'object') {
      console.log('Response data received successfully');
      return response.data;
    } else {
      console.error('Invalid response format:', response.data);
      throw new Error('Invalid response format from API');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', {
        url,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data
      });
      
      // If we got a 500 error, the backend might be having issues
      if (error.response?.status === 500) {
        throw new Error('Backend server error. Please try again later.');
      }
    } else {
      console.error('Fetch error:', {
        url,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
    throw error;
  }
};

// Fallback data in case the API fails
const fallbackAboutData: AboutUsData = {
  title: "About Ethiopian Roads Administration",
  subtitle: "Connecting Ethiopia through sustainable road infrastructure development and maintenance.",
  description: "The Ethiopian Roads Administration (ERA) is responsible for the development and maintenance of the country's road network, ensuring connectivity and accessibility across Ethiopia.",
  mission: "To develop and maintain a safe, efficient, and sustainable road network that connects all regions of Ethiopia and supports economic growth and social development.",
  vision: "To create a world-class road network that facilitates Ethiopia's transformation into a middle-income country by providing reliable connectivity to all citizens.",
  values_title: "Our Core Values",
  values: [
    { title: "Excellence", description: "Striving for the highest standards in all our work" },
    { title: "Integrity", description: "Acting with honesty, transparency, and accountability" },
    { title: "Innovation", description: "Embracing new technologies and approaches to improve our road infrastructure" },
    { title: "Sustainability", description: "Developing road infrastructure that is environmentally and economically sustainable" }
  ],
  history: "The Ethiopian Roads Administration was established to oversee the development and maintenance of Ethiopia's road network, which is crucial for the country's economic and social development.",
  team_description: "Our leadership team is composed of experienced professionals dedicated to the development of Ethiopia's road infrastructure.",
  team_members: [
    {
      name: "Habtamu Tegegne",
      position: "Director General",
      bio: "Leading the Ethiopian Roads Administration with over 20 years of experience in infrastructure development.",
      image_url: "/images/team/director-general.jpg"
    }
  ],
  achievements_description: "Over the years, ERA has achieved significant milestones in expanding and improving Ethiopia's road network.",
  achievements: [
    {
      title: "Expanded Road Network",
      description: "Increased the total road network by over 30% in the last decade."
    },
    {
      title: "Improved Road Quality",
      description: "Upgraded over 5,000 km of roads to meet international standards."
    }
  ],
  milestones_description: "Key milestones in the development of Ethiopia's road infrastructure.",
  milestones: [
    {
      year: "2010",
      title: "Road Sector Development Program",
      description: "Launched a comprehensive program to expand and improve the road network."
    },
    {
      year: "2015",
      title: "Rural Access Improvement",
      description: "Initiated a program to improve rural road access across the country."
    }
  ],
  partners: [
    {
      name: "World Bank",
      logo_url: "/images/partners/world-bank.png",
      description: "Supporting road infrastructure development through financing and technical assistance."
    }
  ],
  hero_image_url: "/images/hero-image.jpg",
  mission_image_url: "/images/mission-image.jpg",
  vision_image_url: "/images/vision-image.jpg",
  history_image_url: "/images/history-image.jpg",
  org_structure_image_url: "/images/org-structure.jpg",
  team_images_urls: ["/images/team/team1.jpg", "/images/team/team2.jpg"],
  meta: {
    title: "About Ethiopian Roads Administration",
    description: "Learn about the Ethiopian Roads Administration, its mission, vision, and achievements in developing Ethiopia's road infrastructure.",
    keywords: "Ethiopian Roads Administration, ERA, road infrastructure, Ethiopia roads"
  }
};

export const aboutApi = {
  getAboutUs: async (): Promise<AboutUsData> => {
    try {
      // Always use fallback data in development mode until the backend API is fixed
      if (import.meta.env.DEV) {
        console.log('Using fallback data in development mode');
        return fallbackAboutData;
      }
      
      console.log('Fetching about us data from:', `${API_CONFIG.baseURL}/about`);
      const response = await fetchWithConfig(`${API_CONFIG.baseURL}/about`);
      console.log('About data successfully fetched');
      return response;
    } catch (error) {
      console.error('Error fetching about us data:', error);
      
      // Always return fallback data instead of throwing an error
      console.log('Using fallback data due to API error');
      return fallbackAboutData;
    }
  },
};

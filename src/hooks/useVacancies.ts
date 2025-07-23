import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_URL =
  import.meta.env.VITE_API_URL ||
  (typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? 'http://localhost:3000/api/v1'
    : 'http://172.16.10.27/api/v1');

export interface Vacancy {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  deadline: string;
  postedDate: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  salary: string;
}

const useVacancies = () => {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVacancies = useCallback(async (endpoint = '') => {
    try {
      setLoading(true);
      setError(null);
      const url = `${API_URL}/vacancies${endpoint}`;
      console.log('🔍 Fetching vacancies from:', url);
      
      // Make the API request
      const response = await axios.get(url);
      
      // Log the raw response
      console.log('📦 Raw API Response:', {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        data: response.data
      });
      
      if (!Array.isArray(response.data)) {
        console.error('❌ Expected array but got:', typeof response.data);
        throw new Error('Invalid response format: expected array');
      }
      
      // Transform the API response to match our frontend structure
      const transformedData = response.data.map((vacancy: any, index: number) => {
        console.group(`🏢 Vacancy #${index + 1}`);
        console.log('📄 Vacancy data:', vacancy);
        console.log('🔧 Requirements:', {
          value: vacancy.requirements,
          type: typeof vacancy.requirements,
          isArray: Array.isArray(vacancy.requirements)
        });
        console.log('🛠️ Responsibilities:', {
          value: vacancy.responsibilities,
          type: typeof vacancy.responsibilities,
          isArray: Array.isArray(vacancy.responsibilities)
        });
        console.log('🎁 Benefits:', {
          value: vacancy.benefits,
          type: typeof vacancy.benefits,
          isArray: Array.isArray(vacancy.benefits)
        });
        // Enhanced parseList function to handle various data formats
        // Define the transformed vacancy object type
        interface TransformedVacancy {
          id: number;
          title: string;
          department: string;
          location: string;
          type: string;
          deadline: string;
          postedDate: string;
          description: string;
          requirements: string[];
          responsibilities: string[];
          benefits: string[];
          salary: string;
        }
        
        const parseList = (value: any, fieldName: string): string[] => {
          console.log(`🔄 Parsing ${fieldName}:`, value, 'Type:', typeof value);
          
          // Handle null/undefined
          if (value == null) {
            console.log('⚠️ Value is null/undefined, returning empty array');
            return [];
          }
          
          // If it's already an array, return it (filtering out any invalid items)
          if (Array.isArray(value)) {
            console.log('✅ Already an array, filtering out invalid items');
            return value
              .filter((item: any) => item != null && item !== '')
              .map((item: any) => String(item).trim());
          }
          
          // If it's a string, try to parse it
          if (typeof value === 'string') {
            // If it's empty, return empty array
            if (!value.trim()) {
              console.log('ℹ️ Empty string, returning empty array');
              return [];
            }
            
            // Try to parse as JSON
            try {
              console.log('🔍 Attempting to parse as JSON');
              const parsed = JSON.parse(value);
              console.log('✅ Parsed JSON successfully:', parsed);
              
              if (Array.isArray(parsed)) {
                return parsed
                  .filter((item: any) => item != null && item !== '')
                  .map((item: any) => String(item).trim());
              }
              
              // If it's a single value, wrap it in an array
              return [String(parsed).trim()];
            } catch (e) {
              console.log('❌ Not a JSON string, trying newline split');
              // If not JSON, try splitting by newlines
              return value
                .split(/[\r\n]+/)
                .map((item: string) => item.trim())
                .filter((item: string) => item !== '');
            }
          }
          
          // If it's an object, try to extract values
          if (typeof value === 'object') {
            console.log('🔍 Object detected, extracting values');
            return Object.values(value)
              .filter((item: any) => item != null && item !== '')
              .map((item: any) => String(item).trim());
          }
          
          // If we get here, convert to string and wrap in array
          console.log('🔀 Converting to string and wrapping in array');
          return [String(value).trim()];
        };

        const transformedVacancy: TransformedVacancy = {
          id: vacancy.id,
          title: vacancy.title,
          department: vacancy.department || 'Not specified',
          location: vacancy.location || 'Not specified',
          type: vacancy.job_type || vacancy.type || 'Full-Time',
          deadline: vacancy.deadline ? new Date(vacancy.deadline).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          }) : 'Not specified',
          postedDate: vacancy.posted_date ? new Date(vacancy.posted_date).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          }) : 'Not specified',
          description: vacancy.description || 'No description available',
          requirements: parseList(vacancy.requirements, 'requirements'),
          responsibilities: parseList(vacancy.responsibilities, 'responsibilities'),
          benefits: parseList(vacancy.benefits, 'benefits'),
          salary: vacancy.salary || 'Competitive salary based on experience'
        };
        
        return transformedVacancy;
        
        // Log the transformed vacancy
        console.log('✨ Transformed vacancy:', {
          id: vacancy.id,
          title: vacancy.title,
          requirements: transformedVacancy.requirements,
          responsibilities: transformedVacancy.responsibilities,
          benefits: transformedVacancy.benefits
        });
        
        console.groupEnd(); // Close the group for this vacancy
        return transformedVacancy;
      });
      
      console.log('🏁 All vacancies transformed successfully');
      setVacancies(transformedData);
      return transformedData;
    } catch (err) {
      console.error('Error fetching vacancies:', err);
      setError('Failed to fetch vacancies. Please try again later.');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const getAllVacancies = useCallback(() => {
    return fetchVacancies('');
  }, [fetchVacancies]);

  const getActiveVacancies = useCallback(() => {
    return fetchVacancies('/active');
  }, [fetchVacancies]);

  const getExpiredVacancies = useCallback(() => {
    return fetchVacancies('/expired');
  }, [fetchVacancies]);

  const getVacancyById = useCallback(async (id: number): Promise<Vacancy | null> => {
    try {
      const response = await axios.get(`${API_URL}/vacancies/${id}`);
      return response.data;
    } catch (err) {
      console.error(`Error fetching vacancy ${id}:`, err);
      return null;
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    getAllVacancies();
  }, [getAllVacancies]);

  return {
    vacancies,
    loading,
    error,
    getAllVacancies,
    getActiveVacancies,
    getExpiredVacancies,
    getVacancyById,
  };
};

export default useVacancies;
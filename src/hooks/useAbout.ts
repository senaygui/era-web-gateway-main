import { useState, useEffect, useCallback } from 'react';
import { aboutApi, AboutUsData } from '@/lib/api/about';
import { toast } from '@/components/ui/use-toast'; // Assuming you have a toast component

interface UseAboutReturn {
  aboutData: AboutUsData | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useAbout = (): UseAboutReturn => {
  const [aboutData, setAboutData] = useState<AboutUsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Use useCallback to memoize the fetchAboutData function
  const fetchAboutData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Starting to fetch about data...');
      const data = await aboutApi.getAboutUs();
      
      if (data) {
        setAboutData(data);
        console.log('Successfully fetched about data');
      } else {
        throw new Error('No data returned from API');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError('Failed to fetch about data');
      console.error('Error in useAbout.fetchAboutData:', { error: errorMessage });
      
      // Don't show error toast in development mode since we're using fallback data
      if (typeof toast === 'function' && !import.meta.env.DEV) {
        toast({
          title: 'Error',
          description: 'Failed to load about us data. Please try again later.',
          variant: 'destructive',
        });
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    console.log('useAbout hook mounted, fetching initial about data...');
    fetchAboutData();
  }, [fetchAboutData]);

  return {
    aboutData,
    loading,
    error,
    refetch: fetchAboutData,
  };
};

export const API_CONFIG = {
  // Ensure we're using the correct API URL
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1' || 'http://172.16.10.27/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    // Add CORS headers
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept'
  },
  // Set to 'same-origin' to avoid CORS issues with credentials
  credentials: 'same-origin' as RequestCredentials
};

// Helper function to construct full URLs for images
export const getFullImageUrl = (imageUrl: string | null | undefined): string | null => {
  if (!imageUrl) return null;
  
  // If it's already a full URL, return it
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  
  // Handle ActiveStorage URLs which start with /rails/active_storage
  if (imageUrl.startsWith('/rails/active_storage')) {
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000' || 'http://172.16.10.27/api/v1';
    const baseWithoutApi = baseUrl.replace('/api/v1', '');
    return `${baseWithoutApi}${imageUrl}`;
  }
  
  // Handle relative URLs that don't start with /
  if (!imageUrl.startsWith('/')) {
    imageUrl = `/${imageUrl}`;
  }
  
  // Otherwise, prepend the base URL without the API path
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000' || 'http://172.16.10.27/api/v1';
  const baseWithoutApi = baseUrl.replace('/api/v1', '');
  
  return `${baseWithoutApi}${imageUrl}`;
};
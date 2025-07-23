export const API_CONFIG = {
  baseURL:
    import.meta.env.VITE_API_URL ||
    (typeof window !== 'undefined' && window.location.hostname === 'localhost'
      ? 'http://localhost:3000/api/v1'
      : 'http://172.16.10.27/api/v1'),
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept'
  },
  credentials: 'same-origin' as RequestCredentials
};

// Helper function to construct full URLs for images
export const getFullImageUrl = (imageUrl: string | null | undefined): string | null => {
  if (!imageUrl) return null;

  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }

  // Handle ActiveStorage URLs which start with /rails/active_storage
  const baseUrl =
    import.meta.env.VITE_API_URL ||
    (typeof window !== 'undefined' && window.location.hostname === 'localhost'
      ? 'http://localhost:3000/api/v1'
      : 'http://172.16.10.27/api/v1');
  const baseWithoutApi = baseUrl.replace('/api/v1', '');
  if (imageUrl.startsWith('/rails/active_storage')) {
    return `${baseWithoutApi}${imageUrl}`;
  }

  if (!imageUrl.startsWith('/')) {
    imageUrl = `/${imageUrl}`;
  }

  return `${baseWithoutApi}${imageUrl}`;
};
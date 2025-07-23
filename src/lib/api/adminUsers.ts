const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? 'http://localhost:3000/api/v1'
    : 'http://172.16.10.27/api/v1');

export interface AdminUser {
  id: number;
  email: string;
  created_at: string;
  updated_at: string;
}

export const adminUsersApi = {
  getAll: async (): Promise<AdminUser[]> => {
    const response = await fetch(`${API_BASE_URL}/admin_users`);
    if (!response.ok) {
      throw new Error('Failed to fetch admin users');
    }
    return response.json();
  },

  getById: async (id: number): Promise<AdminUser> => {
    const response = await fetch(`${API_BASE_URL}/admin_users/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch admin user');
    }
    return response.json();
  }
}; 
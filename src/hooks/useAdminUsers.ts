import { useState, useEffect } from 'react';
import { adminUsersApi, AdminUser } from '../lib/api/adminUsers';

export const useAdminUsers = () => {
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAdminUsers = async () => {
    try {
      setLoading(true);
      const data = await adminUsersApi.getAll();
      setAdminUsers(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminUsers();
  }, []);

  return {
    adminUsers,
    loading,
    error,
    refetch: fetchAdminUsers
  };
}; 
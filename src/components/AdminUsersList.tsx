import React from 'react';
import { useAdminUsers } from '../hooks/useAdminUsers';

export const AdminUsersList: React.FC = () => {
  const { adminUsers, loading, error } = useAdminUsers();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Users</h2>
      <div className="space-y-2">
        {adminUsers.map((user) => (
          <div
            key={user.id}
            className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <p className="font-medium">{user.email}</p>
            <p className="text-sm text-gray-500">
              Created: {new Date(user.created_at).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}; 
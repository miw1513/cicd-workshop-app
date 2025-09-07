import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  id: number;
  name: string;
  email: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:3001/api/users');
      setUsers(response.data);
    } catch (err) {
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="users">
      <h1>Users</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {users.length > 0 && (
        <div className="users-list">
          {users.map(user => (
            <div key={user.id} className="user-card">
              <h3>{user.name}</h3>
              <p>{user.email}</p>
            </div>
          ))}
        </div>
      )}
      <button onClick={fetchUsers}>Refresh Users</button>
    </div>
  );
};

export default Users;
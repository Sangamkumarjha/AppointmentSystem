import React, { useEffect, useState } from 'react';
import { getUsers, deleteUser } from '../utils/api';

const UserList = ({ token }) => {
  const [users, setUsers] = useState([]); // Initialize users as an empty array
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers(token);
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          throw new Error('API response is not an array');
        }
      } catch (err) {
        setError(err.message);
      }
    };
    fetchUsers();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      await deleteUser(id, token);
      setUsers(users.filter(user => user.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">User List</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Name</th>
            <th className="py-2">Email</th>
            <th className="py-2">Phone</th>
            <th className="py-2">Role</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td className="py-2">{user.name}</td>
              <td className="py-2">{user.email}</td>
              <td className="py-2">{user.phone}</td>
              <td className="py-2">{user.role}</td>
              <td className="py-2">
                <button onClick={() => handleDelete(user.id)} className="bg-red-500 px-4 py-2 rounded text-white">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;

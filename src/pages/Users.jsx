import React, { useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import { useNotification } from '../context/NotificationContext';
import UserList from '../components/user/UserList';
import UserForm from '../components/user/UserForm';
import UserDetail from '../components/user/UserDetail';
import { userApi } from "../api/apiService";
import { useAuth } from '../context/AuthContext';

const Users = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const { addNotification } = useNotification();
  const { user: currentUser } = useAuth();

  const { data: users, loading, refetch } = useFetch('/users');
  const [searchEmail, setSearchEmail] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [searching, setSearching] = useState(false);

  const handleCreateUser = async (userData) => {
    try {
      await userApi.create(userData);
      addNotification({
        type: 'success',
        message: 'User created successfully'
      });
      setIsFormOpen(false);
      refetch();
    } catch (error) {
      addNotification({
        type: 'error',
        message: error.message || 'Failed to create user'
      });
    }
  };

  const handleUpdateUser = async (id, userData) => {
    try {
      await userApi.update(id, userData);
      addNotification({
        type: 'success',
        message: 'User updated successfully'
      });
      setIsFormOpen(false);
      refetch();
    } catch (error) {
      addNotification({
        type: 'error',
        message: error.message || 'Failed to update user'
      });
    }
  };

  const handleDeleteUser = async (userOrEmail) => {
    // Accept either user object or email string for flexibility
    const email = typeof userOrEmail === 'string' ? userOrEmail : userOrEmail.email;
    try {
      await userApi.deleteByEmail(email);
      addNotification({
        type: 'success',
        message: 'User deleted successfully'
      });
      refetch();
    } catch (error) {
      addNotification({
        type: 'error',
        message: error.message || 'Failed to delete user'
      });
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsFormOpen(true);
  };

  const handleView = (user) => {
    setSelectedUser(user);
    setIsDetailOpen(true);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchEmail) {
      setSearchResult(null);
      return;
    }
    setSearching(true);
    try {
      const user = await userApi.findByEmail(searchEmail);
      setSearchResult(user ? [user] : []);
    } catch {
      setSearchResult([]);
    } finally {
      setSearching(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Users</h1>
        <form onSubmit={handleSearch} className="flex gap-2 items-center">
          <input
            type="email"
            placeholder="Search by email..."
            value={searchEmail}
            onChange={e => setSearchEmail(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 text-sm"
            disabled={searching}
          >
            {searching ? 'Searching...' : 'Search'}
          </button>
          {searchResult && (
            <button
              type="button"
              className="ml-2 text-gray-500 underline text-xs"
              onClick={() => { setSearchResult(null); setSearchEmail(''); }}
            >
              Clear
            </button>
          )}
        </form>
        <button
          onClick={() => {
            setSelectedUser(null);
            setIsFormOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add User
        </button>
      </div>

      <UserList
        users={searchResult !== null ? searchResult : users}
        onEdit={handleEdit}
        onView={handleView}
        onDelete={handleDeleteUser}
        canDelete={['ADMIN', 'HR'].includes(currentUser?.role)}
      />

      {isFormOpen && (
        <UserForm
          user={selectedUser}
          onSubmit={selectedUser ? handleUpdateUser : handleCreateUser}
          onClose={() => setIsFormOpen(false)}
        />
      )}

      {isDetailOpen && (
        <UserDetail
          user={selectedUser}
          onClose={() => setIsDetailOpen(false)}
          onEdit={() => {
            setIsDetailOpen(false);
            setIsFormOpen(true);
          }}
        />
      )}
    </div>
  );
};

export default Users; 
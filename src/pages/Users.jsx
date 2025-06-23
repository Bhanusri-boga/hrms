import React, { useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import { useNotification } from '../context/NotificationContext';
import UserList from '../components/user/UserList';
import UserForm from '../components/user/UserForm';
import UserDetail from '../components/user/UserDetail';
import { createUser, updateUser, deleteUser } from '../api/userApi';

const Users = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const { addNotification } = useNotification();

  const { data: users, loading, refetch } = useFetch('/users');

  const handleCreateUser = async (userData) => {
    try {
      await createUser(userData);
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
      await updateUser(id, userData);
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

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Users</h1>
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
        users={users}
        onEdit={handleEdit}
        onView={handleView}
        onDelete={handleDeleteUser}
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
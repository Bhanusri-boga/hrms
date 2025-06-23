import api from './axios';

export const getUsers = async (params) => {
  const response = await api.get('/users', { params });
  return response.data;
};

export const getUserById = async (id) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export const createUser = async (userData) => {
  const response = await api.post('/users', userData);
  return response.data;
};

export const updateUser = async (id, userData) => {
  const response = await api.put(`/users/${id}`, userData);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};

export const updateUserRole = async (id, role) => {
  const response = await api.patch(`/users/${id}/role`, { role });
  return response.data;
};

export const updateUserPermissions = async (id, permissions) => {
  const response = await api.patch(`/users/${id}/permissions`, { permissions });
  return response.data;
};

export const deactivateUser = async (id) => {
  const response = await api.patch(`/users/${id}/deactivate`);
  return response.data;
};

export const activateUser = async (id) => {
  const response = await api.patch(`/users/${id}/activate`);
  return response.data;
}; 
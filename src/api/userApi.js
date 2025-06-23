import { apiService, endpoints } from './apiConfig';

export const getUsers = async (params) => {
  const response = await apiService.get(endpoints.users.base, { params });
  return response.data;
};

export const getUserById = async (id) => {
  const response = await apiService.get(endpoints.users.byId(id));
  return response.data;
};

export const createUser = async (userData) => {
  const response = await apiService.post(endpoints.users.base, userData);
  return response.data;
};

export const updateUser = async (id, userData) => {
  const response = await apiService.put(endpoints.users.byId(id), userData);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await apiService.delete(endpoints.users.byId(id));
  return response.data;
};

export const searchUsers = async (query) => {
  const response = await apiService.get(endpoints.users.base, { params: { query } });
  return response.data;
};

export const getUserRoles = async () => {
  const response = await apiService.get(endpoints.users.roles);
  return response.data;
};

export const getProfile = async () => {
  const response = await apiService.get(endpoints.users.profile);
  return response.data;
};

export const updateProfile = async (data) => {
  const response = await apiService.put(endpoints.users.profile, data);
  return response.data;
};

export const assignRole = async (userId, roleId) => {
  const response = await apiService.post(`${endpoints.users.byId(userId)}/roles`, { roleId });
  return response.data;
};

export const removeRole = async (userId, roleId) => {
  const response = await apiService.delete(`${endpoints.users.byId(userId)}/roles/${roleId}`);
  return response.data;
};
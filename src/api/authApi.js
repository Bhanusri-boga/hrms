import { apiService, endpoints } from './apiConfig';

export const authApi = {
  login: async (credentials) => {
    const response = await apiService.post(endpoints.auth.login, credentials);
    return response.data;
  },
  
  logout: async () => {
    const response = await apiService.post(endpoints.auth.logout);
    return response.data;
  },
  
  getCurrentUser: async () => {
    const response = await apiService.get(endpoints.users.profile);
    return response.data;
  },
  
  refreshToken: async (refreshToken) => {
    const response = await apiService.post(endpoints.auth.refreshToken, { refreshToken });
    return response.data;
  },
  
  register: async (userData) => {
    const response = await apiService.post(endpoints.auth.register, userData);
    return response.data;
  },
  
  forgotPassword: async (email) => {
    const response = await apiService.post(endpoints.auth.forgotPassword, { email });
    return response.data;
  },
  
  resetPassword: async (token, newPassword) => {
    const response = await apiService.post(endpoints.auth.resetPassword, { token, newPassword });
    return response.data;
  },
  
  changePassword: async (data) => {
    const response = await apiService.post('/auth/change-password', data);
    return response.data;
  }
};
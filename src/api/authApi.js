import { apiService, endpoints } from './apiService';

export const authApi = {
  login: async (credentials) => {
    const response = await apiService.post(endpoints.auth.login, credentials);
    return response.data;
  },
  
  logout: async (refreshToken) => {
    const response = await apiService.post(`${endpoints.auth.logout}?refreshToken=${encodeURIComponent(refreshToken)}`);
    return response.data;
  },
  
  getCurrentUser: async () => {
    const response = await apiService.get('/auth/me');
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
  
  resetPassword: async ({ token, newPassword, confirmPassword }) => {
    const response = await apiService.post('/auth/reset-password', {
      token,
      newPassword,
      confirmPassword,
    });
    return response.data;
  },
  
  changePassword: async (data) => {
    const response = await apiService.post('/auth/change-password', data);
    return response.data;
  },
  
  updateProfile: async (profileData) => {
    const response = await apiService.put('/auth/me', profileData);
    return response.data;
  },
  
  resendVerificationEmail: async (email) => {
    const response = await apiService.post(
      '/auth/resend-verification-email?email=' + encodeURIComponent(email)
    );
    return response.data;
  },
  
  verifyEmail: async (token) => {
    const response = await apiService.get(`/auth/verify-email?token=${encodeURIComponent(token)}`);
    return response.data;
  }
};
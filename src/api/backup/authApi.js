import axiosInstance from './axios'

export const authApi = {
  login: async (credentials) => {
    try {
      console.log('Login credentials:', credentials);
      const response = await axiosInstance.post('/auth/login', credentials)
      return response.data
    } catch (error) {
      console.error('Login API error:', error)
      throw error
    }
  },

  logout: async () => {
    try {
      const response = await axiosInstance.post('/auth/logout')
      return response.data
    } catch (error) {
      console.error('Logout API error:', error)
      throw error
    }
  },

  getCurrentUser: async () => {
    try {
      // For testing with json-server, we'll simulate getting the current user
      const response = await axiosInstance.get('/auth/me')
      return response.data
    } catch (error) {
      console.error('Get current user API error:', error)
      throw error
    }
  },

  register: async (userData) => {
    try {
      const response = await axiosInstance.post('/auth/register', userData)
      return response.data
    } catch (error) {
      console.error('Register API error:', error)
      throw error
    }
  },

  forgotPassword: async (email) => {
    try {
      const response = await axiosInstance.post('/auth/forgot-password', { email })
      return response.data
    } catch (error) {
      console.error('Forgot password API error:', error)
      throw error
    }
  },

  resetPassword: async (token, password) => {
    try {
      const response = await axiosInstance.post('/auth/reset-password', {
        token,
        password
      })
      return response.data
    } catch (error) {
      console.error('Reset password API error:', error)
      throw error
    }
  },

  changePassword: async (oldPassword, newPassword) => {
    try {
      const response = await axiosInstance.post('/auth/change-password', {
        oldPassword,
        newPassword
      })
      return response.data
    } catch (error) {
      console.error('Change password API error:', error)
      throw error
    }
  },

  refreshToken: async () => {
    try {
      const response = await axiosInstance.post('/auth/refresh')
      return response.data
    } catch (error) {
      console.error('Refresh token API error:', error)
      throw error
    }
  }
} 
import axiosInstance from './axios'

export const usersApi = {
  getAllUsers: async (params) => {
    const response = await axiosInstance.get('/users', { params })
    return response.data
  },

  getUserById: async (id) => {
    const response = await axiosInstance.get(`/users/${id}`)
    return response.data
  },

  createUser: async (data) => {
    const response = await axiosInstance.post('/users', data)
    return response.data
  },

  updateUser: async (id, data) => {
    const response = await axiosInstance.put(`/users/${id}`, data)
    return response.data
  },

  deleteUser: async (id) => {
    const response = await axiosInstance.delete(`/users/${id}`)
    return response.data
  },

  getUserProfile: async (id) => {
    const response = await axiosInstance.get(`/users/${id}/profile`)
    return response.data
  },

  updateUserProfile: async (id, data) => {
    const response = await axiosInstance.put(`/users/${id}/profile`, data)
    return response.data
  },

  updateUserPassword: async (id, data) => {
    const response = await axiosInstance.put(`/users/${id}/password`, data)
    return response.data
  },

  resetUserPassword: async (id) => {
    const response = await axiosInstance.post(`/users/${id}/reset-password`)
    return response.data
  },

  getUserRoles: async (id) => {
    const response = await axiosInstance.get(`/users/${id}/roles`)
    return response.data
  },

  assignUserRoles: async (id, data) => {
    const response = await axiosInstance.post(`/users/${id}/roles`, data)
    return response.data
  },

  removeUserRole: async (id, roleId) => {
    const response = await axiosInstance.delete(`/users/${id}/roles/${roleId}`)
    return response.data
  },

  getUserPermissions: async (id) => {
    const response = await axiosInstance.get(`/users/${id}/permissions`)
    return response.data
  },

  getUserActivity: async (id, params) => {
    const response = await axiosInstance.get(`/users/${id}/activity`, { params })
    return response.data
  },

  getUserSessions: async (id, params) => {
    const response = await axiosInstance.get(`/users/${id}/sessions`, { params })
    return response.data
  },

  terminateUserSession: async (id, sessionId) => {
    const response = await axiosInstance.delete(`/users/${id}/sessions/${sessionId}`)
    return response.data
  },

  terminateAllUserSessions: async (id) => {
    const response = await axiosInstance.delete(`/users/${id}/sessions`)
    return response.data
  },

  getUserPreferences: async (id) => {
    const response = await axiosInstance.get(`/users/${id}/preferences`)
    return response.data
  },

  updateUserPreferences: async (id, data) => {
    const response = await axiosInstance.put(`/users/${id}/preferences`, data)
    return response.data
  },

  getUserNotifications: async (id, params) => {
    const response = await axiosInstance.get(`/users/${id}/notifications`, { params })
    return response.data
  },

  markUserNotificationsAsRead: async (id) => {
    const response = await axiosInstance.put(`/users/${id}/notifications/read`)
    return response.data
  },

  getUserStats: async (id, params) => {
    const response = await axiosInstance.get(`/users/${id}/stats`, { params })
    return response.data
  }
} 
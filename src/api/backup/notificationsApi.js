import axiosInstance from './axios'

export const notificationsApi = {
  getAllNotifications: async (params) => {
    const response = await axiosInstance.get('/notifications', { params })
    return response.data
  },

  getNotificationById: async (id) => {
    const response = await axiosInstance.get(`/notifications/${id}`)
    return response.data
  },

  createNotification: async (data) => {
    const response = await axiosInstance.post('/notifications', data)
    return response.data
  },

  updateNotification: async (id, data) => {
    const response = await axiosInstance.put(`/notifications/${id}`, data)
    return response.data
  },

  deleteNotification: async (id) => {
    const response = await axiosInstance.delete(`/notifications/${id}`)
    return response.data
  },

  markAsRead: async (id) => {
    const response = await axiosInstance.put(`/notifications/${id}/read`)
    return response.data
  },

  markAllAsRead: async () => {
    const response = await axiosInstance.put('/notifications/read-all')
    return response.data
  },

  getUnreadCount: async () => {
    const response = await axiosInstance.get('/notifications/unread-count')
    return response.data
  },

  getNotificationsByType: async (type, params) => {
    const response = await axiosInstance.get(`/notifications/type/${type}`, { params })
    return response.data
  },

  getNotificationsByUser: async (userId, params) => {
    const response = await axiosInstance.get(`/notifications/user/${userId}`, { params })
    return response.data
  },

  getNotificationPreferences: async () => {
    const response = await axiosInstance.get('/notifications/preferences')
    return response.data
  },

  updateNotificationPreferences: async (data) => {
    const response = await axiosInstance.put('/notifications/preferences', data)
    return response.data
  },

  getNotificationTemplates: async () => {
    const response = await axiosInstance.get('/notifications/templates')
    return response.data
  },

  createNotificationTemplate: async (data) => {
    const response = await axiosInstance.post('/notifications/templates', data)
    return response.data
  },

  updateNotificationTemplate: async (id, data) => {
    const response = await axiosInstance.put(`/notifications/templates/${id}`, data)
    return response.data
  },

  deleteNotificationTemplate: async (id) => {
    const response = await axiosInstance.delete(`/notifications/templates/${id}`)
    return response.data
  },

  sendNotification: async (data) => {
    const response = await axiosInstance.post('/notifications/send', data)
    return response.data
  },

  getNotificationStats: async (params) => {
    const response = await axiosInstance.get('/notifications/stats', { params })
    return response.data
  }
} 
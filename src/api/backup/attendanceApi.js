import axiosInstance from './axios'

export const attendanceApi = {
  getAll: async (params) => {
    const response = await axiosInstance.get('/attendance', { params })
    return response.data
  },

  getById: async (id) => {
    const response = await axiosInstance.get(`/attendance/${id}`)
    return response.data
  },

  create: async (data) => {
    const response = await axiosInstance.post('/attendance', data)
    return response.data
  },

  update: async (id, data) => {
    const response = await axiosInstance.put(`/attendance/${id}`, data)
    return response.data
  },

  delete: async (id) => {
    const response = await axiosInstance.delete(`/attendance/${id}`)
    return response.data
  },

  getStats: async (params) => {
    const response = await axiosInstance.get('/attendance/stats', { params })
    return response.data
  },

  getMonthlyReport: async (params) => {
    const response = await axiosInstance.get('/attendance/monthly-report', { params })
    return response.data
  },

  getDailyReport: async (params) => {
    const response = await axiosInstance.get('/attendance/daily-report', { params })
    return response.data
  },

  markAttendance: async (data) => {
    const response = await axiosInstance.post('/attendance/mark', data)
    return response.data
  }
} 
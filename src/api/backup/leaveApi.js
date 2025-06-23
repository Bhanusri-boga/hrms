import axiosInstance from './axios'

export const leaveApi = {
  getAll: async (params) => {
    const response = await axiosInstance.get('/leave', { params })
    return response.data
  },

  getById: async (id) => {
    const response = await axiosInstance.get(`/leave/${id}`)
    return response.data
  },

  create: async (data) => {
    const response = await axiosInstance.post('/leave', data)
    return response.data
  },

  update: async (id, data) => {
    const response = await axiosInstance.put(`/leave/${id}`, data)
    return response.data
  },

  delete: async (id) => {
    const response = await axiosInstance.delete(`/leave/${id}`)
    return response.data
  },

  getByEmployee: async (employeeId, params) => {
    const response = await axiosInstance.get(`/leave/employee/${employeeId}`, { params })
    return response.data
  },

  getByStatus: async (status, params) => {
    const response = await axiosInstance.get(`/leave/status/${status}`, { params })
    return response.data
  },

  getStats: async (params) => {
    const response = await axiosInstance.get('/leave/stats', { params })
    return response.data
  },

  approve: async (id, data) => {
    const response = await axiosInstance.post(`/leave/${id}/approve`, data)
    return response.data
  },

  reject: async (id, data) => {
    const response = await axiosInstance.post(`/leave/${id}/reject`, data)
    return response.data
  },

  getLeaveBalance: async (employeeId) => {
    const response = await axiosInstance.get(`/leave/balance/${employeeId}`)
    return response.data
  },

  getLeaveTypes: async () => {
    const response = await axiosInstance.get('/leave/types')
    return response.data
  }
} 
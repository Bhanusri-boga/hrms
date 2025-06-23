import axiosInstance from './axios'

export const timeSheetApi = {
  getAll: async (params) => {
    const response = await axiosInstance.get('/timesheets', { params })
    return response.data
  },

  getById: async (id) => {
    const response = await axiosInstance.get(`/timesheets/${id}`)
    return response.data
  },

  create: async (data) => {
    const response = await axiosInstance.post('/timesheets', data)
    return response.data
  },

  update: async (id, data) => {
    const response = await axiosInstance.put(`/timesheets/${id}`, data)
    return response.data
  },

  delete: async (id) => {
    const response = await axiosInstance.delete(`/timesheets/${id}`)
    return response.data
  },

  getByEmployee: async (employeeId, params) => {
    const response = await axiosInstance.get(`/timesheets/employee/${employeeId}`, { params })
    return response.data
  },

  getByDate: async (date, params) => {
    const response = await axiosInstance.get(`/timesheets/date/${date}`, { params })
    return response.data
  },

  getStats: async (params) => {
    const response = await axiosInstance.get('/timesheets/stats', { params })
    return response.data
  },

  approve: async (id, data) => {
    const response = await axiosInstance.post(`/timesheets/${id}/approve`, data)
    return response.data
  },

  reject: async (id, data) => {
    const response = await axiosInstance.post(`/timesheets/${id}/reject`, data)
    return response.data
  }
} 
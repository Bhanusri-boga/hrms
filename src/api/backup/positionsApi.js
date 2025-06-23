import axiosInstance from './axios'

export const positionsApi = {
  getAllPositions: async (params) => {
    const response = await axiosInstance.get('/positions', { params })
    return response.data
  },

  getPositionById: async (id) => {
    const response = await axiosInstance.get(`/positions/${id}`)
    return response.data
  },

  createPosition: async (data) => {
    const response = await axiosInstance.post('/positions', data)
    return response.data
  },

  updatePosition: async (id, data) => {
    const response = await axiosInstance.put(`/positions/${id}`, data)
    return response.data
  },

  deletePosition: async (id) => {
    const response = await axiosInstance.delete(`/positions/${id}`)
    return response.data
  },

  getPositionEmployees: async (id, params) => {
    const response = await axiosInstance.get(`/positions/${id}/employees`, { params })
    return response.data
  },

  getPositionRequirements: async (id) => {
    const response = await axiosInstance.get(`/positions/${id}/requirements`)
    return response.data
  },

  updatePositionRequirements: async (id, data) => {
    const response = await axiosInstance.put(`/positions/${id}/requirements`, data)
    return response.data
  },

  getPositionSalary: async (id) => {
    const response = await axiosInstance.get(`/positions/${id}/salary`)
    return response.data
  },

  updatePositionSalary: async (id, data) => {
    const response = await axiosInstance.put(`/positions/${id}/salary`, data)
    return response.data
  },

  getPositionSkills: async (id) => {
    const response = await axiosInstance.get(`/positions/${id}/skills`)
    return response.data
  },

  updatePositionSkills: async (id, data) => {
    const response = await axiosInstance.put(`/positions/${id}/skills`, data)
    return response.data
  },

  getPositionResponsibilities: async (id) => {
    const response = await axiosInstance.get(`/positions/${id}/responsibilities`)
    return response.data
  },

  updatePositionResponsibilities: async (id, data) => {
    const response = await axiosInstance.put(`/positions/${id}/responsibilities`, data)
    return response.data
  },

  getPositionStats: async (id, params) => {
    const response = await axiosInstance.get(`/positions/${id}/stats`, { params })
    return response.data
  },

  getPositionHistory: async (id, params) => {
    const response = await axiosInstance.get(`/positions/${id}/history`, { params })
    return response.data
  },

  getPositionCategories: async () => {
    const response = await axiosInstance.get('/positions/categories')
    return response.data
  },

  createPositionCategory: async (data) => {
    const response = await axiosInstance.post('/positions/categories', data)
    return response.data
  },

  updatePositionCategory: async (id, data) => {
    const response = await axiosInstance.put(`/positions/categories/${id}`, data)
    return response.data
  },

  deletePositionCategory: async (id) => {
    const response = await axiosInstance.delete(`/positions/categories/${id}`)
    return response.data
  }
} 
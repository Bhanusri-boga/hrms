import axiosInstance from './axios'

export const departmentsApi = {
  getAllDepartments: async (params) => {
    const response = await axiosInstance.get('/departments', { params })
    return response.data
  },

  getDepartmentById: async (id) => {
    const response = await axiosInstance.get(`/departments/${id}`)
    return response.data
  },

  createDepartment: async (data) => {
    const response = await axiosInstance.post('/departments', data)
    return response.data
  },

  updateDepartment: async (id, data) => {
    const response = await axiosInstance.put(`/departments/${id}`, data)
    return response.data
  },

  deleteDepartment: async (id) => {
    const response = await axiosInstance.delete(`/departments/${id}`)
    return response.data
  },

  getDepartmentEmployees: async (id, params) => {
    const response = await axiosInstance.get(`/departments/${id}/employees`, { params })
    return response.data
  },

  getDepartmentManagers: async (id) => {
    const response = await axiosInstance.get(`/departments/${id}/managers`)
    return response.data
  },

  assignManager: async (id, data) => {
    const response = await axiosInstance.post(`/departments/${id}/managers`, data)
    return response.data
  },

  removeManager: async (id, managerId) => {
    const response = await axiosInstance.delete(`/departments/${id}/managers/${managerId}`)
    return response.data
  },

  getDepartmentBudget: async (id, params) => {
    const response = await axiosInstance.get(`/departments/${id}/budget`, { params })
    return response.data
  },

  updateDepartmentBudget: async (id, data) => {
    const response = await axiosInstance.put(`/departments/${id}/budget`, data)
    return response.data
  },

  getDepartmentStats: async (id, params) => {
    const response = await axiosInstance.get(`/departments/${id}/stats`, { params })
    return response.data
  },

  getDepartmentHierarchy: async () => {
    const response = await axiosInstance.get('/departments/hierarchy')
    return response.data
  },

  getDepartmentPositions: async (id) => {
    const response = await axiosInstance.get(`/departments/${id}/positions`)
    return response.data
  },

  createDepartmentPosition: async (id, data) => {
    const response = await axiosInstance.post(`/departments/${id}/positions`, data)
    return response.data
  },

  updateDepartmentPosition: async (id, positionId, data) => {
    const response = await axiosInstance.put(`/departments/${id}/positions/${positionId}`, data)
    return response.data
  },

  deleteDepartmentPosition: async (id, positionId) => {
    const response = await axiosInstance.delete(`/departments/${id}/positions/${positionId}`)
    return response.data
  }
} 
import axiosInstance from './axios'

export const employeeApi = {
  getAll: async (params) => {
    const response = await axiosInstance.get('/employees', { params })
    return response.data
  },

  getById: async (id) => {
    const response = await axiosInstance.get(`/employees/${id}`)
    return response.data
  },

  create: async (data) => {
    const response = await axiosInstance.post('/employees', data)
    return response.data
  },

  update: async (id, data) => {
    const response = await axiosInstance.put(`/employees/${id}`, data)
    return response.data
  },

  delete: async (id) => {
    const response = await axiosInstance.delete(`/employees/${id}`)
    return response.data
  },

  getDepartments: async () => {
    const response = await axiosInstance.get('/employees/departments')
    return response.data
  },

  getPositions: async () => {
    const response = await axiosInstance.get('/employees/positions')
    return response.data
  },

  getStats: async () => {
    const response = await axiosInstance.get('/employees/stats')
    return response.data
  },

  uploadDocument: async (id, formData) => {
    const response = await axiosInstance.post(`/employees/${id}/documents`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  getDocuments: async (id) => {
    const response = await axiosInstance.get(`/employees/${id}/documents`)
    return response.data
  },

  getAttendance: async (id, params) => {
    const response = await axiosInstance.get(`/employees/${id}/attendance`, { params })
    return response.data
  },

  getTimeSheets: async (id, params) => {
    const response = await axiosInstance.get(`/employees/${id}/timesheets`, { params })
    return response.data
  },

  getSalary: async (id, params) => {
    const response = await axiosInstance.get(`/employees/${id}/salary`, { params })
    return response.data
  },

  getTravel: async (id, params) => {
    const response = await axiosInstance.get(`/employees/${id}/travel`, { params })
    return response.data
  }
} 
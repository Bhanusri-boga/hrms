import axiosInstance from './axios'

export const salaryApi = {
  getAll: async (params) => {
    const response = await axiosInstance.get('/salary', { params })
    return response.data
  },

  getById: async (id) => {
    const response = await axiosInstance.get(`/salary/${id}`)
    return response.data
  },

  create: async (data) => {
    const response = await axiosInstance.post('/salary', data)
    return response.data
  },

  update: async (id, data) => {
    const response = await axiosInstance.put(`/salary/${id}`, data)
    return response.data
  },

  delete: async (id) => {
    const response = await axiosInstance.delete(`/salary/${id}`)
    return response.data
  },

  getByEmployee: async (employeeId, params) => {
    const response = await axiosInstance.get(`/salary/employee/${employeeId}`, { params })
    return response.data
  },

  getByMonth: async (month, params) => {
    const response = await axiosInstance.get(`/salary/month/${month}`, { params })
    return response.data
  },

  getStats: async (params) => {
    const response = await axiosInstance.get('/salary/stats', { params })
    return response.data
  },

  generatePayroll: async (data) => {
    const response = await axiosInstance.post('/salary/generate-payroll', data)
    return response.data
  },

  approvePayroll: async (id, data) => {
    const response = await axiosInstance.post(`/salary/${id}/approve`, data)
    return response.data
  },

  getPayrollReport: async (params) => {
    const response = await axiosInstance.get('/salary/payroll-report', { params })
    return response.data
  }
} 
import axiosInstance from './axios'

export const payrollApi = {
  getAllPayrolls: async (params) => {
    const response = await axiosInstance.get('/payroll', { params })
    return response.data
  },

  getPayrollById: async (id) => {
    const response = await axiosInstance.get(`/payroll/${id}`)
    return response.data
  },

  createPayroll: async (data) => {
    const response = await axiosInstance.post('/payroll', data)
    return response.data
  },

  updatePayroll: async (id, data) => {
    const response = await axiosInstance.put(`/payroll/${id}`, data)
    return response.data
  },

  deletePayroll: async (id) => {
    const response = await axiosInstance.delete(`/payroll/${id}`)
    return response.data
  },

  getPayrollByEmployee: async (employeeId, params) => {
    const response = await axiosInstance.get(`/payroll/employee/${employeeId}`, { params })
    return response.data
  },

  getPayrollByPeriod: async (period, params) => {
    const response = await axiosInstance.get(`/payroll/period/${period}`, { params })
    return response.data
  },

  generatePayroll: async (data) => {
    const response = await axiosInstance.post('/payroll/generate', data)
    return response.data
  },

  approvePayroll: async (id, data) => {
    const response = await axiosInstance.post(`/payroll/${id}/approve`, data)
    return response.data
  },

  rejectPayroll: async (id, data) => {
    const response = await axiosInstance.post(`/payroll/${id}/reject`, data)
    return response.data
  },

  getPayslip: async (id) => {
    const response = await axiosInstance.get(`/payroll/${id}/payslip`, {
      responseType: 'blob'
    })
    return response.data
  },

  getDeductions: async (params) => {
    const response = await axiosInstance.get('/payroll/deductions', { params })
    return response.data
  },

  getAllowances: async (params) => {
    const response = await axiosInstance.get('/payroll/allowances', { params })
    return response.data
  },

  getTaxRates: async () => {
    const response = await axiosInstance.get('/payroll/tax-rates')
    return response.data
  },

  getStats: async (params) => {
    const response = await axiosInstance.get('/payroll/stats', { params })
    return response.data
  },

  getReports: async (params) => {
    const response = await axiosInstance.get('/payroll/reports', { params })
    return response.data
  }
} 
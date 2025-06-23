import axiosInstance from './axios'

export const reportsApi = {
  getEmployeeReports: async (params) => {
    const response = await axiosInstance.get('/reports/employees', { params })
    return response.data
  },

  getAttendanceReports: async (params) => {
    const response = await axiosInstance.get('/reports/attendance', { params })
    return response.data
  },

  getLeaveReports: async (params) => {
    const response = await axiosInstance.get('/reports/leaves', { params })
    return response.data
  },

  getPayrollReports: async (params) => {
    const response = await axiosInstance.get('/reports/payroll', { params })
    return response.data
  },

  getPerformanceReports: async (params) => {
    const response = await axiosInstance.get('/reports/performance', { params })
    return response.data
  },

  getTrainingReports: async (params) => {
    const response = await axiosInstance.get('/reports/training', { params })
    return response.data
  },

  getRecruitmentReports: async (params) => {
    const response = await axiosInstance.get('/reports/recruitment', { params })
    return response.data
  },

  getBenefitsReports: async (params) => {
    const response = await axiosInstance.get('/reports/benefits', { params })
    return response.data
  },

  getCustomReports: async (params) => {
    const response = await axiosInstance.get('/reports/custom', { params })
    return response.data
  },

  createCustomReport: async (data) => {
    const response = await axiosInstance.post('/reports/custom', data)
    return response.data
  },

  updateCustomReport: async (id, data) => {
    const response = await axiosInstance.put(`/reports/custom/${id}`, data)
    return response.data
  },

  deleteCustomReport: async (id) => {
    const response = await axiosInstance.delete(`/reports/custom/${id}`)
    return response.data
  },

  getReportTemplates: async () => {
    const response = await axiosInstance.get('/reports/templates')
    return response.data
  },

  createReportTemplate: async (data) => {
    const response = await axiosInstance.post('/reports/templates', data)
    return response.data
  },

  updateReportTemplate: async (id, data) => {
    const response = await axiosInstance.put(`/reports/templates/${id}`, data)
    return response.data
  },

  deleteReportTemplate: async (id) => {
    const response = await axiosInstance.delete(`/reports/templates/${id}`)
    return response.data
  },

  exportReport: async (id, format) => {
    const response = await axiosInstance.get(`/reports/${id}/export`, {
      params: { format },
      responseType: 'blob'
    })
    return response.data
  },

  scheduleReport: async (id, data) => {
    const response = await axiosInstance.post(`/reports/${id}/schedule`, data)
    return response.data
  },

  getScheduledReports: async (params) => {
    const response = await axiosInstance.get('/reports/scheduled', { params })
    return response.data
  },

  updateScheduledReport: async (id, data) => {
    const response = await axiosInstance.put(`/reports/scheduled/${id}`, data)
    return response.data
  },

  deleteScheduledReport: async (id) => {
    const response = await axiosInstance.delete(`/reports/scheduled/${id}`)
    return response.data
  }
} 
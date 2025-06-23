import axiosInstance from './axios'

export const recruitmentApi = {
  getAllJobs: async (params) => {
    const response = await axiosInstance.get('/recruitment/jobs', { params })
    return response.data
  },

  getJobById: async (id) => {
    const response = await axiosInstance.get(`/recruitment/jobs/${id}`)
    return response.data
  },

  createJob: async (data) => {
    const response = await axiosInstance.post('/recruitment/jobs', data)
    return response.data
  },

  updateJob: async (id, data) => {
    const response = await axiosInstance.put(`/recruitment/jobs/${id}`, data)
    return response.data
  },

  deleteJob: async (id) => {
    const response = await axiosInstance.delete(`/recruitment/jobs/${id}`)
    return response.data
  },

  getAllApplications: async (params) => {
    const response = await axiosInstance.get('/recruitment/applications', { params })
    return response.data
  },

  getApplicationById: async (id) => {
    const response = await axiosInstance.get(`/recruitment/applications/${id}`)
    return response.data
  },

  createApplication: async (data) => {
    const response = await axiosInstance.post('/recruitment/applications', data)
    return response.data
  },

  updateApplication: async (id, data) => {
    const response = await axiosInstance.put(`/recruitment/applications/${id}`, data)
    return response.data
  },

  deleteApplication: async (id) => {
    const response = await axiosInstance.delete(`/recruitment/applications/${id}`)
    return response.data
  },

  getApplicationsByJob: async (jobId, params) => {
    const response = await axiosInstance.get(`/recruitment/jobs/${jobId}/applications`, { params })
    return response.data
  },

  getApplicationsByStatus: async (status, params) => {
    const response = await axiosInstance.get(`/recruitment/applications/status/${status}`, { params })
    return response.data
  },

  updateApplicationStatus: async (id, status, data) => {
    const response = await axiosInstance.put(`/recruitment/applications/${id}/status`, { status, ...data })
    return response.data
  },

  scheduleInterview: async (id, data) => {
    const response = await axiosInstance.post(`/recruitment/applications/${id}/interview`, data)
    return response.data
  },

  getStats: async (params) => {
    const response = await axiosInstance.get('/recruitment/stats', { params })
    return response.data
  }
} 
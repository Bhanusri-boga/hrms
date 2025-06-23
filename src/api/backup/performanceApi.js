import axiosInstance from './axios'

export const performanceApi = {
  getAllReviews: async (params) => {
    const response = await axiosInstance.get('/performance/reviews', { params })
    return response.data
  },

  getReviewById: async (id) => {
    const response = await axiosInstance.get(`/performance/reviews/${id}`)
    return response.data
  },

  createReview: async (data) => {
    const response = await axiosInstance.post('/performance/reviews', data)
    return response.data
  },

  updateReview: async (id, data) => {
    const response = await axiosInstance.put(`/performance/reviews/${id}`, data)
    return response.data
  },

  deleteReview: async (id) => {
    const response = await axiosInstance.delete(`/performance/reviews/${id}`)
    return response.data
  },

  getReviewsByEmployee: async (employeeId, params) => {
    const response = await axiosInstance.get(`/performance/employee/${employeeId}/reviews`, { params })
    return response.data
  },

  getReviewsByReviewer: async (reviewerId, params) => {
    const response = await axiosInstance.get(`/performance/reviewer/${reviewerId}/reviews`, { params })
    return response.data
  },

  getReviewsByPeriod: async (period, params) => {
    const response = await axiosInstance.get(`/performance/period/${period}/reviews`, { params })
    return response.data
  },

  submitReview: async (id, data) => {
    const response = await axiosInstance.post(`/performance/reviews/${id}/submit`, data)
    return response.data
  },

  approveReview: async (id, data) => {
    const response = await axiosInstance.post(`/performance/reviews/${id}/approve`, data)
    return response.data
  },

  rejectReview: async (id, data) => {
    const response = await axiosInstance.post(`/performance/reviews/${id}/reject`, data)
    return response.data
  },

  getGoals: async (params) => {
    const response = await axiosInstance.get('/performance/goals', { params })
    return response.data
  },

  createGoal: async (data) => {
    const response = await axiosInstance.post('/performance/goals', data)
    return response.data
  },

  updateGoal: async (id, data) => {
    const response = await axiosInstance.put(`/performance/goals/${id}`, data)
    return response.data
  },

  deleteGoal: async (id) => {
    const response = await axiosInstance.delete(`/performance/goals/${id}`)
    return response.data
  },

  getStats: async (params) => {
    const response = await axiosInstance.get('/performance/stats', { params })
    return response.data
  },

  getTemplates: async () => {
    const response = await axiosInstance.get('/performance/templates')
    return response.data
  }
} 
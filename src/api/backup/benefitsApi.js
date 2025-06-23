import axiosInstance from './axios'

export const benefitsApi = {
  getAllBenefits: async (params) => {
    const response = await axiosInstance.get('/benefits', { params })
    return response.data
  },

  getBenefitById: async (id) => {
    const response = await axiosInstance.get(`/benefits/${id}`)
    return response.data
  },

  createBenefit: async (data) => {
    const response = await axiosInstance.post('/benefits', data)
    return response.data
  },

  updateBenefit: async (id, data) => {
    const response = await axiosInstance.put(`/benefits/${id}`, data)
    return response.data
  },

  deleteBenefit: async (id) => {
    const response = await axiosInstance.delete(`/benefits/${id}`)
    return response.data
  },

  getEmployeeBenefits: async (employeeId, params) => {
    const response = await axiosInstance.get(`/benefits/employee/${employeeId}`, { params })
    return response.data
  },

  assignBenefit: async (data) => {
    const response = await axiosInstance.post('/benefits/assign', data)
    return response.data
  },

  removeBenefit: async (id) => {
    const response = await axiosInstance.delete(`/benefits/assign/${id}`)
    return response.data
  },

  getBenefitTypes: async () => {
    const response = await axiosInstance.get('/benefits/types')
    return response.data
  },

  getBenefitPlans: async (params) => {
    const response = await axiosInstance.get('/benefits/plans', { params })
    return response.data
  },

  createBenefitPlan: async (data) => {
    const response = await axiosInstance.post('/benefits/plans', data)
    return response.data
  },

  updateBenefitPlan: async (id, data) => {
    const response = await axiosInstance.put(`/benefits/plans/${id}`, data)
    return response.data
  },

  deleteBenefitPlan: async (id) => {
    const response = await axiosInstance.delete(`/benefits/plans/${id}`)
    return response.data
  },

  getBenefitClaims: async (params) => {
    const response = await axiosInstance.get('/benefits/claims', { params })
    return response.data
  },

  submitClaim: async (data) => {
    const response = await axiosInstance.post('/benefits/claims', data)
    return response.data
  },

  updateClaim: async (id, data) => {
    const response = await axiosInstance.put(`/benefits/claims/${id}`, data)
    return response.data
  },

  approveClaim: async (id, data) => {
    const response = await axiosInstance.post(`/benefits/claims/${id}/approve`, data)
    return response.data
  },

  rejectClaim: async (id, data) => {
    const response = await axiosInstance.post(`/benefits/claims/${id}/reject`, data)
    return response.data
  },

  getStats: async (params) => {
    const response = await axiosInstance.get('/benefits/stats', { params })
    return response.data
  }
} 
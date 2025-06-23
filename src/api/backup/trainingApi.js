import axiosInstance from './axios'

export const trainingApi = {
  getAllCourses: async (params) => {
    const response = await axiosInstance.get('/training/courses', { params })
    return response.data
  },

  getCourseById: async (id) => {
    const response = await axiosInstance.get(`/training/courses/${id}`)
    return response.data
  },

  createCourse: async (data) => {
    const response = await axiosInstance.post('/training/courses', data)
    return response.data
  },

  updateCourse: async (id, data) => {
    const response = await axiosInstance.put(`/training/courses/${id}`, data)
    return response.data
  },

  deleteCourse: async (id) => {
    const response = await axiosInstance.delete(`/training/courses/${id}`)
    return response.data
  },

  getAllEnrollments: async (params) => {
    const response = await axiosInstance.get('/training/enrollments', { params })
    return response.data
  },

  getEnrollmentById: async (id) => {
    const response = await axiosInstance.get(`/training/enrollments/${id}`)
    return response.data
  },

  createEnrollment: async (data) => {
    const response = await axiosInstance.post('/training/enrollments', data)
    return response.data
  },

  updateEnrollment: async (id, data) => {
    const response = await axiosInstance.put(`/training/enrollments/${id}`, data)
    return response.data
  },

  deleteEnrollment: async (id) => {
    const response = await axiosInstance.delete(`/training/enrollments/${id}`)
    return response.data
  },

  getEnrollmentsByEmployee: async (employeeId, params) => {
    const response = await axiosInstance.get(`/training/employee/${employeeId}/enrollments`, { params })
    return response.data
  },

  getEnrollmentsByCourse: async (courseId, params) => {
    const response = await axiosInstance.get(`/training/courses/${courseId}/enrollments`, { params })
    return response.data
  },

  updateProgress: async (id, data) => {
    const response = await axiosInstance.put(`/training/enrollments/${id}/progress`, data)
    return response.data
  },

  completeCourse: async (id, data) => {
    const response = await axiosInstance.post(`/training/enrollments/${id}/complete`, data)
    return response.data
  },

  getStats: async (params) => {
    const response = await axiosInstance.get('/training/stats', { params })
    return response.data
  },

  getCategories: async () => {
    const response = await axiosInstance.get('/training/categories')
    return response.data
  }
} 
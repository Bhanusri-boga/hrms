import axiosInstance from './axios'

export const documentsApi = {
  getAllDocuments: async (params) => {
    const response = await axiosInstance.get('/documents', { params })
    return response.data
  },

  getDocumentById: async (id) => {
    const response = await axiosInstance.get(`/documents/${id}`)
    return response.data
  },

  createDocument: async (data) => {
    const response = await axiosInstance.post('/documents', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  },

  updateDocument: async (id, data) => {
    const response = await axiosInstance.put(`/documents/${id}`, data)
    return response.data
  },

  deleteDocument: async (id) => {
    const response = await axiosInstance.delete(`/documents/${id}`)
    return response.data
  },

  downloadDocument: async (id) => {
    const response = await axiosInstance.get(`/documents/${id}/download`, {
      responseType: 'blob'
    })
    return response.data
  },

  getDocumentVersions: async (id) => {
    const response = await axiosInstance.get(`/documents/${id}/versions`)
    return response.data
  },

  uploadNewVersion: async (id, data) => {
    const response = await axiosInstance.post(`/documents/${id}/versions`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  },

  getDocumentCategories: async () => {
    const response = await axiosInstance.get('/documents/categories')
    return response.data
  },

  createDocumentCategory: async (data) => {
    const response = await axiosInstance.post('/documents/categories', data)
    return response.data
  },

  updateDocumentCategory: async (id, data) => {
    const response = await axiosInstance.put(`/documents/categories/${id}`, data)
    return response.data
  },

  deleteDocumentCategory: async (id) => {
    const response = await axiosInstance.delete(`/documents/categories/${id}`)
    return response.data
  },

  getDocumentPermissions: async (id) => {
    const response = await axiosInstance.get(`/documents/${id}/permissions`)
    return response.data
  },

  updateDocumentPermissions: async (id, data) => {
    const response = await axiosInstance.put(`/documents/${id}/permissions`, data)
    return response.data
  },

  shareDocument: async (id, data) => {
    const response = await axiosInstance.post(`/documents/${id}/share`, data)
    return response.data
  },

  unshareDocument: async (id, userId) => {
    const response = await axiosInstance.delete(`/documents/${id}/share/${userId}`)
    return response.data
  },

  getDocumentComments: async (id, params) => {
    const response = await axiosInstance.get(`/documents/${id}/comments`, { params })
    return response.data
  },

  addDocumentComment: async (id, data) => {
    const response = await axiosInstance.post(`/documents/${id}/comments`, data)
    return response.data
  },

  updateDocumentComment: async (id, commentId, data) => {
    const response = await axiosInstance.put(`/documents/${id}/comments/${commentId}`, data)
    return response.data
  },

  deleteDocumentComment: async (id, commentId) => {
    const response = await axiosInstance.delete(`/documents/${id}/comments/${commentId}`)
    return response.data
  },

  getDocumentActivity: async (id, params) => {
    const response = await axiosInstance.get(`/documents/${id}/activity`, { params })
    return response.data
  },

  getDocumentStats: async (params) => {
    const response = await axiosInstance.get('/documents/stats', { params })
    return response.data
  }
} 
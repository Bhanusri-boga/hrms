import axiosInstance from './axios'

export const rolesApi = {
  getAllRoles: async (params) => {
    const response = await axiosInstance.get('/roles', { params })
    return response.data
  },

  getRoleById: async (id) => {
    const response = await axiosInstance.get(`/roles/${id}`)
    return response.data
  },

  createRole: async (data) => {
    const response = await axiosInstance.post('/roles', data)
    return response.data
  },

  updateRole: async (id, data) => {
    const response = await axiosInstance.put(`/roles/${id}`, data)
    return response.data
  },

  deleteRole: async (id) => {
    const response = await axiosInstance.delete(`/roles/${id}`)
    return response.data
  },

  getRoleUsers: async (id, params) => {
    const response = await axiosInstance.get(`/roles/${id}/users`, { params })
    return response.data
  },

  assignUserToRole: async (id, data) => {
    const response = await axiosInstance.post(`/roles/${id}/users`, data)
    return response.data
  },

  removeUserFromRole: async (id, userId) => {
    const response = await axiosInstance.delete(`/roles/${id}/users/${userId}`)
    return response.data
  },

  getRolePermissions: async (id) => {
    const response = await axiosInstance.get(`/roles/${id}/permissions`)
    return response.data
  },

  updateRolePermissions: async (id, data) => {
    const response = await axiosInstance.put(`/roles/${id}/permissions`, data)
    return response.data
  },

  getAllPermissions: async () => {
    const response = await axiosInstance.get('/roles/permissions')
    return response.data
  },

  getPermissionGroups: async () => {
    const response = await axiosInstance.get('/roles/permission-groups')
    return response.data
  },

  createPermissionGroup: async (data) => {
    const response = await axiosInstance.post('/roles/permission-groups', data)
    return response.data
  },

  updatePermissionGroup: async (id, data) => {
    const response = await axiosInstance.put(`/roles/permission-groups/${id}`, data)
    return response.data
  },

  deletePermissionGroup: async (id) => {
    const response = await axiosInstance.delete(`/roles/permission-groups/${id}`)
    return response.data
  },

  getRoleHierarchy: async () => {
    const response = await axiosInstance.get('/roles/hierarchy')
    return response.data
  },

  updateRoleHierarchy: async (data) => {
    const response = await axiosInstance.put('/roles/hierarchy', data)
    return response.data
  },

  getRoleStats: async (params) => {
    const response = await axiosInstance.get('/roles/stats', { params })
    return response.data
  },

  getRoleHistory: async (id, params) => {
    const response = await axiosInstance.get(`/roles/${id}/history`, { params })
    return response.data
  }
} 
import axiosInstance from './axios'

export const settingsApi = {
  getCompanySettings: async () => {
    const response = await axiosInstance.get('/settings/company')
    return response.data
  },

  updateCompanySettings: async (data) => {
    const response = await axiosInstance.put('/settings/company', data)
    return response.data
  },

  getSystemSettings: async () => {
    const response = await axiosInstance.get('/settings/system')
    return response.data
  },

  updateSystemSettings: async (data) => {
    const response = await axiosInstance.put('/settings/system', data)
    return response.data
  },

  getEmailSettings: async () => {
    const response = await axiosInstance.get('/settings/email')
    return response.data
  },

  updateEmailSettings: async (data) => {
    const response = await axiosInstance.put('/settings/email', data)
    return response.data
  },

  testEmailSettings: async (data) => {
    const response = await axiosInstance.post('/settings/email/test', data)
    return response.data
  },

  getNotificationSettings: async () => {
    const response = await axiosInstance.get('/settings/notifications')
    return response.data
  },

  updateNotificationSettings: async (data) => {
    const response = await axiosInstance.put('/settings/notifications', data)
    return response.data
  },

  getRoleSettings: async () => {
    const response = await axiosInstance.get('/settings/roles')
    return response.data
  },

  updateRoleSettings: async (data) => {
    const response = await axiosInstance.put('/settings/roles', data)
    return response.data
  },

  getPermissionSettings: async () => {
    const response = await axiosInstance.get('/settings/permissions')
    return response.data
  },

  updatePermissionSettings: async (data) => {
    const response = await axiosInstance.put('/settings/permissions', data)
    return response.data
  },

  getWorkflowSettings: async () => {
    const response = await axiosInstance.get('/settings/workflows')
    return response.data
  },

  updateWorkflowSettings: async (data) => {
    const response = await axiosInstance.put('/settings/workflows', data)
    return response.data
  },

  getIntegrationSettings: async () => {
    const response = await axiosInstance.get('/settings/integrations')
    return response.data
  },

  updateIntegrationSettings: async (data) => {
    const response = await axiosInstance.put('/settings/integrations', data)
    return response.data
  },

  getBackupSettings: async () => {
    const response = await axiosInstance.get('/settings/backup')
    return response.data
  },

  updateBackupSettings: async (data) => {
    const response = await axiosInstance.put('/settings/backup', data)
    return response.data
  },

  createBackup: async () => {
    const response = await axiosInstance.post('/settings/backup/create')
    return response.data
  },

  restoreBackup: async (data) => {
    const response = await axiosInstance.post('/settings/backup/restore', data)
    return response.data
  }
} 
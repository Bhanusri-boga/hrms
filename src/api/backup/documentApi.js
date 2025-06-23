import api from './axios';

export const getDocuments = async (params) => {
  const response = await api.get('/documents', { params });
  return response.data;
};

export const getDocumentById = async (id) => {
  const response = await api.get(`/documents/${id}`);
  return response.data;
};

export const uploadDocument = async (documentData) => {
  const formData = new FormData();
  Object.keys(documentData).forEach(key => {
    formData.append(key, documentData[key]);
  });

  const response = await api.post('/documents', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

export const updateDocument = async (id, documentData) => {
  const response = await api.put(`/documents/${id}`, documentData);
  return response.data;
};

export const deleteDocument = async (id) => {
  const response = await api.delete(`/documents/${id}`);
  return response.data;
};

export const getDocumentsByEmployee = async (employeeId, params) => {
  const response = await api.get(`/documents/employee/${employeeId}`, { params });
  return response.data;
};

export const getDocumentsByType = async (type, params) => {
  const response = await api.get(`/documents/type/${type}`, { params });
  return response.data;
};

export const downloadDocument = async (id) => {
  const response = await api.get(`/documents/${id}/download`, {
    responseType: 'blob'
  });
  return response.data;
};

export const getDocumentStats = async (params) => {
  const response = await api.get('/documents/stats', { params });
  return response.data;
};

export const getDocumentCategories = async () => {
  const response = await api.get('/documents/categories');
  return response.data;
};

export const getDocumentsByCategory = async (category, params) => {
  const response = await api.get(`/documents/category/${category}`, { params });
  return response.data;
};

export const shareDocument = async (id, shareData) => {
  const response = await api.post(`/documents/${id}/share`, shareData);
  return response.data;
}; 
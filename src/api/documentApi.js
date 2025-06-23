import apiService from './apiService';
import { endpoints } from './apiConfig';

export const getDocuments = async (params) => {
  const response = await apiService.get(endpoints.documents.base, { params });
  return response.data;
};

export const getDocumentById = async (id) => {
  const response = await apiService.get(endpoints.documents.byId(id));
  return response.data;
};

export const createDocument = async (documentData) => {
  const response = await apiService.post(endpoints.documents.base, documentData);
  return response.data;
};

export const updateDocument = async (id, documentData) => {
  const response = await apiService.put(endpoints.documents.byId(id), documentData);
  return response.data;
};

export const deleteDocument = async (id) => {
  const response = await apiService.delete(endpoints.documents.byId(id));
  return response.data;
};

export const downloadDocument = async (id) => {
  const response = await apiService.get(endpoints.documents.download(id), {
    responseType: 'blob',
  });
  return response.data;
};

export const getDocumentCategories = async () => {
  const response = await apiService.get(endpoints.documents.categories);
  return response.data;
};

export const getDocumentsByEmployee = async (employeeId, params) => {
  const response = await apiService.get(`${endpoints.employees.byId(employeeId)}/documents`, { params });
  return response.data;
};

export const uploadDocument = async (formData) => {
  const response = await apiService.post(endpoints.documents.base, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getDocumentStats = async () => {
  const response = await apiService.get(`${endpoints.documents.base}/stats`);
  return response.data;
};

export const shareDocument = async (id, shareData) => {
  const response = await apiService.post(`${endpoints.documents.byId(id)}/share`, shareData);
  return response.data;
};

export const revokeDocumentAccess = async (id, userId) => {
  const response = await apiService.delete(`${endpoints.documents.byId(id)}/share/${userId}`);
  return response.data;
}; 
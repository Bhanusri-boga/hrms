import api from './axios';

export const getTravels = async (params) => {
  const response = await api.get('/travels', { params });
  return response.data;
};

export const getTravelById = async (id) => {
  const response = await api.get(`/travels/${id}`);
  return response.data;
};

export const createTravel = async (travelData) => {
  const response = await api.post('/travels', travelData);
  return response.data;
};

export const updateTravel = async (id, travelData) => {
  const response = await api.put(`/travels/${id}`, travelData);
  return response.data;
};

export const deleteTravel = async (id) => {
  const response = await api.delete(`/travels/${id}`);
  return response.data;
};

export const getTravelsByEmployee = async (employeeId, params) => {
  const response = await api.get(`/travels/employee/${employeeId}`, { params });
  return response.data;
};

export const getTravelsByDate = async (startDate, endDate) => {
  const response = await api.get('/travels/date-range', {
    params: { startDate, endDate }
  });
  return response.data;
};

export const getTravelStats = async (params) => {
  const response = await api.get('/travels/stats', { params });
  return response.data;
};

export const getTravelReport = async (params) => {
  const response = await api.get('/travels/report', { params });
  return response.data;
};

export const approveTravel = async (id) => {
  const response = await api.patch(`/travels/${id}/approve`);
  return response.data;
};

export const rejectTravel = async (id, reason) => {
  const response = await api.patch(`/travels/${id}/reject`, { reason });
  return response.data;
}; 
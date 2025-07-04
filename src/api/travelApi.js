// import apiService from './apiService';
// import { endpoints } from './apiService';

// export const getTravelRequests = async (params) => {
//   const response = await apiService.get(endpoints.travel.base, { params });
//   return response.data;
// };

// export const getTravelRequestById = async (id) => {
//   const response = await apiService.get(`${endpoints.travel.base}/${id}`);
//   return response.data;
// };

// export const createTravelRequest = async (travelData) => {
//   const response = await apiService.post(endpoints.travel.base, travelData);
//   return response.data;
// };

// export const updateTravelRequest = async (id, travelData) => {
//   const response = await apiService.put(`${endpoints.travel.base}/${id}`, travelData);
//   return response.data;
// };

// export const deleteTravelRequest = async (id) => {
//   const response = await apiService.delete(`${endpoints.travel.base}/${id}`);
//   return response.data;
// };

// export const approveTravelRequest = async (id) => {
//   const response = await apiService.put(`${endpoints.travel.base}/${id}/approve`);
//   return response.data;
// };

// export const rejectTravelRequest = async (id, reason) => {
//   const response = await apiService.put(`${endpoints.travel.base}/${id}/reject`, { reason });
//   return response.data;
// };

// export const getTravelStats = async () => {
//   const response = await apiService.get(`${endpoints.travel.base}/stats`);
//   return response.data;
// };

// export const getTravelByEmployee = async (employeeId, params) => {
//   const response = await apiService.get(`${endpoints.employees.byId(employeeId)}/travel`, { params });
//   return response.data;
// };

// export const uploadTravelDocument = async (id, formData) => {
//   const response = await apiService.post(`${endpoints.travel.base}/${id}/documents`, formData, {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//   });
//   return response.data;
// }; 
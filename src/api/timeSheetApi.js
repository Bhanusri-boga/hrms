import apiService from './apiService';
import { endpoints } from './apiConfig';

export const getTimeSheets = async (params) => {
  const response = await apiService.get(endpoints.timesheet.base, { params });
  return response.data;
};

export const getTimeSheetById = async (id) => {
  const response = await apiService.get(endpoints.timesheet.byId(id));
  return response.data;
};

export const createTimeSheet = async (timeSheetData) => {
  const response = await apiService.post(endpoints.timesheet.base, timeSheetData);
  return response.data;
};

export const updateTimeSheet = async (id, timeSheetData) => {
  const response = await apiService.put(endpoints.timesheet.byId(id), timeSheetData);
  return response.data;
};

export const deleteTimeSheet = async (id) => {
  const response = await apiService.delete(endpoints.timesheet.byId(id));
  return response.data;
};

export const approveTimeSheet = async (id) => {
  const response = await apiService.put(endpoints.timesheet.approve(id));
  return response.data;
};

export const rejectTimeSheet = async (id, reason) => {
  const response = await apiService.put(endpoints.timesheet.reject(id), { reason });
  return response.data;
};

export const getTimeSheetsByEmployee = async (employeeId, params) => {
  const response = await apiService.get(`${endpoints.employees.byId(employeeId)}/timesheets`, { params });
  return response.data;
};

export const getTimeSheetStats = async () => {
  const response = await apiService.get(`${endpoints.timesheet.base}/stats`);
  return response.data;
};

export const submitTimeSheet = async (id) => {
  const response = await apiService.put(`${endpoints.timesheet.byId(id)}/submit`);
  return response.data;
};

export const getTimeSheetReport = async (params) => {
  const response = await apiService.get(`${endpoints.timesheet.base}/report`, { params });
  return response.data;
};

export const getTimeSheetByDate = async (date) => {
  const response = await apiService.get(`${endpoints.timesheet.base}/date`, { params: { date } });
  return response.data;
};

export const getTimeSheetByWeek = async (weekStart, weekEnd) => {
  const response = await apiService.get(`${endpoints.timesheet.base}/week`, {
    params: { weekStart, weekEnd },
  });
  return response.data;
};

export const getTimeSheetByMonth = async (month, year) => {
  const response = await apiService.get(`${endpoints.timesheet.base}/month`, {
    params: { month, year },
  });
  return response.data;
}; 
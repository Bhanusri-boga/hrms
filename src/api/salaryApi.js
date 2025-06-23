import apiService from './apiService';
import { endpoints } from './apiConfig';

export const getSalaries = async (params) => {
  const response = await apiService.get(endpoints.salary.base, { params });
  return response.data;
};

export const getSalaryById = async (id) => {
  const response = await apiService.get(endpoints.salary.byId(id));
  return response.data;
};

export const createSalary = async (salaryData) => {
  const response = await apiService.post(endpoints.salary.base, salaryData);
  return response.data;
};

export const updateSalary = async (id, salaryData) => {
  const response = await apiService.put(endpoints.salary.byId(id), salaryData);
  return response.data;
};

export const deleteSalary = async (id) => {
  const response = await apiService.delete(endpoints.salary.byId(id));
  return response.data;
};

export const calculateSalary = async (employeeId, month, year) => {
  const response = await apiService.post(endpoints.salary.calculate, {
    employeeId,
    month,
    year,
  });
  return response.data;
};

export const getPayslip = async (id) => {
  const response = await apiService.get(endpoints.salary.payslip(id));
  return response.data;
};

export const getSalaryByEmployee = async (employeeId, params) => {
  const response = await apiService.get(`${endpoints.employees.byId(employeeId)}/salary`, { params });
  return response.data;
};

export const getSalaryStats = async () => {
  const response = await apiService.get(`${endpoints.salary.base}/stats`);
  return response.data;
};

export const approveSalary = async (id) => {
  const response = await apiService.put(`${endpoints.salary.byId(id)}/approve`);
  return response.data;
};

export const rejectSalary = async (id, reason) => {
  const response = await apiService.put(`${endpoints.salary.byId(id)}/reject`, { reason });
  return response.data;
}; 
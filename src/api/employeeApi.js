import apiService from './apiService';
import { endpoints } from './apiConfig';

// Mock data for development
const mockEmployees = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    position: 'Software Engineer',
    department: 'Engineering',
    status: 'active',
    joinDate: '2023-01-15'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    position: 'HR Manager',
    department: 'Human Resources',
    status: 'active',
    joinDate: '2023-02-20'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    position: 'Project Manager',
    department: 'Project Management',
    status: 'active',
    joinDate: '2023-03-10'
  }
];

export const getEmployees = async (params) => {
  // Always use mock data in development mode
  if (import.meta.env.DEV) {
    console.warn('Using mock employees data in development mode');
    return {
      data: mockEmployees,
      total: mockEmployees.length,
      page: params?.page || 1,
      limit: params?.limit || 10
    };
  }

  try {
    const response = await apiService.get(endpoints.employees.base, { params });
    return response.data;
  } catch (error) {
    console.error('Error in getEmployees API:', error);
    
    // Even in production, return mock data if API fails
    console.warn('API failed, falling back to mock data');
    return {
      data: mockEmployees,
      total: mockEmployees.length,
      page: params?.page || 1,
      limit: params?.limit || 10
    };
  }
};

export const getEmployeeById = async (id) => {
  // Always use mock data in development mode
  if (import.meta.env.DEV) {
    console.warn('Using mock employee data in development mode');
    return mockEmployees.find(emp => emp.id === parseInt(id)) || null;
  }

  try {
    const response = await apiService.get(`${endpoints.employees.base}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error in getEmployeeById API for id ${id}:`, error);
    
    // Even in production, return mock data if API fails
    console.warn('API failed, falling back to mock data');
    return mockEmployees.find(emp => emp.id === parseInt(id)) || null;
  }
};

export const createEmployee = async (employeeData) => {
  try {
    const response = await apiService.post(endpoints.employees.base, employeeData);
    return response.data;
  } catch (error) {
    console.error('Error in createEmployee API:', error);
    
    // If we're in development and the API fails, return mock data
    if (import.meta.env.DEV) {
      console.warn('Using mock employee data due to API error');
      const newEmployee = {
        id: mockEmployees.length + 1,
        ...employeeData,
        joinDate: new Date().toISOString().split('T')[0],
        status: 'Active'
      };
      mockEmployees.push(newEmployee);
      return newEmployee;
    }
    
    throw {
      message: error.response?.data?.message || 'Failed to create employee',
      status: error.response?.status,
      data: error.response?.data
    };
  }
};

export const updateEmployee = async (id, employeeData) => {
  try {
    const response = await apiService.put(endpoints.employees.byId(id), employeeData);
    return response.data;
  } catch (error) {
    console.error(`Error in updateEmployee API for id ${id}:`, error);
    
    // If we're in development and the API fails, return mock data
    if (import.meta.env.DEV) {
      console.warn('Using mock employee data due to API error');
      const index = mockEmployees.findIndex(emp => emp.id === parseInt(id));
      if (index !== -1) {
        mockEmployees[index] = { ...mockEmployees[index], ...employeeData };
        return mockEmployees[index];
      }
      throw new Error('Employee not found');
    }
    
    throw {
      message: error.response?.data?.message || 'Failed to update employee',
      status: error.response?.status,
      data: error.response?.data
    };
  }
};

export const deleteEmployee = async (id) => {
  try {
    const response = await apiService.delete(endpoints.employees.byId(id));
    return response.data;
  } catch (error) {
    console.error(`Error in deleteEmployee API for id ${id}:`, error);
    
    // If we're in development and the API fails, return mock data
    if (import.meta.env.DEV) {
      console.warn('Using mock employee data due to API error');
      const index = mockEmployees.findIndex(emp => emp.id === parseInt(id));
      if (index !== -1) {
        mockEmployees.splice(index, 1);
        return { success: true };
      }
      throw new Error('Employee not found');
    }
    
    throw {
      message: error.response?.data?.message || 'Failed to delete employee',
      status: error.response?.status,
      data: error.response?.data
    };
  }
};

export const getEmployeeStats = async () => {
  try {
    const response = await apiService.get(`${endpoints.employees.base}/stats`);
    return response.data;
  } catch (error) {
    console.error('Error in getEmployeeStats API:', error);
    
    // If we're in development and the API fails, return mock data
    if (import.meta.env.DEV) {
      console.warn('Using mock stats data due to API error');
      return {
        totalEmployees: mockEmployees.length,
        activeEmployees: mockEmployees.filter(emp => emp.status === 'Active').length,
        departments: [...new Set(mockEmployees.map(emp => emp.department))].length,
        recentHires: mockEmployees.slice(-3)
      };
    }
    
    throw {
      message: error.response?.data?.message || 'Failed to fetch employee stats',
      status: error.response?.status,
      data: error.response?.data
    };
  }
};

export const employeeApi = {
  getAll: getEmployees,
  getById: getEmployeeById,
  create: createEmployee,
  update: updateEmployee,
  delete: deleteEmployee,
  search: async (query) => {
    try {
      const response = await apiService.get(endpoints.employees.base, { params: { query } });
      return response.data;
    } catch (error) {
      if (import.meta.env.DEV) {
        return mockEmployees.filter(emp => 
          emp.name.toLowerCase().includes(query.toLowerCase()) ||
          emp.email.toLowerCase().includes(query.toLowerCase())
        );
      }
      throw error;
    }
  },
  
  getByDepartment: async (departmentId) => {
    const response = await apiService.get(endpoints.departments.employees(departmentId));
    return response.data;
  },
  
  getAttendance: async (id) => {
    const response = await apiService.get(endpoints.employees.attendance(id));
    return response.data;
  },
  
  getDocuments: async (id) => {
    const response = await apiService.get(endpoints.employees.documents(id));
    return response.data;
  },
  
  getSalary: async (id) => {
    const response = await apiService.get(endpoints.employees.salary(id));
    return response.data;
  },
  
  uploadPhoto: async (id, photoFile) => {
    const formData = new FormData();
    formData.append('photo', photoFile);
    
    const response = await apiService.post(`${endpoints.employees.byId(id)}/photo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  }
};
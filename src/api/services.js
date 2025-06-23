import { apiService, endpoints, employeeApi, attendanceApi } from './apiConfig';

export const authService = {
  login: (credentials) => apiService.post(endpoints.auth.login, credentials),
  register: (userData) => apiService.post(endpoints.auth.register, userData),
  logout: () => apiService.post(endpoints.auth.logout),
  refreshToken: (refreshToken) => apiService.post(endpoints.auth.refreshToken, { refreshToken }),
  forgotPassword: (email) => apiService.post(endpoints.auth.forgotPassword, { email }),
  resetPassword: (token, password) => apiService.post(endpoints.auth.resetPassword, { token, password }),
};

export const userService = {
  getProfile: () => apiService.get(endpoints.users.profile),
  updateProfile: (data) => apiService.put(endpoints.users.profile, data),
  getUsers: (params) => apiService.get(endpoints.users.base, { params }),
  getUserById: (id) => apiService.get(endpoints.users.byId(id)),
  createUser: (data) => apiService.post(endpoints.users.base, data),
  updateUser: (id, data) => apiService.put(endpoints.users.byId(id), data),
  deleteUser: (id) => apiService.delete(endpoints.users.byId(id)),
  getUserRoles: () => apiService.get(endpoints.users.roles),
};

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

const mockAttendance = [
  {
    id: 1,
    employeeId: 1,
    employeeName: 'John Doe',
    date: '2025-05-28',
    status: 'present',
    checkIn: '09:00:00',
    checkOut: '17:00:00',
    totalHours: 8,
    isLate: false,
    earlyLeave: false
  },
  {
    id: 2,
    employeeId: 2,
    employeeName: 'Jane Smith',
    date: '2025-05-28',
    status: 'late',
    checkIn: '09:45:00',
    checkOut: '17:00:00',
    totalHours: 7.25,
    isLate: true,
    earlyLeave: false
  },
  {
    id: 3,
    employeeId: 3,
    employeeName: 'Mike Johnson',
    date: '2025-05-28',
    status: 'absent',
    checkIn: null,
    checkOut: null,
    totalHours: 0,
    isLate: false,
    earlyLeave: false
  }
];

export const employeeService = {
  getEmployees: async () => {
    // Always use mock data in development mode
    if (import.meta.env.DEV) {
      console.warn('Using mock employee data in development mode');
      return {
        data: mockEmployees,
        total: mockEmployees.length,
        page: 1,
        limit: 10
      };
    }

    try {
      return await employeeApi.getAll();
    } catch (error) {
      console.error('Error fetching employees:', error);
      throw {
        message: 'Failed to fetch employees',
        status: error.response?.status,
        data: error.response?.data
      };
    }
  },

  getEmployeeById: async (id) => {
    if (import.meta.env.DEV) {
      return mockEmployees.find(emp => emp.id === parseInt(id)) || null;
    }
    return await employeeApi.getById(id);
  },

  createEmployee: async (data) => {
    try {
      const response = await apiService.post(endpoints.employees.base, data);
      return response.data;
    } catch (error) {
      console.error('Error creating employee:', error);
      throw {
        message: error.response?.data?.message || 'Failed to create employee',
        status: error.response?.status,
        data: error.response?.data
      };
    }
  },

  updateEmployee: async (id, data) => {
    try {
      const response = await apiService.put(endpoints.employees.byId(id), data);
      return response.data;
    } catch (error) {
      console.error(`Error updating employee ${id}:`, error);
      throw {
        message: error.response?.data?.message || 'Failed to update employee',
        status: error.response?.status,
        data: error.response?.data
      };
    }
  },

  deleteEmployee: async (id) => {
    try {
      const response = await apiService.delete(endpoints.employees.byId(id));
      return response.data;
    } catch (error) {
      console.error(`Error deleting employee ${id}:`, error);
      throw {
        message: error.response?.data?.message || 'Failed to delete employee',
        status: error.response?.status,
        data: error.response?.data
      };
    }
  },

  getEmployeeAttendance: async (id) => {
    try {
      const response = await apiService.get(endpoints.employees.attendance(id));
      return response.data;
    } catch (error) {
      console.error(`Error fetching attendance for employee ${id}:`, error);
      throw {
        message: error.response?.data?.message || 'Failed to fetch employee attendance',
        status: error.response?.status,
        data: error.response?.data
      };
    }
  },

  getEmployeeDocuments: async (id) => {
    try {
      const response = await apiService.get(endpoints.employees.documents(id));
      return response.data;
    } catch (error) {
      console.error(`Error fetching documents for employee ${id}:`, error);
      throw {
        message: error.response?.data?.message || 'Failed to fetch employee documents',
        status: error.response?.status,
        data: error.response?.data
      };
    }
  },

  getEmployeeSalary: async (id) => {
    try {
      const response = await apiService.get(endpoints.employees.salary(id));
      return response.data;
    } catch (error) {
      console.error(`Error fetching salary for employee ${id}:`, error);
      throw {
        message: error.response?.data?.message || 'Failed to fetch employee salary',
        status: error.response?.status,
        data: error.response?.data
      };
    }
  }
};

export const attendanceService = {
  getDailyAttendance: async (date) => {
    // Always use mock data in development mode
    if (import.meta.env.DEV) {
      console.warn('Using mock attendance data in development mode');
      return {
        data: mockAttendance.filter(record => record.date === date),
        total: mockAttendance.length,
        date: date
      };
    }

    try {
      return await attendanceApi.getDailyAttendance(date);
    } catch (error) {
      console.error('Error fetching attendance:', error);
      throw {
        message: 'Failed to fetch attendance data',
        status: error.response?.status,
        data: error.response?.data
      };
    }
  },

  getMonthlyAttendance: (month, year) => apiService.get(endpoints.attendance.monthly, { params: { month, year } }),

  markAttendance: async (data) => {
    if (import.meta.env.DEV) {
      console.warn('Using mock attendance marking in development mode');
      const existingRecord = mockAttendance.find(
        record => record.employeeId === data.employeeId && record.date === data.date
      );

      if (existingRecord) {
        existingRecord.status = data.status;
        existingRecord.checkIn = data.timestamp;
        return { data: existingRecord };
      }

      const newRecord = {
        id: mockAttendance.length + 1,
        employeeId: data.employeeId,
        employeeName: 'Employee ' + data.employeeId,
        date: data.date,
        status: data.status,
        checkIn: data.timestamp,
        checkOut: null,
        totalHours: 0,
        isLate: false,
        earlyLeave: false
      };
      mockAttendance.push(newRecord);
      return { data: newRecord };
    }

    try {
      return await attendanceApi.markAttendance(data);
    } catch (error) {
      console.error('Error marking attendance:', error);
      throw {
        message: 'Failed to mark attendance',
        status: error.response?.status,
        data: error.response?.data
      };
    }
  },

  getAttendanceReport: (params) => apiService.get(endpoints.attendance.report, { params }),

  getAttendanceStats: () => apiService.get(`${endpoints.attendance.base}/stats`),

  getAttendanceByEmployee: (employeeId, params) => apiService.get(endpoints.employees.attendance(employeeId), { params }),
};

export const timesheetService = {
  getTimesheets: (params) => apiService.get(endpoints.timesheet.base, { params }),
  getTimesheetById: (id) => apiService.get(endpoints.timesheet.byId(id)),
  createTimesheet: (data) => apiService.post(endpoints.timesheet.base, data),
  updateTimesheet: (id, data) => apiService.put(endpoints.timesheet.byId(id), data),
  deleteTimesheet: (id) => apiService.delete(endpoints.timesheet.byId(id)),
  approveTimesheet: (id) => apiService.post(endpoints.timesheet.approve(id)),
  rejectTimesheet: (id) => apiService.post(endpoints.timesheet.reject(id)),
};

export const documentService = {
  getDocuments: (params) => apiService.get(endpoints.documents.base, { params }),
  getDocumentById: (id) => apiService.get(endpoints.documents.byId(id)),
  uploadDocument: (data) => apiService.post(endpoints.documents.base, data),
  updateDocument: (id, data) => apiService.put(endpoints.documents.byId(id), data),
  deleteDocument: (id) => apiService.delete(endpoints.documents.byId(id)),
  downloadDocument: (id) => apiService.get(endpoints.documents.download(id)),
  getDocumentCategories: () => apiService.get(endpoints.documents.categories),
};

export const departmentService = {
  getDepartments: () => apiService.get(endpoints.departments.base),
  getDepartmentById: (id) => apiService.get(endpoints.departments.byId(id)),
  createDepartment: (data) => apiService.post(endpoints.departments.base, data),
  updateDepartment: (id, data) => apiService.put(endpoints.departments.byId(id), data),
  deleteDepartment: (id) => apiService.delete(endpoints.departments.byId(id)),
  getDepartmentEmployees: (id) => apiService.get(endpoints.departments.employees(id)),
};

export const salaryService = {
  getSalaries: (params) => apiService.get(endpoints.salary.base, { params }),
  getSalaryById: (id) => apiService.get(endpoints.salary.byId(id)),
  calculateSalary: (data) => apiService.post(endpoints.salary.calculate, data),
  generatePayslip: (id) => apiService.get(endpoints.salary.payslip(id)),
};

export const travelService = {
  getTravelRequests: (params) => apiService.get(endpoints.travel.base, { params }),
  getTravelById: (id) => apiService.get(endpoints.travel.byId(id)),
  createTravel: (data) => apiService.post(endpoints.travel.base, data),
  updateTravel: (id, data) => apiService.put(endpoints.travel.byId(id), data),
  deleteTravel: (id) => apiService.delete(endpoints.travel.byId(id)),
  approveTravel: (id) => apiService.post(endpoints.travel.approve(id)),
  getTravelExpenses: () => apiService.get(endpoints.travel.expenses),
};

export const performanceService = {
  getPerformanceReviews: () => apiService.get(endpoints.performance.reviews),
  getPerformanceGoals: () => apiService.get(endpoints.performance.goals),
  submitFeedback: (data) => apiService.post(endpoints.performance.feedback, data),
};

export const trainingService = {
  getCourses: () => apiService.get(endpoints.training.courses),
  getSessions: () => apiService.get(endpoints.training.sessions),
  getProgress: (employeeId) => apiService.get(endpoints.training.progress, { params: { employeeId } }),
};

export const reportService = {
  getAttendanceReport: (params) => apiService.get(endpoints.reports.attendance, { params }),
  getPayrollReport: (params) => apiService.get(endpoints.reports.payroll, { params }),
  getPerformanceReport: (params) => apiService.get(endpoints.reports.performance, { params }),
  getHeadcountReport: (params) => apiService.get(endpoints.reports.headcount, { params }),
  getTurnoverReport: (params) => apiService.get(endpoints.reports.turnover, { params }),
};

export const notificationService = {
  getNotifications: () => apiService.get(endpoints.notifications.base),
  getUnreadNotifications: () => apiService.get(endpoints.notifications.unread),
  markAsRead: (id) => apiService.post(endpoints.notifications.markRead(id)),
};

export const settingsService = {
  getCompanySettings: () => apiService.get(endpoints.settings.company),
  updateCompanySettings: (data) => apiService.put(endpoints.settings.company, data),
  getSystemSettings: () => apiService.get(endpoints.settings.system),
  updateSystemSettings: (data) => apiService.put(endpoints.settings.system, data),
  getEmailSettings: () => apiService.get(endpoints.settings.email),
  updateEmailSettings: (data) => apiService.put(endpoints.settings.email, data),
};

import axios from 'axios';

// Create axios instance with default config
const apiService = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor
apiService.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
apiService.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log detailed error information
    console.error('API Error:', {
      message: error.response?.data?.message || 'An error occurred',
      status: error.response?.status,
      code: error.response?.data?.code,
      url: error.config?.url,
      method: error.config?.method
    });

    // In development mode, don't throw errors for certain endpoints
    if (import.meta.env.DEV) {
      // Return mock data for specific endpoints
      if (error.config?.url?.includes('/employees')) {
        console.warn('Using mock employee data in development mode');
        return Promise.resolve({
          data: {
            data: [
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
            ],
            total: 3,
            page: 1,
            limit: 10
          }
        });
      }

      if (error.config?.url?.includes('/attendance/daily')) {
        console.warn('Using mock attendance data in development mode');
        return Promise.resolve({
          data: {
            data: [
              {
                id: 1,
                employeeId: 1,
                employeeName: 'John Doe',
                date: error.config?.params?.date || new Date().toISOString().split('T')[0],
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
                date: error.config?.params?.date || new Date().toISOString().split('T')[0],
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
                date: error.config?.params?.date || new Date().toISOString().split('T')[0],
                status: 'absent',
                checkIn: null,
                checkOut: null,
                totalHours: 0,
                isLate: false,
                earlyLeave: false
              }
            ],
            total: 3,
            date: error.config?.params?.date || new Date().toISOString().split('T')[0]
          }
        });
      }

      if (error.config?.url?.includes('/timesheets')) {
        console.warn('Using mock timesheet data in development mode');
        const month = error.config?.params?.month || new Date().toISOString().slice(0, 7);
        return Promise.resolve({
          data: [
            { 
              id: 1, 
              employeeId: 101, 
              employeeName: 'John Doe', 
              month: month, 
              totalHours: 168, 
              status: 'pending',
              entries: [
                { date: '2023-05-01', hours: 8, description: 'Development work' },
                { date: '2023-05-02', hours: 8, description: 'Bug fixes' },
                { date: '2023-05-03', hours: 8, description: 'Code review' },
                { date: '2023-05-04', hours: 8, description: 'Testing' },
                { date: '2023-05-05', hours: 8, description: 'Documentation' }
              ]
            },
            { 
              id: 2, 
              employeeId: 102, 
              employeeName: 'Jane Smith', 
              month: month, 
              totalHours: 160, 
              status: 'approved',
              entries: [
                { date: '2023-05-01', hours: 8, description: 'Client meeting' },
                { date: '2023-05-02', hours: 8, description: 'Documentation' },
                { date: '2023-05-03', hours: 8, description: 'Project planning' },
                { date: '2023-05-04', hours: 8, description: 'Team coordination' },
                { date: '2023-05-05', hours: 8, description: 'Report generation' }
              ]
            },
            { 
              id: 3, 
              employeeId: 103, 
              employeeName: 'Michael Johnson', 
              month: month, 
              totalHours: 152, 
              status: 'rejected',
              entries: [
                { date: '2023-05-01', hours: 7, description: 'Project planning' },
                { date: '2023-05-02', hours: 8, description: 'Development' },
                { date: '2023-05-03', hours: 8, description: 'Code review' },
                { date: '2023-05-04', hours: 8, description: 'Testing' },
                { date: '2023-05-05', hours: 7, description: 'Documentation' }
              ]
            }
          ]
        });
      }
    }

    // Return a structured error object
    return Promise.reject({
      message: error.response?.data?.message || 'An error occurred',
      status: error.response?.status,
      code: error.response?.data?.code,
      url: error.config?.url,
      method: error.config?.method
    });
  }
);

// API endpoints
const endpoints = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    refreshToken: '/auth/refresh-token',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password'
  },
  users: {
    base: '/users',
    profile: '/users/profile',
    byId: (id) => `/users/${id}`,
    roles: '/users/roles'
  },
  employees: {
    base: '/employees',
    byId: (id) => `/employees/${id}`,
    attendance: (id) => `/employees/${id}/attendance`,
    documents: (id) => `/employees/${id}/documents`,
    salary: (id) => `/employees/${id}/salary`
  },
  attendance: {
    base: '/attendance',
    daily: '/attendance/daily',
    monthly: '/attendance/monthly',
    report: '/attendance/report',
    mark: '/attendance/mark'
  },
  departments: {
    base: '/departments',
    byId: (id) => `/departments/${id}`,
    employees: (id) => `/departments/${id}/employees`
  },
  documents: {
    base: '/documents',
    byId: (id) => `/documents/${id}`,
    download: (id) => `/documents/${id}/download`,
    categories: '/documents/categories'
  },
  salary: {
    base: '/salary',
    byId: (id) => `/salary/${id}`,
    calculate: '/salary/calculate',
    payslip: (id) => `/salary/${id}/payslip`
  },
  timesheet: {
    base: '/timesheet',
    byId: (id) => `/timesheet/${id}`,
    approve: (id) => `/timesheet/${id}/approve`,
    reject: (id) => `/timesheet/${id}/reject`
  },
  travel: {
    base: '/travel',
    byId: (id) => `/travel/${id}`,
    approve: (id) => `/travel/${id}/approve`,
    expenses: '/travel/expenses'
  },
  performance: {
    reviews: '/performance/reviews',
    goals: '/performance/goals',
    feedback: '/performance/feedback'
  },
  training: {
    courses: '/training/courses',
    sessions: '/training/sessions',
    progress: '/training/progress'
  },
  reports: {
    attendance: '/reports/attendance',
    payroll: '/reports/payroll',
    performance: '/reports/performance',
    headcount: '/reports/headcount',
    turnover: '/reports/turnover'
  },
  notifications: {
    base: '/notifications',
    unread: '/notifications/unread',
    markRead: (id) => `/notifications/${id}/read`
  },
  settings: {
    company: '/settings/company',
    system: '/settings/system',
    email: '/settings/email'
  }
};

// API handlers
const employeeApi = {
  getAll: () => apiService.get(endpoints.employees.base),
  getById: (id) => apiService.get(endpoints.employees.byId(id)),
  create: (data) => apiService.post(endpoints.employees.base, data),
  update: (id, data) => apiService.put(endpoints.employees.byId(id), data),
  delete: (id) => apiService.delete(endpoints.employees.byId(id))
};

const attendanceApi = {
  getDailyAttendance: (date) => apiService.get(endpoints.attendance.daily, { params: { date } }),
  markAttendance: (data) => apiService.post(endpoints.attendance.mark, data),
  getAttendanceReport: (params) => apiService.get(endpoints.attendance.report, { params })
};

// Export both named exports and default export
export { apiService, endpoints, employeeApi, attendanceApi };
export default apiService;

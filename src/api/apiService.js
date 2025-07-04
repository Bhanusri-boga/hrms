import axios from 'axios';

// Create axios instance with default config
const apiService = axios.create({
  baseURL: 'http://192.168.0.19:8080',
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

export const endpoints = {
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
    roles: '/users/roles',
    existsEmail: (email) => `/users/exists-email/${encodeURIComponent(email)}`
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
  // ... add other endpoint groups as needed ...
};

export const employeeApi = {
  getAll: () => apiService.get(endpoints.employees.base),
  getById: (id) => apiService.get(endpoints.employees.byId(id)),
  create: (data) => apiService.post(endpoints.employees.base, data),
  update: (id, data) => apiService.put(endpoints.employees.byId(id), data),
  delete: (id) => apiService.delete(endpoints.employees.byId(id))
};

export const attendanceApi = {
  getDailyAttendance: (date) => apiService.get(endpoints.attendance.daily, { params: { date } }),
  markAttendance: (data) => apiService.post(endpoints.attendance.mark, data),
  getAttendanceReport: (params) => apiService.get(endpoints.attendance.report, { params })
};

export const userApi = {
  getAll: () => apiService.get(endpoints.users.base),
  getById: (id) => apiService.get(endpoints.users.byId(id)),
  getProfile: () => apiService.get(endpoints.users.profile),
  updateProfile: (data) => apiService.put(endpoints.users.profile, data),
  getByEmail: (email) => apiService.get(`/users/${encodeURIComponent(email)}`),
  updateByEmail: (email, data) => apiService.put(`/users/${encodeURIComponent(email)}`, data),
  deleteByEmail: (email) => apiService.delete(`/users/${encodeURIComponent(email)}`),
  findByEmail: (email) => apiService.get(`/users/find-email/${encodeURIComponent(email)}`),
  existsEmail: (email) => apiService.get(endpoints.users.existsEmail(email)),
};

export const travelApi = {
  getAll: () => apiService.get('/travel'),
  getById: (id) => apiService.get(`/travel/${id}`),
  create: (data) => apiService.post('/travel', data),
  update: (id, data) => apiService.put(`/travel/${id}`, data),
  delete: (id) => apiService.delete(`/travel/${id}`)
};

export const timeSheetApi = {
  getAll: () => apiService.get('/timesheet'),
  getById: (id) => apiService.get(`/timesheet/${id}`),
  create: (data) => apiService.post('/timesheet', data),
  update: (id, data) => apiService.put(`/timesheet/${id}`, data),
  delete: (id) => apiService.delete(`/timesheet/${id}`)
};

export const salaryApi = {
  getAll: () => apiService.get('/salary'),
  getById: (id) => apiService.get(`/salary/${id}`),
  create: (data) => apiService.post('/salary', data),
  update: (id, data) => apiService.put(`/salary/${id}`, data),
  delete: (id) => apiService.delete(`/salary/${id}`)
};

export const documentApi = {
  getAll: () => apiService.get('/documents'),
  getById: (id) => apiService.get(`/documents/${id}`),
  create: (data) => apiService.post('/documents', data),
  update: (id, data) => apiService.put(`/documents/${id}`, data),
  delete: (id) => apiService.delete(`/documents/${id}`)
};

export const refreshAccessToken = (refreshToken) => {
  return apiService.post(`/auth/refresh-token?refreshToken=${encodeURIComponent(refreshToken)}`);
};

export default apiService;
export { apiService };
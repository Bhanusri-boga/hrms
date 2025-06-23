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

export default apiService; 
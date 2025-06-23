import axios from 'axios';
import { getToken } from '../utils/storageUtils';

// Import PREFIX from storageUtils
const PREFIX = 'hrms_';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access - don't use direct window.location to avoid issues with React Router
      // Instead, store an auth error flag that components can check
      localStorage.setItem(PREFIX + 'auth_error', 'true');
      // The actual redirect will be handled by the AuthContext or components
    }
    return Promise.reject(error);
  }
);

export default api; 
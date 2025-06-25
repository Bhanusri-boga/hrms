import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// import { login as loginApi, logout as logoutApi, getCurrentUser } from '../api/authApi';
import { authApi } from '../api/authApi';

import { setToken, removeToken, getToken } from '../utils/storageUtils';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

 const checkAuth = async () => {
  try {
    const token = getToken();
    if (token) {
      const userData = await authApi.getCurrentUser();
      setUser(userData);
      setIsAuthenticated(true);
    }
  } catch (error) {
    console.error('Auth check failed:', error);
    logout();
  } finally {
    setLoading(false);
  }
};

const login = async (credentials) => {
  try {
    console.log('Attempting login with:', credentials);
    const response = await authApi.login(credentials);
    console.log('Login response:', response);
    
    // Handle different response structures
    const token = response.token || response.accessToken;
    const userData = response.user;
    
    if (!token || !userData) {
      console.error('Invalid login response format:', response);
      throw new Error('Invalid login response from server');
    }
    
    setToken(token);
    setUser(userData);
    setIsAuthenticated(true);
    navigate('/');
    return true;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

const logout = async () => {
  try {
    await authApi.logout(); // optional depending on backend
  } catch (err) {
    console.warn('Logout API failed:', err);
  }
  removeToken();
  setUser(null);
  setIsAuthenticated(false);
  navigate('/login');
};


  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    checkAuth,
    // Role helpers
    hasRole: (role) => user?.userRoles?.includes(role),
    isMainRole: (role) => user?.role === role
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider; 
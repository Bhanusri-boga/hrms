import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// import { login as loginApi, logout as logoutApi, getCurrentUser } from '../api/authApi';
import { authApi } from '../api/authApi';

import { setToken, removeToken, getToken, setRefreshToken, getRefreshToken, removeRefreshToken } from '../utils/storageUtils';
import { decodeJWT } from '../utils/storageUtils';

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
      // Decode token and restore user from payload
      const decoded = decodeJWT(token);
      if (decoded) {
        const role = decoded?.role || decoded?.userRole || decoded?.roles?.[0] || null;
        const userData = {
          username: decoded.username || decoded.name || decoded.sub || '',
          userLevel: decoded.userLevel || '',
          role,
          email: decoded.email || decoded.sub || '',
          userRoles: decoded.roles || [],
          status: decoded.status,
          emailVerified: decoded.emailVerified,
          lastLogin: decoded.lastLogin,
          createdAt: decoded.createdAt,
          updatedAt: decoded.updatedAt
        };
        setUser(userData);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
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

    // Build user object from response
    const token = response.accessToken;
    const refreshToken = response.refreshToken;
    // Decode token to extract role
    const decoded = decodeJWT(token);
    const role = decoded?.role || decoded?.userRole || decoded?.roles?.[0] || null;
    const userData = {
      username: response.username,
      userLevel: response.userLevel,
      role,
      // add more fields if backend returns them
    };

    if (!token || !userData.username) {
      console.error('Invalid login response format:', response);
      throw new Error('Invalid login response from server');
    }

    setToken(token);
    setRefreshToken(refreshToken);
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
    const refreshToken = getRefreshToken();
    await authApi.logout(refreshToken);
  } catch (err) {
    console.warn('Logout API failed:', err);
  }
  removeToken();
  removeRefreshToken();
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
    hasRole: (role) => user?.role === role,
    isMainRole: (role) => user?.role === role
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider; 
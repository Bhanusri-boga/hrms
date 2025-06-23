import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

export const useIsAuthenticated = () => {
  const { user } = useAuth();
  return !!user;
};

export const useIsAdmin = () => {
  const { user } = useAuth();
  return user?.role === 'admin';
};

export const useIsManager = () => {
  const { user } = useAuth();
  return user?.role === 'manager';
};

export const useIsEmployee = () => {
  const { user } = useAuth();
  return user?.role === 'employee';
};

export const useHasPermission = (permission) => {
  const { user } = useAuth();
  return user?.permissions?.includes(permission);
}; 
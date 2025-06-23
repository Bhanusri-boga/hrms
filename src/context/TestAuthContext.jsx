import React, { createContext, useContext, useState } from 'react';

export const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user] = useState({
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'admin',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
  });

  const getToken = () => 'mock-token';

  const updateUserProfile = async (data) => {
    console.log('Update user profile:', data);
    return { success: true };
  };

  const updatePassword = async (oldPassword, newPassword) => {
    console.log('Update password:', { oldPassword, newPassword });
    return { success: true };
  };

  const value = {
    user,
    loading: false,
    isAuthenticated: true,
    login: () => {},
    logout: () => {},
    getToken,
    updateUserProfile,
    updatePassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
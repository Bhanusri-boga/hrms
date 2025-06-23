import React, { createContext, useContext, useState, useCallback } from 'react';

export const NotificationContext = createContext(null);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((notification) => {
    const id = Date.now();
    console.log('Notification:', notification);
    alert(`${notification.type}: ${notification.message}`);
    return id;
  }, []);

  const removeNotification = useCallback((id) => {
    // Do nothing in test mode
  }, []);

  const clearNotifications = useCallback(() => {
    // Do nothing in test mode
  }, []);

  const value = {
    notifications,
    addNotification,
    removeNotification,
    clearNotifications
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
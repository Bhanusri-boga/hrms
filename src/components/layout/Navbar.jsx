import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import Logo3D from '../three/core/Logo3D';
import Scene3D from '../three/core/Scene3D';
import { colors } from '../../design/DesignSystem';

/**
 * Navbar - Advanced 3D navbar component
 * 
 * @param {Object} props
 * @param {function} props.toggleSidebar - Function to toggle sidebar
 */
const Navbar = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'New employee onboarding', time: '5 min ago', read: false },
    { id: 2, text: 'Attendance report ready', time: '1 hour ago', read: false },
    { id: 3, text: 'Payroll processing complete', time: '3 hours ago', read: true }
  ]);
  
  const profileRef = useRef(null);
  const notificationsRef = useRef(null);
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications(
      notifications.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };
  
  // Clear all notifications
  const clearNotifications = () => {
    setNotifications([]);
  };
  
  // Count unread notifications
  const unreadCount = notifications.filter(notification => !notification.read).length;
  
  return (
    <header className="fixed top-0 left-0 right-0 h-16 z-40">
      {/* Glassmorphic navbar background */}
      <div className="absolute inset-0 glass border-b border-primary-500/20 backdrop-blur-md z-0"></div>
      
      <div className="relative z-10 h-full px-4 flex items-center justify-between">
        {/* Left section: Logo and toggle */}
        <div className="flex items-center space-x-4">
          {/* Sidebar toggle button */}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-full glass hover:bg-primary-600/20 transition-colors duration-200"
            aria-label="Toggle sidebar"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 text-primary-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-10 w-10">
              <Scene3D
                enableEffects={false}
                cameraProps={{ position: [0, 0, 5], fov: 40 }}
                backgroundColor="transparent"
                enableFog={false}
              >
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={0.8} />
                <Logo3D 
                  text="HR"
                  style="cyber"
                  scale={0.4}
                  color={colors.primary[600]}
                  secondaryColor={colors.neon.purple}
                />
              </Scene3D>
            </div>
            <span className="text-xl font-display tracking-wider text-white neon-text hidden sm:block">
              HRMS
            </span>
          </Link>
        </div>
        
        {/* Right section: Search, notifications, profile */}
        <div className="flex items-center space-x-2">
          {/* Search bar */}
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search..."
              className="glass-input w-64 h-10 pl-10 pr-4 rounded-full text-sm focus:outline-none"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          {/* Notifications */}
          <div className="relative" ref={notificationsRef}>
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="p-2 rounded-full glass hover:bg-primary-600/20 transition-colors duration-200 relative"
              aria-label="Notifications"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-primary-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              
              {/* Notification badge */}
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-red-500 flex items-center justify-center text-xs font-bold animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>
            
            {/* Notifications dropdown */}
            <AnimatePresence>
              {isNotificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-80 glass-card shadow-neon-purple overflow-hidden z-50"
                >
                  <div className="p-4 border-b border-dark-300/50 flex justify-between items-center">
                    <h3 className="font-display text-lg">Notifications</h3>
                    {notifications.length > 0 && (
                      <button
                        onClick={clearNotifications}
                        className="text-xs text-primary-400 hover:text-primary-300"
                      >
                        Clear all
                      </button>
                    )}
                  </div>
                  
                  <div className="max-h-80">
                    {notifications.length > 0 ? (
                      notifications.map(notification => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-dark-300/30 hover:bg-primary-600/10 transition-colors duration-200 ${
                            !notification.read ? 'bg-primary-600/5' : ''
                          }`}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div className="flex justify-between items-start">
                            <p className="text-sm">{notification.text}</p>
                            {!notification.read && (
                              <span className="h-2 w-2 rounded-full bg-primary-500 animate-pulse"></span>
                            )}
                          </div>
                          <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center text-gray-400">
                        <p>No notifications</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 p-2 rounded-full glass hover:bg-primary-600/20 transition-colors duration-200"
              aria-label="Profile"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-purple flex items-center justify-center text-white border border-primary-400/30 shadow-neon-purple">
                {user?.email?.[0]?.toUpperCase() || 'U'}
              </div>
              <span className="hidden md:block text-sm font-medium truncate max-w-[100px]">
                {user?.email || 'User'}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
                  isProfileOpen ? 'transform rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* Profile dropdown */}
            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 glass-card shadow-neon-purple overflow-hidden z-50"
                >
                  <div className="p-4 border-b border-dark-300/50">
                    <p className="font-medium">{user?.name || 'User'}</p>
                    <p className="text-xs text-gray-400 truncate">{user?.email || 'user@example.com'}</p>
                  </div>
                  
                  <div className="py-1">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm hover:bg-primary-600/10 transition-colors duration-200"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-sm hover:bg-primary-600/10 transition-colors duration-200"
                    >
                      Settings
                    </Link>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors duration-200"
                    >
                      Logout
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
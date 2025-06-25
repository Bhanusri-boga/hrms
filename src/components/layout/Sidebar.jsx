import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import Scene3D from '../three/core/Scene3D';
import { colors } from '../../design/DesignSystem';

// Menu items with icons
const menuItems = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
        <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
      </svg>
    ),
    roles: ['ADMIN', 'HR', 'MANAGER', 'EMPLOYEE']
  },
  {
    title: 'Employees',
    path: '/employees',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
      </svg>
    ),
    roles: ['ADMIN', 'HR', 'MANAGER']
  },
  {
    title: 'Attendance',
    path: '/attendance',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
      </svg>
    ),
    roles: ['ADMIN', 'HR', 'MANAGER', 'EMPLOYEE']
  },
  {
    title: 'Time Sheets',
    path: '/timesheets',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
      </svg>
    ),
    roles: ['ADMIN', 'HR', 'MANAGER', 'EMPLOYEE']
  },
  {
    title: 'Documents',
    path: '/documents',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
      </svg>
    ),
    roles: ['ADMIN', 'HR', 'MANAGER', 'EMPLOYEE']
  },
  {
    title: 'Salary',
    path: '/salary',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
      </svg>
    ),
    roles: ['ADMIN', 'HR']
  },
  {
    title: 'Travel',
    path: '/travel',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
      </svg>
    ),
    roles: ['ADMIN', 'HR', 'MANAGER']
  },
  {
    title: 'Reports',
    path: '/reports',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ),
    roles: ['ADMIN', 'HR', 'MANAGER']
  },
  {
    title: '3D Demo',
    path: '/nav-menu-3d-demo',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
      </svg>
    ),
    roles: ['ADMIN', 'HR', 'MANAGER', 'EMPLOYEE']
  }
];

/**
 * Sidebar - Advanced 3D sidebar component
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether sidebar is open
 */
const Sidebar = ({ isOpen = true }) => {
  const location = useLocation();
  const { user } = useAuth();
  const [activeMenu, setActiveMenu] = useState('');
  const [reducedMotion, setReducedMotion] = useState(false);
  
  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handleChange = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  // Update active menu based on location
  useEffect(() => {
    const path = location.pathname;
    setActiveMenu(path);
  }, [location]);
  
  // Sidebar variants for animation
  const sidebarVariants = {
    open: { width: 256, transition: { duration: 0.3, ease: "easeInOut" } },
    closed: { width: 80, transition: { duration: 0.3, ease: "easeInOut" } }
  };
  
  // Content variants for animation
  const contentVariants = {
    open: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeInOut" } },
    closed: { opacity: 0, x: -20, transition: { duration: 0.3, ease: "easeInOut" } }
  };
  
  return (
    <motion.div
      initial={isOpen ? "open" : "closed"}
      animate={isOpen ? "open" : "closed"}
      variants={sidebarVariants}
      className="h-screen fixed left-0 top-0 pt-16 z-30 overflow-hidden"
    >
      {/* Glassmorphic sidebar background */}
      <div className="absolute inset-0 glass border-r border-primary-500/20 backdrop-blur-md z-0"></div>
      
      {/* Energy beam effect */}
      {!reducedMotion && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Scene3D
            enableEffects={false}
            cameraProps={{ position: [0, 0, 5], fov: 40 }}
            backgroundColor="transparent"
            enableFog={false}
          >
            <ambientLight intensity={0.1} />
            <pointLight position={[0, 0, 5]} intensity={0.2} />
            <mesh position={[0, 0, -2]}>
              <planeGeometry args={[10, 20]} />
              <meshBasicMaterial 
                color={colors.primary[900]} 
                transparent 
                opacity={0.1} 
              />
            </mesh>
            {isOpen && (
              <>
                <mesh position={[0, 0, -1.5]}>
                  <planeGeometry args={[0.5, 20]} />
                  <meshBasicMaterial 
                    color={colors.primary[600]} 
                    transparent 
                    opacity={0.05} 
                  />
                </mesh>
                <mesh position={[0, 0, -1]}>
                  <planeGeometry args={[0.2, 20]} />
                  <meshBasicMaterial 
                    color={colors.neon.purple} 
                    transparent 
                    opacity={0.1} 
                  />
                </mesh>
              </>
            )}
          </Scene3D>
        </div>
      )}
      
      {/* Sidebar content */}
      <div className="flex flex-col h-full relative z-10">
        {/* Navigation */}
        <div className="flex-1 py-6 overflow-y-auto scrollbar-thin scrollbar-thumb-primary-700 scrollbar-track-dark-500">
          <nav className="px-4 space-y-1">
            {menuItems.filter(item => user && (item.roles.includes(user.role) || (user.userRoles && user.userRoles.some(r => item.roles.includes(r))))).map((item) => {
              const isActive = activeMenu.startsWith(item.path);
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                      isActive
                        ? 'glass bg-primary-600/20 text-primary-300 shadow-neon-purple neon-text'
                        : 'text-gray-300 hover:text-primary-400 hover:bg-primary-600/10'
                    }`
                  }
                >
                  <div className={`w-8 h-8 flex items-center justify-center rounded-md ${
                    isActive ? 'bg-primary-600/30' : 'bg-dark-400/50'
                  }`}>
                    {item.icon}
                  </div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.span
                        variants={contentVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        className="text-sm font-medium"
                      >
                        {item.title}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {isActive && (
                    <motion.div 
                      className="ml-auto h-2 w-2 rounded-full bg-primary-500 animate-pulse"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>
        
        {/* User info - only shown when expanded */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="p-4 border-t border-primary-500/20"
            >
              <div className="glass-card p-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-purple flex items-center justify-center text-white border border-primary-400/30 shadow-neon-purple">
                    {user?.email?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate neon-text">
                      {user?.email || 'user@example.com'}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {user?.role || 'User'}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Sidebar;
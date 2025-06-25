import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

import {
  HomeIcon,
  UsersIcon,
  ClockIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  PaperAirplaneIcon,
  ChartBarIcon,
  UserCircleIcon,
  CogIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/24/outline';

const initialMenuItems = [
  { title: 'Dashboard', path: '/dashboard', icon: HomeIcon },
  { title: 'Employees', path: '/employees', icon: UsersIcon },
  { title: 'Attendance', path: '/attendance', icon: ClockIcon },
  { title: 'Time Sheets', path: '/timesheets', icon: DocumentTextIcon }, 
  { title: 'Documents', path: '/documents', icon: DocumentTextIcon },
  { title: 'Salary', path: '/salary', icon: CurrencyDollarIcon },
  { title: 'Travel', path: '/travel', icon: PaperAirplaneIcon },
  { title: 'Reports', path: '/reports', icon: ChartBarIcon },
];

const userSpecificItems = [
  { title: 'Profile', path: '/profile', icon: UserCircleIcon, category: 'user' },
  { title: 'Settings', path: '/settings', icon: CogIcon, category: 'app' },
];

/**
 * Modern Sidebar component with smooth animations and contemporary design
 */
const Sidebar = ({ isOpen, onToggle }) => {
  const { user } = useAuth();
  const location = useLocation();
  const allMenuItems = [...initialMenuItems, ...userSpecificItems];

  return (
    <aside
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] z-30 flex flex-col bg-white shadow-xl border-r border-gray-100 transition-all duration-300 overflow-hidden ${
        isOpen ? 'w-64' : 'w-[4.5rem]'
      }`}
    >
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className={`absolute z-50 p-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
          isOpen ? 'top-6 -right-3' : 'top-20 -right-3'
        }`}
        aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
      >
        {isOpen ? (
          <ChevronDoubleLeftIcon className="w-4 h-4" />
        ) : (
          <ChevronDoubleRightIcon className="w-4 h-4" />
        )}
      </button>

      {/* Logo Section */}
      <div className={`flex items-center border-b border-gray-100 ${isOpen ? 'px-6 py-6' : 'px-4 py-6 justify-center'}`}>
        {isOpen ? (
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">H</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">HRMS</h1>
              <p className="text-xs text-gray-500">Human Resources</p>
            </div>
          </div>
        ) : (
          <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">H</span>
          </div>
        )}
      </div>

      {/* Navigation Links */}
      <nav className={`flex-grow overflow-y-auto scrollbar-hide ${isOpen ? 'px-4 py-6' : 'px-2 py-6'}`}>
        <div className="space-y-2">
          {allMenuItems.map((item) => (
            <SidebarNavLink
              key={item.title}
              item={item}
              location={location}
              isCollapsed={!isOpen}
            />
          ))}
        </div>
      </nav>

      {/* User Info Section - shows when expanded */}
      <AnimatePresence>
        <div className={`border-t border-gray-100 ${isOpen ? 'p-4' : 'p-2'}`}>
          {isOpen && user ? (
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <img 
                  src={user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name || user.email}`}
                  alt={user.name || 'User'}
                  className="h-10 w-10 rounded-full border-2 border-indigo-200"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{user.name || 'User'}</p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
              </div>
            </div>
          ) : !isOpen && user ? (
            <div className="flex justify-center">
              <img 
                src={user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name || user.email}`}
                alt={user.name || 'User'}
                className="h-10 w-10 rounded-full border-2 border-indigo-200"
              />
            </div>
          ) : null}
        </div>
      </AnimatePresence>
    </aside>
  );
};

const SidebarNavLink = ({ item, location, isCollapsed }) => {
  const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(`${item.path}/`));
  const IconComponent = item.icon;

  const linkClasses = `
    flex items-center rounded-xl transition-all duration-300 ease-in-out group relative
    font-medium text-sm
    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
    ${isActive 
      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25 hover:from-indigo-700 hover:to-purple-700'
      : 'text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-600'}
    ${isCollapsed ? 'justify-center p-3 mx-1' : 'p-3'}
  `;

  const iconClasses = `
    ${isCollapsed ? 'w-6 h-6' : 'w-5 h-5'} transition-all duration-300
    ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-indigo-600'}
    ${isCollapsed ? '' : 'mr-3'}
  `;

  return (
    <div className="relative group">
      <NavLink
        to={item.path}
        title={isCollapsed ? item.title : undefined}
        className={linkClasses}
      >
        {IconComponent && <IconComponent className={iconClasses} />}
        {!isCollapsed && (
          <span className="whitespace-nowrap overflow-hidden font-medium">
            {item.title}
          </span>
        )}
        
        {/* Active indicator */}
        {isActive && !isCollapsed && (
          <div className="ml-auto">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        )}
      </NavLink>
      
      {/* Modern tooltip for collapsed state */}
      {isCollapsed && (
        <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 whitespace-nowrap z-50 shadow-xl">
          {item.title}
          <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
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
 * Futuristic Sidebar component with 3D navigation and glassmorphic effects
 */
const Sidebar = ({ isOpen, onToggle }) => {
  const { user } = useAuth();
  const location = useLocation();
  const allMenuItems = [...initialMenuItems, ...userSpecificItems];

  return (
    <aside
      className={`fixed left-0 top-12 h-[calc(100vh-3rem)] z-30 flex flex-col bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-lg border-r border-gray-200 dark:border-gray-700 transition-all duration-300 overflow-hidden ${
        isOpen ? 'w-56' : 'w-16'
      }`}
    >
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="absolute top-1/2 -right-3 transform -translate-y-1/2 z-50 p-2 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500"
        aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
      >
        {isOpen ? (
          <ChevronDoubleLeftIcon className="w-4 h-4" />
        ) : (
          <ChevronDoubleRightIcon className="w-4 h-4" />
        )}
      </button>

      {/* Navigation Links */}
      <nav className="flex-grow px-1 py-2 space-y-1 overflow-y-auto no-scrollbar">
        {allMenuItems.map((item) => (
          <SidebarNavLink
            key={item.title}
            item={item}
            location={location}
            isCollapsed={!isOpen}
          />
        ))}
      </nav>

      {/* User Info Section - shows when expanded */}
      <AnimatePresence>
        {isOpen && user && (
          <div
            className="p-2 border-t border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center space-x-2 p-1 rounded-lg bg-gray-50 dark:bg-gray-700/50">
              <img 
                src={user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name || user.email}`}
                alt={user.name || 'User'}
                className="h-7 w-7 rounded-full border border-indigo-500"
              />
              <div>
                <p className="text-xs font-medium text-gray-900 dark:text-white truncate">{user.name || 'User'}</p>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </aside>
  );
};

const SidebarNavLink = ({ item, location, isCollapsed }) => {
  const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(`${item.path}/`));
  const IconComponent = item.icon;

  const linkClasses = `
    flex items-center rounded-lg transition-all duration-200 ease-in-out group relative
    font-medium text-xs
    hover:bg-gray-100 dark:hover:bg-gray-700/50
    focus:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500
    ${isActive 
      ? 'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400'
      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'}
    ${isCollapsed ? 'justify-center p-2.5' : 'p-1.5'}
  `;

  const iconClasses = `
    w-5 h-5 transition-colors duration-200 
    ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'}
    ${isCollapsed ? '' : 'mr-2'}
  `;

  return (
    <NavLink
      to={item.path}
      title={isCollapsed ? item.title : undefined}
      className={linkClasses}
    >
      {IconComponent && <IconComponent className={iconClasses} />}
      {!isCollapsed && (
        <span className="whitespace-nowrap overflow-hidden">
          {item.title}
        </span>
      )}
      {isActive && (
        <div 
          className={`absolute top-1/2 -translate-y-1/2 h-3/4 w-1 bg-indigo-600 dark:bg-indigo-400 rounded-r-full ${isCollapsed ? 'left-0' : '-left-1'}`}
        />
      )}
    </NavLink>
  );
};

export default Sidebar;
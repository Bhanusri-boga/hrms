import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { BellIcon } from '@heroicons/react/24/outline';

const Header = ({ title }) => {
  const { user, logout } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white shadow-md px-6 py-4 flex items-center justify-between h-16">
      {/* Left section: Logo and Title */}
      <div className="flex items-center space-x-4">
        <Link to="/" className="flex items-center space-x-1">
          <span className="text-base font-bold text-indigo-600 dark:text-indigo-400">HRMS</span>
        </Link>
        {title && <h1 className="section-title mb-0">{title}</h1>}
      </div>

      {/* Right section: User menu */}
      <div className="flex items-center space-x-3">
        <button className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <BellIcon className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2">
          <img 
            src={user?.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${user?.name || user?.email}`}
            alt={user?.name || 'User'}
            className="h-8 w-8 rounded-full border border-indigo-500"
          />
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name || 'User'}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
          </div>
        </div>
        
        <button
          onClick={logout}
          className="px-3 py-1 text-sm text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
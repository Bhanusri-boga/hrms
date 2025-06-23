import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { BellIcon } from '@heroicons/react/24/outline';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 h-12 z-40 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="h-full px-2 flex items-center justify-between">
        {/* Left section: Logo */}
        <Link to="/" className="flex items-center space-x-1">
          <span className="text-base font-bold text-indigo-600 dark:text-indigo-400">HRMS</span>
        </Link>

        {/* Right section: User menu */}
        <div className="flex items-center space-x-2">
          <button className="p-1 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
            <BellIcon className="w-4 h-4" />
          </button>

          <div className="flex items-center space-x-1">
            <img 
              src={user?.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${user?.name || user?.email}`}
              alt={user?.name || 'User'}
              className="h-6 w-6 rounded-full border border-indigo-500"
            />
            <div className="hidden md:block">
              <p className="text-xs font-medium text-gray-900 dark:text-white">{user?.name || 'User'}</p>
              <p className="text-[10px] text-gray-500 dark:text-gray-400">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="text-xs text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
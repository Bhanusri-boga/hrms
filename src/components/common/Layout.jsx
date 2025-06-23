import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

/**
 * Main layout component with 3D background and glassmorphic UI elements
 */
const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 overflow-x-hidden">
      <Header />
      <div className="flex pt-12 relative">
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main 
          className={`flex-1 min-h-[calc(100vh-3rem)] transition-all duration-300 ${
            isSidebarOpen ? 'ml-56' : 'ml-16'
          }`}
        >
          <div className="p-3">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-3 overflow-x-auto">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
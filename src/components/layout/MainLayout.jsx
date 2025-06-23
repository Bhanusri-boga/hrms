import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Scene3D from '../three/core/Scene3D';
import EnhancedBackground from '../three/core/EnhancedBackground';
import { colors } from '../../design/DesignSystem';

/**
 * MainLayout - The main layout component with 3D background and UI elements
 * 
 * This component provides the overall layout structure with:
 * - 3D animated background
 * - Navbar
 * - Sidebar
 * - Content area with page transitions
 */
const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Toggle sidebar
  // eslint-disable-next-line no-unused-vars
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  // Loading screen with enhanced visual effects
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-dark-700 flex items-center justify-center z-50">
        <Scene3D className="absolute inset-0">
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <EnhancedBackground 
            particleCount={100}
            floatingShapes={[
              { 
                position: [0, 0, -5], 
                color: colors.futuristic.glowPurple, 
                speed: 0.5, 
                size: 1, 
                shape: 'octahedron' 
              }
            ]}
            gridFloor={{ enabled: true, color: colors.primary[600] }}
            energyBeams={[
              {
                position: [0, 5, -10],
                color: colors.futuristic.energyBlue,
                intensity: 0.8
              }
            ]}
            glowingOrbs={[
              {
                position: [-5, 2, -8],
                color: colors.futuristic.glowCyan,
                intensity: 0.6,
                size: 0.5
              },
              {
                position: [5, -2, -8],
                color: colors.futuristic.plasmaViolet,
                intensity: 0.6,
                size: 0.5
              }
            ]}
          />
        </Scene3D>
        <div className="relative z-10 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-display text-primary-400 animate-text-glow">
              HRMS 3D
            </h1>
            <p className="text-gray-400 mt-2">Initializing system...</p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-dark-600 overflow-hidden">
      {/* 3D Background */}
      <Scene3D className="fixed inset-0 -z-10">
        <EnhancedBackground 
          particleCount={50}
          floatingShapes={[
            { 
              position: [-10, 5, -15], 
              color: colors.futuristic.glowPurple, 
              speed: 0.3, 
              size: 1.5, 
              shape: 'octahedron' 
            },
            { 
              position: [10, -5, -15], 
              color: colors.futuristic.glowCyan, 
              speed: 0.4, 
              size: 1, 
              shape: 'icosahedron' 
            }
          ]}
          gridFloor={{ 
            enabled: true, 
            color: colors.primary[600],
            opacity: 0.1,
            size: 100,
            divisions: 100
          }}
          energyBeams={[
            {
              position: [-15, 10, -20],
              color: colors.futuristic.energyBlue,
              intensity: 0.4
            },
            {
              position: [15, -10, -20],
              color: colors.futuristic.plasmaViolet,
              intensity: 0.4
            }
          ]}
        />
      </Scene3D>

      {/* Glassmorphic overlay */}
      <div className="fixed inset-0 bg-dark-600/30 backdrop-blur-sm z-0" />

      {/* Layout content */}
      <div className="relative z-10 flex h-full">
        {/* Animated sidebar */}
        <AnimatePresence mode="wait">
          {isSidebarOpen && (
            <motion.div
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed h-full w-64"
            >
              <Sidebar />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main content area */}
        <div className={`flex-1 ${isSidebarOpen ? 'ml-64' : ''} transition-all duration-300 ease-in-out h-full flex flex-col overflow-hidden`}>
          <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
          <main className="flex-1 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="h-full w-full px-4"
            >
              <Outlet />
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
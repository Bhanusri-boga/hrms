import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import Scene3D from '../three/core/Scene3D';
import EnhancedBackground from '../three/core/EnhancedBackground';
import Logo3D from '../three/core/Logo3D';
import { colors } from '../../design/DesignSystem';

/**
 * AuthLayout - Layout component for authentication pages
 * 
 * This component provides a 3D background and layout for login, register, etc.
 */
const AuthLayout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  
  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handleChange = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Loading screen
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-dark-700 flex items-center justify-center z-50">
        <Scene3D className="absolute inset-0">
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <EnhancedBackground 
            particleCount={100}
            floatingShapes={[
              { position: [0, 0, -5], color: colors.primary[600], speed: 0.5, size: 1, shape: 'octahedron' }
            ]}
            gridFloor={{ enabled: false }}
            energyBeams={[]}
            glowingOrbs={[
              { position: [0, 0, -3], color: colors.primary[400], size: 0.3, speed: 1, radius: 0 }
            ]}
            stars={{ enabled: true, count: 500 }}
          />
        </Scene3D>
        
        <div className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-display tracking-wider text-white mb-2 neon-text">
              HRMS
            </h1>
            <p className="text-gray-300">Human Resource Management System</p>
          </motion.div>
          
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className="h-1 bg-primary-600 rounded-full max-w-md mx-auto"
          />
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-dark-700 text-white overflow-hidden relative">
      {/* 3D Background */}
      <div className="fixed inset-0 z-0">
        <Scene3D
          enableEffects={!reducedMotion}
          adaptivePerformance={true}
        >
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <EnhancedBackground 
            particleCount={reducedMotion ? 100 : 300}
            particleType="dodecahedron"
            floatingShapes={reducedMotion ? [
              { position: [0, 0, -5], color: colors.primary[600], speed: 0.5, size: 1, shape: 'octahedron' }
            ] : [
              { position: [-4, 0, -2], color: colors.primary[400], speed: 0.7, size: 0.8, shape: 'sphere', sparkles: true },
              { position: [4, 0, -3], color: colors.neon.purple, speed: 0.8, size: 0.6, shape: 'torus' },
              { position: [0, 0, -5], color: colors.primary[600], speed: 0.9, size: 1.2, shape: 'octahedron', wobble: 1 }
            ]}
            gridFloor={{
              enabled: true,
              color1: colors.dark[500],
              color2: colors.primary[600],
              size: 100,
              divisions: 100,
              elevation: -5
            }}
            energyBeams={reducedMotion ? [] : [
              { start: [-5, -3, -5], end: [-5, 3, -5], color: colors.primary[400] },
              { start: [5, -3, -5], end: [5, 3, -5], color: colors.neon.purple }
            ]}
            glowingOrbs={reducedMotion ? [] : [
              { position: [-3, 2, -4], color: colors.primary[400], size: 0.3, speed: 1, radius: 2 },
              { position: [3, 2, -4], color: colors.neon.purple, size: 0.3, speed: 1.2, radius: 2 },
              { position: [0, 3, -6], color: colors.primary[600], size: 0.3, speed: 0.8, radius: 2 }
            ]}
            stars={{
              enabled: true,
              radius: 100,
              depth: 50,
              count: reducedMotion ? 500 : 1000,
              factor: 4,
              saturation: 0,
              fade: true,
              speed: 1
            }}
          />
        </Scene3D>
      </div>
      
      {/* Glassmorphic overlay for better readability */}
      <div className="absolute inset-0 bg-dark-600 bg-opacity-30 backdrop-blur-sm z-0"></div>
      
      {/* Logo */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10 w-40 h-40">
        <Scene3D
          enableEffects={!reducedMotion}
          cameraProps={{ position: [0, 0, 5], fov: 40 }}
          backgroundColor="transparent"
          enableFog={false}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <Logo3D 
            text="HRMS"
            style="cyber"
            color={colors.primary[600]}
            secondaryColor={colors.neon.purple}
          />
        </Scene3D>
      </div>
      
      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Outlet />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
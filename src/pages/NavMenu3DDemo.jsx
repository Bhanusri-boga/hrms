import React from 'react';
import NavMenu3DExample from '../components/examples/NavMenu3DExample';
import { BackgroundScene } from '../components/three/BackgroundScene';

const NavMenu3DDemo = () => {
  return (
    <div className="relative min-h-screen bg-dark-700 text-white overflow-hidden">
      {/* 3D Background */}
      <BackgroundScene className="fixed inset-0" />
      
      {/* Glassmorphic overlay for better readability */}
      <div className="absolute inset-0 bg-dark-600 bg-opacity-30 backdrop-blur-sm z-0"></div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        <h1 className="text-4xl font-display tracking-wider text-center mb-8 animate-glow neon-text">
          3D Navigation Menu Demo
        </h1>
        
        <div className="max-w-4xl mx-auto">
          <NavMenu3DExample />
        </div>
        
        <div className="mt-8 max-w-4xl mx-auto glass-card">
          <div className="p-6">
            <h2 className="text-2xl font-display mb-4 neon-text">About This Component</h2>
            <p className="mb-4">
              This enhanced 3D navigation menu component demonstrates advanced Three.js techniques and animations.
              It features multiple style options, customizable colors, and post-processing effects.
            </p>
            
            <h3 className="text-xl font-display mt-6 mb-2 text-primary-400">Features:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Multiple visual styles (Cyber, Holographic, Neon, Minimal)</li>
              <li>Customizable colors and animations</li>
              <li>Interactive hover and active states</li>
              <li>Post-processing effects with bloom</li>
              <li>Optimized performance with Suspense</li>
              <li>Responsive design that works in any container</li>
              <li>Icon support for menu items</li>
            </ul>
            
            <div className="mt-8 flex justify-center">
              <a 
                href="/" 
                className="btn-primary"
              >
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavMenu3DDemo;
import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { 
  Environment, 
  Loader, 
  PerformanceMonitor,
  AdaptiveDpr,
  AdaptiveEvents
} from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { colors } from '../../../design/DesignSystem';

/**
 * Scene3D - A base component for all 3D scenes
 * 
 * This component provides a configured Canvas with performance optimizations,
 * post-processing effects, and a loading indicator.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - The 3D scene content
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.enableEffects - Enable post-processing effects
 * @param {Object} props.cameraProps - Props for the default camera
 * @param {string} props.backgroundColor - Background color
 * @param {boolean} props.enableFog - Enable fog effect
 * @param {string} props.environmentPreset - Environment preset for lighting
 * @param {boolean} props.adaptivePerformance - Enable adaptive performance
 * @param {Object} props.effectsProps - Props for post-processing effects
 */
const Scene3D = ({
  children,
  className = '',
  enableEffects = true,
  cameraProps = { position: [0, 0, 10], fov: 75 },
  backgroundColor = colors.dark[500],
  enableFog = true,
  environmentPreset = 'night',
  adaptivePerformance = true,
  effectsProps = {
    bloom: { intensity: 0.5, luminanceThreshold: 0.2 },
    noise: { opacity: 0.05 },
    vignette: { darkness: 0.5 }
  }
}) => {
  const [dpr, setDpr] = React.useState(1.5);
  const canvasRef = useRef();

  // Handle adaptive performance
  const handlePerformanceChange = ({ factor }) => {
    if (adaptivePerformance) {
      setDpr(Math.max(1, Math.min(2, factor)));
    }
  };

  return (
    <div className={`relative ${className}`}>
      <Canvas
        ref={canvasRef}
        camera={cameraProps}
        dpr={dpr}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true
        }}
        shadows
      >
        {/* Background color */}
        <color attach="background" args={[backgroundColor]} />
        
        {/* Fog effect */}
        {enableFog && (
          <fog attach="fog" args={[backgroundColor, 10, 30]} />
        )}
        
        {/* Performance monitoring */}
        {adaptivePerformance && (
          <PerformanceMonitor onIncline={handlePerformanceChange} onDecline={handlePerformanceChange} />
        )}
        
        {/* Adaptive optimizations */}
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        
        {/* Scene content with Suspense for async loading */}
        <Suspense fallback={null}>
          {children}
          
          {/* Environment lighting */}
          <Environment preset={environmentPreset} />
        </Suspense>
        
        {/* Post-processing effects */}
        {enableEffects && (
          <EffectComposer multisampling={0}>
            <Bloom 
              intensity={effectsProps.bloom.intensity} 
              luminanceThreshold={effectsProps.bloom.luminanceThreshold} 
              luminanceSmoothing={0.9}
              mipmapBlur={true}
              kernelSize={KernelSize.MEDIUM}
            />
            <Noise 
              opacity={effectsProps.noise.opacity} 
              blendFunction={BlendFunction.OVERLAY} 
            />
            <Vignette 
              darkness={effectsProps.vignette.darkness} 
              offset={0.5} 
            />
          </EffectComposer>
        )}
      </Canvas>
      
      {/* Loading indicator */}
      <Loader 
        containerStyles={{
          background: backgroundColor,
          backdropFilter: 'blur(10px)'
        }}
        innerStyles={{
          backgroundColor: colors.primary[600],
          width: '50px',
          height: '5px'
        }}
        barStyles={{
          backgroundColor: colors.neon.purple,
          height: '5px'
        }}
        dataStyles={{
          color: colors.primary[300],
          fontSize: '0.8rem',
          fontFamily: 'Orbitron, sans-serif'
        }}
        dataInterpolation={(p) => `Loading ${p.toFixed(0)}%`}
      />
    </div>
  );
};

export default Scene3D;
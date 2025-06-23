import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  Trail, 
  MeshDistortMaterial, 
  Environment, 
  Float, 
  Sparkles,
  Effects
} from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import * as THREE from 'three';
import { colors, materials } from '../../design/DesignSystem';

// Enhanced animated logo component
const LogoGeometry = ({ 
  color = colors.primary[600],
  glowColor = colors.futuristic.glowPurple,
  style = 'cyber'
}) => {
  const group = useRef();
  const sphere = useRef();
  const ring = useRef();

  // Create particles for the energy effect
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 50; i++) {
      const angle = (i / 50) * Math.PI * 2;
      const radius = 1.2;
      temp.push({
        position: [
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          0
        ],
        scale: Math.random() * 0.2 + 0.1
      });
    }
    return temp;
  }, []);
  
  // Get material based on style
  const getMaterial = () => {
    switch (style) {
      case 'cyber':
        return materials.cyber.primary;
      case 'holographic':
        return materials.holographic.primary;
      case 'neon':
        return materials.neon.primary;
      default:
        return materials.glossy.primary;
    }
  };
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    
    // Enhanced rotation animation
    if (group.current) {
      group.current.rotation.y = Math.sin(t * 0.3) * 0.2;
      group.current.rotation.x = Math.sin(t * 0.2) * 0.1;
    }
    
    // Pulse and distort effects
    if (sphere.current) {
      sphere.current.scale.setScalar(1 + Math.sin(t * 2) * 0.05);
      sphere.current.morphTargetInfluences[0] = Math.sin(t * 2) * 0.5 + 0.5;
    }
    
    // Ring rotation and scale
    if (ring.current) {
      ring.current.rotation.z += 0.001;
      ring.current.scale.setScalar(1 + Math.sin(t * 1.5) * 0.05);
    }
  });

  return (
    <Float 
      speed={2} 
      rotationIntensity={0.5} 
      floatIntensity={0.5}
    >
      <group ref={group}>
        {/* Main sphere */}
        <Trail
          width={0.2}
          length={8}
          color={color}
          attenuation={(t) => t * t}
        >
          <mesh ref={sphere}>
            <sphereGeometry args={[0.6, 32, 32]} />
            <MeshDistortMaterial
              {...getMaterial()}
              color={color}
              emissive={glowColor}
              emissiveIntensity={0.5}
              distort={0.3}
              speed={2}
            />
          </mesh>
        </Trail>

        {/* Outer ring */}
        <mesh ref={ring}>
          <torusGeometry args={[1, 0.1, 16, 64]} />
          <MeshDistortMaterial
            {...getMaterial()}
            color={color}
            emissive={glowColor}
            emissiveIntensity={0.3}
            distort={0.2}
            speed={1}
          />
        </mesh>

        {/* Energy particles */}
        <Sparkles
          count={50}
          scale={3}
          size={2}
          speed={0.5}
          opacity={0.5}
          color={glowColor}
        />

        {/* Particle system */}
        {particles.map((particle, i) => (
          <mesh
            key={i}
            position={particle.position}
            scale={particle.scale}
          >
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshBasicMaterial
              color={glowColor}
              transparent
              opacity={0.5}
            />
          </mesh>
        ))}
      </group>
    </Float>
  );
};

// Main component with enhanced canvas setup
const Logo3D = ({ 
  className, 
  color = colors.primary[600],
  glowColor = colors.futuristic.glowPurple,
  style = 'cyber' 
}) => {
  return (
    <div className={`${className} relative w-full h-full min-h-[200px]`}>
      <Canvas
        gl={{
          powerPreference: "high-performance",
          antialias: true,
          stencil: false,
          depth: true
        }}
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight
          position={[0, 5, 0]}
          angle={0.3}
          penumbra={1}
          intensity={0.5}
          color={color}
        />
        <Environment preset="city" />
        <LogoGeometry color={color} glowColor={glowColor} style={style} />
        <EffectComposer multisampling={0}>
          <Bloom
            intensity={1.5}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.9}
            mipmapBlur={true}
            kernelSize={KernelSize.MEDIUM}
          />
          <ChromaticAberration offset={[0.002, 0.002]} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default Logo3D;
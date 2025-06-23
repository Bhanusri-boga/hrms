import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, MeshDistortMaterial, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { fonts } from '../../../config/fonts';

/**
 * Logo3D - Advanced 3D logo component with multiple styles and effects
 * 
 * @param {Object} props
 * @param {string} props.text - Logo text
 * @param {string} props.style - Logo style ('cyber', 'holographic', 'neon', 'minimal')
 * @param {string} props.color - Primary color
 * @param {string} props.secondaryColor - Secondary color for effects
 * @param {string} props.textColor - Text color
 * @param {Array} props.position - Logo position [x, y, z]
 * @param {Array} props.rotation - Logo rotation [x, y, z]
 * @param {number} props.scale - Logo scale
 * @param {boolean} props.animated - Whether logo is animated
 * @param {string} props.font - Text font path
 */
const LogoContent = ({
  text = 'HRMS',
  style = 'cyber',
  color = '#4f46e5', // Default indigo color
  secondaryColor = '#9333ea', // Default purple color
  textColor = '#ffffff',
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  animated = true,
  font = fonts.orbitron.bold
}) => {
  const logoRef = useRef();
  const textRef = useRef();
  const glowRef = useRef();
  
  // Animation for logo
  useFrame(({ clock }) => {
    if (animated && logoRef.current) {
      const t = clock.getElapsedTime();
      
      // Different animations based on style
      switch (style) {
        case 'holographic':
          logoRef.current.rotation.y = rotation[1] + Math.sin(t * 0.5) * 0.2;
          break;
        case 'neon':
          // Pulsing effect for neon
          if (glowRef.current) {
            glowRef.current.material.opacity = 0.5 + Math.sin(t * 2) * 0.3;
          }
          break;
        case 'minimal':
          // Subtle rotation for minimal
          logoRef.current.rotation.z = rotation[2] + Math.sin(t * 0.3) * 0.05;
          break;
        case 'cyber':
        default:
          // Distortion effect for cyber
          if (textRef.current) {
            textRef.current.position.y = Math.sin(t * 0.5) * 0.05;
          }
          break;
      }
    }
  });
  
  // Logo base based on style
  const LogoBase = () => {
    switch (style) {
      case 'holographic':
        return (
          <group>
            <mesh>
              <torusGeometry args={[1.2, 0.1, 16, 32]} />
              <meshPhysicalMaterial
                color={color}
                roughness={0.1}
                metalness={0.2}
                transmission={0.5}
                thickness={0.5}
                ior={1.5}
                emissive={color}
                emissiveIntensity={0.3}
              />
            </mesh>
            <Sparkles 
              count={20} 
              scale={[3, 3, 3]} 
              size={0.2} 
              speed={0.3} 
              opacity={0.5}
              color={secondaryColor}
            />
          </group>
        );
      case 'neon':
        return (
          <group>
            <mesh>
              <ringGeometry args={[0.9, 1.1, 32]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={1.5}
                roughness={0.2}
                metalness={0.8}
                toneMapped={false}
              />
            </mesh>
            <mesh ref={glowRef}>
              <ringGeometry args={[0.8, 1.2, 32]} />
              <meshBasicMaterial
                color={secondaryColor}
                transparent={true}
                opacity={0.5}
                toneMapped={false}
              />
            </mesh>
          </group>
        );
      case 'minimal':
        return (
          <group>
            <mesh>
              <planeGeometry args={[2.5, 1]} />
              <meshStandardMaterial
                color={color}
                roughness={0.5}
                metalness={0.2}
                emissive={color}
                emissiveIntensity={0.1}
                transparent={true}
                opacity={0.8}
              />
            </mesh>
            <mesh position={[0, 0, -0.01]}>
              <planeGeometry args={[2.6, 1.1]} />
              <meshBasicMaterial
                color={secondaryColor}
                transparent={true}
                opacity={0.2}
              />
            </mesh>
          </group>
        );
      case 'cyber':
      default:
        return (
          <group>
            <mesh>
              <octahedronGeometry args={[1.2, 0]} />
              <MeshDistortMaterial
                color={color}
                roughness={0.2}
                metalness={0.8}
                emissive={color}
                emissiveIntensity={0.3}
                distort={0.3}
                speed={0.5}
              />
            </mesh>
          </group>
        );
    }
  };
  
  return (
    <group 
      position={position}
      rotation={rotation}
      scale={scale}
      ref={logoRef}
    >
      {/* Logo base */}
      {style === 'holographic' || style === 'neon' ? (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <LogoBase />
        </Float>
      ) : (
        <LogoBase />
      )}
      
      {/* Logo text */}
      <group ref={textRef}>
        <Text
          position={[0, 0, 0.1]}
          fontSize={0.5}
          color={textColor}
          anchorX="center"
          anchorY="middle"
          font={font}
          letterSpacing={0.1}
          outlineWidth={0.01}
          outlineColor="#000000"
          outlineOpacity={0.3}
        >
          {text}
        </Text>
      </group>
      
      {/* Additional effects based on style */}
      {style === 'cyber' && (
        <mesh position={[0, 0, -0.1]} rotation={[0, 0, Math.PI / 4]}>
          <planeGeometry args={[2, 2]} />
          <meshBasicMaterial 
            color={secondaryColor} 
            wireframe={true}
            transparent={true}
            opacity={0.2}
          />
        </mesh>
      )}
      
      {style === 'holographic' && (
        <mesh position={[0, 0, -0.2]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial 
            color={secondaryColor} 
            wireframe={true}
            transparent={true}
            opacity={0.1}
          />
        </mesh>
      )}
      
      {style === 'neon' && (
        <group>
          {/* Radial lines */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            return (
              <mesh 
                key={i} 
                position={[
                  Math.cos(angle) * 0.6, 
                  Math.sin(angle) * 0.6, 
                  -0.1
                ]}
                rotation={[0, 0, angle]}
              >
                <planeGeometry args={[0.05, 1]} />
                <meshBasicMaterial 
                  color={secondaryColor} 
                  transparent={true}
                  opacity={0.3}
                />
              </mesh>
            );
          })}
        </group>
      )}
    </group>
  );
};

// Wrapper component that provides the Canvas
const Logo3D = (props) => {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '200px' }}>
      <Canvas
        camera={{ position: [0, 0, 5] }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <LogoContent {...props} />
      </Canvas>
    </div>
  );
};

export default Logo3D;
import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, MeshTransmissionMaterial, Text } from '@react-three/drei';
import * as THREE from 'three';
import { colors, materials } from '../../design/DesignSystem';

const Form3D = ({ width = 4, height = 3, depth = 0.1, children, style = 'cyber' }) => {
  const mesh = useRef();
  
  // Subtle floating animation
  useFrame((state) => {
    if (mesh.current) {
      const t = state.clock.getElapsedTime();
      mesh.current.position.y = Math.sin(t * 0.5) * 0.02;
    }
  });

  // Get material based on style
  const getMaterial = () => {
    switch (style) {
      case 'cyber':
        return materials.cyber.primary;
      case 'holographic':
        return {
          ...materials.holographic.primary,
          transmission: 0.95,
          thickness: 0.5,
          roughness: 0.05,
          chromaticAberration: 0.5,
          anisotropy: 1,
          distortion: 0.2,
          temporalDistortion: 0.2,
          distortionScale: 0.5
        };
      case 'neon':
        return materials.neon.primary;
      default:
        return materials.glossy.primary;
    }
  };

  const [scale, setScale] = useState(0.9);
  const [opacity, setOpacity] = useState(0);
  
  // Animation effect
  useEffect(() => {
    const animationTimeout = setTimeout(() => {
      setScale(1);
      setOpacity(1);
    }, 10);
    
    return () => clearTimeout(animationTimeout);
  }, []);
  
  // Animation frame
  useFrame(() => {
    if (mesh.current) {
      // Animate scale and opacity
      mesh.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
      
      // Floating animation
      const t = performance.now() * 0.001;
      mesh.current.position.y = Math.sin(t * 0.5) * 0.02;
    }
  });

  return (
    <group ref={mesh}>
      <RoundedBox args={[width, height, depth]} radius={0.05} smoothness={4}>
        <MeshTransmissionMaterial
          {...getMaterial()}
          samples={16}
          resolution={256}
          distortionScale={0.5}
          temporalDistortion={0.1}
          transparent
          opacity={opacity}
        />
      </RoundedBox>
      {children}
    </group>
  );
};

// Label component with neon glow
export const FormLabel3D = ({ text, position, size = 0.1 }) => (
  <Text
    position={position}
    fontSize={size}
    color={colors.primary[400]}
    font="/fonts/Orbitron-Regular.ttf"
    anchorX="left"
    anchorY="middle"
    maxWidth={2}
    outlineWidth={0.005}
    outlineColor={colors.primary[600]}
  >
    {text}
  </Text>
);

// Input field with glow effect
export const FormInput3D = ({ position, width = 2, height = 0.3, active = false }) => (
  <RoundedBox
    position={position}
    args={[width, height, 0.05]}
    radius={0.02}
    smoothness={4}
  >
    <MeshTransmissionMaterial
      {...(active ? materials.neon.primary : materials.glass.dark)}
      samples={16}
      resolution={256}
      distortionScale={0.2}
      temporalDistortion={0.1}
    />
  </RoundedBox>
);

export default Form3D;

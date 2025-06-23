import React, { useRef, useState } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { Text, RoundedBox, Environment } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { BlendFunction, KernelSize } from 'postprocessing';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';
import { colors, typography } from '../../design/DesignSystem';

// Text component for the card
const CardText = ({ text, position = [0, 0, 0.11], size = 0.2, color = '#ffffff' }) => {
  return (
    <Text
      position={position}
      fontSize={size}
      color={color}
      anchorX="center"
      anchorY="middle"
      maxWidth={2.5}
      textAlign="center"
      font={'/fonts/Orbitron-Regular.ttf'}
      characters="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,!?@#$%^&*()_+"
    >
      {text}
    </Text>
  );
};

// The Card component
const EnhancedCard = ({ 
  children, 
  width = 3, 
  height = 2, 
  depth = 0.2, 
  color = colors.primary[600], 
  hoverColor = colors.primary[500],
  style = 'cyber',
  ...props 
}) => {
  const mesh = useRef();
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);

  // Convert hex colors to THREE.Color objects
  const baseColor = new THREE.Color(color);
  const highlightColor = new THREE.Color(hoverColor);

  const { scale, cardColor, emissiveIntensity } = useSpring({
    scale: active ? [1.15, 1.15, 1.15] : hovered ? [1.05, 1.05, 1.05] : [1, 1, 1],
    cardColor: hovered ? highlightColor : baseColor,
    emissiveIntensity: hovered ? 0.5 : 0.2,
    config: { mass: 1, tension: 280, friction: 40 }
  });

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.02;
      mesh.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.02;
    }
  });

  return (
    <animated.mesh
      ref={mesh}
      scale={scale}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      {...props}
    >
      <RoundedBox args={[width, height, depth]} radius={0.15} smoothness={4}>
        <animated.meshPhysicalMaterial
          color={cardColor}
          roughness={0.1}
          metalness={0.8}
          clearcoat={0.8}
          clearcoatRoughness={0.2}
          envMapIntensity={2}
          emissive={cardColor}
          emissiveIntensity={emissiveIntensity}
        />
      </RoundedBox>
      {children}
    </animated.mesh>
  );
};

// Main component with enhanced canvas setup
const Card3D = ({ 
  title, 
  value, 
  color = colors.primary[600], 
  textColor = '#ffffff', 
  style = 'cyber',
  className 
}) => {
  return (
    <div className={`${className} h-40 w-full relative`}>
      <Canvas
        gl={{
          powerPreference: "high-performance",
          antialias: true,
          stencil: false,
          depth: true
        }}
        camera={{ position: [0, 0, 3], fov: 50 }}
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
        <EnhancedCard color={color} style={style}>
          <CardText text={title} position={[0, 0.5, 0.11]} size={0.2} color={textColor} />
          <CardText text={value} position={[0, 0, 0.11]} size={0.4} color={textColor} />
        </EnhancedCard>
        <EffectComposer multisampling={0}>
          <Bloom
            intensity={1.5}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            mipmapBlur={true}
            kernelSize={KernelSize.MEDIUM}
            blendFunction={BlendFunction.SCREEN}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default Card3D;
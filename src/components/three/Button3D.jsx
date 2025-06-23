import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, RoundedBox, MeshDistortMaterial, Environment } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { colors, materials } from '../../design/DesignSystem';

// Enhanced 3D Button component
const Button = ({ 
  children, 
  onClick, 
  width = 3, 
  height = 1, 
  depth = 0.4, 
  color = colors.primary[600],
  hoverColor = colors.primary[500],
  textColor = '#ffffff',
  style = 'cyber',
  disabled = false,
  ...props 
}) => {
  const mesh = useRef();
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Enhanced animations
  const { scale, rotation, buttonColor, glow, distort } = useSpring({
    scale: clicked ? [0.95, 0.95, 0.95] : hovered ? [1.05, 1.05, 1.05] : [1, 1, 1],
    rotation: hovered ? [0, 0.1, 0] : [0, 0, 0],
    buttonColor: disabled ? '#666666' : hovered ? hoverColor : color,
    glow: hovered ? 0.5 : 0.2,
    distort: hovered ? 0.2 : 0,
    config: { mass: 1, tension: 280, friction: 40 }
  });

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

  // Click handler
  const handleClick = () => {
    if (!disabled) {
      setClicked(true);
      setTimeout(() => setClicked(false), 150);
      onClick?.();
    }
  };

  // Hover animations
  useFrame((state) => {
    if (mesh.current && !disabled) {
      const time = state.clock.getElapsedTime();
      if (hovered) {
        mesh.current.position.y = Math.sin(time * 2) * 0.02;
      }
    }
  });

  return (
    <>
      <animated.mesh
        ref={mesh}
        scale={scale}
        rotation={rotation}
        onClick={handleClick}
        onPointerOver={() => !disabled && setHovered(true)}
        onPointerOut={() => !disabled && setHovered(false)}
        {...props}
      >
        <RoundedBox args={[width, height, depth]} radius={0.15} smoothness={4}>
          <MeshDistortMaterial
            {...getMaterial()}
            distort={distort}
            speed={2}
            envMapIntensity={2}
          >
            <animated.color attach="color" color={buttonColor} />
            <animated.color attach="emissive" color={buttonColor} />
            <animated.number attach="emissiveIntensity" value={glow} />
          </MeshDistortMaterial>
        </RoundedBox>
        <Text
          position={[0, 0, depth / 2 + 0.01]}
          fontSize={height * 0.4}
          color={textColor}
          anchorX="center"
          anchorY="middle"
          font="/fonts/Orbitron-Regular.ttf"
          maxWidth={width * 0.8}
          textAlign="center"
        >
          {children}
        </Text>
      </animated.mesh>

      {/* Add glow effect when hovered */}
      {hovered && !disabled && (
        <EffectComposer>
          <Bloom
            intensity={1.5}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.9}
            height={200}
          />
        </EffectComposer>
      )}
    </>
  );
};

// Main component with canvas setup
const Button3D = ({ className, ...props }) => {
  return (
    <div className={`${className} relative h-20`}>
      <Canvas
        gl={{
          powerPreference: "high-performance",
          antialias: true,
          stencil: false,
          depth: true
        }}
        camera={{ position: [0, 0, 4], fov: 50 }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight
          position={[0, 5, 0]}
          angle={0.3}
          penumbra={1}
          intensity={0.5}
          color={props.color || colors.primary[600]}
        />
        <Environment preset="city" />
        <Button {...props} />
      </Canvas>
    </div>
  );
};

export default Button3D;
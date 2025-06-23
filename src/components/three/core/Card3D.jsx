import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, RoundedBox, MeshTransmissionMaterial, MeshDistortMaterial, Sparkles } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';
import { colors } from '../../../design/DesignSystem';

/**
 * Card3D - Advanced 3D card component with multiple styles and effects
 * 
 * @param {Object} props
 * @param {string} props.title - Card title
 * @param {string} props.value - Card value
 * @param {string} props.subtitle - Card subtitle
 * @param {string} props.style - Card style ('cyber', 'holographic', 'neon', 'minimal')
 * @param {string} props.color - Primary color
 * @param {string} props.secondaryColor - Secondary color for gradients and effects
 * @param {string} props.textColor - Text color
 * @param {Array} props.position - Card position [x, y, z]
 * @param {Array} props.rotation - Card rotation [x, y, z]
 * @param {Array} props.size - Card size [width, height, depth]
 * @param {boolean} props.interactive - Whether card responds to hover/click
 * @param {function} props.onClick - Click handler
 * @param {string} props.icon - Icon to display (emoji or character)
 * @param {boolean} props.floating - Whether card floats/animates
 */
const Card3D = ({
  title = 'TITLE',
  value = '100',
  subtitle = '',
  style = 'cyber',
  color = colors.primary[600],
  secondaryColor = colors.neon.purple,
  textColor = '#ffffff',
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  size = [3, 2, 0.2],
  interactive = true,
  onClick = () => {},
  icon = null,
  floating = true
}) => {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const cardRef = useRef();
  const glowRef = useRef();
  const valueRef = useRef();
  
  // Handle pointer events
  const handlePointerOver = () => interactive && setHovered(true);
  const handlePointerOut = () => interactive && setHovered(false);
  const handleClick = () => {
    if (interactive) {
      setClicked(true);
      onClick();
      setTimeout(() => setClicked(false), 150);
    }
  };
  
  // Animation with react-spring
  const { 
    cardScale, 
    cardPosition, 
    cardRotation, 
    glowOpacity, 
    valueScale 
  } = useSpring({
    cardScale: clicked ? 0.95 : hovered ? 1.05 : 1,
    cardPosition: clicked ? [position[0], position[1] - 0.05, position[2]] : position,
    cardRotation: hovered ? [rotation[0] + 0.05, rotation[1] + 0.05, rotation[2]] : rotation,
    glowOpacity: hovered ? 0.8 : 0.2,
    valueScale: hovered ? 1.1 : 1,
    config: {
      tension: 300,
      friction: 20,
    }
  });
  
  // Floating animation
  useFrame(({ clock }) => {
    if (floating && cardRef.current) {
      const t = clock.getElapsedTime();
      cardRef.current.position.y += Math.sin(t * 0.5) * 0.0005;
      cardRef.current.rotation.z = rotation[2] + Math.sin(t * 0.3) * 0.01;
    }
    
    // Glow animation
    if (glowRef.current) {
      const t = clock.getElapsedTime();
      const baseOpacity = hovered ? 0.8 : 0.2;
      const pulseIntensity = hovered ? Math.sin(t * 3) * 0.2 : 0;
      glowRef.current.material.opacity = baseOpacity + pulseIntensity;
    }
    
    // Value pulsing animation
    if (valueRef.current && hovered) {
      const t = clock.getElapsedTime();
      valueRef.current.scale.setScalar(1 + Math.sin(t * 5) * 0.03);
    }
  });
  
  // Card material based on style
  const CardMaterial = ({ color }) => {
    switch (style) {
      case 'holographic':
        return (
          <MeshTransmissionMaterial
            backside={false}
            samples={4}
            thickness={0.2}
            chromaticAberration={0.05}
            anisotropy={0.1}
            distortion={0.2}
            distortionScale={0.2}
            temporalDistortion={0.1}
            iridescence={1}
            iridescenceIOR={1}
            iridescenceThicknessRange={[0, 1400]}
            color={color}
            reflectivity={0.2}
            transmission={0.9}
            roughness={0.1}
            metalness={0.1}
            envMapIntensity={1}
            clearcoat={1}
            clearcoatRoughness={0.1}
            opacity={0.9}
          />
        );
      case 'neon':
        return (
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={1.5}
            roughness={0.2}
            metalness={0.8}
            toneMapped={false}
          />
        );
      case 'minimal':
        return (
          <meshStandardMaterial
            color={color}
            roughness={0.5}
            metalness={0.2}
            emissive={color}
            emissiveIntensity={0.1}
          />
        );
      case 'cyber':
      default:
        return (
          <MeshDistortMaterial
            color={color}
            roughness={0.2}
            metalness={0.8}
            emissive={color}
            emissiveIntensity={0.3}
            distort={0.1}
            speed={0.5}
          />
        );
    }
  };
  
  return (
    <animated.group 
      position={cardPosition}
      rotation={cardRotation}
      scale={cardScale}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      {/* Card body */}
      <animated.mesh ref={cardRef}>
        <RoundedBox args={size} radius={0.1} smoothness={4}>
          <CardMaterial color={color} />
        </RoundedBox>
      </animated.mesh>
      
      {/* Glow effect */}
      <mesh 
        ref={glowRef}
        position={[0, 0, size[2] / 2 + 0.005]}
      >
        <RoundedBox args={[size[0] - 0.05, size[1] - 0.05, 0.01]} radius={0.1} smoothness={4}>
          <animated.meshBasicMaterial 
            color={secondaryColor} 
            opacity={glowOpacity} 
            transparent={true}
            toneMapped={false}
          />
        </RoundedBox>
      </mesh>
      
      {/* Card title */}
      <Text
        position={[0, size[1] / 2 - 0.3, size[2] / 2 + 0.01]}
        fontSize={0.2}
        color={textColor}
        anchorX="center"
        anchorY="middle"
        font="/fonts/Orbitron-Medium.ttf"
        letterSpacing={0.05}
        outlineWidth={0.01}
        outlineColor="#000000"
        outlineOpacity={0.3}
      >
        {title}
      </Text>
      
      {/* Card value */}
      <animated.group 
        position={[0, 0, size[2] / 2 + 0.01]} 
        scale={valueScale}
        ref={valueRef}
      >
        <Text
          fontSize={0.4}
          color={textColor}
          anchorX="center"
          anchorY="middle"
          font="/fonts/Orbitron-Bold.ttf"
          letterSpacing={0.05}
          outlineWidth={0.01}
          outlineColor="#000000"
          outlineOpacity={0.3}
        >
          {value}
        </Text>
      </animated.group>
      
      {/* Card subtitle */}
      {subtitle && (
        <Text
          position={[0, -size[1] / 2 + 0.3, size[2] / 2 + 0.01]}
          fontSize={0.15}
          color={textColor}
          anchorX="center"
          anchorY="middle"
          font="/fonts/Orbitron-Light.ttf"
          letterSpacing={0.05}
          outlineWidth={0.01}
          outlineColor="#000000"
          outlineOpacity={0.3}
        >
          {subtitle}
        </Text>
      )}
      
      {/* Icon if provided */}
      {icon && (
        <Text
          position={[-size[0] / 2 + 0.4, size[1] / 2 - 0.3, size[2] / 2 + 0.01]}
          fontSize={0.25}
          color={textColor}
          anchorX="center"
          anchorY="middle"
        >
          {icon}
        </Text>
      )}
      
      {/* Circuit pattern for cyber style */}
      {style === 'cyber' && (
        <mesh position={[0, 0, -size[2] / 2 + 0.01]}>
          <RoundedBox args={[size[0] * 0.95, size[1] * 0.95, 0.01]} radius={0.1} smoothness={4}>
            <meshBasicMaterial 
              color={color} 
              opacity={0.1} 
              transparent={true}
              wireframe={true}
            />
          </RoundedBox>
        </mesh>
      )}
      
      {/* Sparkles for holographic style */}
      {style === 'holographic' && (
        <Sparkles 
          count={20} 
          scale={[size[0] * 0.8, size[1] * 0.8, 0.5]} 
          size={0.2} 
          speed={0.3} 
          opacity={0.5}
          color={secondaryColor}
          position={[0, 0, size[2] / 2 + 0.1]}
        />
      )}
      
      {/* Edge highlight for neon style */}
      {style === 'neon' && (
        <mesh position={[0, 0, 0]}>
          <RoundedBox args={[size[0] + 0.02, size[1] + 0.02, size[2] + 0.02]} radius={0.11} smoothness={4}>
            <meshBasicMaterial 
              color={secondaryColor} 
              opacity={hovered ? 0.3 : 0.1} 
              transparent={true}
              wireframe={true}
            />
          </RoundedBox>
        </mesh>
      )}
    </animated.group>
  );
};

export default Card3D;
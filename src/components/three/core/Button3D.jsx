import React, { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, RoundedBox, MeshTransmissionMaterial } from '@react-three/drei';
// eslint-disable-next-line no-unused-vars
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';
import { colors } from '../../../design/DesignSystem';
import { fonts } from '../../../config/fonts';

/**
 * Button3D - Advanced 3D button component with multiple styles and effects
 * 
 * @param {Object} props
 * @param {string} props.text - Button text
 * @param {function} props.onClick - Click handler
 * @param {string} props.style - Button style ('cyber', 'holographic', 'neon', 'minimal')
 * @param {string} props.color - Primary color
 * @param {string} props.hoverColor - Color when hovered
 * @param {string} props.textColor - Text color
 * @param {boolean} props.disabled - Disabled state
 * @param {Array} props.position - Button position [x, y, z]
 * @param {Array} props.size - Button size [width, height, depth]
 * @param {number} props.fontSize - Text font size
 * @param {string} props.font - Text font path
 * @param {boolean} props.loading - Loading state
 * @param {string} props.icon - Icon to display (emoji or character)
 */
const Button3D = ({
  text = 'BUTTON',
  onClick = () => {},
  style = 'cyber',
  color = colors.primary[600],
  hoverColor = colors.primary[500],
  textColor = '#ffffff',
  disabled = false,
  position = [0, 0, 0],
  size = [2.5, 0.8, 0.2],
  fontSize = 0.25,
  font = fonts.orbitron.medium,
  loading = false,
  icon = null
}) => {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const buttonRef = useRef();
  const textRef = useRef();
  const glowRef = useRef();
  const loadingRef = useRef();
  
  // Handle pointer events
  const handlePointerOver = () => !disabled && setHovered(true);
  const handlePointerOut = () => !disabled && setHovered(false);
  const handleClick = () => {
    if (!disabled && !loading) {
      setClicked(true);
      onClick();
      setTimeout(() => setClicked(false), 150);
    }
  };
  
  // Animation with react-spring
  const { 
    buttonScale, 
    buttonColor, 
    buttonPosition, 
    glowOpacity, 
    textPosition 
  } = useSpring({
    buttonScale: clicked ? 0.95 : hovered ? 1.05 : 1,
    buttonColor: disabled ? '#666666' : hovered ? hoverColor : color,
    buttonPosition: clicked ? [position[0], position[1] - 0.02, position[2]] : position,
    glowOpacity: disabled ? 0 : hovered ? 0.8 : 0.2,
    textPosition: clicked ? [0, -0.01, size[2] / 2 + 0.01] : [0, 0, size[2] / 2 + 0.01],
    config: {
      tension: 300,
      friction: 20,
    }
  });
  
  // Loading animation
  useFrame(({ clock }) => {
    if (loading && loadingRef.current) {
      const t = clock.getElapsedTime();
      loadingRef.current.rotation.z = t * 2;
    }
    
    // Glow animation
    if (glowRef.current) {
      const t = clock.getElapsedTime();
      const baseOpacity = disabled ? 0 : hovered ? 0.8 : 0.2;
      const pulseIntensity = hovered ? Math.sin(t * 3) * 0.2 : 0;
      glowRef.current.material.opacity = baseOpacity + pulseIntensity;
    }
    
    // Text floating animation
    if (textRef.current && hovered && !disabled) {
      const t = clock.getElapsedTime();
      textRef.current.position.y = Math.sin(t * 5) * 0.01;
    }
  });
  
  // Button material based on style
  const ButtonMaterial = ({ color }) => {
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
          <meshStandardMaterial
            color={color}
            roughness={0.2}
            metalness={0.8}
            emissive={color}
            emissiveIntensity={0.3}
          />
        );
    }
  };
  
  return (
    <animated.group 
      position={buttonPosition}
      scale={buttonScale}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      {/* Button body */}
      <animated.mesh ref={buttonRef}>
        <RoundedBox args={size} radius={0.1} smoothness={4}>
          <ButtonMaterial color={buttonColor} />
        </RoundedBox>
      </animated.mesh>
      
      {/* Glow effect */}
      <mesh 
        ref={glowRef}
        position={[0, 0, size[2] / 2 + 0.005]}
      >
        <RoundedBox args={[size[0] - 0.05, size[1] - 0.05, 0.01]} radius={0.1} smoothness={4}>
          <animated.meshBasicMaterial 
            color={hoverColor} 
            opacity={glowOpacity} 
            transparent={true}
            toneMapped={false}
          />
        </RoundedBox>
      </mesh>
      
      {/* Button text */}
      <animated.group position={textPosition} ref={textRef}>
        <Text
          fontSize={fontSize}
          color={textColor}
          anchorX="center"
          anchorY="middle"
          font={font}
          letterSpacing={0.05}
          outlineWidth={0.01}
          outlineColor="#000000"
          outlineOpacity={0.3}
        >
          {loading ? 'LOADING...' : text}
        </Text>
        
        {/* Icon if provided */}
        {icon && !loading && (
          <Text
            position={[-size[0] / 2 + 0.3, 0, 0]}
            fontSize={fontSize * 1.2}
            color={textColor}
            anchorX="center"
            anchorY="middle"
          >
            {icon}
          </Text>
        )}
      </animated.group>
      
      {/* Loading spinner */}
      {loading && (
        <mesh ref={loadingRef} position={[-size[0] / 2 + 0.3, 0, size[2] / 2 + 0.01]}>
          <ringGeometry args={[0.1, 0.15, 16]} />
          <meshBasicMaterial color={textColor} transparent opacity={0.8} />
        </mesh>
      )}
      
      {/* Circuit pattern for cyber style */}
      {style === 'cyber' && !disabled && (
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
      
      {/* Edge highlight for neon style */}
      {style === 'neon' && !disabled && (
        <mesh position={[0, 0, 0]}>
          <RoundedBox args={[size[0] + 0.02, size[1] + 0.02, size[2] + 0.02]} radius={0.11} smoothness={4}>
            <meshBasicMaterial 
              color={hoverColor} 
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

export default Button3D;
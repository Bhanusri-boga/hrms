import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, RoundedBox, Html } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';
import { colors } from '../../../design/DesignSystem';

/**
 * FormField3D - 3D form field component
 */
const FormField3D = ({
  label,
  type = 'text',
  value = '',
  onChange = () => {},
  error = '',
  required = false,
  position = [0, 0, 0],
  width = 3,
  height = 0.8,
  style = 'cyber',
  color = colors.primary[600],
  hoverColor = colors.primary[400],
  errorColor = colors.utility.error,
  textColor = '#ffffff',
  placeholder = '',
  disabled = false
}) => {
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const fieldRef = useRef();
  const labelRef = useRef();
  const errorRef = useRef();
  
  // Animation with react-spring
  const { 
    fieldScale, 
    fieldColor, 
    glowOpacity, 
    labelPosition 
  } = useSpring({
    fieldScale: focused ? [1.05, 1.05, 1.05] : hovered ? [1.02, 1.02, 1.02] : [1, 1, 1],
    fieldColor: error ? errorColor : focused ? hoverColor : hovered ? hoverColor : color,
    glowOpacity: error ? 0.8 : focused ? 0.6 : hovered ? 0.3 : 0.1,
    labelPosition: [0, height / 2 + 0.2, 0],
    config: {
      tension: 300,
      friction: 20,
    }
  });
  
  // Floating animation
  useFrame(({ clock }) => {
    if (fieldRef.current) {
      const t = clock.getElapsedTime();
      
      // Subtle floating effect
      if (focused || hovered) {
        fieldRef.current.position.y = position[1] + Math.sin(t * 2) * 0.01;
      }
      
      // Error shake effect
      if (error) {
        fieldRef.current.position.x = position[0] + Math.sin(t * 20) * 0.01;
      }
    }
    
    // Label animation
    if (labelRef.current) {
      const t = clock.getElapsedTime();
      if (focused) {
        labelRef.current.position.y = height / 2 + 0.2 + Math.sin(t * 3) * 0.01;
      }
    }
    
    // Error message animation
    if (errorRef.current && error) {
      const t = clock.getElapsedTime();
      errorRef.current.position.y = -height / 2 - 0.2 + Math.sin(t * 3) * 0.01;
    }
  });
  
  // Field material based on style
  const FieldMaterial = ({ color }) => {
    switch (style) {
      case 'holographic':
        return (
          <meshPhysicalMaterial
            color={color}
            roughness={0.1}
            metalness={0.2}
            transmission={0.1}
            thickness={0.2}
            transparent={true}
            opacity={0.9}
            emissive={color}
            emissiveIntensity={0.2}
          />
        );
      case 'neon':
        return (
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.5}
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
      position={[position[0], position[1], position[2]]}
      scale={fieldScale}
      ref={fieldRef}
    >
      {/* Field background */}
      <animated.mesh>
        <RoundedBox args={[width, height, 0.1]} radius={0.1} smoothness={4}>
          <FieldMaterial color={fieldColor} />
        </RoundedBox>
      </animated.mesh>
      
      {/* Glow effect */}
      <mesh position={[0, 0, 0.06]}>
        <RoundedBox args={[width - 0.05, height - 0.05, 0.01]} radius={0.1} smoothness={4}>
          <animated.meshBasicMaterial 
            color={error ? errorColor : hoverColor} 
            opacity={glowOpacity} 
            transparent={true}
            toneMapped={false}
          />
        </RoundedBox>
      </mesh>
      
      {/* Field label */}
      <animated.group position={labelPosition} ref={labelRef}>
        <Text
          fontSize={0.15}
          color={textColor}
          anchorX="left"
          anchorY="middle"
          position={[-width / 2 + 0.2, 0, 0.06]}
          font="/fonts/Orbitron-Medium.ttf"
          letterSpacing={0.05}
        >
          {label}{required ? ' *' : ''}
        </Text>
      </animated.group>
      
      {/* Error message */}
      {error && (
        <group position={[0, -height / 2 - 0.2, 0]} ref={errorRef}>
          <Text
            fontSize={0.12}
            color={errorColor}
            anchorX="center"
            anchorY="middle"
            position={[0, 0, 0.06]}
            font="/fonts/Orbitron-Light.ttf"
            letterSpacing={0.05}
          >
            {error}
          </Text>
        </group>
      )}
      
      {/* HTML input */}
      <Html
        transform
        occlude
        position={[0, 0, 0.06]}
        scale={0.15}
        zIndexRange={[100, 0]}
      >
        <div 
          style={{ 
            width: `${width * 6}em`, 
            height: `${height * 3}em`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {type === 'textarea' ? (
            <textarea
              value={value}
              onChange={onChange}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onMouseOver={() => setHovered(true)}
              onMouseOut={() => setHovered(false)}
              placeholder={placeholder}
              disabled={disabled}
              style={{
                width: '90%',
                height: '80%',
                background: 'rgba(30, 30, 42, 0.7)',
                color: textColor,
                border: `1px solid ${error ? errorColor : focused ? hoverColor : color}`,
                borderRadius: '0.5em',
                padding: '0.5em',
                fontFamily: 'Orbitron, sans-serif',
                fontSize: '1em',
                resize: 'none',
                backdropFilter: 'blur(5px)',
                boxShadow: error 
                  ? `0 0 10px ${errorColor}`
                  : focused 
                    ? `0 0 10px ${hoverColor}`
                    : 'none'
              }}
            />
          ) : (
            <input
              type={type}
              value={value}
              onChange={onChange}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onMouseOver={() => setHovered(true)}
              onMouseOut={() => setHovered(false)}
              placeholder={placeholder}
              disabled={disabled}
              style={{
                width: '90%',
                height: '60%',
                background: 'rgba(30, 30, 42, 0.7)',
                color: textColor,
                border: `1px solid ${error ? errorColor : focused ? hoverColor : color}`,
                borderRadius: '0.5em',
                padding: '0.5em',
                fontFamily: 'Orbitron, sans-serif',
                fontSize: '1em',
                backdropFilter: 'blur(5px)',
                boxShadow: error 
                  ? `0 0 10px ${errorColor}`
                  : focused 
                    ? `0 0 10px ${hoverColor}`
                    : 'none'
              }}
            />
          )}
        </div>
      </Html>
      
      {/* Circuit pattern for cyber style */}
      {style === 'cyber' && (
        <mesh position={[0, 0, -0.06]}>
          <RoundedBox args={[width * 0.95, height * 0.95, 0.01]} radius={0.1} smoothness={4}>
            <meshBasicMaterial 
              color={color} 
              opacity={0.1} 
              transparent={true}
              wireframe={true}
            />
          </RoundedBox>
        </mesh>
      )}
    </animated.group>
  );
};

/**
 * FormButton3D - 3D form button component
 */
const FormButton3D = ({
  text = 'SUBMIT',
  onClick = () => {},
  position = [0, 0, 0],
  width = 2,
  height = 0.8,
  style = 'cyber',
  color = colors.primary[600],
  hoverColor = colors.primary[400],
  textColor = '#ffffff',
  disabled = false,
  isSubmitting = false
}) => {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const buttonRef = useRef();
  
  // Handle click
  const handleClick = () => {
    if (!disabled && !isSubmitting) {
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
    glowOpacity 
  } = useSpring({
    buttonScale: clicked ? 0.95 : hovered ? 1.05 : 1,
    buttonColor: disabled ? '#666666' : hovered ? hoverColor : color,
    buttonPosition: clicked ? [position[0], position[1] - 0.02, position[2]] : position,
    glowOpacity: disabled ? 0 : hovered ? 0.8 : 0.2,
    config: {
      tension: 300,
      friction: 20,
    }
  });
  
  // Loading animation
  useFrame(({ clock }) => {
    if (isSubmitting && buttonRef.current) {
      const t = clock.getElapsedTime();
      buttonRef.current.rotation.z = Math.sin(t * 3) * 0.05;
    }
  });
  
  return (
    <animated.group 
      position={buttonPosition}
      scale={buttonScale}
      ref={buttonRef}
      onClick={handleClick}
      onPointerOver={() => !disabled && setHovered(true)}
      onPointerOut={() => !disabled && setHovered(false)}
    >
      {/* Button background */}
      <animated.mesh>
        <RoundedBox args={[width, height, 0.1]} radius={0.1} smoothness={4}>
          <meshStandardMaterial 
            color={buttonColor} 
            roughness={0.2} 
            metalness={0.8}
            emissive={buttonColor}
            emissiveIntensity={0.5}
          />
        </RoundedBox>
      </animated.mesh>
      
      {/* Glow effect */}
      <mesh position={[0, 0, 0.06]}>
        <RoundedBox args={[width - 0.05, height - 0.05, 0.01]} radius={0.1} smoothness={4}>
          <animated.meshBasicMaterial 
            color={hoverColor} 
            opacity={glowOpacity} 
            transparent={true}
            toneMapped={false}
          />
        </RoundedBox>
      </mesh>
      
      {/* Button text */}
      <Text
        position={[0, 0, 0.06]}
        fontSize={0.2}
        color={textColor}
        anchorX="center"
        anchorY="middle"
        font="/fonts/Orbitron-Medium.ttf"
        letterSpacing={0.05}
      >
        {isSubmitting ? 'SUBMITTING...' : text}
      </Text>
      
      {/* Loading spinner */}
      {isSubmitting && (
        <group position={[-width / 2 + 0.3, 0, 0.06]}>
          <mesh rotation={[0, 0, clock.getElapsedTime() * 2]}>
            <ringGeometry args={[0.1, 0.15, 16]} />
            <meshBasicMaterial color={textColor} transparent opacity={0.8} />
          </mesh>
        </group>
      )}
    </animated.group>
  );
};

/**
 * Form3D - Main 3D form component
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Form fields and buttons
 * @param {string} props.title - Form title
 * @param {string} props.style - Form style ('cyber', 'holographic', 'neon', 'minimal')
 * @param {string} props.color - Primary color
 * @param {string} props.backgroundColor - Background color
 * @param {Array} props.size - Form size [width, height, depth]
 * @param {function} props.onSubmit - Form submit handler
 */
const Form3D = ({
  children,
  title = 'FORM',
  style = 'cyber',
  color = colors.primary[600],
  backgroundColor = colors.dark[500],
  size = [6, 8, 0.3],
  onSubmit = () => {}
}) => {
  const formRef = useRef();
  
  // Floating animation
  useFrame(({ clock }) => {
    if (formRef.current) {
      const t = clock.getElapsedTime();
      formRef.current.position.y = Math.sin(t * 0.5) * 0.05;
      formRef.current.rotation.z = Math.sin(t * 0.3) * 0.01;
    }
  });
  
  return (
    <group ref={formRef}>
      {/* Form background */}
      <mesh>
        <RoundedBox args={size} radius={0.2} smoothness={4}>
          <meshStandardMaterial 
            color={backgroundColor} 
            roughness={0.4} 
            metalness={0.6}
            opacity={0.9}
            transparent={true}
          />
        </RoundedBox>
      </mesh>
      
      {/* Form title */}
      <Text
        position={[0, size[1] / 2 - 0.5, size[2] / 2 + 0.01]}
        fontSize={0.3}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Orbitron-Bold.ttf"
        letterSpacing={0.05}
        outlineWidth={0.01}
        outlineColor="#000000"
        outlineOpacity={0.3}
      >
        {title}
      </Text>
      
      {/* Form content */}
      <group position={[0, 0, size[2] / 2]}>
        {children}
      </group>
      
      {/* Edge glow */}
      <mesh position={[0, 0, size[2] / 2 + 0.01]}>
        <RoundedBox args={[size[0] - 0.1, size[1] - 0.1, 0.01]} radius={0.2} smoothness={4}>
          <meshBasicMaterial 
            color={color} 
            opacity={0.3} 
            transparent={true}
            toneMapped={false}
          />
        </RoundedBox>
      </mesh>
      
      {/* Circuit pattern for cyber style */}
      {style === 'cyber' && (
        <mesh position={[0, 0, size[2] / 2 - 0.01]}>
          <RoundedBox args={[size[0] * 0.95, size[1] * 0.95, 0.01]} radius={0.2} smoothness={4}>
            <meshBasicMaterial 
              color={color} 
              opacity={0.1} 
              transparent={true}
              wireframe={true}
            />
          </RoundedBox>
        </mesh>
      )}
    </group>
  );
};

export { Form3D, FormField3D, FormButton3D };
/**
 * HRMS 3D Design System
 * 
 * This file defines the core design tokens, themes, and utilities for the 3D UI system.
 */

import * as THREE from 'three';

// Core color palette
export const colors = {
  // Primary colors - Royal Purple focus
  primary: {
    50: '#f2e6ff',
    100: '#e0c2ff',
    200: '#d1a3ff',
    300: '#c185ff',
    400: '#b166ff',
    500: '#a247ff',
    600: '#6A0DAD', // Royal Purple (main brand color)
    700: '#5F0BAA',
    800: '#550A9C',
    900: '#4A098E',
  },
  
  // Dark mode background colors
  dark: {
    100: '#2d2d3a',
    200: '#252532',
    300: '#1e1e2a',
    400: '#171722',
    500: '#13131c',
    600: '#0f0f16',
    700: '#0b0b10',
    800: '#07070a',
    900: '#030305',
  },
  
  // Accent colors for UI elements  
accent: {
    blue: '#00b3ff',
    cyan: '#00fff2',
    pink: '#ff00e6',
    violet: '#b700ff',
    green: '#00ff9e',
    yellow: '#ffcc00',
  },
  
  // Neon colors for glowing effects - Enhanced for Royal Purple theme
  neon: {
    primary: '#6A0DAD', // Royal Purple Neon
    purple: '#8A2BE2', // Brighter Purple Neon
    blue: '#00d9ff',
    pink: '#ff00cc',
    violet: '#c71585', // MediumVioletRed for variety
    cyan: '#00e5e5',
    green: '#00ff7f',
    white: '#ffffff',
  },
  
  // Futuristic UI colors - Aligned with Royal Purple
  futuristic: {
    glowPrimary: '#6A0DAD', // Royal Purple Glow
    glowPurple: '#8A2BE2', // Brighter Purple Glow
    glowCyan: '#00e5e5',
    energyBlue: '#0099ff',
    plasmaViolet: '#c71585',
    digitalGreen: '#00ff7f',
    hologramBlue: '#00d9ff',
  },
  
  // Utility colors
  utility: {
    success: '#00ff9e',
    warning: '#ffcc00',
    error: '#ff3366',
    info: '#00b3ff',
  },
  
  // Gradients
  gradients: {
    purpleBlue: ['#6A0DAD', '#00b3ff'],
    purplePink: ['#6A0DAD', '#ff00e6'],
    blueCyan: ['#00b3ff', '#00fff2'],
    pinkMagenta: ['#ff00e6', '#ff33eb'],
  },
};

// Material presets for Three.js objects
export const materials = {
  // Glossy materials with enhanced futuristic look - Royal Purple focus
  glossy: {
    primary: {
      color: colors.primary[600], // Royal Purple
      roughness: 0.02, // Very reflective, high gloss
      metalness: 0.95, // Highly metallic
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      emissive: colors.neon.primary, // Royal Purple Neon glow
      emissiveIntensity: 0.6, // Stronger glow
      envMapIntensity: 1.5, // Enhanced environment reflections
      sheen: 0.5, // Adds a soft, luminous effect
      sheenColor: colors.primary[400],
      sheenRoughness: 0.1,
    },
    accent: (color, glowColor) => ({
      color,
      roughness: 0.02,
      metalness: 0.95,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      emissive: glowColor || color,
      emissiveIntensity: 0.6,
      envMapIntensity: 1.5,
      sheen: 0.5,
      sheenColor: color,
      sheenRoughness: 0.1,
    }),
  },
  
  // Cyber materials for UI elements - Royal Purple theme
  cyber: {
    primary: {
      color: colors.primary[700], // Darker Royal Purple base
      roughness: 0.1,
      metalness: 0.9,
      emissive: colors.neon.primary, // Royal Purple Neon glow
      emissiveIntensity: 0.7,
      transparent: true,
      opacity: 0.9,
      envMapIntensity: 1.8,
      transmission: 0.1, // Slight transparency for depth
      thickness: 0.2,
    },
    accent: (color, glowColor) => ({
      color,
      roughness: 0.1,
      metalness: 0.9,
      emissive: glowColor || color,
      emissiveIntensity: 0.7,
      transparent: true,
      opacity: 0.9,
      envMapIntensity: 1.8,
      transmission: 0.1,
      thickness: 0.2,
    }),
  },
  
  // Neon materials - Focused on strong, pure light emission
  neon: {
    primary: {
      color: colors.neon.primary, // Pure Royal Purple Neon
      roughness: 0.4, // Less reflective, more emissive focus
      metalness: 0.1, // Low metalness for pure light
      emissive: colors.neon.primary,
      emissiveIntensity: 1.5, // Intense glow
      toneMapped: false, // Crucial for vibrant neon
    },
    accent: (neonColorName) => ({
      color: colors.neon[neonColorName] || colors.neon.white,
      roughness: 0.4,
      metalness: 0.1,
      emissive: colors.neon[neonColorName] || colors.neon.white,
      emissiveIntensity: 1.5,
      toneMapped: false,
    }),
  },
  
  // Holographic materials - Ethereal and glowing
  holographic: {
    primary: {
      color: colors.primary[700], // Darker base for contrast
      roughness: 0.1,
      metalness: 0.3,
      transmission: 0.8, // More transparent
      thickness: 0.3,
      ior: 1.6, // Higher IOR for more refraction
      emissive: colors.neon.primary, // Royal Purple Neon glow
      emissiveIntensity: 0.5,
      opacity: 0.7, // Overall transparency
      transparent: true,
      envMapIntensity: 2.0, // Strong reflections
    },
    accent: (color, glowColor) => ({
      color,
      roughness: 0.1,
      metalness: 0.3,
      transmission: 0.8,
      thickness: 0.3,
      ior: 1.6,
      emissive: glowColor || color,
      emissiveIntensity: 0.5,
      opacity: 0.7,
      transparent: true,
      envMapIntensity: 2.0,
    }),
  },
  
  // Glass materials - Sleek and futuristic
  glass: {
    dark: {
      color: colors.dark[700], // Darker, more subtle base
      roughness: 0.05, // Smoother glass
      metalness: 0.1, // Less metallic, more pure glass
      transmission: 0.9, // Higher transmission for clarity
      thickness: 0.2, // Thinner, more delicate feel
      ior: 1.55, // Standard glass IOR
      opacity: 0.6, // Slightly more transparent
      transparent: true,
      envMapIntensity: 1.5,
      clearcoat: 0.5, // Add a clear coat for extra gloss
      clearcoatRoughness: 0.05,
    },
    tinted: (tintColor, glowColor) => ({
      color: tintColor || colors.primary[800], // Default to dark purple tint
      roughness: 0.05,
      metalness: 0.1,
      transmission: 0.9,
      thickness: 0.2,
      ior: 1.55,
      opacity: 0.65,
      transparent: true,
      envMapIntensity: 1.5,
      clearcoat: 0.5,
      clearcoatRoughness: 0.05,
      emissive: glowColor || tintColor, // Optional glow
      emissiveIntensity: glowColor ? 0.3 : 0, // Only if glowColor is provided
    }),
  },
};

// Animation presets
export const animations = {
  // Easing functions
  easing: {
    smooth: [0.4, 0.0, 0.2, 1], // Smooth deceleration
    bounce: [0.34, 1.56, 0.64, 1], // Slight bounce
    elastic: [0.68, -0.55, 0.27, 1.55], // Elastic effect
    anticipate: [0.38, 0.01, 0.78, 0.13], // Anticipation before motion
  },
  
  // Duration presets (in seconds)
  duration: {
    fast: 0.2,
    normal: 0.4,
    slow: 0.8,
    verySlow: 1.5,
  },
  
  // Hover state animations
  hover: {
    scale: 1.05,
    glow: 0.8,
    lift: 0.1,
  },
  
  // Active state animations
  active: {
    scale: 0.95,
    glow: 1.0,
    press: 0.05,
  },
};

// Lighting presets - Designed for futuristic, glowing scenes
export const lighting = {
  // Ambient lighting - Subtle base light
  ambient: {
    intensity: 0.2, // Lower ambient to emphasize other lights
    color: colors.primary[900], // Deep purple ambient
  },
  
  // Directional lighting - Key light source
  directional: {
    key: {
      position: [8, 12, 8],
      intensity: 0.8,
      color: colors.primary[200], // Light purple key light
      castShadow: true,
      shadowBias: -0.001,
    },
    fill: {
      position: [-8, 5, -8],
      intensity: 0.4,
      color: colors.neon.blue, // Contrasting blue fill light
    },
  },
  
  // Point lights - For localized glows and highlights
  point: {
    glow: (position, colorName = 'primary', intensity = 1.5, distance = 20) => ({
      position,
      color: colors.neon[colorName] || colors.neon.primary,
      intensity,
      distance,
      decay: 1.5, // Slower decay for wider glow
    }),
  },
  
  // Spot lights - For focused beams and dramatic effects
  spot: {
    beam: (position, targetPosition, colorName = 'primary', intensity = 2.0, angle = Math.PI / 8, penumbra = 0.3) => ({
      position,
      target: targetPosition, // Expecting a THREE.Object3D or position array
      color: colors.neon[colorName] || colors.neon.primary,
      intensity,
      angle, // Narrower beam
      penumbra, // Softer edge
      distance: 50,
      decay: 1,
      castShadow: true,
    }),
  },
  // Hemisphere light for soft, ambient global illumination
  hemisphere: {
    skyColor: colors.primary[400], // Light purple sky
    groundColor: colors.dark[700], // Dark ground
    intensity: 0.5,
  }
};

// Shader snippets for custom effects
export const shaders = {
  // Vertex shader for grid effect
  gridVertex: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  
  // Fragment shader for grid effect
  gridFragment: `
    uniform vec3 color1;
    uniform vec3 color2;
    uniform float time;
    varying vec2 vUv;
    
    float grid(vec2 uv, float res) {
      vec2 grid = fract(uv * res);
      return (step(0.98, grid.x) + step(0.98, grid.y)) * 0.5;
    }
    
    void main() {
      // Distance from center
      float dist = length(vUv - 0.5) * 2.0;
      
      // Grid effect
      float gridVal = grid(vUv, 20.0);
      
      // Pulse effect
      float pulse = sin(time + dist * 5.0) * 0.5 + 0.5;
      
      // Combine effects
      vec3 color = mix(color1, color2, gridVal * pulse);
      float alpha = gridVal * (0.5 + 0.5 * (1.0 - dist));
      
      gl_FragColor = vec4(color, alpha * 0.6);
    }
  `,
  
  // Vertex shader for holographic effect
  holographicVertex: `
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;
    uniform float time;
    
    void main() {
      vUv = uv;
      vPosition = position;
      vNormal = normal;
      
      // Add subtle wave motion
      float wave = sin(position.x * 5.0 + time) * 0.05;
      vec3 newPosition = position + normal * wave;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
  `,
  
  // Fragment shader for holographic effect
  holographicFragment: `
    uniform vec3 baseColor;
    uniform float time;
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;
    
    void main() {
      // Fresnel effect
      vec3 viewDirection = normalize(cameraPosition - vPosition);
      float fresnel = pow(1.0 - dot(viewDirection, vNormal), 3.0);
      
      // Holographic color shift
      vec3 color1 = baseColor;
      vec3 color2 = vec3(0.0, 0.7, 1.0); // Cyan
      
      // Animated color bands
      float bands = sin(vPosition.y * 10.0 + time) * 0.5 + 0.5;
      
      // Combine effects
      vec3 finalColor = mix(color1, color2, fresnel * bands);
      
      // Add scanlines
      float scanline = step(0.5, fract(vUv.y * 30.0 + time * 0.5));
      finalColor = mix(finalColor, finalColor * 1.5, scanline * 0.2);
      
      gl_FragColor = vec4(finalColor, 0.7 + fresnel * 0.3);
    }
  `,
  
  // Vertex shader for energy effect
  energyVertex: `
    varying vec2 vUv;
    uniform float time;
    
    void main() {
      vUv = uv;
      
      // Add pulsing motion
      vec3 newPosition = position;
      newPosition += normal * sin(time * 2.0 + position.y * 5.0) * 0.05;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
  `,
  
  // Fragment shader for energy effect
  energyFragment: `
    uniform vec3 color;
    uniform float time;
    varying vec2 vUv;
    
    void main() {
      // Energy flow effect
      float flow = fract(vUv.y * 3.0 - time * 0.5);
      flow = smoothstep(0.0, 0.5, flow) * smoothstep(1.0, 0.5, flow) * 2.0;
      
      // Edge glow
      float edge = pow(1.0 - abs(vUv.x - 0.5) * 2.0, 3.0);
      
      // Combine effects
      vec3 finalColor = color * (flow + 0.3) * edge;
      float alpha = edge * 0.8;
      
      gl_FragColor = vec4(finalColor, alpha);
    }
  `,
};

// Helper functions for creating Three.js materials
export const createMaterial = {
  // Create a standard material with preset properties
  standard: (props) => {
    return new THREE.MeshStandardMaterial({
      color: colors.primary[600],
      roughness: 0.5,
      metalness: 0.5,
      ...props,
    });
  },
  
  // Create a physical material with preset properties
  physical: (props) => {
    return new THREE.MeshPhysicalMaterial({
      color: colors.primary[600],
      roughness: 0.2,
      metalness: 0.8,
      clearcoat: 0.5,
      clearcoatRoughness: 0.1,
      ...props,
    });
  },
  
  // Create a basic material with preset properties
  basic: (props) => {
    return new THREE.MeshBasicMaterial({
      color: colors.primary[600],
      transparent: true,
      opacity: 1.0,
      ...props,
    });
  },
  
  // Create a shader material with preset properties
  shader: (vertexShader, fragmentShader, uniforms = {}) => {
    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      uniforms: {
        time: { value: 0 },
        ...uniforms,
      },
    });
  },
};

// Spacing system for UI layout
export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
  '3xl': '4rem',
  '4xl': '6rem',
};

// Typography system - Using Orbitron and Poppins as requested
export const typography = {
  fontFamily: {
    display: "'Orbitron', sans-serif", // Ensure quotes for multi-word font names
    sans: "'Poppins', sans-serif",
    mono: "'JetBrains Mono', monospace",
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
  },
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  letterSpacing: {
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
};

// Z-index system
export const zIndex = {
  background: -10,
  default: 0,
  foreground: 10,
  overlay: 20,
  modal: 30,
  popover: 40,
  tooltip: 50,
};

// Breakpoints for responsive design
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// Export the complete design system
export default {
  colors,
  materials,
  animations,
  lighting,
  shaders,
  createMaterial,
  spacing,
  typography,
  zIndex,
  breakpoints,
};
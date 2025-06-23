import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { 
  Text, 
  RoundedBox, 
  Float, 
  Html,
  MeshDistortMaterial,
  MeshWobbleMaterial,
  Sparkles
} from '@react-three/drei';
import { useSpring, animated, config } from '@react-spring/three';
import * as THREE from 'three';
import { useNavigate, useLocation } from 'react-router-dom';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { KernelSize } from 'postprocessing';

// Enhanced 3D Menu Item component
const EnhancedMenuItem = ({ 
  text, 
  path, 
  icon, 
  isActive, 
  onClick, 
  index, 
  totalItems,
  style = 'cyber', // 'cyber', 'holographic', 'neon', 'minimal'
  color = '#6A0DAD',
  hoverColor = '#8214ff',
  activeColor = '#9643ff',
  glowColor = '#b700ff'
}) => {
  const mesh = useRef();
  const glowRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  // Calculate position based on index
  const yPos = -index * 1.2 + totalItems * 0.6 - 0.6;
  
  // Animation with react-spring
  const { 
    scale, 
    itemColor, 
    positionX, 
    glowOpacity,
    wobbleFactor,
    distortFactor
  } = useSpring({
    scale: hovered ? [1.05, 1.05, 1.05] : [1, 1, 1],
    itemColor: isActive ? activeColor : hovered ? hoverColor : color,
    positionX: isActive ? -0.1 : hovered ? -0.05 : 0,
    glowOpacity: isActive ? 0.8 : hovered ? 0.5 : 0.2,
    wobbleFactor: isActive ? 1.0 : hovered ? 0.8 : 0.3,
    distortFactor: isActive ? 0.3 : hovered ? 0.2 : 0.1,
    config: config.wobbly
  });
  
  // Animation loop
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    
    // Glow effect animation for standard materials
    if (mesh.current && mesh.current.material && mesh.current.material.emissiveIntensity !== undefined) {
      const baseIntensity = isActive ? 0.8 : hovered ? 0.5 : 0.2;
      const pulseIntensity = isActive || hovered ? Math.sin(t * 3) * 0.2 : 0;
      mesh.current.material.emissiveIntensity = baseIntensity + pulseIntensity;
    }
    
    // Animate glow effect
    if (glowRef.current) {
      glowRef.current.material.opacity = (isActive ? 0.8 : hovered ? 0.5 : 0.3) + Math.sin(t * 3) * 0.1;
    }
  });
  
  // Choose the appropriate material based on style
  const MenuItemMaterial = () => {
    switch(style) {
      case 'holographic':
        return (
          <meshPhysicalMaterial 
            color={itemColor} 
            roughness={0.1} 
            metalness={0.2}
            transmission={0.1}
            thickness={0.2}
            transparent={true}
            opacity={0.9}
            emissive={itemColor}
            emissiveIntensity={0.5}
          />
        );
        
      case 'neon':
        return (
          <animated.meshStandardMaterial 
            color={itemColor} 
            roughness={0.1} 
            metalness={0.9}
            emissive={itemColor}
            emissiveIntensity={0.8}
            toneMapped={false}
          />
        );
        
      case 'minimal':
        return (
          <animated.meshStandardMaterial 
            color={itemColor} 
            roughness={0.5} 
            metalness={0.2}
            emissive={itemColor}
            emissiveIntensity={0.2}
          />
        );
        
      case 'cyber':
      default:
        return (
          <MeshDistortMaterial 
            color={itemColor} 
            roughness={0.2} 
            metalness={0.8}
            emissive={itemColor}
            emissiveIntensity={0.5}
            distort={distortFactor}
            speed={0.5}
            toneMapped={false}
          />
        );
    }
  };

  return (
    <animated.group 
      position-y={yPos} 
      position-x={positionX} 
      scale={scale}
      onClick={() => onClick(path)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Menu item background */}
      <animated.mesh ref={mesh}>
        <RoundedBox args={[2.5, 0.8, 0.2]} radius={0.1} smoothness={4}>
          <MenuItemMaterial />
        </RoundedBox>
      </animated.mesh>
      
      {/* Glow edge effect */}
      <mesh 
        ref={glowRef}
        position={[0, 0, 0.11]}
      >
        <RoundedBox args={[2.5, 0.8, 0.01]} radius={0.1} smoothness={4}>
          <animated.meshBasicMaterial 
            color={glowColor} 
            opacity={glowOpacity} 
            transparent={true}
            toneMapped={false}
          />
        </RoundedBox>
      </mesh>
      
      {/* Menu item text */}
      <Text
        position={[0.2, 0, 0.11]}
        fontSize={0.25}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font={style === 'cyber' ? '/fonts/Rajdhani-Medium.ttf' : '/fonts/Rajdhani-Bold.ttf'}
        letterSpacing={0.05}
      >
        {text}
      </Text>
      
      {/* Indicator for active item */}
      {isActive && (
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <mesh position={[-1, 0, 0.11]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshBasicMaterial color="#ffffff" toneMapped={false} />
          </mesh>
        </Float>
      )}
      
      {/* Icon if provided */}
      {icon && (
        <Html
          position={[-0.8, 0, 0.11]}
          transform
          scale={0.15}
          zIndexRange={[100, 0]}
        >
          <div className="text-white text-2xl">{icon}</div>
        </Html>
      )}
      
      {/* Sparkles for active items with certain styles */}
      {isActive && (style === 'holographic' || style === 'neon') && (
        <Sparkles 
          count={10} 
          scale={[2, 0.5, 0.5]} 
          size={6} 
          speed={0.3} 
          opacity={0.7}
          color={glowColor}
          position={[0, 0, 0.15]}
        />
      )}
    </animated.group>
  );
};

// Enhanced menu background
const EnhancedMenuBackground = ({ 
  width = 3, 
  height = 5, 
  depth = 0.3,
  style = 'cyber', // 'cyber', 'holographic', 'neon', 'minimal'
  color = '#13131c',
  accentColor = '#6A0DAD'
}) => {
  const backgroundRef = useRef();
  const edgeRef = useRef();
  
  // Animation loop
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    
    // Subtle movement
    if (backgroundRef.current) {
      backgroundRef.current.rotation.z = Math.sin(t * 0.2) * 0.01;
    }
    
    // Edge glow animation
    if (edgeRef.current) {
      edgeRef.current.material.opacity = 0.3 + Math.sin(t * 0.5) * 0.1;
    }
  });
  
  // Choose the appropriate material based on style
  const BackgroundMaterial = () => {
    switch(style) {
      case 'holographic':
        return (
          <meshPhysicalMaterial 
            color={color} 
            roughness={0.1} 
            metalness={0.2}
            transmission={0.1}
            thickness={depth}
            transparent={true}
            opacity={0.8}
          />
        );
        
      case 'neon':
        return (
          <meshStandardMaterial 
            color={color} 
            roughness={0.1} 
            metalness={0.9}
            emissive={accentColor}
            emissiveIntensity={0.1}
            transparent={true}
            opacity={0.9}
            toneMapped={false}
          />
        );
        
      case 'minimal':
        return (
          <meshStandardMaterial 
            color={color} 
            roughness={0.5} 
            metalness={0.2}
            transparent={true}
            opacity={0.9}
          />
        );
        
      case 'cyber':
      default:
        return (
          <meshStandardMaterial 
            color={color} 
            roughness={0.4} 
            metalness={0.6}
            opacity={0.9}
            transparent={true}
          />
        );
    }
  };
  
  return (
    <group position={[0, 0, -0.2]}>
      {/* Main background */}
      <mesh ref={backgroundRef}>
        <RoundedBox args={[width, height, depth]} radius={0.2} smoothness={4}>
          <BackgroundMaterial />
        </RoundedBox>
      </mesh>
      
      {/* Edge glow */}
      <mesh ref={edgeRef} position={[0, 0, depth / 2 + 0.01]}>
        <RoundedBox args={[width, height, 0.01]} radius={0.2} smoothness={4}>
          <meshBasicMaterial 
            color={accentColor} 
            opacity={0.3} 
            transparent={true}
            toneMapped={false}
          />
        </RoundedBox>
      </mesh>
      
      {/* Circuit pattern for cyber style */}
      {style === 'cyber' && (
        <mesh position={[0, 0, depth / 2 - 0.01]}>
          <RoundedBox args={[width * 0.95, height * 0.95, 0.01]} radius={0.2} smoothness={4}>
            <meshBasicMaterial 
              color={accentColor} 
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

// Enhanced main scene component
const EnhancedMenuScene = ({ 
  items, 
  activePath, 
  onNavigate,
  style = 'cyber', // 'cyber', 'holographic', 'neon', 'minimal'
  color = '#6A0DAD',
  hoverColor = '#8214ff',
  activeColor = '#9643ff',
  glowColor = '#b700ff',
  backgroundColor = '#13131c'
}) => {
  // Calculate background height based on number of items
  const backgroundHeight = items.length * 1.2 + 0.8;
  
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color={color} />
      
      {/* Enhanced menu background */}
      <EnhancedMenuBackground 
        width={3} 
        height={backgroundHeight} 
        style={style}
        color={backgroundColor}
        accentColor={color}
      />
      
      {/* Menu items */}
      {items.map((item, index) => (
        <EnhancedMenuItem 
          key={item.path}
          text={item.text}
          path={item.path}
          icon={item.icon}
          isActive={activePath === item.path}
          onClick={onNavigate}
          index={index}
          totalItems={items.length / 2}
          style={style}
          color={color}
          hoverColor={hoverColor}
          activeColor={activeColor}
          glowColor={glowColor}
        />
      ))}
      
      {/* Decorative elements */}
      {style === 'cyber' && (
        <mesh position={[-1.6, backgroundHeight / 2 - 0.5, 0.2]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial 
            color={color} 
            emissive={color} 
            emissiveIntensity={1} 
            toneMapped={false} 
          />
        </mesh>
      )}
      
      {style === 'holographic' && (
        <Sparkles 
          count={20} 
          scale={[3, backgroundHeight, 1]} 
          size={4} 
          speed={0.3} 
          opacity={0.5}
          color={color}
          position={[0, 0, 0.3]}
        />
      )}
    </>
  );
};

// Enhanced main component with canvas and post-processing effects
const NavMenu3D = ({ 
  className = '', 
  items,
  style = 'cyber', // 'cyber', 'holographic', 'neon', 'minimal'
  color = '#6A0DAD',
  hoverColor = '#8214ff',
  activeColor = '#9643ff',
  glowColor = '#b700ff',
  backgroundColor = '#13131c',
  enableEffects = true
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activePath, setActivePath] = useState('');
  
  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);
  
  const handleNavigate = (path) => {
    navigate(path);
  };
  
  return (
    <div className={`${className} h-full w-full`}>
      <Canvas 
        camera={{ position: [0, 0, 3], fov: 40 }}
        dpr={[1, 2]}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <color attach="background" args={[backgroundColor]} />
        
        <Suspense fallback={null}>
          <EnhancedMenuScene 
            items={items} 
            activePath={activePath} 
            onNavigate={handleNavigate}
            style={style}
            color={color}
            hoverColor={hoverColor}
            activeColor={activeColor}
            glowColor={glowColor}
            backgroundColor={backgroundColor}
          />
        </Suspense>
        
        {/* Post-processing effects */}
        {enableEffects && (
          <EffectComposer multisampling={0}>
            <Bloom 
              intensity={0.8} 
              luminanceThreshold={0.2} 
              luminanceSmoothing={0.9}
              mipmapBlur={true} 
              kernelSize={KernelSize.SMALL}
            />
          </EffectComposer>
        )}
      </Canvas>
      
      {/* Optional scan line overlay for cyber style */}
      {style === 'cyber' && (
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="w-full h-full bg-scan-lines"></div>
        </div>
      )}
    </div>
  );
};

export default NavMenu3D;
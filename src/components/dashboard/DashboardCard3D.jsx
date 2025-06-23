import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  Text, 
  RoundedBox, 
  MeshDistortMaterial, 
  Float, 
  Environment,
  Sparkles 
} from '@react-three/drei';
import { useSpring } from '@react-spring/three';
import { EffectComposer, Bloom} from '@react-three/postprocessing';
import { KernelSize } from 'postprocessing';
import * as THREE from 'three';
import { colors, materials } from '../../design/DesignSystem';

// Enhanced 3D Card component with advanced effects
const Card = ({ 
  title, 
  value, 
  // icon, 
  color = colors.primary[600], 
  glowColor = colors.futuristic.glowPurple,
  style = 'cyber',
  width = 3.5, 
  height = 2, 
  depth = 0.3,
  ...props 
}) => {
  const mesh = useRef();
  const [hovered, setHovered] = React.useState(false);
  
  // Enhanced animations with spring
  const { scale, cardColor, elevation, glow, distort } = useSpring({
    scale: hovered ? [1.05, 1.05, 1.05] : [1, 1, 1],
    cardColor: hovered ? colors.primary[500] : color,
    elevation: hovered ? 0.2 : 0,
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

  // Generate particles for energy effect
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 20; i++) {
      const x = (Math.random() - 0.5) * width;
      const y = (Math.random() - 0.5) * height;
      temp.push({ 
        position: [x, y, depth / 2],
        scale: Math.random() * 0.1 + 0.05
      });
    }
    return temp;
  }, [width, height, depth]);

  // Enhanced animation with wave effect
  useFrame(({ clock }) => {
    if (mesh.current) {
      const time = clock.getElapsedTime();
      mesh.current.position.y = Math.sin(time * 2) * 0.02;
      if (hovered) {
        mesh.current.rotation.z = Math.sin(time * 3) * 0.01;
      }
    }
  });

  return (
    <Float 
      speed={2} 
      rotationIntensity={0.2} 
      floatIntensity={0.2}
    >    <Route path="/dashboard" element={<DashboardPage />} />    <Route path="/dashboard" element={<DashboardPage />} />    <Route path="/dashboard" element={<DashboardPage />} />    <Route path="/dashboard" element={<DashboardPage />} />
      <animated.group
        ref={mesh}
        scale={scale}
        position-y={elevation}
        {...props}
      >
        <RoundedBox 
          args={[width, height, depth]} 
          radius={0.1}
          smoothness={4}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <MeshDistortMaterial
            {...getMaterial()}
            distort={distort}
            speed={2}
            envMapIntensity={2}
          >
            <animated.color attach="color" color={cardColor} />
            <animated.color attach="emissive" color={glowColor} />
            <animated.number attach="emissiveIntensity" value={glow} />
          </MeshDistortMaterial>
        </RoundedBox>

        {/* Title text */}
        <Text
          position={[0, height/3, depth/2 + 0.01]}
          fontSize={0.15}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Orbitron-Regular.ttf"
          maxWidth={width * 0.9}
        >
          {title}
        </Text>

        {/* Value text */}
        <Text
          position={[0, -height/4, depth/2 + 0.01]}
          fontSize={0.3}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Orbitron-Bold.ttf"
          maxWidth={width * 0.9}
        >
          {value}
        </Text>

        {/* Energy particles */}
        {hovered && particles.map((particle, i) => (
          <Sparkles
            key={i}
            position={particle.position}
            scale={particle.scale}
            size={2}
            speed={0.3}
            opacity={0.5}
            color={glowColor}
          />
        ))}
      </animated.group>
    </Float>
  );
};

// Main component with enhanced canvas setup
// const DashboardCard3D = ({ 
const DashboardCard3DComponent = ({ 
  className, 
  style = 'cyber',
  ...props 
}) => {
  return (
    <div className={`${className} relative h-48`}>
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
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <spotLight
          position={[0, 5, 0]}
          angle={0.3}
          penumbra={1}
          intensity={0.5}
          color={props.color || colors.primary[600]}
        />
        <Environment preset="city" />
        <Card {...props} style={style} />
        <EffectComposer multisampling={0}>
          <Bloom
            intensity={1}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            mipmapBlur={true}
            kernelSize={KernelSize.MEDIUM}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default DashboardCard3DComponent;
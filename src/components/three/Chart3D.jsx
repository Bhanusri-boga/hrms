import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Bar component for the chart
const Bar = ({ position, height, color, label, value }) => {
  const mesh = useRef();
  
  // Animate the bar growing from the bottom
  useFrame(({ clock }) => {
    const t = Math.min(1, clock.getElapsedTime() / 2);
    if (mesh.current) {
      mesh.current.scale.y = THREE.MathUtils.lerp(0.1, height, t);
      mesh.current.position.y = THREE.MathUtils.lerp(0, height / 2, t);
    }
  });

  return (
    <group position={[position, 0, 0]}>
      <mesh ref={mesh} position={[0, 0, 0]}>
        <boxGeometry args={[0.8, 1, 0.8]} />
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
      </mesh>
      {/* Label and value would be here in a full implementation */}
    </group>
  );
};

// Grid for the chart
const Grid = () => {
  return (
    <gridHelper 
      args={[20, 20, '#444444', '#222222']} 
      position={[0, -0.01, 0]} 
      rotation={[0, 0, 0]} 
    />
  );
};

// Main chart component
const BarChart = ({ data }) => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Grid />
      {data.map((item, index) => (
        <Bar 
          key={index} 
          position={index * 2 - (data.length - 1)} 
          height={item.value / 10} 
          color={item.color} 
          label={item.label}
          value={item.value}
        />
      ))}
      <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={0} maxPolarAngle={Math.PI / 2.5} />
    </>
  );
};

// Main component with canvas
const Chart3D = ({ data, title, className }) => {
  return (
    <div className={`${className} relative h-full w-full`}>
      {title && (
        <h3 className="absolute top-2 left-0 right-0 text-center text-white text-lg font-semibold z-10">
          {title}
        </h3>
      )}
      <Canvas camera={{ position: [0, 5, 10], fov: 45 }}>
        <color attach="background" args={['#1a1a2e']} />
        <fog attach="fog" args={['#1a1a2e', 10, 20]} />
        <BarChart data={data} />
      </Canvas>
    </div>
  );
};

export default Chart3D;
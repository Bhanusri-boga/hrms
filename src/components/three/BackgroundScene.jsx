import React, { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  OrbitControls, 
  Environment, 
  MeshDistortMaterial, 
  Stars,
  Trail
} from '@react-three/drei';
import { 
  EffectComposer,
  Bloom
} from '@react-three/postprocessing';
import { BlendFunction, KernelSize } from 'postprocessing';
import * as THREE from 'three';

// Animated particles component with glowing effect
const Particles = ({ count = 1000, color = '#6A0DAD' }) => {
  const mesh = useRef();
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;

  // Generate random particles
  const dummy = new THREE.Object3D();
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  // Update particles on each frame
  useFrame((state) => {
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.max(0.3, Math.cos(t));

      dummy.position.set(
        (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();

      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <dodecahedronGeometry args={[0.15, 0]} />
      <meshStandardMaterial 
        color={color} 
        emissive={color} 
        emissiveIntensity={0.5} 
        toneMapped={false}
      />
    </instancedMesh>
  );
};

// Animated floating geometric shape with distortion
const FloatingShape = ({ position, color, speed = 1, size = 1, distort = 0.4, shape = 'sphere' }) => {
  const mesh = useRef();
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed;
    mesh.current.position.y = position[1] + Math.sin(t) * 0.5;
    mesh.current.rotation.x = t * 0.2;
    mesh.current.rotation.z = t * 0.3;
    mesh.current.rotation.y = t * 0.1;
  });

  return (
    <mesh ref={mesh} position={position}>
      {shape === 'sphere' ? (
        <sphereGeometry args={[size, 32, 32]} />
      ) : shape === 'torus' ? (
        <torusGeometry args={[size, size/3, 16, 32]} />
      ) : (
        <octahedronGeometry args={[size, 0]} />
      )}
      <MeshDistortMaterial 
        color={color} 
        emissive={color} 
        emissiveIntensity={0.4} 
        metalness={0.8} 
        roughness={0.2} 
        distort={distort} 
        speed={0.5}
        toneMapped={false}
      />
    </mesh>
  );
};

// Glowing grid floor
const GridFloor = () => {
  const material = useRef();
  
  useFrame(({ clock }) => {
    if (material.current) {
      material.current.uniforms.time.value = clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
      <planeGeometry args={[100, 100, 100, 100]} />
      <shaderMaterial
        ref={material}
        uniforms={{
          color1: { value: new THREE.Color('#13131c') },
          color2: { value: new THREE.Color('#6A0DAD') },
          time: { value: 0 },
        }}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
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
        `}
        transparent={true}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
};

// Animated energy beam
const EnergyBeam = ({ start = [0, 0, 0], end = [0, 10, 0], color = '#6A0DAD', thickness = 0.1 }) => {
  const ref = useRef();
  const curve = useMemo(() => {
    const points = [];
    for (let i = 0; i < 10; i++) {
      points.push(
        new THREE.Vector3(
          THREE.MathUtils.lerp(start[0], end[0], i / 9) + (i > 0 && i < 9 ? (Math.random() - 0.5) * 0.5 : 0),
          THREE.MathUtils.lerp(start[1], end[1], i / 9),
          THREE.MathUtils.lerp(start[2], end[2], i / 9) + (i > 0 && i < 9 ? (Math.random() - 0.5) * 0.5 : 0)
        )
      );
    }
    return new THREE.CatmullRomCurve3(points);
  }, [start, end]);

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime();
      const points = curve.getPoints(50);
      for (let i = 0; i < points.length; i++) {
        const noise = Math.sin(t * 5 + i * 0.2) * 0.1;
        points[i].x += noise;
        points[i].z += noise;
      }
      ref.current.geometry.setFromPoints(points);
    }
  });

  return (
    <line ref={ref}>
      <bufferGeometry />
      <lineBasicMaterial color={color} linewidth={thickness} toneMapped={false} />
    </line>
  );
};

// Glowing orb with trail effect
const GlowingOrb = ({ position = [0, 0, 0], color = '#6A0DAD' }) => {
  const orbRef = useRef();
  const radius = 0.15;
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    orbRef.current.position.x = position[0] + Math.sin(t) * 0.5;
    orbRef.current.position.y = position[1] + Math.cos(t * 0.5) * 0.3;
    orbRef.current.position.z = position[2] + Math.sin(t * 0.7) * 0.2;
  });

  return (
    <group>
      <Trail
        width={0.2}
        length={8}
        color={new THREE.Color(color)}
        attenuation={(t) => t * t}
      >
        <mesh ref={orbRef} position={position}>
          <sphereGeometry args={[radius, 16, 16]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.5}
            toneMapped={false}
          />
        </mesh>
      </Trail>
    </group>
  );
};

// Main scene component
const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} />
      
      {/* Particles */}
      <Particles count={300} color="#6A0DAD" />
      
      {/* Floating shapes */}
      <FloatingShape position={[-4, 0, -2]} color="#9643ff" speed={0.7} size={0.8} shape="sphere" />
      <FloatingShape position={[4, 0, -3]} color="#b700ff" speed={0.8} size={0.6} shape="torus" />
      <FloatingShape position={[0, 0, -5]} color="#6A0DAD" speed={0.9} size={1.2} shape="octahedron" />
      
      {/* Grid floor */}
      <GridFloor />
      
      {/* Energy beams */}
      <EnergyBeam start={[-5, -3, -5]} end={[-5, 3, -5]} color="#9643ff" />
      <EnergyBeam start={[5, -3, -5]} end={[5, 3, -5]} color="#b700ff" />
      
      {/* Glowing orbs with trails */}
      <GlowingOrb position={[-3, 2, -4]} color="#9643ff" />
      <GlowingOrb position={[3, 2, -4]} color="#b700ff" />
      <GlowingOrb position={[0, 3, -6]} color="#6A0DAD" />
      
      {/* Stars in the background */}
      <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
        {/* Enhanced camera controls with smooth damping */}
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        enableRotate={true} 
        autoRotate 
        autoRotateSpeed={0.2}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
        dampingFactor={0.05}
        enableDamping={true}
      />
      
      {/* Post-processing effects */}
      <React.Suspense fallback={null}>
        <EffectComposer multisampling={0}>
          <Bloom 
            intensity={0.6} // Adjusted intensity
            luminanceThreshold={0.1} // Adjusted threshold
            luminanceSmoothing={0.3} // Adjusted smoothing
            // mipmapBlur={true} // Temporarily remove to simplify
            kernelSize={KernelSize.HUGE} // Changed kernel size for a more pronounced effect
          />
        </EffectComposer>
      </React.Suspense>
    </>
  );
};

// Main component with canvas
const BackgroundScene = ({ className, color = '#6A0DAD' }) => {
  return (    <div className={`${className} absolute inset-0 -z-10`}>
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 75 }}
        gl={{ 
          powerPreference: "high-performance",
          alpha: false,
          antialias: true,
          stencil: false,
          depth: true
        }}
      >
        <color attach="background" args={['#13131c']} />
        <fog attach="fog" args={['#13131c', 10, 30]} />
        <Scene />
        <Environment preset="night" />
      </Canvas>
    </div>
  );
};

export default BackgroundScene;
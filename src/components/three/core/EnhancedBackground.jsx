import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { 
  Stars, 
  Trail, 
  MeshDistortMaterial, 
  MeshWobbleMaterial,
  Float,
  Sparkles
} from '@react-three/drei';
import * as THREE from 'three';
import { colors, shaders } from '../../../design/DesignSystem';

/**
 * EnhancedParticles - Advanced particle system with interactive behavior
 */
const EnhancedParticles = ({ 
  count = 1000, 
  color = colors.primary[600],
  size = 0.15,
  spread = 50,
  interactivity = true,
  particleType = 'dodecahedron' // 'dodecahedron', 'sphere', 'box'
}) => {
  const mesh = useRef();
  const { size: viewSize, viewport, mouse } = useThree();
  const aspect = viewSize.width / viewport.width;

  // Generate random particles
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -spread/2 + Math.random() * spread;
      const yFactor = -spread/2 + Math.random() * spread;
      const zFactor = -spread/2 + Math.random() * spread;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count, spread]);

  // Update particles on each frame
  useFrame((state) => {
    // Update mouse position for interactivity
    if (interactivity) {
      const x = mouse.x * viewport.width / 2;
      const y = mouse.y * viewport.height / 2;
      
      particles.forEach(particle => {
        particle.mx += (x - particle.mx) * 0.01;
        particle.my += (y - particle.my) * 0.01;
      });
    }
    
    // Update particle positions
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor, mx, my } = particle;
      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.max(0.3, Math.cos(t));

      dummy.position.set(
        (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );
      dummy.scale.set(s * size, s * size, s * size);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();

      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  // Choose geometry based on particleType
  const renderGeometry = () => {
    switch (particleType) {
      case 'sphere':
        return <sphereGeometry args={[1, 16, 16]} />;
      case 'box':
        return <boxGeometry args={[1, 1, 1]} />;
      case 'dodecahedron':
      default:
        return <dodecahedronGeometry args={[1, 0]} />;
    }
  };

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      {renderGeometry()}
      <meshStandardMaterial 
        color={color} 
        emissive={color} 
        emissiveIntensity={0.5} 
        toneMapped={false}
        roughness={0.5}
        metalness={0.8}
      />
    </instancedMesh>
  );
};

/**
 * EnhancedFloatingShape - Advanced floating shape with distortion and effects
 */
const EnhancedFloatingShape = ({ 
  position = [0, 0, 0], 
  color = colors.primary[600], 
  speed = 1, 
  size = 1, 
  distort = 0.4, 
  wobble = 0,
  shape = 'sphere', // 'sphere', 'torus', 'octahedron', 'icosahedron', 'cube'
  emissiveIntensity = 0.4,
  metalness = 0.8,
  roughness = 0.2,
  wireframe = false,
  sparkles = false
}) => {
  const mesh = useRef();
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed;
    mesh.current.position.y = position[1] + Math.sin(t) * 0.5;
    mesh.current.rotation.x = t * 0.2;
    mesh.current.rotation.z = t * 0.3;
    mesh.current.rotation.y = t * 0.1;
  });

  // Choose geometry based on shape
  const renderGeometry = () => {
    switch (shape) {
      case 'torus':
        return <torusGeometry args={[size, size/3, 16, 32]} />;
      case 'octahedron':
        return <octahedronGeometry args={[size, 0]} />;
      case 'icosahedron':
        return <icosahedronGeometry args={[size, 0]} />;
      case 'cube':
        return <boxGeometry args={[size, size, size]} />;
      case 'sphere':
      default:
        return <sphereGeometry args={[size, 32, 32]} />;
    }
  };

  // Choose material based on wobble and distort
  const renderMaterial = () => {
    if (wobble > 0) {
      return (
        <MeshWobbleMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={emissiveIntensity} 
          metalness={metalness} 
          roughness={roughness} 
          factor={wobble} 
          speed={speed}
          wireframe={wireframe}
          toneMapped={false}
        />
      );
    } else {
      return (
        <MeshDistortMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={emissiveIntensity} 
          metalness={metalness} 
          roughness={roughness} 
          distort={distort} 
          speed={speed * 0.5}
          wireframe={wireframe}
          toneMapped={false}
        />
      );
    }
  };

  return (
    <group position={position}>
      <mesh ref={mesh}>
        {renderGeometry()}
        {renderMaterial()}
      </mesh>
      
      {sparkles && (
        <Sparkles 
          count={20} 
          scale={[size * 3, size * 3, size * 3]} 
          size={size * 0.5} 
          speed={0.3} 
          opacity={0.7}
          color={color}
        />
      )}
    </group>
  );
};

/**
 * EnhancedGridFloor - Advanced grid floor with shader effects
 */
const EnhancedGridFloor = ({
  size = 100,
  divisions = 100,
  color1 = colors.dark[500],
  color2 = colors.primary[600],
  animate = true,
  elevation = -5,
  fadeDistance = 30
}) => {
  const material = useRef();
  
  useFrame(({ clock }) => {
    if (animate && material.current) {
      material.current.uniforms.time.value = clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, elevation, 0]}>
      <planeGeometry args={[size, size, divisions, divisions]} />
      <shaderMaterial
        ref={material}
        uniforms={{
          color1: { value: new THREE.Color(color1) },
          color2: { value: new THREE.Color(color2) },
          time: { value: 0 },
          fadeDistance: { value: fadeDistance }
        }}
        vertexShader={shaders.gridVertex}
        fragmentShader={`
          uniform vec3 color1;
          uniform vec3 color2;
          uniform float time;
          uniform float fadeDistance;
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
            
            // Fade out at distance
            float fadeOut = 1.0 - smoothstep(0.0, 1.0, dist / (fadeDistance / 100.0));
            float alpha = gridVal * fadeOut * (0.5 + 0.5 * (1.0 - dist));
            
            gl_FragColor = vec4(color, alpha * 0.6);
          }
        `}
        transparent={true}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
};

/**
 * EnhancedEnergyBeam - Advanced energy beam with animation
 */
const EnhancedEnergyBeam = ({ 
  start = [0, 0, 0], 
  end = [0, 10, 0], 
  color = colors.primary[600], 
  thickness = 0.1,
  turbulence = 0.5,
  speed = 1,
  segments = 50
}) => {
  const ref = useRef();
  const curve = useMemo(() => {
    const points = [];
    for (let i = 0; i < 10; i++) {
      points.push(
        new THREE.Vector3(
          THREE.MathUtils.lerp(start[0], end[0], i / 9) + (i > 0 && i < 9 ? (Math.random() - 0.5) * turbulence : 0),
          THREE.MathUtils.lerp(start[1], end[1], i / 9),
          THREE.MathUtils.lerp(start[2], end[2], i / 9) + (i > 0 && i < 9 ? (Math.random() - 0.5) * turbulence : 0)
        )
      );
    }
    return new THREE.CatmullRomCurve3(points);
  }, [start, end, turbulence]);

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime() * speed;
      const points = curve.getPoints(segments);
      for (let i = 0; i < points.length; i++) {
        const noise = Math.sin(t * 5 + i * 0.2) * turbulence * 0.2;
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

/**
 * EnhancedGlowingOrb - Advanced glowing orb with trail effect
 */
const EnhancedGlowingOrb = ({ 
  position = [0, 0, 0], 
  color = colors.primary[600], 
  size = 0.3,
  speed = 1,
  radius = 2,
  trailLength = 8,
  trailWidth = 0.5,
  sparkles = true
}) => {
  const mesh = useRef();
  const [x, y, z] = position;
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed;
    mesh.current.position.x = x + Math.sin(t * 0.7) * radius;
    mesh.current.position.y = y + Math.cos(t * 0.5) * radius;
    mesh.current.position.z = z + Math.sin(t * 0.3) * radius;
  });

  return (
    <group>
      <Trail
        width={trailWidth}
        length={trailLength}
        color={color}
        attenuation={(t) => t * t}
      >
        <mesh ref={mesh} position={position}>
          <sphereGeometry args={[size, 16, 16]} />
          <meshStandardMaterial 
            color={color} 
            emissive={color} 
            emissiveIntensity={2} 
            toneMapped={false} 
          />
        </mesh>
      </Trail>
      
      {sparkles && (
        <Sparkles 
          count={10} 
          scale={[size * 10, size * 10, size * 10]} 
          size={size * 2} 
          speed={0.3} 
          opacity={0.7}
          color={color}
          position={position}
        />
      )}
    </group>
  );
};

/**
 * EnhancedBackground - Main component that combines all background elements
 */
const EnhancedBackground = ({
  particleCount = 300,
  particleColor = colors.primary[600],
  particleSize = 0.15,
  particleSpread = 50,
  particleType = 'dodecahedron',
  
  floatingShapes = [
    { position: [-4, 0, -2], color: colors.primary[400], speed: 0.7, size: 0.8, shape: 'sphere', sparkles: true },
    { position: [4, 0, -3], color: colors.neon.purple, speed: 0.8, size: 0.6, shape: 'torus' },
    { position: [0, 0, -5], color: colors.primary[600], speed: 0.9, size: 1.2, shape: 'octahedron', wobble: 1 }
  ],
  
  gridFloor = {
    enabled: true,
    color1: colors.dark[500],
    color2: colors.primary[600],
    size: 100,
    divisions: 100,
    elevation: -5
  },
  
  energyBeams = [
    { start: [-5, -3, -5], end: [-5, 3, -5], color: colors.primary[400] },
    { start: [5, -3, -5], end: [5, 3, -5], color: colors.neon.purple }
  ],
  
  glowingOrbs = [
    { position: [-3, 2, -4], color: colors.primary[400], size: 0.3, speed: 1, radius: 2 },
    { position: [3, 2, -4], color: colors.neon.purple, size: 0.3, speed: 1.2, radius: 2 },
    { position: [0, 3, -6], color: colors.primary[600], size: 0.3, speed: 0.8, radius: 2 }
  ],
  
  stars = {
    enabled: true,
    radius: 100,
    depth: 50,
    count: 1000,
    factor: 4,
    saturation: 0,
    fade: true,
    speed: 1
  }
}) => {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} />
      
      {/* Enhanced particles */}
      <EnhancedParticles 
        count={particleCount} 
        color={particleColor} 
        size={particleSize}
        spread={particleSpread}
        particleType={particleType}
      />
      
      {/* Floating shapes */}
      {floatingShapes.map((shape, index) => (
        <EnhancedFloatingShape key={index} {...shape} />
      ))}
      
      {/* Grid floor */}
      {gridFloor.enabled && (
        <EnhancedGridFloor 
          color1={gridFloor.color1} 
          color2={gridFloor.color2}
          size={gridFloor.size}
          divisions={gridFloor.divisions}
          elevation={gridFloor.elevation}
        />
      )}
      
      {/* Energy beams */}
      {energyBeams.map((beam, index) => (
        <EnhancedEnergyBeam key={index} {...beam} />
      ))}
      
      {/* Glowing orbs with trails */}
      {glowingOrbs.map((orb, index) => (
        <EnhancedGlowingOrb key={index} {...orb} />
      ))}
      
      {/* Stars in the background */}
      {stars.enabled && (
        <Stars 
          radius={stars.radius} 
          depth={stars.depth} 
          count={stars.count} 
          factor={stars.factor} 
          saturation={stars.saturation} 
          fade={stars.fade} 
          speed={stars.speed} 
        />
      )}
    </>
  );
};

export default EnhancedBackground;
export { 
  EnhancedParticles, 
  EnhancedFloatingShape, 
  EnhancedGridFloor, 
  EnhancedEnergyBeam, 
  EnhancedGlowingOrb 
};
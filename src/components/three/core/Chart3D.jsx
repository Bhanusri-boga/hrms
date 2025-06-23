import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, RoundedBox, OrbitControls, MeshWobbleMaterial } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';
import { colors } from '../../../design/DesignSystem';

/**
 * Bar3D - 3D bar component for bar charts
 */
const Bar3D = ({ 
  position, 
  height, 
  width = 0.8, 
  depth = 0.8,
  color, 
  label, 
  value, 
  index, 
  totalBars,
  barStyle = 'box', // 'box', 'cylinder', 'capsule'
  animated = true,
  hovered = false,
  onClick = () => {}
}) => {
  const mesh = useRef();
  const [isHovered, setIsHovered] = useState(false);
  const isActive = isHovered || hovered;
  
  // Animation for growing from bottom
  useFrame(({ clock }) => {
    if (animated && mesh.current) {
      const t = Math.min(1, (clock.getElapsedTime() - index * 0.1) / 2);
      mesh.current.scale.y = THREE.MathUtils.lerp(0.1, 1, t);
      mesh.current.position.y = THREE.MathUtils.lerp(0, height / 2, t);
    }
  });
  
  // Animation with react-spring
  const { barScale, barColor, labelOpacity } = useSpring({
    barScale: isActive ? [1.05, 1, 1.05] : [1, 1, 1],
    barColor: isActive ? new THREE.Color(color).multiplyScalar(1.2) : new THREE.Color(color),
    labelOpacity: isActive ? 1 : 0,
    config: {
      tension: 300,
      friction: 20,
    }
  });
  
  // Choose geometry based on barStyle
  const BarGeometry = () => {
    switch (barStyle) {
      case 'cylinder':
        return <cylinderGeometry args={[width/2, width/2, height, 16]} />;
      case 'capsule':
        return <capsuleGeometry args={[width/2, height - width]} />;
      case 'box':
      default:
        return <boxGeometry args={[width, height, depth]} />;
    }
  };
  
  return (
    <group position={position}>
      <animated.mesh 
        ref={mesh} 
        position={[0, height / 2, 0]} 
        scale={barScale}
        onPointerOver={() => setIsHovered(true)}
        onPointerOut={() => setIsHovered(false)}
        onClick={() => onClick(index)}
      >
        <BarGeometry />
        <animated.meshStandardMaterial 
          color={barColor} 
          metalness={0.3} 
          roughness={0.4}
          emissive={color}
          emissiveIntensity={isActive ? 0.5 : 0.2}
        />
      </animated.mesh>
      
      {/* Bar label */}
      <Text
        position={[0, -0.3, 0]}
        rotation={[0, 0, 0]}
        fontSize={0.15}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Orbitron-Light.ttf"
      >
        {label}
      </Text>
      
      {/* Value label that appears on hover */}
      <animated.group position={[0, height + 0.3, 0]} opacity={labelOpacity}>
        <Text
          fontSize={0.2}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Orbitron-Medium.ttf"
          outlineWidth={0.01}
          outlineColor="#000000"
          outlineOpacity={0.3}
        >
          {value}
        </Text>
      </animated.group>
    </group>
  );
};

/**
 * Line3D - 3D line component for line charts
 */
const Line3D = ({ 
  points, 
  color, 
  thickness = 0.05,
  animated = true
}) => {
  const lineRef = useRef();
  const pointRefs = useRef([]);
  
  // Create curve from points
  const curve = useMemo(() => {
    const curvePoints = points.map(p => new THREE.Vector3(p.x, p.y, 0));
    return new THREE.CatmullRomCurve3(curvePoints);
  }, [points]);
  
  // Animation for drawing line
  useFrame(({ clock }) => {
    if (animated && lineRef.current) {
      const t = Math.min(1, clock.getElapsedTime() / 3);
      const lineGeometry = lineRef.current.geometry;
      const positions = lineGeometry.attributes.position.array;
      
      const totalPoints = positions.length / 3;
      const visiblePoints = Math.floor(totalPoints * t);
      
      for (let i = 0; i < totalPoints; i++) {
        const alpha = i < visiblePoints ? 1 : 0;
        if (i * 3 + 2 < positions.length) {
          positions[i * 3 + 2] = alpha * 0.1; // Slightly adjust z to make visible/invisible
        }
      }
      
      lineGeometry.attributes.position.needsUpdate = true;
      
      // Animate points
      pointRefs.current.forEach((ref, i) => {
        if (ref) {
          const pointT = Math.min(1, (clock.getElapsedTime() - i * 0.1) / 3);
          ref.scale.setScalar(pointT);
        }
      });
    }
  });
  
  return (
    <group>
      {/* Line */}
      <mesh ref={lineRef}>
        <tubeGeometry args={[curve, 64, thickness, 8, false]} />
        <meshStandardMaterial 
          color={color} 
          metalness={0.3} 
          roughness={0.4}
          emissive={color}
          emissiveIntensity={0.5}
        />
      </mesh>
      
      {/* Points */}
      {points.map((point, i) => (
        <mesh 
          key={i} 
          position={[point.x, point.y, 0]}
          ref={el => pointRefs.current[i] = el}
        >
          <sphereGeometry args={[thickness * 2, 16, 16]} />
          <meshStandardMaterial 
            color={color} 
            metalness={0.3} 
            roughness={0.4}
            emissive={color}
            emissiveIntensity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
};

/**
 * Pie3D - 3D pie chart component
 */
const Pie3D = ({ 
  data, 
  radius = 1.5, 
  thickness = 0.3,
  height = 0.5,
  animated = true
}) => {
  const pieRef = useRef();
  const sliceRefs = useRef([]);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  
  // Calculate total value
  const total = useMemo(() => data.reduce((sum, item) => sum + item.value, 0), [data]);
  
  // Create pie slices
  const slices = useMemo(() => {
    let startAngle = 0;
    return data.map((item, i) => {
      const angle = (item.value / total) * Math.PI * 2;
      const slice = {
        startAngle,
        endAngle: startAngle + angle,
        color: item.color,
        hoverColor: item.hoverColor || item.color,
        value: item.value,
        label: item.label,
        index: i
      };
      startAngle += angle;
      return slice;
    });
  }, [data, total]);
  
  // Animation for pie slices
  useFrame(({ clock }) => {
    if (animated && sliceRefs.current.length > 0) {
      sliceRefs.current.forEach((ref, i) => {
        if (ref) {
          const t = Math.min(1, (clock.getElapsedTime() - i * 0.1) / 2);
          ref.scale.setScalar(t);
          
          // Hover effect
          if (hoveredIndex === i) {
            ref.position.z = Math.sin(clock.getElapsedTime() * 2) * 0.02 + 0.05;
          } else {
            ref.position.z = 0;
          }
        }
      });
    }
  });
  
  return (
    <group ref={pieRef} rotation={[-Math.PI / 2, 0, 0]}>
      {slices.map((slice, i) => {
        const isHovered = hoveredIndex === i;
        const centerAngle = (slice.startAngle + slice.endAngle) / 2;
        const labelX = Math.cos(centerAngle) * (radius + 0.3);
        const labelY = Math.sin(centerAngle) * (radius + 0.3);
        
        return (
          <group key={i}>
            {/* Pie slice */}
            <mesh 
              ref={el => sliceRefs.current[i] = el}
              onPointerOver={() => setHoveredIndex(i)}
              onPointerOut={() => setHoveredIndex(-1)}
            >
              <cylinderGeometry 
                args={[
                  radius, 
                  radius, 
                  height, 
                  32, 
                  1, 
                  false, 
                  slice.startAngle, 
                  slice.endAngle - slice.startAngle
                ]} 
              />
              <MeshWobbleMaterial 
                color={isHovered ? slice.hoverColor : slice.color} 
                factor={isHovered ? 0.2 : 0.05} 
                speed={0.5}
                metalness={0.3} 
                roughness={0.4}
                emissive={slice.color}
                emissiveIntensity={isHovered ? 0.5 : 0.2}
              />
            </mesh>
            
            {/* Label */}
            <group position={[labelX, labelY, height / 2 + 0.1]} rotation={[Math.PI / 2, 0, 0]}>
              <Text
                fontSize={0.15}
                color="#ffffff"
                anchorX="center"
                anchorY="middle"
                font="/fonts/Orbitron-Light.ttf"
              >
                {slice.label}
              </Text>
              <Text
                position={[0, -0.2, 0]}
                fontSize={0.12}
                color="#ffffff"
                anchorX="center"
                anchorY="middle"
                font="/fonts/Orbitron-Light.ttf"
              >
                {Math.round((slice.value / total) * 100)}%
              </Text>
            </group>
          </group>
        );
      })}
    </group>
  );
};

/**
 * Grid3D - 3D grid component for charts
 */
const Grid3D = ({ 
  size = [10, 5, 10], 
  divisions = [10, 5, 0], 
  color = '#444444',
  opacity = 0.3
}) => {
  return (
    <group position={[0, 0, 0]}>
      {/* X-Z plane grid (floor) */}
      <gridHelper 
        args={[size[0], divisions[0], color, color]} 
        position={[0, -0.01, 0]} 
        rotation={[0, 0, 0]} 
      >
        <meshBasicMaterial transparent opacity={opacity} />
      </gridHelper>
      
      {/* Y-Z plane grid (back wall) */}
      {divisions[2] > 0 && (
        <gridHelper 
          args={[size[2], divisions[2], color, color]} 
          position={[-size[0]/2, size[1]/2, 0]} 
          rotation={[0, 0, Math.PI/2]} 
        >
          <meshBasicMaterial transparent opacity={opacity} />
        </gridHelper>
      )}
      
      {/* X-Y plane grid (side wall) */}
      {divisions[1] > 0 && (
        <gridHelper 
          args={[size[1], divisions[1], color, color]} 
          position={[0, size[1]/2, -size[2]/2]} 
          rotation={[Math.PI/2, 0, 0]} 
        >
          <meshBasicMaterial transparent opacity={opacity} />
        </gridHelper>
      )}
    </group>
  );
};

/**
 * Chart3D - Main 3D chart component
 * 
 * @param {Object} props
 * @param {Array} props.data - Chart data
 * @param {string} props.title - Chart title
 * @param {string} props.chartType - Chart type ('bar', 'line', 'pie')
 * @param {string} props.style - Chart style ('cyber', 'holographic', 'neon', 'minimal')
 * @param {string} props.color - Primary color
 * @param {string} props.barStyle - Bar style for bar charts ('box', 'cylinder', 'capsule')
 * @param {boolean} props.animated - Whether to animate the chart
 * @param {boolean} props.interactive - Whether chart responds to hover/click
 * @param {function} props.onDataPointClick - Click handler for data points
 * @param {string} props.className - Additional CSS classes
 */
const Chart3D = ({
  data = [],
  title = '',
  chartType = 'bar',
  style = 'cyber',
  color = colors.primary[600],
  barStyle = 'box',
  animated = true,
  interactive = true,
  onDataPointClick = () => {},
  className = ''
}) => {
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  
  // Process data for different chart types
  const processedData = useMemo(() => {
    if (chartType === 'line') {
      // Convert data to points for line chart
      const maxValue = Math.max(...data.map(d => d.value));
      return data.map((item, i) => ({
        x: i * 2 - (data.length - 1),
        y: (item.value / maxValue) * 4,
        color: item.color || color,
        label: item.label,
        value: item.value
      }));
    }
    return data;
  }, [data, chartType, color]);
  
  // Handle data point click
  const handleDataPointClick = (index) => {
    if (interactive) {
      setHoveredIndex(index);
      onDataPointClick(data[index], index);
    }
  };
  
  // Render chart based on type
  const renderChart = () => {
    switch (chartType) {
      case 'line':
        return (
          <>
            <Grid3D size={[10, 5, 0.1]} divisions={[10, 5, 0]} />
            <Line3D 
              points={processedData} 
              color={color} 
              thickness={0.05}
              animated={animated}
            />
          </>
        );
      case 'pie':
        return (
          <Pie3D 
            data={data} 
            radius={1.5} 
            thickness={0.3}
            height={0.5}
            animated={animated}
          />
        );
      case 'bar':
      default:
        return (
          <>
            <Grid3D size={[10, 5, 0.1]} divisions={[10, 5, 0]} />
            {data.map((item, index) => (
              <Bar3D 
                key={index} 
                position={[index * 2 - (data.length - 1), 0, 0]} 
                height={item.value / 10} 
                color={item.color || color} 
                label={item.label}
                value={item.value}
                index={index}
                totalBars={data.length}
                barStyle={barStyle}
                animated={animated}
                hovered={hoveredIndex === index}
                onClick={handleDataPointClick}
              />
            ))}
          </>
        );
    }
  };
  
  return (
    <div className={`${className} relative h-full w-full`}>
      {title && (
        <div className="absolute top-2 left-0 right-0 text-center text-white text-lg font-semibold z-10">
          {title}
        </div>
      )}
      <div className="h-full w-full">
        <scene3D
          enableEffects={true}
          cameraProps={{ 
            position: chartType === 'pie' ? [0, 2, 5] : [0, 2, 8], 
            fov: 45 
          }}
          backgroundColor={colors.dark[500]}
          enableFog={false}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <pointLight position={[-10, 5, -10]} intensity={0.5} />
          
          {renderChart()}
          
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            minPolarAngle={0} 
            maxPolarAngle={Math.PI / 2.5}
            autoRotate={!interactive}
            autoRotateSpeed={0.5}
          />
        </scene3D>
      </div>
    </div>
  );
};

export default Chart3D;
export { Bar3D, Line3D, Pie3D, Grid3D };
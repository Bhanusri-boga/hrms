import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, RoundedBox, MeshTransmissionMaterial } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';
import { colors } from '../../../design/DesignSystem';

/**
 * TableCell3D - 3D table cell component
 */
const TableCell3D = ({
  text,
  position,
  size,
  isHeader = false,
  isSelected = false,
  rowIndex,
  cellIndex,
  onCellClick,
  style = 'cyber',
  color = colors.primary[600],
  hoverColor = colors.primary[400],
  textColor = '#ffffff'
}) => {
  const [hovered, setHovered] = useState(false);
  const cellRef = useRef();
  const textRef = useRef();
  
  // Handle pointer events
  const handlePointerOver = () => setHovered(true);
  const handlePointerOut = () => setHovered(false);
  const handleClick = () => onCellClick(rowIndex, cellIndex);
  
  // Animation with react-spring
  const { 
    cellScale, 
    cellColor, 
    cellPosition, 
    textPosition 
  } = useSpring({
    cellScale: hovered ? [1.05, 1.05, 1.05] : [1, 1, 1],
    cellColor: isSelected 
      ? hoverColor 
      : isHeader 
        ? color 
        : hovered 
          ? new THREE.Color(color).lerp(new THREE.Color(hoverColor), 0.5).getStyle()
          : '#1e1e2a',
    cellPosition: [position[0], position[1], hovered || isSelected ? position[2] + 0.05 : position[2]],
    textPosition: [0, 0, size[2] / 2 + 0.01],
    config: {
      tension: 300,
      friction: 20,
    }
  });
  
  // Text floating animation
  useFrame(({ clock }) => {
    if (textRef.current && (hovered || isSelected)) {
      const t = clock.getElapsedTime();
      textRef.current.position.y = Math.sin(t * 5) * 0.01;
    }
  });
  
  // Cell material based on style
  const CellMaterial = ({ color }) => {
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
            emissive={isHeader || isSelected || hovered ? color : '#000000'}
            emissiveIntensity={isHeader ? 0.5 : isSelected ? 0.8 : hovered ? 0.3 : 0}
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
            emissive={isHeader || isSelected || hovered ? color : '#000000'}
            emissiveIntensity={isHeader ? 0.3 : isSelected ? 0.5 : hovered ? 0.2 : 0}
          />
        );
      case 'cyber':
      default:
        return (
          <meshStandardMaterial
            color={color}
            roughness={0.2}
            metalness={0.8}
            emissive={isHeader || isSelected || hovered ? color : '#000000'}
            emissiveIntensity={isHeader ? 0.5 : isSelected ? 0.8 : hovered ? 0.3 : 0}
          />
        );
    }
  };
  
  return (
    <animated.group 
      position={cellPosition}
      scale={cellScale}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      {/* Cell background */}
      <animated.mesh ref={cellRef}>
        <RoundedBox args={size} radius={0.05} smoothness={4}>
          <CellMaterial color={cellColor} />
        </RoundedBox>
      </animated.mesh>
      
      {/* Cell text */}
      <animated.group position={textPosition} ref={textRef}>
        <Text
          fontSize={isHeader ? 0.18 : 0.15}
          color={textColor}
          anchorX="center"
          anchorY="middle"
          font={isHeader ? "/fonts/Orbitron-Medium.ttf" : "/fonts/Orbitron-Light.ttf"}
          letterSpacing={0.05}
          maxWidth={size[0] * 0.9}
          textAlign="center"
          outlineWidth={0.01}
          outlineColor="#000000"
          outlineOpacity={0.3}
        >
          {text}
        </Text>
      </animated.group>
      
      {/* Selection indicator */}
      {isSelected && (
        <mesh position={[0, 0, -size[2] / 2 - 0.01]}>
          <RoundedBox args={[size[0] + 0.05, size[1] + 0.05, 0.01]} radius={0.05} smoothness={4}>
            <meshBasicMaterial 
              color={hoverColor} 
              opacity={0.5} 
              transparent={true}
              toneMapped={false}
            />
          </RoundedBox>
        </mesh>
      )}
    </animated.group>
  );
};

/**
 * Table3D - Main 3D table component
 * 
 * @param {Object} props
 * @param {Array} props.data - Table data (array of arrays)
 * @param {Array} props.headers - Table headers
 * @param {Array} props.columnWidths - Relative widths for each column
 * @param {string} props.title - Table title
 * @param {string} props.style - Table style ('cyber', 'holographic', 'neon', 'minimal')
 * @param {string} props.color - Primary color
 * @param {string} props.hoverColor - Color when hovered
 * @param {string} props.textColor - Text color
 * @param {boolean} props.isSelectable - Whether cells are selectable
 * @param {Array} props.selectedCell - Currently selected cell [rowIndex, cellIndex]
 * @param {function} props.onCellClick - Cell click handler
 * @param {number} props.cellHeight - Height of each cell
 * @param {number} props.cellSpacing - Spacing between cells
 * @param {number} props.maxVisibleRows - Maximum number of visible rows
 */
const Table3D = ({
  data = [],
  headers = [],
  columnWidths = [],
  title = '',
  style = 'cyber',
  color = colors.primary[600],
  hoverColor = colors.primary[400],
  textColor = '#ffffff',
  isSelectable = true,
  selectedCell = [-1, -1],
  onCellClick = () => {},
  cellHeight = 0.6,
  cellSpacing = 0.1,
  maxVisibleRows = 10
}) => {
  const tableRef = useRef();
  const [visibleRowsStart, setVisibleRowsStart] = useState(0);
  const totalRows = data.length;
  const totalColumns = headers.length;
  
  // Calculate total table width
  const totalWidth = columnWidths.reduce((sum, width) => sum + width, 0) * 1.5;
  
  // Normalize column widths
  const normalizedWidths = columnWidths.map(width => (width / totalWidth) * 10);
  
  // Handle scroll for large tables
  const handleScroll = (direction) => {
    if (direction === 'up' && visibleRowsStart > 0) {
      setVisibleRowsStart(prev => Math.max(0, prev - 1));
    } else if (direction === 'down' && visibleRowsStart < totalRows - maxVisibleRows) {
      setVisibleRowsStart(prev => Math.min(totalRows - maxVisibleRows, prev + 1));
    }
  };
  
  // Calculate visible rows
  const visibleRows = data.slice(
    visibleRowsStart,
    Math.min(visibleRowsStart + maxVisibleRows, totalRows)
  );
  
  // Floating animation for table
  useFrame(({ clock }) => {
    if (tableRef.current) {
      const t = clock.getElapsedTime();
      tableRef.current.position.y = Math.sin(t * 0.5) * 0.05;
      tableRef.current.rotation.z = Math.sin(t * 0.3) * 0.01;
    }
  });
  
  return (
    <group ref={tableRef}>
      {/* Table title */}
      {title && (
        <Text
          position={[0, (cellHeight + cellSpacing) * (maxVisibleRows + 1) / 2 + 0.5, 0]}
          fontSize={0.3}
          color={textColor}
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
      )}
      
      {/* Table headers */}
      <group position={[0, (cellHeight + cellSpacing) * (maxVisibleRows) / 2, 0]}>
        {headers.map((header, cellIndex) => {
          // Calculate cell position
          let xOffset = -totalWidth / 2;
          for (let i = 0; i < cellIndex; i++) {
            xOffset += normalizedWidths[i] + cellSpacing;
          }
          xOffset += normalizedWidths[cellIndex] / 2;
          
          return (
            <TableCell3D
              key={`header-${cellIndex}`}
              text={header}
              position={[xOffset, 0, 0]}
              size={[normalizedWidths[cellIndex], cellHeight, 0.1]}
              isHeader={true}
              rowIndex={-1}
              cellIndex={cellIndex}
              onCellClick={onCellClick}
              style={style}
              color={color}
              hoverColor={hoverColor}
              textColor={textColor}
            />
          );
        })}
      </group>
      
      {/* Table rows */}
      <group position={[0, 0, 0]}>
        {visibleRows.map((row, rowIndex) => {
          const actualRowIndex = rowIndex + visibleRowsStart;
          
          return (
            <group 
              key={`row-${actualRowIndex}`} 
              position={[0, (cellHeight + cellSpacing) * (maxVisibleRows / 2 - rowIndex - 1), 0]}
            >
              {row.map((cell, cellIndex) => {
                // Calculate cell position
                let xOffset = -totalWidth / 2;
                for (let i = 0; i < cellIndex; i++) {
                  xOffset += normalizedWidths[i] + cellSpacing;
                }
                xOffset += normalizedWidths[cellIndex] / 2;
                
                return (
                  <TableCell3D
                    key={`cell-${actualRowIndex}-${cellIndex}`}
                    text={cell}
                    position={[xOffset, 0, 0]}
                    size={[normalizedWidths[cellIndex], cellHeight, 0.1]}
                    isHeader={false}
                    isSelected={isSelectable && selectedCell[0] === actualRowIndex && selectedCell[1] === cellIndex}
                    rowIndex={actualRowIndex}
                    cellIndex={cellIndex}
                    onCellClick={onCellClick}
                    style={style}
                    color={color}
                    hoverColor={hoverColor}
                    textColor={textColor}
                  />
                );
              })}
            </group>
          );
        })}
      </group>
      
      {/* Scroll buttons for large tables */}
      {totalRows > maxVisibleRows && (
        <>
          {/* Up button */}
          <group 
            position={[0, (cellHeight + cellSpacing) * (maxVisibleRows / 2) + 0.5, 0]}
            onClick={() => handleScroll('up')}
            visible={visibleRowsStart > 0}
          >
            <RoundedBox args={[0.6, 0.3, 0.1]} radius={0.05} smoothness={4}>
              <meshStandardMaterial 
                color={color} 
                emissive={color}
                emissiveIntensity={0.5}
              />
            </RoundedBox>
            <Text
              position={[0, 0, 0.06]}
              fontSize={0.15}
              color={textColor}
              anchorX="center"
              anchorY="middle"
              font="/fonts/Orbitron-Medium.ttf"
            >
              ▲
            </Text>
          </group>
          
          {/* Down button */}
          <group 
            position={[0, -(cellHeight + cellSpacing) * (maxVisibleRows / 2) - 0.5, 0]}
            onClick={() => handleScroll('down')}
            visible={visibleRowsStart < totalRows - maxVisibleRows}
          >
            <RoundedBox args={[0.6, 0.3, 0.1]} radius={0.05} smoothness={4}>
              <meshStandardMaterial 
                color={color} 
                emissive={color}
                emissiveIntensity={0.5}
              />
            </RoundedBox>
            <Text
              position={[0, 0, 0.06]}
              fontSize={0.15}
              color={textColor}
              anchorX="center"
              anchorY="middle"
              font="/fonts/Orbitron-Medium.ttf"
            >
              ▼
            </Text>
          </group>
        </>
      )}
    </group>
  );
};

export default Table3D;
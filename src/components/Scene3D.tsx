
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

interface AnimatedGeometryProps {
  type: 'sphere' | 'box' | 'torus';
  position: [number, number, number];
  color: string;
  scale?: number;
}

const AnimatedGeometry: React.FC<AnimatedGeometryProps> = ({ type, position, color, scale = 1 }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  const renderGeometry = () => {
    const materialProps = {
      color: color,
      metalness: 0.9,
      roughness: 0.1,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
    };

    switch (type) {
      case 'sphere':
        return (
          <mesh ref={meshRef} position={position}>
            <sphereGeometry args={[0.5 * scale, 32, 32]} />
            <meshPhysicalMaterial {...materialProps} />
          </mesh>
        );
      case 'box':
        return (
          <mesh ref={meshRef} position={position}>
            <boxGeometry args={[0.8 * scale, 0.8 * scale, 0.8 * scale]} />
            <meshPhysicalMaterial {...materialProps} />
          </mesh>
        );
      case 'torus':
        return (
          <mesh ref={meshRef} position={position}>
            <torusGeometry args={[0.6 * scale, 0.3 * scale, 16, 32]} />
            <meshPhysicalMaterial {...materialProps} />
          </mesh>
        );
      default:
        return null;
    }
  };

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={0.5}>
      {renderGeometry()}
    </Float>
  );
};

interface Scene3DProps {
  geometries?: AnimatedGeometryProps[];
  cameraPosition?: [number, number, number];
  enableControls?: boolean;
}

const Scene3D: React.FC<Scene3DProps> = ({ 
  geometries = [], 
  cameraPosition = [0, 0, 5],
  enableControls = true 
}) => {
  return (
    <div className="w-full h-full">
      <Canvas 
        camera={{ position: cameraPosition, fov: 75 }}
        onCreated={({ gl }) => {
          gl.setClearColor('#000000', 0);
        }}
        fallback={<div className="w-full h-full bg-transparent" />}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <Environment preset="city" />
        
        {geometries.map((geom, index) => (
          <AnimatedGeometry key={`${geom.type}-${index}`} {...geom} />
        ))}
        
        {enableControls && (
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
            autoRotate
            autoRotateSpeed={0.5}
          />
        )}
      </Canvas>
    </div>
  );
};

export default Scene3D;

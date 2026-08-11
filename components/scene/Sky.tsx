'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Cloud, Clouds } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function Drift({ dark }: { dark: boolean }) {
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    // Gentle autonomous drift plus a small parallax nudge from the pointer —
    // decorative motion, so a spring/lerp feel matters more than precision.
    group.current.position.x = Math.sin(t * 0.05) * 0.6 + pointer.x * 0.4;
    group.current.position.y = -1.4 + Math.cos(t * 0.08) * 0.15 + pointer.y * 0.15;
  });

  const cloudColor = dark ? '#1b2a36' : '#ffffff';

  return (
    <group ref={group}>
      <Clouds material={THREE.MeshBasicMaterial}>
        <Cloud seed={1} segments={40} bounds={[6, 1.5, 2]} volume={7} color={cloudColor} opacity={dark ? 0.5 : 0.9} fade={30} position={[-1.5, 0, -2]} />
        <Cloud seed={2} segments={30} bounds={[5, 1.2, 2]} volume={5} color={cloudColor} opacity={dark ? 0.4 : 0.75} fade={30} position={[2, 0.6, -3]} />
        <Cloud seed={3} segments={25} bounds={[4, 1, 2]} volume={4} color={cloudColor} opacity={dark ? 0.35 : 0.65} fade={30} position={[0.5, -0.8, -1]} />
      </Clouds>
    </group>
  );
}

export function Sky({ dark }: { dark: boolean }) {
  const fogColor = dark ? '#060a10' : '#bfe0f7';

  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
      camera={{ position: [0, 0, 5], fov: 45 }}
      className="!absolute inset-0">
      <fog attach="fog" args={[fogColor, 3, 9]} />
      <ambientLight intensity={dark ? 0.3 : 0.9} />
      <Drift dark={dark} />
    </Canvas>
  );
}

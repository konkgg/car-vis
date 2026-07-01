import { useMemo } from 'react';
import * as THREE from 'three';
import { createBodyMaterial } from '../../utils/materials';
import type { PaintFinish, SurfaceType } from '../../cars/types';

interface BodyProps {
  color: string;
  finish: PaintFinish;
  surfaceType: SurfaceType;
  wrapPattern?: string;
  wrapAccentHex?: string;
}

function useBodyMaterial({ color, finish, surfaceType, wrapPattern, wrapAccentHex }: BodyProps) {
  return useMemo(
    () => createBodyMaterial(color, finish, surfaceType, wrapPattern, wrapAccentHex),
    [color, finish, surfaceType, wrapPattern, wrapAccentHex],
  );
}

const glassMaterial = new THREE.MeshPhysicalMaterial({
  color: '#88aacc',
  metalness: 0.1,
  roughness: 0.05,
  transmission: 0.6,
  transparent: true,
  opacity: 0.7,
});

const trimMaterial = new THREE.MeshStandardMaterial({
  color: '#111111',
  metalness: 0.8,
  roughness: 0.3,
});

const lightMaterial = new THREE.MeshStandardMaterial({
  color: '#ffeedd',
  emissive: '#ffaa44',
  emissiveIntensity: 0.8,
});

export function CoupeBody({ color, finish, surfaceType, wrapPattern, wrapAccentHex }: BodyProps) {
  const bodyMat = useBodyMaterial({ color, finish, surfaceType, wrapPattern, wrapAccentHex });

  return (
    <group>
      {/* Main body */}
      <mesh position={[0, 0.55, 0]} castShadow material={bodyMat}>
        <boxGeometry args={[1.7, 0.5, 3.8]} />
      </mesh>

      {/* Hood slope */}
      <mesh position={[0, 0.72, 1.1]} rotation={[-0.15, 0, 0]} castShadow material={bodyMat}>
        <boxGeometry args={[1.65, 0.12, 1.4]} />
      </mesh>

      {/* Cabin / roof */}
      <mesh position={[0, 0.95, -0.15]} castShadow material={bodyMat}>
        <boxGeometry args={[1.5, 0.45, 1.8]} />
      </mesh>

      {/* Rear deck */}
      <mesh position={[0, 0.68, -1.35]} rotation={[0.12, 0, 0]} castShadow material={bodyMat}>
        <boxGeometry args={[1.65, 0.1, 1.0]} />
      </mesh>

      {/* Front bumper */}
      <mesh position={[0, 0.3, 2.0]} castShadow material={trimMaterial}>
        <boxGeometry args={[1.75, 0.25, 0.3]} />
      </mesh>

      {/* Rear bumper */}
      <mesh position={[0, 0.3, -2.0]} castShadow material={trimMaterial}>
        <boxGeometry args={[1.75, 0.25, 0.3]} />
      </mesh>

      {/* Side skirts */}
      <mesh position={[-0.88, 0.35, 0]} castShadow material={trimMaterial}>
        <boxGeometry args={[0.05, 0.15, 3.2]} />
      </mesh>
      <mesh position={[0.88, 0.35, 0]} castShadow material={trimMaterial}>
        <boxGeometry args={[0.05, 0.15, 3.2]} />
      </mesh>

      {/* Windshield */}
      <mesh position={[0, 0.95, 0.75]} rotation={[-0.4, 0, 0]} castShadow material={glassMaterial}>
        <boxGeometry args={[1.45, 0.02, 0.7]} />
      </mesh>

      {/* Rear window */}
      <mesh position={[0, 0.95, -0.95]} rotation={[0.35, 0, 0]} castShadow material={glassMaterial}>
        <boxGeometry args={[1.4, 0.02, 0.6]} />
      </mesh>

      {/* Side windows */}
      <mesh position={[-0.76, 0.95, -0.1]} castShadow material={glassMaterial}>
        <boxGeometry args={[0.02, 0.35, 1.5]} />
      </mesh>
      <mesh position={[0.76, 0.95, -0.1]} castShadow material={glassMaterial}>
        <boxGeometry args={[0.02, 0.35, 1.5]} />
      </mesh>

      {/* Headlights */}
      <mesh position={[-0.6, 0.45, 1.95]} material={lightMaterial}>
        <boxGeometry args={[0.35, 0.12, 0.08]} />
      </mesh>
      <mesh position={[0.6, 0.45, 1.95]} material={lightMaterial}>
        <boxGeometry args={[0.35, 0.12, 0.08]} />
      </mesh>

      {/* Taillights */}
      <mesh position={[-0.6, 0.5, -1.95]}>
        <boxGeometry args={[0.35, 0.1, 0.06]} />
        <meshStandardMaterial color="#cc1111" emissive="#ff0000" emissiveIntensity={0.5} attach="material" />
      </mesh>
      <mesh position={[0.6, 0.5, -1.95]}>
        <boxGeometry args={[0.35, 0.1, 0.06]} />
        <meshStandardMaterial color="#cc1111" emissive="#ff0000" emissiveIntensity={0.5} attach="material" />
      </mesh>

      {/* Mirrors */}
      <mesh position={[-0.92, 0.85, 0.5]} castShadow material={bodyMat}>
        <boxGeometry args={[0.12, 0.08, 0.15]} />
      </mesh>
      <mesh position={[0.92, 0.85, 0.5]} castShadow material={bodyMat}>
        <boxGeometry args={[0.12, 0.08, 0.15]} />
      </mesh>
    </group>
  );
}

export function SedanBody({ color, finish, surfaceType, wrapPattern, wrapAccentHex }: BodyProps) {
  const bodyMat = useBodyMaterial({ color, finish, surfaceType, wrapPattern, wrapAccentHex });

  return (
    <group>
      {/* Main body — longer, taller */}
      <mesh position={[0, 0.58, 0]} castShadow material={bodyMat}>
        <boxGeometry args={[1.75, 0.55, 4.4]} />
      </mesh>

      {/* Hood */}
      <mesh position={[0, 0.78, 1.5]} rotation={[-0.08, 0, 0]} castShadow material={bodyMat}>
        <boxGeometry args={[1.7, 0.12, 1.2]} />
      </mesh>

      {/* Cabin */}
      <mesh position={[0, 1.02, -0.3]} castShadow material={bodyMat}>
        <boxGeometry args={[1.55, 0.5, 2.2]} />
      </mesh>

      {/* Trunk */}
      <mesh position={[0, 0.75, -1.7]} rotation={[0.06, 0, 0]} castShadow material={bodyMat}>
        <boxGeometry args={[1.7, 0.1, 0.9]} />
      </mesh>

      {/* Bumpers */}
      <mesh position={[0, 0.32, 2.3]} castShadow material={trimMaterial}>
        <boxGeometry args={[1.8, 0.28, 0.3]} />
      </mesh>
      <mesh position={[0, 0.32, -2.3]} castShadow material={trimMaterial}>
        <boxGeometry args={[1.8, 0.28, 0.3]} />
      </mesh>

      {/* Windshield */}
      <mesh position={[0, 1.02, 0.85]} rotation={[-0.35, 0, 0]} castShadow material={glassMaterial}>
        <boxGeometry args={[1.5, 0.02, 0.75]} />
      </mesh>

      {/* Rear window */}
      <mesh position={[0, 1.02, -1.35]} rotation={[0.3, 0, 0]} castShadow material={glassMaterial}>
        <boxGeometry args={[1.45, 0.02, 0.7]} />
      </mesh>

      {/* Side windows */}
      <mesh position={[-0.78, 1.02, -0.3]} castShadow material={glassMaterial}>
        <boxGeometry args={[0.02, 0.38, 2.0]} />
      </mesh>
      <mesh position={[0.78, 1.02, -0.3]} castShadow material={glassMaterial}>
        <boxGeometry args={[0.02, 0.38, 2.0]} />
      </mesh>

      {/* Headlights */}
      <mesh position={[-0.65, 0.48, 2.25]} material={lightMaterial}>
        <boxGeometry args={[0.4, 0.14, 0.08]} />
      </mesh>
      <mesh position={[0.65, 0.48, 2.25]} material={lightMaterial}>
        <boxGeometry args={[0.4, 0.14, 0.08]} />
      </mesh>

      {/* Taillights */}
      <mesh position={[-0.65, 0.52, -2.25]}>
        <boxGeometry args={[0.4, 0.12, 0.06]} />
        <meshStandardMaterial color="#cc1111" emissive="#ff0000" emissiveIntensity={0.5} attach="material" />
      </mesh>
      <mesh position={[0.65, 0.52, -2.25]}>
        <boxGeometry args={[0.4, 0.12, 0.06]} />
        <meshStandardMaterial color="#cc1111" emissive="#ff0000" emissiveIntensity={0.5} attach="material" />
      </mesh>
    </group>
  );
}

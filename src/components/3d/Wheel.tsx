import { useMemo } from 'react';
import type { ReactElement } from 'react';
import type { WheelDefinition } from '../../cars/types';

interface WheelProps {
  wheel: WheelDefinition;
  position: [number, number, number];
}

function SportWheel() {
  return (
    <group>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.38, 0.38, 0.28, 32]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.25, 0.25, 0.3, 5]} />
        <meshStandardMaterial color="#c0c0c0" metalness={0.95} roughness={0.15} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.08, 0.08, 0.32, 16]} />
        <meshStandardMaterial color="#888" metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  );
}

function ClassicWheel() {
  const spokes = useMemo(() => {
    const group = [];
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      group.push(
        <mesh key={i} position={[Math.cos(angle) * 0.15, 0, Math.sin(angle) * 0.15]} rotation={[0, angle, Math.PI / 2]}>
          <boxGeometry args={[0.02, 0.22, 0.02]} />
          <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
        </mesh>,
      );
    }
    return group;
  }, []);

  return (
    <group>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.38, 0.38, 0.26, 32]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.7} roughness={0.4} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.32, 0.32, 0.27, 32]} />
        <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.15} />
      </mesh>
      {spokes}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.06, 0.06, 0.28, 16]} />
        <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  );
}

function OffroadWheel() {
  return (
    <group>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.42, 0.42, 0.35, 32]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.22, 0.22, 0.36, 6]} />
        <meshStandardMaterial color="#555" metalness={0.6} roughness={0.5} />
      </mesh>
      {[-0.12, 0, 0.12].map((z) => (
        <mesh key={z} position={[0, z, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <boxGeometry args={[0.5, 0.04, 0.08]} />
          <meshStandardMaterial color="#333" metalness={0.5} roughness={0.6} />
        </mesh>
      ))}
    </group>
  );
}

function LuxuryWheel() {
  const spokes = useMemo(() => {
    const group = [];
    for (let i = 0; i < 10; i++) {
      const angle = (i / 10) * Math.PI * 2;
      group.push(
        <mesh key={i} position={[Math.cos(angle) * 0.12, 0, Math.sin(angle) * 0.12]} rotation={[0, angle, Math.PI / 2]}>
          <boxGeometry args={[0.03, 0.28, 0.04]} />
          <meshStandardMaterial color="#e8e8e8" metalness={0.95} roughness={0.1} />
        </mesh>,
      );
    }
    return group;
  }, []);

  return (
    <group>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.38, 0.38, 0.28, 32]} />
        <meshStandardMaterial color="#111" metalness={0.8} roughness={0.25} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.3, 0.3, 0.29, 32]} />
        <meshStandardMaterial color="#e0e0e0" metalness={0.98} roughness={0.08} />
      </mesh>
      {spokes}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.07, 0.07, 0.3, 16]} />
        <meshStandardMaterial color="#ccc" metalness={0.95} roughness={0.1} />
      </mesh>
    </group>
  );
}

const WHEEL_COMPONENTS: Record<WheelDefinition['style'], () => ReactElement> = {
  sport: SportWheel,
  classic: ClassicWheel,
  offroad: OffroadWheel,
  luxury: LuxuryWheel,
};

export function Wheel({ wheel, position }: WheelProps) {
  const Component = WHEEL_COMPONENTS[wheel.style];
  return (
    <group position={position}>
      <Component />
    </group>
  );
}

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, PerspectiveCamera } from '@react-three/drei';
import { CarModel } from './CarModel';

export function CarViewer() {
  return (
    <div className="viewer">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[5, 2.5, 5]} fov={45} />
        <OrbitControls
          enablePan={false}
          minDistance={4}
          maxDistance={12}
          minPolarAngle={0.2}
          maxPolarAngle={Math.PI / 2.1}
          target={[0, 0.5, 0]}
        />

        <ambientLight intensity={0.3} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <directionalLight position={[-3, 4, -2]} intensity={0.4} />

        <Environment preset="city" />

        <CarModel />

        <ContactShadows
          position={[0, 0, 0]}
          opacity={0.5}
          scale={12}
          blur={2.5}
          far={5}
        />

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
          <planeGeometry args={[30, 30]} />
          <meshStandardMaterial color="#1a1a1f" roughness={0.8} />
        </mesh>
      </Canvas>
    </div>
  );
}

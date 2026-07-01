import { Suspense } from 'react';
import { useGLTF } from '@react-three/drei';
import { useMemo } from 'react';
import * as THREE from 'three';
import { createBodyMaterial } from '../../utils/materials';
import type { CarDefinition } from '../../cars/types';
import type { PaintFinish, SurfaceType } from '../../cars/types';

interface GltfCarProps {
  car: CarDefinition;
  color: string;
  finish: PaintFinish;
  surfaceType: SurfaceType;
  wrapPattern?: string;
  wrapAccentHex?: string;
}

function GltfCarModel({ car, color, finish, surfaceType, wrapPattern, wrapAccentHex }: GltfCarProps) {
  const { scene } = useGLTF(car.modelPath!);

  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    const bodyMat = createBodyMaterial(color, finish, surfaceType, wrapPattern, wrapAccentHex);
    const paintable = new Set(car.paintableMeshes ?? ['body', 'Body', 'car_body']);

    clone.traverse((child) => {
      if (child instanceof THREE.Mesh && paintable.has(child.name)) {
        child.material = bodyMat;
      }
    });

    return clone;
  }, [scene, color, finish, surfaceType, wrapPattern, wrapAccentHex, car.paintableMeshes]);

  return (
    <primitive
      object={clonedScene}
      scale={car.scale}
    />
  );
}

export function GltfCar(props: GltfCarProps) {
  return (
    <Suspense fallback={null}>
      <GltfCarModel {...props} />
    </Suspense>
  );
}

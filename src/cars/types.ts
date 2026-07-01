export type SurfaceType = 'paint' | 'wrap';
export type PaintFinish = 'gloss' | 'matte' | 'metallic' | 'satin';

export interface WheelDefinition {
  id: string;
  name: string;
  description: string;
  style: 'sport' | 'classic' | 'offroad' | 'luxury';
}

export interface ColorPreset {
  id: string;
  name: string;
  hex: string;
}

export interface WrapPreset {
  id: string;
  name: string;
  hex: string;
  pattern: 'solid' | 'racing-stripes' | 'carbon' | 'gradient';
  accentHex?: string;
}

export interface CarDefinition {
  id: string;
  name: string;
  manufacturer: string;
  year: number;
  /** Path to GLTF/GLB model — when provided, loads external model instead of procedural mesh */
  modelPath?: string;
  /** Mesh names in the GLTF that receive paint/wrap materials */
  paintableMeshes?: string[];
  /** Procedural car type when no modelPath is set */
  proceduralType: 'coupe' | 'sedan';
  wheelMounts: {
    frontLeft: [number, number, number];
    frontRight: [number, number, number];
    rearLeft: [number, number, number];
    rearRight: [number, number, number];
  };
  scale: number;
}

export interface VisualizerConfig {
  surfaceType: SurfaceType;
  color: string;
  finish: PaintFinish;
  wrapPresetId: string | null;
  wheelId: string;
  carId: string;
}

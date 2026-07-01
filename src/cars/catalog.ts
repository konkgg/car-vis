import type { CarDefinition, ColorPreset, WheelDefinition, WrapPreset } from './types';

export const WHEELS: WheelDefinition[] = [
  { id: 'sport-5', name: 'Sport 5-Spoke', description: 'Lightweight alloy', style: 'sport' },
  { id: 'classic-wire', name: 'Classic Wire', description: 'Vintage wire-spoke look', style: 'classic' },
  { id: 'offroad-beast', name: 'Off-Road Beast', description: 'Rugged all-terrain', style: 'offroad' },
  { id: 'luxury-multi', name: 'Luxury Multi-Spoke', description: 'Premium machined finish', style: 'luxury' },
];

export const PAINT_COLORS: ColorPreset[] = [
  { id: 'racing-red', name: 'Racing Red', hex: '#C41E3A' },
  { id: 'midnight-blue', name: 'Midnight Blue', hex: '#1B2A4A' },
  { id: 'pearl-white', name: 'Pearl White', hex: '#F0EDE8' },
  { id: 'graphite', name: 'Graphite', hex: '#3D3D3D' },
  { id: 'forest-green', name: 'Forest Green', hex: '#2D5A3D' },
  { id: 'sunset-orange', name: 'Sunset Orange', hex: '#E8651A' },
  { id: 'electric-yellow', name: 'Electric Yellow', hex: '#F5D300' },
  { id: 'deep-purple', name: 'Deep Purple', hex: '#4A1A6B' },
];

export const WRAP_PRESETS: WrapPreset[] = [
  { id: 'matte-black', name: 'Matte Black', hex: '#1A1A1A', pattern: 'solid' },
  { id: 'satin-gunmetal', name: 'Satin Gunmetal', hex: '#4A5568', pattern: 'solid' },
  { id: 'racing-stripes', name: 'Racing Stripes', hex: '#1A1A1A', pattern: 'racing-stripes', accentHex: '#C41E3A' },
  { id: 'carbon-fiber', name: 'Carbon Fiber', hex: '#2D2D2D', pattern: 'carbon' },
  { id: 'gradient-sunset', name: 'Gradient Sunset', hex: '#E8651A', pattern: 'gradient', accentHex: '#4A1A6B' },
  { id: 'camo-green', name: 'Camo Green', hex: '#3D5A3D', pattern: 'solid' },
];

export const CARS: CarDefinition[] = [
  {
    id: 'sport-coupe',
    name: 'Apex GT',
    manufacturer: 'Demo Motors',
    year: 2025,
    proceduralType: 'coupe',
    wheelMounts: {
      frontLeft: [-0.85, 0.32, 1.1],
      frontRight: [0.85, 0.32, 1.1],
      rearLeft: [-0.85, 0.32, -1.1],
      rearRight: [0.85, 0.32, -1.1],
    },
    scale: 1,
  },
  {
    id: 'executive-sedan',
    name: 'Prestige S4',
    manufacturer: 'Demo Motors',
    year: 2025,
    proceduralType: 'sedan',
    wheelMounts: {
      frontLeft: [-0.9, 0.34, 1.3],
      frontRight: [0.9, 0.34, 1.3],
      rearLeft: [-0.9, 0.34, -1.3],
      rearRight: [0.9, 0.34, -1.3],
    },
    scale: 1,
  },
];

export function getCarById(id: string): CarDefinition {
  return CARS.find((c) => c.id === id) ?? CARS[0];
}

export function getWheelById(id: string): WheelDefinition {
  return WHEELS.find((w) => w.id === id) ?? WHEELS[0];
}

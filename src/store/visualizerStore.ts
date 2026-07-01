import { create } from 'zustand';
import { CARS, WHEELS, PAINT_COLORS, WRAP_PRESETS } from '../cars/catalog';
import type { PaintFinish, SurfaceType } from '../cars/types';

interface VisualizerState {
  carId: string;
  surfaceType: SurfaceType;
  color: string;
  finish: PaintFinish;
  wrapPresetId: string | null;
  wheelId: string;

  setCarId: (id: string) => void;
  setSurfaceType: (type: SurfaceType) => void;
  setColor: (color: string) => void;
  setFinish: (finish: PaintFinish) => void;
  setWrapPresetId: (id: string | null) => void;
  setWheelId: (id: string) => void;
  applyWrapPreset: (id: string) => void;
}

export const useVisualizerStore = create<VisualizerState>((set) => ({
  carId: CARS[0].id,
  surfaceType: 'paint',
  color: PAINT_COLORS[0].hex,
  finish: 'gloss',
  wrapPresetId: null,
  wheelId: WHEELS[0].id,

  setCarId: (id) => set({ carId: id }),
  setSurfaceType: (type) =>
    set((state) => ({ surfaceType: type, wrapPresetId: type === 'paint' ? null : state.wrapPresetId })),
  setColor: (color) => set({ color, wrapPresetId: null }),
  setFinish: (finish) => set({ finish }),
  setWrapPresetId: (id) => set({ wrapPresetId: id }),
  setWheelId: (id) => set({ wheelId: id }),
  applyWrapPreset: (id) => {
    const preset = WRAP_PRESETS.find((w) => w.id === id);
    if (!preset) return;
    set({
      wrapPresetId: id,
      color: preset.hex,
      finish: preset.pattern === 'carbon' ? 'satin' : 'matte',
      surfaceType: 'wrap',
    });
  },
}));

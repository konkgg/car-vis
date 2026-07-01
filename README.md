# CarVis — 3D Car Color Visualizer

Preview paint jobs, vinyl wraps, and wheel options on 3D car models in your browser.

## Features

- **3D car viewer** — orbit, zoom, and inspect from any angle
- **Paint customization** — 8 preset colors, custom color picker, gloss / matte / metallic / satin finishes
- **Vinyl wraps** — solid, racing stripes, carbon fiber, and gradient patterns
- **Wheel swap** — 4 wheel styles (sport, classic, off-road, luxury)
- **Multi-car support** — extensible catalog; add new vehicles by dropping a GLB into `public/models/`

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Adding a New Car

1. Place your `.glb` / `.gltf` model in `public/models/`.
2. Add an entry to `src/cars/catalog.ts`:

```ts
{
  id: 'my-car',
  name: 'My Car',
  manufacturer: 'Brand',
  year: 2026,
  modelPath: '/models/my-car.glb',
  paintableMeshes: ['body', 'Body'],  // mesh names that receive paint
  proceduralType: 'coupe',            // fallback if model fails to load
  wheelMounts: {
    frontLeft:  [-0.85, 0.32, 1.1],
    frontRight: [ 0.85, 0.32, 1.1],
    rearLeft:   [-0.85, 0.32, -1.1],
    rearRight:  [ 0.85, 0.32, -1.1],
  },
  scale: 1,
}
```

## Tech Stack

- [React](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vitejs.dev)
- [Three.js](https://threejs.org) via [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) & [@react-three/drei](https://github.com/pmndrs/drei)
- [Zustand](https://github.com/pmndrs/zustand) for state management

## Scripts

| Command         | Description          |
| --------------- | -------------------- |
| `npm run dev`   | Start dev server     |
| `npm run build` | Production build     |
| `npm run preview` | Preview production build |

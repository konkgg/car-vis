import * as THREE from 'three';
import type { PaintFinish, SurfaceType } from '../cars/types';

function createCarbonTexture(): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(0, 0, size, size);

  for (let y = 0; y < size; y += 4) {
    for (let x = 0; x < size; x += 4) {
      const v = Math.random() * 40 + 20;
      ctx.fillStyle = `rgb(${v}, ${v}, ${v})`;
      ctx.fillRect(x, y, 4, 4);
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(4, 4);
  return tex;
}

function createRacingStripesTexture(baseHex: string, stripeHex: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = baseHex;
  ctx.fillRect(0, 0, 512, 512);

  ctx.fillStyle = stripeHex;
  ctx.fillRect(200, 0, 50, 512);
  ctx.fillRect(262, 0, 50, 512);

  const tex = new THREE.CanvasTexture(canvas);
  return tex;
}

function createGradientTexture(hex1: string, hex2: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  const grad = ctx.createLinearGradient(0, 0, 512, 512);
  grad.addColorStop(0, hex1);
  grad.addColorStop(1, hex2);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  const tex = new THREE.CanvasTexture(canvas);
  return tex;
}

const textureCache = new Map<string, THREE.Texture>();

function getWrapTexture(
  pattern: string,
  hex: string,
  accentHex?: string,
): THREE.Texture | null {
  const key = `${pattern}-${hex}-${accentHex ?? ''}`;
  if (textureCache.has(key)) return textureCache.get(key)!;

  let tex: THREE.Texture | null = null;
  switch (pattern) {
    case 'carbon':
      tex = createCarbonTexture();
      break;
    case 'racing-stripes':
      tex = createRacingStripesTexture(hex, accentHex ?? '#ffffff');
      break;
    case 'gradient':
      tex = createGradientTexture(hex, accentHex ?? '#000000');
      break;
    default:
      return null;
  }

  textureCache.set(key, tex);
  return tex;
}

export function createBodyMaterial(
  color: string,
  finish: PaintFinish,
  surfaceType: SurfaceType,
  wrapPattern?: string,
  wrapAccentHex?: string,
): THREE.MeshPhysicalMaterial {
  const isWrap = surfaceType === 'wrap';
  const wrapTexture =
    isWrap && wrapPattern && wrapPattern !== 'solid'
      ? getWrapTexture(wrapPattern, color, wrapAccentHex)
      : null;

  const roughness =
    finish === 'matte' ? 0.85
    : finish === 'satin' ? 0.55
    : finish === 'metallic' ? 0.25
    : 0.15;

  const metalness =
    finish === 'metallic' ? 0.9
    : isWrap ? 0.05
    : 0.4;

  const clearcoat = finish === 'gloss' && !isWrap ? 1.0 : isWrap ? 0.3 : 0.5;
  const clearcoatRoughness = finish === 'gloss' ? 0.05 : 0.3;

  return new THREE.MeshPhysicalMaterial({
    color: wrapTexture ? '#ffffff' : color,
    map: wrapTexture ?? undefined,
    metalness,
    roughness,
    clearcoat,
    clearcoatRoughness,
    envMapIntensity: finish === 'metallic' ? 1.5 : 1.0,
  });
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, Math.min(min, max)), Math.max(min, max));
}

export function norm(value: number, min: number, max: number): number {
  return (value - min) / (max - min);
}

export function lerp(norm: number, min: number, max: number): number {
  return (max - min) * norm + min;
}

export function map(value: number, sourceMin: number, sourceMax: number, destMin: number, destMax: number): number {
  return lerp(norm(value, sourceMin, sourceMax), destMin, destMax);
}

import type { ComputedRef, InjectionKey } from 'vue';

export type SurfaceElevation = 'surface-low' | 'surface' | 'surface-high';
export type SurfaceElevationDirection = 'up' | 'down';
export interface SurfaceContextInjection {
  elevation: SurfaceElevation;
  direction: SurfaceElevationDirection;
}

export const surfaceContextKey = Symbol('Inject key of surface') as InjectionKey<ComputedRef<SurfaceContextInjection>>;

export const surfaceElevationOrder: [SurfaceElevation, SurfaceElevation, SurfaceElevation] = ['surface-low', 'surface', 'surface-high'];

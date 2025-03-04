export type SurfaceElevation = 'surface-low' | 'surface' | 'surface-high';
export type SurfaceElevationDirection = 'up' | 'down';
export interface SurfaceContextInjection {
  elevation: SurfaceElevation;
  direction: SurfaceElevationDirection;
}

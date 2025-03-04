import type { SurfaceContextInjection, SurfaceElevation, SurfaceElevationDirection } from '../features';
import { computed, type ComputedRef, inject, provide } from 'vue';
import { surfaceContextKey, surfaceElevationOrder } from '../features';

export interface UseSurfaceOptions {
  override?: {
    elevation?: SurfaceElevation;
    direction?: SurfaceElevationDirection;
  };
  inject?: boolean;
}

export function useSurface(options?: UseSurfaceOptions): ComputedRef<SurfaceContextInjection> {
  const surfaceContext = inject(surfaceContextKey, computed((): SurfaceContextInjection => ({
    elevation: surfaceElevationOrder[0],
    direction: 'up',
  })));

  let nextDirection: SurfaceElevationDirection = surfaceContext.value.direction;
  let nextElevation: SurfaceElevation = surfaceContext.value.elevation;
  if (surfaceContext.value.elevation === surfaceElevationOrder[surfaceElevationOrder.length - 1]) {
    nextDirection = 'down';
  }
  else if (surfaceContext.value.elevation === surfaceElevationOrder[0]) {
    nextDirection = 'up';
  }

  if (nextDirection === 'down') {
    nextElevation = surfaceElevationOrder[surfaceElevationOrder.indexOf(surfaceContext.value.elevation) - 1];
  }
  else if (nextDirection === 'up') {
    nextElevation = surfaceElevationOrder[surfaceElevationOrder.indexOf(surfaceContext.value.elevation) + 1];
  }

  if (options?.inject !== false) {
    const nextSurface = computed(() => {
      return <SurfaceContextInjection>{
        elevation: options?.override?.elevation ?? nextElevation,
        direction: options?.override?.direction ?? nextDirection,
      };
    });
    provide(surfaceContextKey, nextSurface);
  }

  return surfaceContext;
}

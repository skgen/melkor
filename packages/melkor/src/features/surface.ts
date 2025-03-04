import type { ComputedRef, InjectionKey, Ref } from 'vue';
import type { SurfaceContextInjection, SurfaceElevation } from '../types';

export const surfaceContextKey = Symbol('Inject key of surface') as InjectionKey<ComputedRef<SurfaceContextInjection>>;

export const surfaceElevationOrder: [SurfaceElevation, SurfaceElevation, SurfaceElevation] = ['surface-low', 'surface', 'surface-high'];

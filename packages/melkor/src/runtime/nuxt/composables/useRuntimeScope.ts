// Used to verify auto imports consistency
import { getRuntimeScope } from '../features';

export function useRuntimeScope() {
  return {
    raw: 'nuxt',
    reference: getRuntimeScope(),
  };
}

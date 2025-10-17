// Used to verify auto imports consistency
import { getRuntimeScope } from '#melkor/features';

export function useRuntimeScope() {
  return {
    raw: 'vue',
    reference: getRuntimeScope(),
  };
}

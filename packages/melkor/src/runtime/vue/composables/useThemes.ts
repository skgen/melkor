import type { Themes } from '../features';

import { useGlobalConfig } from '../composables';

export function useThemes(): Themes {
  const globalConfig = useGlobalConfig();
  return globalConfig.themes;
}

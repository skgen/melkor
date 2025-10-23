import type { Themes } from '#melkor/features';

import { useGlobalConfig } from '#melkor/composables';

export function useThemes(): Themes {
  const globalConfig = useGlobalConfig();
  return globalConfig.themes;
}

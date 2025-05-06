import type { Themes } from '../features/theme';

import { useGlobalConfig } from '.';

export function useThemes(): Themes {
  const globalConfig = useGlobalConfig();
  return globalConfig.themes;
}

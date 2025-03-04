import type { Themes } from '../types';
import { useGlobalConfig } from '.';

export function useThemes(): Themes {
  const globalConfig = useGlobalConfig();
  return globalConfig.themes;
}

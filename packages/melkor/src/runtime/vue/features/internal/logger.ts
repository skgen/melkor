/* eslint-disable no-console */

import { useGlobalConfig } from '../../composables/useGlobalConfig';

export function log(...props: any): void {
  const globalConfig = useGlobalConfig();
  if (globalConfig.debug) {
    console.log(...props);
  }
}

export function warn(...props: any): void {
  const globalConfig = useGlobalConfig();
  if (globalConfig.debug) {
    console.warn(...props);
  }
}

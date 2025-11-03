/* eslint-disable no-console */

import { useGlobalConfig } from '../../composables';

export function log(...props: any): void {
  const globalConfig = useGlobalConfig();
  if (globalConfig.debug) {
    console.log('[Melkor - debug]', ...props);
  }
}

export function warn(...props: any): void {
  const globalConfig = useGlobalConfig();
  if (globalConfig.debug) {
    console.warn('[Melkor - debug]', ...props);
  }
}

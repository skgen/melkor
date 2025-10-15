import type { UnpluginInstance } from 'unplugin';

import type { MelkorUnpluginOptions } from './unplugin';

import { melkor as melkorUnplugin } from './unplugin';

export type { MelkorUnpluginOptions } from './unplugin';

export const melkor: UnpluginInstance<MelkorUnpluginOptions | undefined, boolean>['vite'] = melkorUnplugin.vite;

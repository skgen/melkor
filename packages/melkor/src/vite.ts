import { melkor as melkorUnplugin } from './unplugin';

export type { MelkorUnpluginOptions } from './unplugin';

export const melkor: typeof melkorUnplugin['vite'] = melkorUnplugin.vite;

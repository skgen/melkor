import type { MelkorNuxtContext } from '../types';
import { readFileSync } from 'node:fs';
import { createGlobalConfig, STORAGE_THEME_KEY, Theme } from '@skgn/melkor/features';

export function loadThemeScript<TContext extends MelkorNuxtContext = MelkorNuxtContext>(ctx: TContext): void {
  // Thanks @nuxtjs/color-mode for the briliant idea !

  const scriptCtx = {
    storageKey: STORAGE_THEME_KEY,
    themes: JSON.stringify(ctx.melkorOptions.themes ?? createGlobalConfig().themes),
    ThemeEnum: JSON.stringify(Theme),
  };

  type ScriptCtxAttributes = keyof typeof scriptCtx;

  const _ssrThemeScript = readFileSync(ctx.resolver.resolve('ssr-theme.min.js'), 'utf-8');

  const ssrThemeScript = _ssrThemeScript.replace(/<%= ctx\.([^ ]+) %>/g, (_, option: ScriptCtxAttributes) => scriptCtx[option]).trim();

  ctx.nuxt.hook('nitro:config', (config) => {
    config.virtual = config.virtual || {};
    config.virtual['#melkor-theme'] = `export const script = ${JSON.stringify(ssrThemeScript, null, 2)}`;
    config.plugins = config.plugins || [];
    config.plugins.push(ctx.resolver.resolve(ctx.runtimeDir, 'nitro-plugin'));
  });
}

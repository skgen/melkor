import type { NitroAppPlugin } from 'nitropack';

// @ts-expect-error #melkor/nuxt/ssr-theme is a virtual path
import { script } from '#melkor/nuxt/ssr-theme';

export default <NitroAppPlugin> function (nitro) {
  nitro.hooks.hook('render:html', (htmlContext: any) => {
    htmlContext.head.push(`<script>${script}</script>`);
  });
};

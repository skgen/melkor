import type { NitroAppPlugin } from 'nitropack';

// @ts-expect-error @melkor-theme is virtual import
import { script } from '#melkor-theme';

export default <NitroAppPlugin> function (nitro) {
  nitro.hooks.hook('render:html', (htmlContext) => {
    htmlContext.head.push(`<script>${script}</script>`);
  });
};

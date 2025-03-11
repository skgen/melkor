import presetMini, { theme } from '@unocss/preset-mini';
import { defineConfig } from 'unocss';

const shades
= Array
  .from({ length: 10 })
  .reduce<Record<string, string>>((acc, v, i) => {
    acc[`shade_${i}`] = `hsl(var(--mk-shade-${i}-hsl))`;
    return acc;
  }, {});

export default defineConfig({
  theme: {
    colors: {
      ...shades,
    },
  },
  presets: [
    presetMini({
      dark: {
        // light: `[data-theme='light']`,
        dark: `[data-theme='dark']`,
      },
    }),
  ],
});

import { hex, hsl } from 'chroma-js';
import { darken, lighten } from 'polished';

export const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

export function objToArray(objIn: Record<string | number, string>): string[] {
  return Object.keys(objIn)
    .map(v => Number.parseInt(v))
    .sort((a, b) => a - b)
    .filter(k => shades.includes(k))
    .map(key => objIn[key.toString()]);
}

export function sharded(color: string): { name: string; palette: Record<number, string> } {
  return {
    name: 'sharded',
    palette: {
      50: lighten(0.45, color),
      100: lighten(0.4, color),
      200: lighten(0.35, color),
      300: lighten(0.3, color),
      400: lighten(0.1, color),
      500: color,
      600: darken(0.1, color),
      700: darken(0.3, color),
      800: darken(0.35, color),
      900: darken(0.4, color),
      950: darken(0.45, color),
    },
  };
}

export function extrem(color: string): { name: string; palette: Record<number, string> } {
  return {
    name: 'extrem',
    palette: {
      50: lighten(0.450, color),
      100: lighten(0.425, color),
      200: lighten(0.4, color),
      300: lighten(0.375, color),
      400: lighten(0.1, color),
      500: color,
      600: darken(0.1, color),
      700: darken(0.375, color),
      800: darken(0.4, color),
      900: darken(0.425, color),
      950: darken(0.45, color),
    },
  };
}

export function linear(color: string): { name: string; palette: Record<number, string> } {
  return {
    name: 'linear',
    palette: {
      50: lighten(0.45, color),
      100: lighten(0.4, color),
      200: lighten(0.3, color),
      300: lighten(0.2, color),
      400: lighten(0.1, color),
      500: color,
      600: darken(0.1, color),
      700: darken(0.2, color),
      800: darken(0.3, color),
      900: darken(0.4, color),
      950: darken(0.45, color),
    },
  };
}

export function toPureShade(color: string): string {
  const [h] = hex(color).hsl();
  return hsl(h, 1, 0.5).hex();
}

export function paletteToCSS(palette: Record<string, string>, scope: string = 'color'): string {
  let css = '';
  for (const key of Object.keys(palette)) {
    const entry = hex(palette[key]).rgb();
    css += `--mk-${scope}-${key}: ${entry[0]} ${entry[1]} ${entry[2]};\n`;
  }
  return css;
}

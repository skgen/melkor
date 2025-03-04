import { map } from '@/math';
import chromajs, { hex, hsl, mix, rgb } from 'chroma-js';
import Color from 'color';
import { diff, type LabColor, rgb_to_lab } from 'color-diff';
import { darken, lighten } from 'polished';
import tailwindShades from 'tailwind-shades';
import tinycolor2 from 'tinycolor2';

export const shades = [100, 200, 300, 400, 500, 600, 700, 800, 900];

export function closestShade(color: string): string | null {
  const generatePalette = (baseColor: string) => {
    return {
      50: chromajs.mix(baseColor, 'white', 0.9).hex(),
      100: chromajs.mix(baseColor, 'white', 0.8).hex(),
      200: chromajs.mix(baseColor, 'white', 0.6).hex(),
      300: chromajs.mix(baseColor, 'white', 0.4).hex(),
      400: chromajs.mix(baseColor, 'white', 0.2).hex(),
      500: baseColor,
      600: chromajs.mix(baseColor, 'black', 0.2).hex(),
      700: chromajs.mix(baseColor, 'black', 0.4).hex(),
      800: chromajs.mix(baseColor, 'black', 0.6).hex(),
      900: chromajs.mix(baseColor, 'black', 0.8).hex(),
    };
  };

  const palette = generatePalette(color);

  const rgbToLab = (hex: string): LabColor => {
    const rgb = chromajs(hex).rgb();
    return rgb_to_lab({ R: rgb[0], G: rgb[1], B: rgb[2] });
  };

  const findClosestShadeCIEDE = (): string | null => {
    const targetLab = rgbToLab(color);
    let closestShade = null;
    let smallestDiff = Infinity;

    for (const [shade, shadeColor] of Object.entries(palette)) {
      const shadeLab = rgbToLab(shadeColor);
      const localDiff = diff(targetLab, shadeLab);

      if (localDiff < smallestDiff) {
        smallestDiff = localDiff;
        closestShade = shade;
      }
    }

    return closestShade;
  };

  return findClosestShadeCIEDE();
}

export function tailwind(inColor: string): string[] {
  try {
    const palette = tailwindShades(inColor, true);

    return Object.keys(palette)
      .map(v => Number.parseInt(v))
      .sort((a, b) => a - b)
      .filter(k => shades.includes(k))
      .map(key => palette[key.toString()]);
  }
  catch {
    return [];
  }
}

export function generate(inColor: string): {
  name: string;
  colors: string[];
}[] {
  function tinycolor(inColor: string): string[] {
    try {
      return shades.map((shade) => {
        const factor = (900 - shade) / 900;
        return tinycolor2(inColor).lighten(factor * 50).toHexString();
      });
    }
    catch {
      return [];
    }
  }

  function polished(inColor: string): string[] {
    try {
      return [
        lighten(0.4, inColor),
        lighten(0.3, inColor),
        lighten(0.2, inColor),
        lighten(0.1, inColor),
        inColor,
        darken(0.1, inColor),
        darken(0.2, inColor),
        darken(0.3, inColor),
        darken(0.4, inColor),
      ];
    }
    catch {
      return [];
    }
  }

  function color(inColor: string): string[] {
    try {
      return shades.map((shade) => {
        const factor = (900 - shade) / 900;
        return Color(inColor).mix(Color('white'), factor).hex();
      });
    }
    catch {
      return [];
    }
  }

  return [
    {
      name: 'polished',
      colors: polished(inColor),
    },
    // {
    //   name: 'tinycolor',
    //   colors: tinycolor(inColor),
    // },
    {
      name: 'color',
      colors: color(inColor),
    },
    {
      name: 'tailwind-shades',
      colors: tailwind(inColor),
    },
  ];
}

export function percentageColorScheme(baseColor: string, range: [number, number], steps: number[]): Record<number, string> {
  const chroma = hex(baseColor);
  const brightness = (0.299 * chroma.rgb()[0] + 0.587 * chroma.rgb()[1] + 0.114 * chroma.rgb()[2]) / 255;

  const luminance = chroma.luminance();
  const [hue, s, l] = chroma.hsl();
  const mappedBrightness = map(brightness, 0, 1, range[0], range[1]);
  let distance = Infinity;
  let closestStep = steps[0];
  // console.log(hsl(hue, s, 1 - map(mappedBrightness, range[0], range[1], 0, 1)).hex());
  // console.log(hsl(hue, s, 1 - map(500, range[0], range[1], 0, 1)).hex());

  const palette: Record<number, string> = {};
  for (const step of steps) {
    palette[step] = hsl(hue, s, 1 - map(step, range[0], range[1], 0, 1)).hex();
    // console.log(step);

    if (Math.abs(mappedBrightness - step) < distance) {
      // console.log(distance);

      closestStep = step;
      distance = Math.abs(mappedBrightness - step);
      // console.log(closestStep);
    }
    // palette[step] = hsl(hue, 0, 0).hex();
  }
  // palette[closestStep] = chroma.hex();

  // const light =
  return palette;
}

export function dynamicColorScheme(baseColor: string, range: [number, number], steps: number[]): Record<number, string> {
  const chroma = hex(baseColor);
  const [hue, s, l] = chroma.hsl();

  let distance = Infinity;
  let referenceStep = steps[0];
  const dl = map(l, 0, 1, range[0], range[1]);
  const palette: Record<number, string> = {};
  for (const step of steps) {
    // palette[step] = hsl(hue, s, 1 - map(step, range[0], range[1], 0, 1)).hex();

    if (Math.abs(dl - step) < distance) {
      // debugger;
      // console.log(distance);
      referenceStep = step;
      distance = Math.abs(dl - step);
      // console.log(closestStep);
    }
  }
  palette[referenceStep] = chroma.hex();
  console.log(referenceStep);

  for (const step of steps) {
    if (step === referenceStep) {
      continue;
    }
    const factor = referenceStep / step;
    // console.log(factor);

    // if (referenceStep > step) {
    palette[step] = hex('#000000').hex();
    // palette[step] = chroma.brighten(factor).hex();
    // }
    // else {
    // palette[step] = chroma.darken(factor).hex();
    // }
    // 100 / 500 = 0.2
    // 200 / 500 =

    // palette[step] = hsl(hue, s, 1 - map(step, range[0], range[1], 0, 1)).hex();
  }
  // console.log(referenceStep);

  return palette;
}

export function paletteToCSS(palette: Record<string, string>, scope: string = 'color'): string {
  let css = '';
  for (const key of Object.keys(palette)) {
    const entry = hex(palette[key]).rgb();
    css += `--mk-${scope}-${key}: ${entry[0]} ${entry[1]} ${entry[2]};\n`;
  }
  return css;
}

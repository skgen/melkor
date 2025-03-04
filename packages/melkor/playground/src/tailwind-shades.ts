export type Shades = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950];
export type Shade = Shades[number];

type ShadesPalette<S extends number[] = Shades> = Record<S[number], string>;

export function shadesOf<S extends Shade[] = Shades>(
  hex: string,
  shades: S,
): ShadesPalette<S> {
  const baseColor = hexToRgbArray(hex);

  const black: [number, number, number] = [0, 0, 0];
  const white: [number, number, number] = [255, 255, 255];

  const result = {} as ShadesPalette<S>;

  for (let shade of shades) {
    const originalShade = shade;

    if (shade === 500) {
      result[shade as keyof ShadesPalette<S>] = hex;
      continue;
    }

    const isDarkShade = shade > 500;
    if (isDarkShade)
      shade -= 500;

    const percentage = shade / 500;
    const startColor = isDarkShade ? black : baseColor;
    const endColor = isDarkShade ? baseColor : white;

    result[originalShade as keyof ShadesPalette<S>] = getColor(percentage, startColor, endColor);
  }

  return shades.reduce((acc, shade) => {
    acc[shade as keyof ShadesPalette<S>] = result[shade as keyof ShadesPalette<S>];
    return acc;
  }, {} as ShadesPalette<S>);
}

function hexToRgbArray(hex: string): [number, number, number] {
  const originalHex = hex;

  hex = hex.replace('#', '');
  if (hex.length === 3)
    hex = hex + hex;

  const r = hex.substring(0, 2);
  const g = hex.substring(2, 4);
  const b = hex.substring(4, 6);

  const rgb = ([r, g, b] as const).map((channel) => {
    try {
      const hexChannel = Number.parseInt(channel, 16);
      if (hexChannel < 0 || hexChannel > 255) {
        throw new Error('Hex channel must be between 0 & 255');
      }
      return hexChannel;
    }
    catch {
      throw new Error(`Invalid hex color provided: ${originalHex}`);
    }
  });

  return rgb as [number, number, number];
}

function getColor(percentage: number, start: [number, number, number], end: [number, number, number]): string {
  const rgb = end.map((channel, index) => {
    return Math.round(channel + percentage * (start[index] - channel));
  });
  console.log(rgb);

  const hex = `#${rgb.map((channel) => {
    const component = channel.toString(16);
    if (component.length === 1)
      return `0${component}`;
    return component;
  }).join('')}`;
  return hex;
}

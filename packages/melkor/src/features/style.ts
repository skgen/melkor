export function remToPixels(rem: string) {
  if (rem.includes('rem')) {
    return Number.parseFloat(rem) * Number.parseFloat(getComputedStyle(document.documentElement).fontSize);
  }
  return Number.parseFloat(rem);
}

export function durationToNumber(duration: string) {
  if (duration.includes('ms')) {
    return Number.parseFloat(duration);
  }
  return Number.parseFloat(duration) * 1000;
}

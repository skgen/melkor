import { isString } from '@skgn/kit';

export function formatError(error: string | string[]): string {
  if (isString(error)) {
    return error;
  }
  return error.join('\n');
}

export function forwardDataAttributes<T extends Record<string, U>, U>(input: T): Partial<T> {
  return Object.keys(input)
    .filter(key => key.includes('data'))
    .reduce((acc, key) => {
      acc[key.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)] = input[key];
      return acc;
    }, {} as Record<string, U>) as Partial<T>;
}

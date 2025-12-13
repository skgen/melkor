import { camelCase, upperFirst } from 'scule';

export function capitalize(name: string) {
  return upperFirst(camelCase(name));
}

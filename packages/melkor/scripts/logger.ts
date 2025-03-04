import { yellow } from 'colorette';

export function log(message?: any, ...optionalParams: any[]) {
  console.log(`${yellow('[melkor]')} ${message}`, ...optionalParams);
}

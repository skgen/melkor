import { isObject } from 'lodash-es';
import { z, type ZodError, type ZodType } from 'zod';

export function formatErrors(errors: string[] | ZodError): string {
  if (isZodError(errors)) {
    return z.treeifyError(errors).errors.join('\n');
  }
  return errors.join('\n');
}

export function forwardDataAttributes<T extends Record<string, U>, U>(input: T): Partial<T> {
  return Object.keys(input)
    .filter(key => key.includes('data'))
    .reduce((acc, key) => {
      acc[key.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)] = input[key] as U;
      return acc;
    }, {} as Record<string, U>) as Partial<T>;
}

export function isZodType(value: unknown): value is ZodType {
  return (
    isObject(value)
    && '_zod' in value
    && 'parse' in value
    && 'safeParse' in value
  );
}
export function isZodError(value: unknown): value is ZodError {
  return (
    isObject(value)
    && '_zod' in value
    && 'issues' in value
    && 'format' in value
  );
}

export type KeysAs<T, V> = {
  [K in keyof T]: NonNullable<T[K]> extends infer _R ? V | undefined : V;
};

export type Tail<T extends any[]> = T extends [any, ...infer Rest] ? Rest : [];

export type ExtractEmitsAsFunctions<Emits extends { [K in keyof Emits]: any[] }> = {
  [K in keyof Emits]: (...args: Emits[K]) => void;
};

// Vue internal types reexported

export type InferDefaults<T> = {
  [K in keyof T]?: InferDefault<T, T[K]>;
};
// eslint-disable-next-line ts/no-unsafe-function-type
type NativeType = null | number | string | boolean | symbol | Function;
type InferDefault<P, T> = ((props: P) => T & {}) | (T extends NativeType ? T : never);

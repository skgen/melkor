export type Flatten<T> = T extends readonly (infer U)[] ? U : never;

export type DeepRequire<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequire<T[P]> : T[P];
};

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type DeepObjectPartial<T> = {
  [P in keyof T]?: T[P] extends Array<unknown>
    ? T[P]
    : T[P] extends object
      ? DeepPartial<T[P]>
      : T[P];
};

export type IsDefined<T> = T extends undefined ? never : T;

export function isDefined<T>(v: T): v is IsDefined<T> {
  return typeof v !== 'undefined';
}

export function isValue<T>(v: T): v is NonNullable<T> {
  return !(!isDefined(v) || v === null);
}

export function isArray<T>(v: unknown): v is T[] {
  return isValue(v) && Array.isArray(v);
}

export function isFunc(v: unknown): boolean {
  return isValue(v) && typeof v === 'function';
}

export function isObject(v: unknown): v is Record<string, unknown> {
  return isValue(v) && v.constructor === Object;
}

export function isString(v: unknown): v is string {
  return isValue(v) && typeof v === 'string';
}

export function isNumber(v: unknown): v is number {
  return isValue(v) && typeof v === 'number' && !Number.isNaN(v);
}

export function getDefault<T, D>(v: T, d: D): NonNullable<T> | D {
  return isValue(v) ? v : d;
}

export function getDefaultAs<T, R = T, D = R>(
  t: T,
  c: (v: NonNullable<T>) => NonNullable<R> | D,
  d: NonNullable<R> | D,
): NonNullable<R> | D {
  return isValue(t) ? c(t) : d;
}

export function isEmpty<T extends Record<string, unknown> | unknown[] | string | undefined | null>(v: T): boolean {
  if (!isValue(v)) {
    return true;
  }
  if (isObject(v)) {
    return Object.keys(v).length === 0;
  }
  if (isArray(v)) {
    return v.length === 0;
  }
  if (isString(v)) {
    return v.length === 0;
  }
  throw new Error('Element is not Object nor Array not string');
}

export function isClient(): boolean {
  return window !== undefined;
}

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

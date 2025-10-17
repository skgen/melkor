// export function resolveDefaultProp(componentName: string, propName: string) {
// const defaultProps = inputs[componentName] ?? null;
// if (!defaultProps) {
//   return undefined;
// }

// // @ts-expect-error Dynamic default prop inference
// const defaultProp = defaultProps[propName];

// if (isUndefined(defaultProp)) {
//   return undefined;
// }
// if (isFunction(defaultProp)) {
//   const defaultValue = defaultProp();
//   if (isArray(defaultValue)) {
//     return `[${defaultValue.join(', ')}]`;
//   }
//   return defaultValue;
// }
// return `${defaultProp}`;
// }

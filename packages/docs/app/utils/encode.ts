export function shallowEncode(str: string, maxLength?: number) {
  const encoded = Array.from(str)
    .map(char => char.charCodeAt(0).toString(16).padStart(2, '0'))
    .join('');
  if (maxLength) {
    return encoded.slice(0, maxLength);
  }
  return encoded;
}

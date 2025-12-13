export function preventEmptyInput(event: KeyboardEvent) {
  const target = event.target as HTMLInputElement;

  if (target.value.length <= 1) {
    event.preventDefault();
  }
}

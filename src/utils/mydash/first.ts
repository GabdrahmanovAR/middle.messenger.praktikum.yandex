export function first(list: unknown) {
  if (!Array.isArray(list)) {
    return undefined;
  }

  const length = list.length;
  return length ? list[0] : undefined;
}

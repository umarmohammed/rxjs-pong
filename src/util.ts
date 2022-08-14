export function mergeObjects<T>(objects: Record<keyof T, any>[]): T {
  return objects.reduce(
    (prev, curr) => ({
      ...prev,
      ...curr,
    }),
    {} as T
  );
}

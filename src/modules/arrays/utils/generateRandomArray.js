export function generateRandomArray(size = 10) {
  return Array.from(
    { length: size },
    () => Math.floor(Math.random() * 80) + 20
  );
}

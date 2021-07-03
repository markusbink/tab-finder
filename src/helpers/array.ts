/**
 * Checks if the given index is in the bounds of the given array
 *
 * @param array The array which should be used for checking
 * @param index The index which should be checked against the array
 * @returns True when the index is out of bounds
 */
export function isOutOfBounds<T>(array: T[], index: number) {
  return index < 0 || index > array.length - 1;
}

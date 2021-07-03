export type PipeFunction<T, U> = (inputValue: T & U) => T & U;

export function pipe<T, U>(
  initialValue: T & U,
  ...functions: PipeFunction<T, U>[]
): T & U {
  return functions.reduce<T & U>(function (
    acc: T & U,
    entry: PipeFunction<T & U, T & U>
  ) {
    return entry(acc);
  },
  initialValue);
}

import { useState } from "react";

interface ICustomArrayHook<T> {
  entries: T[];
  addEntry: (entry: T) => void;
  hasEntry: (entry: T) => boolean;
  removeEntry: (entry: T) => void;
  toggleEntry: (entry: T) => void;
  resetArray: () => void;
}
export function useCustomArray<T>(initialValue: T[]): ICustomArrayHook<T> {
  const [value, setValue] = useState<T[]>(initialValue);

  const addEntry = (entry: T) => {
    if (hasEntry(entry)) {
      return;
    }

    setValue([...value, entry]);
  };

  const removeEntry = (entryToRemove: T) => {
    setValue(value.filter((entry) => entry !== entryToRemove));
  };

  const hasEntry = (entry: T) => value.includes(entry);

  const toggleEntry = (entry: T) =>
    hasEntry(entry) ? removeEntry(entry) : addEntry(entry);

  const resetArray = () => setValue([]);

  return {
    entries: value,
    addEntry,
    hasEntry,
    removeEntry,
    toggleEntry,
    resetArray,
  };
}

import type { Guard } from "./types.js";

/**
 * @category Guard Factory
 * @return a Guard that checks if a value is **identical** to one of the values passed
 * @example
 * ```typescript
 *   const isCurrency = ValueOf(["USD", "EUR", "GBP"]);
 * ```
 */
const ValueOf = <const G extends readonly any[] | any[]>(
  expectedValues: G
): Guard<G[number]> => {
  return (value: unknown): value is G[number] => {
    for (let i = 0; i < expectedValues.length; i++) {
      const expected = expectedValues[i];
      if(value === expected) {
        return true
      }
    }
    return false;
  };
};

export default ValueOf;

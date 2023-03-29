export * from "./";
import _ValueOf from "./value-of";
import type { Guard } from "./types";

/**
 * @category Guard Factory
 * @return a Guard that checks if a value is **identical** to one of the values passed
 * @deprecated Uptate Typescript to v5
 * @example
 * ```typescript
 *   const isCurrency = ValueOf(["USD", "EUR", "GBP"] as const);
 * ```
 */
export const ValueOf = _ValueOf as <T>(
  expectedValues: readonly T[] | T[]
) => Guard<T>;

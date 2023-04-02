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
declare const ValueOf: <T>(expectedValues: readonly T[] | T[]) => Guard<T>;
export default ValueOf;

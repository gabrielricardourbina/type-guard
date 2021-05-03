import type { Guard } from "./types";

/**
 * @category Guard
 * @returns `true` if `typeof value` is "number"
 * @example
 * ```typescript
 *   if(isNumber(value)) return value + 10;
 * ```
 */
const isNumber: Guard<number> = (value: unknown): value is number =>
  typeof value === "number";

export default isNumber;

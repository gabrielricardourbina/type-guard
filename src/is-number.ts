import type { Guard } from "./types.js";

/**
 * @category Guard
 * @returns `true` if `typeof value` is "number"
 * @example
 * ```typescript
 *   if(isNumber(value)) return value + 10;
 * ```
 */
const isNumber = ((value: unknown): value is number => {
  return typeof value === "number";
}) satisfies Guard<number>;

export default isNumber;

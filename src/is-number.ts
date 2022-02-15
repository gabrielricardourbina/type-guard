import type { Guard } from "./types";

/**
 * @category Guard
 * @returns `true` if `typeof value` is "number"
 * @example
 * ```typescript
 *   if(isNumber(value)) return value + 10;
 * ```
 */
const isNumber: Guard<number> = <V>(
  value: V
): value is V extends number ? V : never => typeof value === "number";

export default isNumber;

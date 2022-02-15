import type { Guard } from "./types";

/**
 * @category Guard
 * @returns `true` if `typeof value` is "boolean"
 * @example
 * ```typescript
 *   if(isBoolean(value)) return !value;
 * ```
 */
const isBoolean: Guard<boolean> = <V>(
  value: V
): value is V extends boolean ? V : never => typeof value === "boolean";

export default isBoolean;

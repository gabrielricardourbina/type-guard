import type { Guard } from "./types";

/**
 * @category Guard
 * @returns `true` if `typeof value` is "string"
 * @example
 * ```typescript
 *   if(isString(value)) return `${value} - ready`;
 * ```
 */
const isString: Guard<string> = <V>(
  value: V
): value is V extends string ? V : never => typeof value === "string";

export default isString;

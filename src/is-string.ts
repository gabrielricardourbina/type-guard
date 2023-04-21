import type { Guard } from "./types.js";

/**
 * @category Guard
 * @returns `true` if `typeof value` is "string"
 * @example
 * ```typescript
 *   if(isString(value)) return `${value} - ready`;
 * ```
 */
const isString = ((value: unknown): value is string => {
  return typeof value === "string";
}) satisfies Guard<string>;

export default isString;

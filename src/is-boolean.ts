import type { Guard } from "./types";

/**
 * @category Guard
 * @returns `true` if `typeof value` is "boolean"
 * @example
 * ```typescript
 *   if(isBoolean(value)) return !value;
 * ```
 */
const isBoolean = ((value: unknown): value is boolean => {
  return typeof value === "boolean";
}) satisfies Guard<boolean>;

export default isBoolean;

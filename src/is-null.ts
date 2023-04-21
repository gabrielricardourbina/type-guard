import type { Guard } from "./types.js";

/**
 * @category Guard
 * @returns `true` if value is `null`
 * @example
 * ```typescript
 *   if(isNull(value)) return;
 * ```
 */
const isNull = ((value: unknown): value is null => {
  return value === null;
}) satisfies Guard<null>;

export default isNull;

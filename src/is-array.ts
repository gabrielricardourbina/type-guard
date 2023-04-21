import type { Guard } from "./types.js";

/**
 * @category Guard
 * @returns `true` if the value is an array
 * @example
 * ```typescript
 *   if(isArray(value)) return value.map((e) =>({ e }));
 * ```
 */
const isArray = ((value: unknown): value is any[] | readonly any[] => {
  return Array.isArray(value);
}) satisfies Guard<any[] | readonly any[]>;

export default isArray;

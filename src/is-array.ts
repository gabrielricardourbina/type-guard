import type { Guard } from "./types";

/**
 * @category Guard
 * @returns `true` if the value is an array 
 * @example
 * ```typescript
 *   if(isArray(value)) return value.map((e) =>({ e }));
 * ```
 */
const isArray: Guard<any[] | readonly any[]> = (
  value: unknown
): value is any[] | readonly any[] => Array.isArray(value);

export default isArray;

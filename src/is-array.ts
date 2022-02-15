import type { Guard } from "./types";

/**
 * @category Guard
 * @returns `true` if the value is an array 
 * @example
 * ```typescript
 *   if(isArray(value)) return value.map((e) =>({ e }));
 * ```
 */
const isArray: Guard<any[] | readonly any[]> = <V>(
  value: V
): value is V extends any[] | readonly any[] ? V : never=> Array.isArray(value);

export default isArray;

import type { Guard } from "./types.js";

/**
 * @category Guard
 * @returns `true` if the value is defined and has a value, AKA is not null
 * @example
 * ```typescript
 *   const value: string | null = localStorage.getItem("something");
 *   if(isPresent(value)) return [value];
 * ```
 */
const isPresent = ((value: unknown): value is {} => {
  return value !== undefined && value !== null;
}) satisfies Guard<{}>;

export default isPresent;

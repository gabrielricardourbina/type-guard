import type { Guard } from "./types";

/**
 * @category Guard
 * @returns `true` if the value is defined and has a value, AKA is not null
 * @example
 * ```typescript
 *   const value: string | null = localStorage.getItem("something");
 *   if(isPresent(value)) return [value];
 * ```
 */
const isPresent: Guard<{}> = (value: unknown): value is {} =>
  value !== undefined && value !== null;
export default isPresent;

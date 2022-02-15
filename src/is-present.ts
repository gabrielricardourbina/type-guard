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
const isPresent: Guard<{}> = <V>(value: V): value is V extends {} ? V : never =>
  value !== undefined && value !== null;
export default isPresent;

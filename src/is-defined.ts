import type { Guard } from "./types";

/**
 * @category Guard
 * @returns `true` if the value is defined
 * @example
 * ```typescript
 *   const value: string | undefined = record.get("something");
 *   if(isDefined(value)) return [value];
 * ```
 */
const isDefined: Guard<{} | null> = <V>(
  value: V
): value is V extends {} | null ? V : never => value !== undefined;

export default isDefined;

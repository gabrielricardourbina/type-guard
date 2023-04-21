import type { Guard } from "./types.js";

/**
 * @category Guard
 * @returns `true` if the value is defined
 * @example
 * ```typescript
 *   const value: string | undefined = record.get("something");
 *   if(isDefined(value)) return [value];
 * ```
 */
const isDefined = ((value: unknown): value is {} | null => {
  return value !== undefined;
}) satisfies Guard<{} | null>;

export default isDefined;

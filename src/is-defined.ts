import { Guard } from "./types";

/**
 * @category Guard
 * @returns `true` if the value is defined
 * @example
 * ```typescript
 *   const value: string | undefined = record.get("something");
 *   if(isDefined(value)) return [value];
 * ```
 */
const isDefined: Guard<{} | null> = (value: unknown): value is {} | null => value !== undefined;

export default isDefined;

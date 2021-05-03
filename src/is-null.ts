import type { Guard } from "./types";

/**
 * @category Guard
 * @returns `true` if value is `null`
 * @example
 * ```typescript
 *   if(isNull(value)) return;
 * ```
 */
const isNull: Guard<null> = (value: unknown): value is null => value === null;

export default isNull;

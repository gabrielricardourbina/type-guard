import type { Guard } from "./types";

/**
 * @category Guard
 * @returns `true` if value is `null`
 * @example
 * ```typescript
 *   if(isNull(value)) return;
 * ```
 */
const isNull: Guard<null> = <V>(
  value: V
): value is V extends null ? V : never => value === null;

export default isNull;

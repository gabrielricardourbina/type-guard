import type { Guard } from "./types";

/**
 * @category Guard
 * @returns `true` if value is **strictly** an instance of **`Object`**
 * @example
 * ```typescript
 *   if(isObject(values)) return { ...values, completed:true };
 * ```
 */
const isObject: Guard<{ [K in any]?: unknown }> = <V>(
  value: unknown
): value is V extends { [K in any]?: unknown } ? V : never => {
  return (
    value instanceof Object &&
    Object === Object.getPrototypeOf(value).constructor
  );
};

export default isObject;

import type { Guard } from "./types.js";

/**
 * @category Guard
 * @returns `true` if value is **strictly** an instance of **`Object`**
 * @example
 * ```typescript
 *   if(isObject(values)) return { ...values, completed:true };
 * ```
 */
const isObject = ((value: unknown): value is { [K in any]?: unknown } => {
  return (
    value instanceof Object &&
    Object === Object.getPrototypeOf(value).constructor
  );
}) satisfies Guard<{ [K in any]?: unknown }>;

export default isObject;

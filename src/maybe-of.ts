import type { Guard } from "./types.js";

/**
 * @category High Order Guard
 * @return a `Guard` that checks that the value is of the type of the guard passed or undefined
 * @example
 * ```typescript
 *   const isMaybeAge = MaybeOf(isNumber);
 *   const isPersonTuple: Guard<[string, number | undefined]> = TupleOf([isString, isMaybeAge]);
 * ```
 */
const MaybeOf = <T extends V, V = unknown>(
  guard: Guard<T, V>
): Guard<T | undefined, V | undefined> => {
  return (v: V | undefined): v is T | undefined => v === undefined || guard(v);
};

export default MaybeOf;

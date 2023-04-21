import type { Guard } from "./types.js";

/**
 * @category High Order Guard
 * @return a `Guard` that checks that the value is of the type of the guard passed or null
 * @example
 * ```typescript
 *   const isNullableAge = NullableOf(isNumber);
 *   const isPersonTuple: Guard<[string, number | null]> = TupleOf([isString, isNullableAge]);
 * ```
 */
const NullableOf = <T extends V, V = unknown>(
  guard: Guard<T, V>
): Guard<T | null, V | null> => {
  return (v: V | null): v is T | null => v === null || guard(v);
};

export default NullableOf;

import type { Guard } from "./types";

const notNull = <V>(v: V): v is V extends null ? never : V =>
  v !== null;
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
  return <W extends V | null>(v: W): v is W extends T | null ? W : never => {
    return !notNull(v) || guard(v);

  };
};

export default NullableOf;

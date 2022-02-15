import type { Guard } from "./types";

const notUndefined = <V>(v: V): v is V extends undefined ? never : V =>
  v !== undefined;

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
  return <W extends V | undefined>(
    v: W
  ): v is W extends T | undefined ? W : never => {
    return !notUndefined(v) || guard(v);
  };
};

export default MaybeOf;

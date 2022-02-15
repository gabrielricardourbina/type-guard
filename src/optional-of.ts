import type { Guard, OptionalGuard } from "./types";

const optional = { optional: true } as const;

/**
 * @category High Order Guard
 * @description
 * This returns a contextual guard that allows keyed High Order Guards, I.E: TupleOf, that the key might not be present.
 * @return a `OptionalGuard` of the same type as the guard passed
 * @example
 * ```typescript
 *   const isOptionalAge = OptionalOf(isNumber);
 *   const isPersonTuple: Guard<[string, number?]> = TupleOf([isString, isOptionalAge]);
 * ```
 */
const OptionalOf = <T extends S, S = unknown>(
  guard: Guard<T, S>
): OptionalGuard<T, S> => {
  return Object.assign(<V extends S>(v: V): v is V extends T? V : never=> guard(v), optional);
};

export default OptionalOf;

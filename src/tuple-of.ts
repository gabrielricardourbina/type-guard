import type { Guard } from "./types";
import isArray from "./is-array";
import RecursiveError from "./recursive-error";

type TypeFromGuards<G extends [Guard<any>, ...Guard<any>[]]> = {
  [K in keyof G]: G[K] extends Guard<infer P> ? P : unknown;
};

type GuardsFromType<T extends [any, ...any[]]> = {
  [K in keyof T]: Guard<T[K]>;
} &
  [Guard<any>, ...Guard<any>[]];

/**
 * @category High Order Guard
 * @return a `Guard` that checks if the values of the tuple passed respect the types of the guards passed
 * @throws {RecursiveError} When calling the `self` guard in the callback
 * @example
 * ```typescript
 *   const isPersonTuple = TupleOf([isString, isNumber]);
 * ```
 * @example
 * ```typescript
 *   type Person = [string, number, Person | null];
 *   const isPersonTuple = TupleOf<Person>((self) => [
 *     isString,
 *     isNumber,
 *     OneOf([self, isNull]),
 *   ]);
 * ```
 */
const TupleOf = <
  T extends TypeFromGuards<G>,
  G extends [Guard<any>, ...Guard<any>[]] = GuardsFromType<T>
>(
  guards: G | ((self: Guard<T>) => G)
): Guard<T> => {
  const isTupleOf = (tuple: unknown): tuple is T => {
    return (
      isArray(tuple) && generatedGuards.every((guard, i) => guard(tuple[i]))
    );
  };
  const generatedGuards = RecursiveError.assert((forbidCall) =>
    typeof guards === "function" ? guards(forbidCall(isTupleOf)) : guards
  );
  return isTupleOf;
};

export default TupleOf;

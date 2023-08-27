import type {
  Guard,
  OptionalGuard,
  TypeOfGuard,
  NonCallable,
} from "./types.js";
import isArray from "./is-array.js";

type TailGuards<H extends Guard<any>[]> = H extends [infer P, ...infer L]
  ? P extends OptionalGuard<any>
    ? [P, ...(L extends Guard<any>[] ? TailGuards<L> : [])]
    : [OptionalGuard<any>, ...(L extends Guard<any>[] ? TailGuards<L> : [])]
  : [];

type HeadGuards<T extends Guard<any>[]> = T extends [infer P, ...infer L]
  ? P extends OptionalGuard<any>
    ? [P, ...(L extends Guard<any>[] ? TailGuards<L> : [])]
    : [
        ...(P extends Guard<any> ? [P] : []),
        ...(L extends Guard<any>[] ? HeadGuards<L> : [])
      ]
  : [];

type OptionalRequiredGuards<G extends Guard<any>[]> = G & HeadGuards<G>;

type TypeFromGuards<T extends Guard<any>[]> = T extends [infer P, ...infer H]
  ? [
      ...(P extends OptionalGuard<any>
        ? [TypeOfGuard<P>?]
        : P extends Guard<any>
        ? [TypeOfGuard<P>]
        : []),
      ...(H extends Guard<any>[] ? TypeFromGuards<H> : [])
    ]
  : [];

type GuardsFromType<T extends [any?, ...any]> = T extends [infer P, ...infer H]
  ? [
      Guard<P>,
      ...(H extends []
        ? []
        : H extends [any?, ...any]
        ? GuardsFromType<H>
        : [H])
    ]
  : T extends [(infer P)?, ...infer H]
  ? [
      OptionalGuard<P>,
      ...(H extends [] ? [] : H extends [any?] ? GuardsFromType<H> : [])
    ]
  : [];

/**
 * @category High Order Guard
 * @return a `Guard` that checks if the values of the tuple passed respect the types of the guards passed
 * @throws {ReferenceError} When calling the `self` guard in the callback
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
  guards:
    | OptionalRequiredGuards<G>
    | ((self: NonCallable<Guard<T>>) => OptionalRequiredGuards<G>)
): Guard<T> => {
  const isTupleOf = (tuple: unknown): tuple is T => {
    if(!isArray(tuple) || tuple.length > generatedGuards.length){
      return false;
    }

    for (let i = 0; i < generatedGuards.length; i++) {
      const guard = generatedGuards[i]!;

      const passes = (guard.optional && tuple[i] === undefined) || guard(tuple[i])
      if(!passes){
        return false
      }
    }
    return true;
  };

  const generatedGuards =
    typeof guards === "function"
      ? (guards as (self: Guard<T>) => OptionalRequiredGuards<G>)(isTupleOf)
      : guards;

  return isTupleOf;
};

export default TupleOf;

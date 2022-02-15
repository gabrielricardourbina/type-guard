import type { Guard, OptionalGuard, TypeOfGuard } from "./types";
import isArray from "./is-array";
import RecursiveError from "./recursive-error";

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
  guards:
    | OptionalRequiredGuards<G>
    | ((self: Guard<T>) => OptionalRequiredGuards<G>)
): Guard<T> => {
  const isTupleOf = <V>(tuple: V): tuple is V extends T ? V : never => {
    return (
      isArray(tuple) &&
      tuple.length <= generatedGuards.length &&
      generatedGuards.every(
        (guard, i) =>
          (guard.optional && tuple[i] === undefined) || guard(tuple[i])
      )
    );
  };

  const generatedGuards = RecursiveError.assert((forbidCall) =>
    typeof guards === "function" ? guards(forbidCall(isTupleOf)) : guards
  );

  const optionalBoundary = generatedGuards.reduceRight(
    (i: number, guard, j) => (guard.optional ? j : i),
    generatedGuards.length
  );

  const hasRequiredAfterBoundary = generatedGuards.some(({ optional }, j) =>
    optional ? j < optionalBoundary : j >= optionalBoundary
  );

  if (hasRequiredAfterBoundary)
    throw new TypeError("A required guard cannot follow an optional guard");

  return isTupleOf;
};

export default TupleOf;

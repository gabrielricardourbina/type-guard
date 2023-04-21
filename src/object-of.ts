import type {
  Guard,
  OptionalGuard,
  TypeOfGuard,
  NonCallable,
} from "./types.js";
import isObject from "./is-object.js";

type TypeFromGuards<G extends { [K in any]: Guard<any> }> = Merge<
  RequiredPortion<G>,
  OptionalPortion<G>
>;

type OptionalGuardsKeys<G extends { [K in any]: Guard<any> }> = {
  [K in keyof G]: G[K] extends OptionalGuard<any> ? K : never;
}[keyof G];

type RequiredGuardsKeys<G extends { [K in any]: Guard<any> }> = {
  [K in keyof G]: G[K] extends OptionalGuard<any> ? never : K;
}[keyof G];

type OptionalPortion<G extends { [K in any]: Guard<any> }> = {
  [K in OptionalGuardsKeys<G>]?: TypeOfGuard<G[K]>;
};
type RequiredPortion<G extends { [K in any]: Guard<any> }> = {
  [K in RequiredGuardsKeys<G>]: TypeOfGuard<G[K]>;
};

type Merge<A, B> = {
  [k in keyof (A & B)]: (A & B)[k];
};

type GuardsFromType<T extends { [key in keyof T]: any }> = {
  [K in keyof T]-?: T[K] extends { [K in keyof T]-?: T[K] }[K]
    ? Guard<T[K]>
    : OptionalGuard<T[K]>;
};
/**
 * @category High Order Guard
 * @return a `Guard` that checks if the value respect the structure described by the guard object passed
 * @throws {ReferenceError} When calling the `self` guard in the callback
 * @example
 * ```typescript
 *   const isPerson = ObjectOf({
 *     firstName: isString,
 *     lastName: isString,
 *     age: isNumber,
 *   });
 * ```
 * @example
 * ```typescript
 *   type Person = {
 *     firstName: string;
 *     lastName: string;
 *     age: number;
 *     spouse: Person | null;
 *   };
 *
 *   const isPerson = ObjectOf<Person>((self) => ({
 *     firstName: isString,
 *     lastName: isString,
 *      age: isNumber,
 *      spouse: OneOf([self, isNull]),
 *   }));
 * ```
 */
const ObjectOf = <
  T extends TypeFromGuards<G>,
  G extends { [K in any]: Guard<any> } = GuardsFromType<T>
>(
  guards: G | ((self: NonCallable<Guard<T>>) => G)
): Guard<T> => {
  const isObjectOf = (obj: unknown): obj is T =>
    isObject(obj) &&
    Object.entries(generatedGuards).every(([key, guard]) =>
      guard.optional
        ? obj[key] === undefined || guard(obj[key])
        : key in obj && guard(obj[key])
    );

  const generatedGuards =
    typeof guards === "function"
      ? (guards as (self: Guard<T>) => G)(isObjectOf)
      : guards;

  return isObjectOf;
};

export default ObjectOf;

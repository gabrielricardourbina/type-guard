import type { Guard } from "./types";
import isObject from "./is-object";
import RecursiveError from "./recursive-error";

type TypeFromGuards<G extends { [K in any]: Guard<any> }> = {
  [K in keyof G]: G[K] extends Guard<infer P> ? P : unknown;
};
type GuardsFromType<T extends { [K in any]: any }> = {
  [K in keyof T]: Guard<T[K]>;
};
/**
 * @category High Order Guard
 * @return a `Guard` that checks if the value respect the structure described by the guard object passed
 * @throws {RecursiveError} When calling the `self` guard in the callback
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
  guards: G | ((self: Guard<T>) => G)
): Guard<T> => {
  const isObjectOf = (obj: unknown): obj is T =>
    isObject(obj) &&
    Object.entries(generatedGuards).every(([key, guard]) => guard(obj[key]));

  const generatedGuards = RecursiveError.assert((forbidCall) =>
    typeof guards === "function" ? guards(forbidCall(isObjectOf)) : guards
  );

  return isObjectOf;
};

export default ObjectOf;

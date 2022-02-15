import type { Guard, OptionalGuard, TypeOfGuard } from "./types";
import isObject from "./is-object";
import RecursiveError from "./recursive-error";

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
  const isObjectOf = <V>(obj: V): obj is V extends T ? V : never =>
    isObject(obj) &&
    Object.entries(generatedGuards).every(([key, guard]) =>
      guard.optional
        ? obj[key] === undefined || guard(obj[key])
        : key in obj && guard(obj[key])
    );

  const generatedGuards = RecursiveError.assert((forbidCall) =>
    typeof guards === "function" ? guards(forbidCall(isObjectOf)) : guards
  );

  return isObjectOf;
};

export default ObjectOf;

// type RequiredKeys<T> = Exclude<
//   {
//     [P in keyof T]: T[P] extends RemoveOptionality<T>[P] ? P : never;
//   }[keyof T],
//   undefined
// >;

// type RequiredProps<T extends { [key in keyof T]: any }> = {
//   [K in RequiredKeys<T>]: T[K] extends RemoveOptionality<T>[K] ? "true": "false";
// };

// type GGGED<T extends { [key in keyof T]: any }> = {
//   [K in keyof T]: T[K];
// }

// type TED = { test: string; alo?: number}

// type R = GuardsFromType<TED>

// const J: "a" | "b" = "a"

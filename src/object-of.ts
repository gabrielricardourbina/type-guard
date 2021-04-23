import type { Guard } from "./types";
import isObject from "./is-object";
import RecursiveError from "./recursive-error";

type TypeOfGuards<G extends { [K in keyof G]: Guard<any> }> = {
  [K in keyof G]: G[K] extends Guard<infer P> ? P : never;
};

const ObjectOf = <
  T extends Record<any, any>,
  G extends { [K in keyof T]: Guard<T[K]> } = { [K in keyof T]: Guard<T[K]> }
>(
  guards: G | ((self: Guard<TypeOfGuards<G>>) => G)
): Guard<TypeOfGuards<G>> => {

  const isObjectOf = (obj: unknown): obj is TypeOfGuards<G> =>
    isObject(obj) &&
    Object.entries(generatedGuards).every(([key, guard]) => guard(obj[key]));

  const generatedGuards = RecursiveError.assert((forbidCall) =>
    typeof guards === "function" ? guards(forbidCall(isObjectOf)) : guards
  );

  return isObjectOf;
};

export default ObjectOf;

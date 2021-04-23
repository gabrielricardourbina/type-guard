import type { Guard } from "./types";
import isArray from "./is-array";
import RecursiveError from "./recursive-error";

type TypeOfGuards<G extends { [K in keyof G]: Guard<any> }> = {
  [K in keyof G]: G[K] extends Guard<infer P> ? P : never;
};

const TupleOf = <
  T extends [any, ...any[]],
  G extends { [K in keyof T]: Guard<T[K]> } = { [K in keyof T]: Guard<T[K]> }
>(
  guards: G | ((self: Guard<TypeOfGuards<G>>) => G)
): Guard<TypeOfGuards<G>> => {
  const isTupleOf = (tuple: unknown): tuple is TypeOfGuards<G> => {
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

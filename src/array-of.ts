import type { Guard } from "./types";
import isArray from "./is-array";
import RecursiveError from "./recursive-error";

type TypeOfGuards<G extends Guard<any>[]> = G extends Guard<infer P>[]
  ? P[]
  : never;

const ArrayOf = <
  T extends any[],
  G extends { [K in keyof T]: Guard<T[K]> } = { [K in keyof T]: Guard<T[K]> }
>(
  guards: G | ((self: Guard<TypeOfGuards<G>>) => G)
): Guard<TypeOfGuards<G>> => {
  const isArrayOf = (arr: unknown): arr is TypeOfGuards<G> => {
    return (
      isArray(arr) &&
      arr.every((value) => generatedGuards.some((guard) => guard(value)))
    );
  };

  const generatedGuards = RecursiveError.assert((forbidCall) =>
    typeof guards === "function" ? guards(forbidCall(isArrayOf)) : guards
  );

  return isArrayOf;
};

export default ArrayOf;

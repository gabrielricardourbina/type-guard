import type { Guard } from "./types";
import isArray from "./is-array";

type TypeOfGuards<G extends Guard<any>[]> = G extends Guard<infer P>[]
  ? P[]
  : never;

const ArrayOf = <
  T extends any[],
  G extends { [K in keyof T]: Guard<T[K]> } = { [K in keyof T]: Guard<T[K]> }
>(
  guards: G
): Guard<TypeOfGuards<G>> => {
  return (arr: unknown): arr is TypeOfGuards<G> => {
    return (
      isArray(arr) && arr.every((value) => guards.some((guard) => guard(value)))
    );
  };
};

export default ArrayOf;

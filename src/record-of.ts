import type { Guard } from "./types";
import isObject from "./is-object";

type TypeOfGuards<G extends Guard<any>[]> = G extends Guard<infer P>[]
  ? P
  : never;

const RecordOf = <
  T extends { [k: string]: any },
  G extends Guard<T[string]>[] = Guard<T[string]>[]
>(
  guards: G
): Guard<{ [k: string]: TypeOfGuards<G> }> => {
  return (rec: unknown): rec is { [k: string]: TypeOfGuards<G> } => {
    return (
      isObject(rec) &&
      Object.values(rec).every((v) => guards.some((guard) => guard(v)))
    );
  };
};

export default RecordOf;

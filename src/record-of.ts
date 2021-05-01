import type { Guard } from "./types";
import isObject from "./is-object";
import RecursiveError from "./recursive-error";

type TypeOfGuards<G extends Guard<any>[]> = G extends Guard<infer P>[]
  ? { [k: string]: P }
  : never;

const RecordOf = <
  T extends { [k: string]: any },
  G extends Guard<T[string]>[] = Guard<T[string]>[]
>(
  guards: G | ((self: Guard<TypeOfGuards<G>>) => G)
): Guard<TypeOfGuards<G>> => {
  const isRecordOf = (rec: unknown): rec is TypeOfGuards<G> => {
    return (
      isObject(rec) &&
      Object.values(rec).every((v) => generatedGuards.some((guard) => guard(v)))
    );
  };

  const generatedGuards = RecursiveError.assert((forbidCall) =>
    typeof guards === "function" ? guards(forbidCall(isRecordOf)) : guards
  );
  return isRecordOf;
};

export default RecordOf;

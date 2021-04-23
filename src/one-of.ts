import type { Guard } from "./types";
import RecursiveError from "../src/recursive-error";

type TypeOfGuards<G extends Guard<any>[]> = G extends Guard<infer P>[]
  ? P
  : never;

const OneOf = <T, G extends Guard<T>[] = Guard<T>[]>(
  guards: G | ((self: Guard<T>) => G)
): Guard<TypeOfGuards<G>> => {
  const isOneOf = (value: unknown): value is TypeOfGuards<G> => {
    return generatedGuards.some((guard) => guard(value));
  };

  const generatedGuards = RecursiveError.assert((forbidCall) =>
    typeof guards === "function" ? guards(forbidCall(isOneOf)) : guards
  );

  return isOneOf;
};

export default OneOf;

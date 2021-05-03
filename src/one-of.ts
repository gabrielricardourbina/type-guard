import type { Guard } from "./types";
import RecursiveError from "../src/recursive-error";

type TypeFromGuards<G extends Guard<any>[]> = G extends Guard<infer P>[]
  ? P
  : unknown;
type GuardsFromType<T> = Guard<T>[];
/**
 * @category High Order Guard
 * @return a `Guard` that checks if the value is of one of the passed guards types
 * @throws {RecursiveError} When calling the `self` guard in the callback
 * @example
 * ```typescript
 *       const isGrade = OneOf([isString, isNumber]);
 * ```
 * @example
 * ```typescript
 *     type Grades = string | number | { [k: string]: Grades };
 *     const isGrades = OneOf<Grades>((self) => [
 *       isString,
 *       isNumber,
 *       RecordOf([self]),
 *     ]);
 * ```
 */
const OneOf = <
  T extends TypeFromGuards<G>,
  G extends Guard<any>[] = GuardsFromType<T>
>(
  guards: G | ((self: Guard<T>) => G)
): Guard<T> => {
  const isOneOf = (value: unknown): value is T => {
    return generatedGuards.some((guard) => guard(value));
  };

  const generatedGuards = RecursiveError.assert((forbidCall) =>
    typeof guards === "function" ? guards(forbidCall(isOneOf)) : guards
  );

  return isOneOf;
};

export default OneOf;

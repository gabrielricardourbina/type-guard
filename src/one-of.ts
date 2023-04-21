import type { Guard, NonCallable } from "./types.js";

type TypeFromGuards<G extends Guard<any>[]> = G extends Guard<infer P>[]
  ? P
  : unknown;
type GuardsFromType<T> = Guard<T>[];
/**
 * @category High Order Guard
 * @return a `Guard` that checks if the value is of one of the passed guards types
 * @throws {ReferenceError} When calling the `self` guard in the callback
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
  guards: G | ((self: NonCallable<Guard<T>>) => G)
): Guard<T> => {
  const isOneOf = (value: unknown): value is T => {
    return generatedGuards.some((guard) => guard(value));
  };

  const generatedGuards =
    typeof guards === "function"
      ? (guards as (self: Guard<T>) => G)(isOneOf)
      : guards;

  return isOneOf;
};

export default OneOf;

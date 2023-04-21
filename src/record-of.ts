import type { Guard, NonCallable } from "./types.js";
import isObject from "./is-object.js";

type TypeFromGuards<G extends Guard<any>[]> = {
  [k: string]: G extends Guard<infer P>[] ? P : unknown;
};
type GuardsFromType<T extends { [k: string]: any }> = Guard<T[string]>[];
/**
 * @category High Order Guard
 * @return a `Guard` that checks if the values of the object passed respect the types of the guards passed
 * @throws {ReferenceError} When calling the `self` guard in the callback
 * @example
 * ```typescript
 *     const isGrades = RecordOf([isNumber]);
 * ```
 * @example
 * ```typescript
 *   type Grades = { [name: string]: number | Grades };
 *   const isGrades = RecordOf<Grades>((self) => [isNumber, self]);
 * ```
 */
const RecordOf = <
  T extends TypeFromGuards<G>,
  G extends Guard<any>[] = GuardsFromType<T>
>(
  guards: G | ((self: NonCallable<Guard<T>>) => G)
): Guard<T> => {
  const isRecordOf = (rec: unknown): rec is T => {
    return (
      isObject(rec) &&
      Object.values(rec).every((v) => generatedGuards.some((guard) => guard(v)))
    );
  };

  const generatedGuards =
    typeof guards === "function"
      ? (guards as (self: Guard<T>) => G)(isRecordOf)
      : guards;

  return isRecordOf;
};

export default RecordOf;

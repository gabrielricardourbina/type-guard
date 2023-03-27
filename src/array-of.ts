import type { Guard, NonCallable } from "./types";
import isArray from "./is-array";

type TypeFromGuards<G extends Guard<any>[]> = G extends Guard<infer P>[]
  ? P[]
  : unknown[];

type GuardsFromType<T extends any[]> = Guard<
  T extends (infer P)[] ? P : unknown
>[];
/**
 * @category High Order Guard
 * @return a `Guard` that checks if every element of an array is one of the guards passed
 * @throws {ReferenceError} When calling the `self` guard in the callback
 * @example
 * ```typescript
 *   const isStringArray = ArrayOf([isString]);
 * ```
 * @example
 * ```typescript
 *   const isStringOrNumberArray = ArrayOf([isString, isNumber]);
 * ```
 * @example
 * ```typescript
 *   type FullNames = (string | FullNames)[];
 *   const isFullNames = ArrayOf<FullNames>((self) => [isString, self]);
 * ```
 */
const ArrayOf = <
  T extends TypeFromGuards<G>,
  G extends Guard<any>[] = GuardsFromType<T>
>(
  guards: G | ((self: NonCallable<Guard<T>>) => G)
): Guard<T> => {
  const isArrayOf = (value: unknown): value is T => {
    return (
      isArray(value) &&
      value.every((value) => generatedGuards.some((guard) => guard(value)))
    );
  };

  const generatedGuards =
    typeof guards === "function"
      ? (guards as (self: Guard<T>) => G)(isArrayOf)
      : guards;

  return isArrayOf;
};

export default ArrayOf;

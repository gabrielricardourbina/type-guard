import type { Guard } from "./types";

type Constructor<T> = new (...args: any[]) => T;

type TypeFromConstructors<C extends Constructor<any>[]> = C extends Constructor<
  infer P
>[]
  ? P
  : unknown;
type ConstructorsFromType<T extends any> = Constructor<T>[];

/**
 * @category Guard Factory
 * @return a Guard that checks if a value is instance of one of the constructor passed
 * @example
 * ```typescript
 *   const isDate = InstanceOf([Date]);
 * ```
 * @example
 * ```typescript
 *   const isBytes = InstanceOf([Buffer, Uint8Array]);
 * ```
 */
const InstanceOf = <
  T extends TypeFromConstructors<C>,
  C extends Constructor<any>[] = ConstructorsFromType<T>
>(
  constructors: C
): Guard<T> => {
  return <V>(value: V): value is V extends T ? V : never => {
    return constructors.some((constructor) => value instanceof constructor);
  };
};

export default InstanceOf;

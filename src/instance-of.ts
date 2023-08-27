import type { Guard } from "./types.js";

type Constructor<T> = new (...args: any[]) => T;

type TypeFromConstructors<C extends Constructor<any>[]> = C extends Constructor<
  infer P
>[]
  ? P
  : unknown;
type ConstructorsFromType<T> = Constructor<T>[];

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
  return (value: unknown): value is T => {
    for (let i = 0; i < constructors.length; i++) {
      const constructor = constructors[i]!;
      if(value instanceof constructor){
        return true
      }      
    }
    return false
  };
};

export default InstanceOf;

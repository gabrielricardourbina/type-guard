import type { Guard } from "./types";

type Constructor<T> = new (...args: any[]) => T;

type TypeofConstructors<C extends Constructor<any>[]> = C extends Constructor<
  infer P
>[]
  ? P
  : never;

const InstanceOf = <T extends Object, C extends Constructor<T>[] = Constructor<T>[]>(
  constructors: C
): Guard<TypeofConstructors<C>> => {
  return (obj: unknown): obj is TypeofConstructors<C> => {
    return constructors.some(constructor => obj instanceof constructor);
  };
};

export default InstanceOf;

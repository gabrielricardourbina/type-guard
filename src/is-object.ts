import type { Guard } from "./types";

const isObject: Guard<{ [K in any]: any }> = (
  obj: unknown
): obj is { [K in any]: any } => {
  return (
    obj instanceof Object && Object === Object.getPrototypeOf(obj).constructor
  );
};

export default isObject;

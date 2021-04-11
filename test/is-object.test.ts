import isObject from "../src/is-object";
import { expectType } from "tsd";
import { testEach } from "./tools";

describe("object {}", () => {
  expectType<(a: unknown) => a is { [k: string]: any; [x: number]: any }>(
    isObject
  );

  testEach(isObject, "object {}", [
    [true, {}],
    [true, { name: "Jon Snow" }],
    [true, { amount: 123 }],
    [true, { name: "John Doe", age: 18 }],
    [false, new String("")],
    [false, new Number("")],
    [false, Object.create(null)],
    [false, [10, true]],
    [false, null],
    [false, 10],
    [false, "10"],
    [false, true],
  ]);
});

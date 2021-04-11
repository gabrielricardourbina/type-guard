import isString from "../src/is-string";
import { expectType } from "tsd";
import { testEach } from "./tools";

describe("string", () => {
  expectType<(a: unknown) => a is string>(isString);

  testEach(isString, "string", [
    [true, "John Doe"],
    [true, ""],
    [true, "\u0000"],
    [false, new String("")],
    [false, { name: "John Doe", age: 18 }],
    [false, [10, true]],
    [false, null],
    [false, 10],
    [false, true],
  ]);
});

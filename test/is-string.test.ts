import type { Guard } from "../src/types";
import { expectType } from "tsd";
import { testEach } from "./tools";

import isString from "../src/is-string";

describe("string", () => {
  expectType<Guard<string>>(isString);

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

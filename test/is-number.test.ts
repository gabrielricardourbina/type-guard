import type { Guard } from "../src/types";
import { expectType } from "tsd";
import { testEach } from "./tools";

import isNumber from "../src/is-number";

describe("number", () => {
  expectType<Guard<number>>(isNumber);

  testEach(isNumber, "number", [
    [true, 12],
    [true, -12],
    [true, 0],
    [true, -0],
    [true, Infinity],
    [true, -Infinity],
    [true, NaN],
    [false, new Number(12)],
    [false, { name: "John Doe", age: 18 }],
    [false, [10, true]],
    [false, null],
    [false, "10"],
    [false, true],
  ]);
});

import type { Guard } from "../src/types";
import { expectType } from "tsd";
import { testEach } from "./tools";

import isArray from "../src/is-array";

describe("Array of any: any[]", () => {
  expectType<Guard<any[]| readonly any[]>>(isArray);

  testEach(isArray, "any[]", [
    [true, ["John Doe", "Oliver King", "Pedro Perez"]],
    [true, [12, "Oliver King", true]],
    [true, []],
    [false, "John Doe"],
    [false, { name: "John Doe", age: 18 }],
    [false, null],
    [false, 10],
    [false, true],
  ]);
});

import type { Guard } from "../src/types";
import { expectType } from "tsd";
import { testEach } from "./tools";

import isNull from "../src/is-null";

describe("null", () => {
  expectType<Guard<null>>(isNull);

  testEach(isNull, "null", [
    [true, null],
    [false, "John Doe"],
    [false, ""],
    [false, "\u0000"],
    [false, new String("")],
    [false, { name: "John Doe", age: 18 }],
    [false, [10, true]],
    [false, 10],
    [false, true],
  ]);
});

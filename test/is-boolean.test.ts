import type { Guard } from "../src/types";
import { expectType } from "tsd";
import { testEach } from "./tools";

import isBoolean from "../src/is-boolean";

describe("boolean", () => {
  expectType<Guard<boolean>>(isBoolean);

  testEach(isBoolean, "boolean", [
    [true, true],
    [true, false],
    [false, new Boolean(true)],
    [false, { name: "John Doe", age: 18 }],
    [false, [10, true]],
    [false, null],
    [false, "10"],
    [false, 10],
  ]);
});

import type { Guard } from "../src/types";
import { expectType } from "tsd";
import { testEach } from "./tools";

import isObject from "../src/is-object";

describe("object {}", () => {
  expectType<Guard<{ [k: string]: any; [x: number]: any }>>(isObject);

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

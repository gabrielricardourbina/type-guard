import type { Guard } from "../src/types";
import { expectType } from "tsd";
import { testEach } from "./tools";
import NullableOf from "../src/nullable-of";
import isNumber from "../src/is-number";

describe("number | null", () => {
  const isNullableNumber = NullableOf(isNumber)
  expectType<Guard<number| null>>(isNullableNumber);

  testEach(isNullableNumber, "number | null", [
    [true, 123],
    [true, null],
    [false, new Boolean(true)],
    [false, { name: "John Doe", age: 18 }],
    [false, [10, true]],
    [false, undefined],
    [false, "10"],
  ]);
});

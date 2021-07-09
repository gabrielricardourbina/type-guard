import type { Guard } from "../src/types";
import { expectType } from "tsd";
import { testEach } from "./tools";
import MaybeOf from "../src/maybe-of";
import isNumber from "../src/is-number";

describe("number | undefined", () => {
  const isMaybeNumber = MaybeOf(isNumber)
  expectType<Guard<number| undefined>>(isMaybeNumber);

  testEach(isMaybeNumber, "number | undefined", [
    [true, 123],
    [true, undefined],
    [false, new Boolean(true)],
    [false, { name: "John Doe", age: 18 }],
    [false, [10, true]],
    [false, null],
    [false, "10"],
  ]);
});

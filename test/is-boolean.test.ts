import isBoolean from "../src/is-boolean";
import { expectType } from "tsd";
import { testEach } from "./tools";

describe("boolean", () => {
  expectType<(a: unknown) => a is boolean>(isBoolean);

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

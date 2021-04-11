import OneOf from "../src/one-of";
import isString from "../src/is-string";
import isNumber from "../src/is-number";
import { expectType } from "tsd";
import { testEach } from "./tools";

describe("Grade: string | number", () => {
  const isGrade = OneOf([isString, isNumber]);
  expectType<(a: unknown) => a is string | number>(isGrade);

  testEach(isGrade, "string | number", [
    [true, 10],
    [true, "A+"],
    [false, { value: 10 }],
    [false, []],
    [false, [10, true]],
    [false, null],
    [false, true],
  ]);
});

import type { Guard } from "../src/types";
import { expectType } from "tsd";
import { expect } from "chai";
import { testEach } from "./tools";

import RecursiveError from "../src/recursive-error";
import OneOf from "../src/one-of";
import isString from "../src/is-string";
import isNumber from "../src/is-number";
import RecordOf from "../src/record-of";
import isNull from "../src/is-null";

it("OneOf: throws explicit error when trying to call the 'self' guard in recursive mode", () => {
  expect(() =>
    OneOf((self) => {
      self(undefined);
      return [self, isNull];
    })
  ).to.throw(RecursiveError);
});

describe("Grade: string | number", () => {
  const isGrade = OneOf([isString, isNumber]);
  expectType<Guard<string | number>>(isGrade);

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

describe("Grades: string | number | Record<string, Grades>", () => {
  type Grades = string | number | { [k: string]: Grades };
  const isGrades = OneOf<Grades>((self) => [
    isString,
    isNumber,
    RecordOf([self]),
  ]);
  expectType<Guard<Grades>>(isGrades);

  testEach(isGrades, "string | number | Record<string, Grades>", [
    [true, 10],
    [true, "A+"],
    [true, { math: 10, english: { writing: "A" } }],
    [false, { math: 10, english: ["A", "B"] }],
    [false, ["A"]],
    [false, [10]],
    [false, [10, true]],
    [false, null],
    [false, true],
  ]);
});

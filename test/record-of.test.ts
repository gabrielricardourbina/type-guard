import type { Guard } from "../src/types";
import { expectType } from "tsd";
import { expect } from "chai";
import { testEach } from "./tools";

import RecursiveError from "../src/recursive-error";
import RecordOf from "../src/record-of";
import isNumber from "../src/is-number";
import isNull from "../src/is-null";

it("RecordOf: throws explicit error when trying to call the 'self' guard in recursive mode", () => {
  expect(() =>
    RecordOf((self) => {
      self(undefined);
      return [self, isNull];
    })
  ).to.throw(RecursiveError);
});

describe("Grades: { [name: string]: number }", () => {
  const isGrades = RecordOf([isNumber]);
  expectType<Guard<{ [name: string]: number }>>(isGrades);

  testEach(isGrades, "{ [name: string]: number }", [
    [true, { "Jane Doe": 9, "Jon Snow": 10 }],
    [true, {}],
    [false, []],
    [false, [1, 2, 3, 4]],
    [false, { "Jane Doe": 9, "Jon Snow": "A+" }],
    [false, { brand: "Toyota", engine: 1.8 }],
    [false, ["Jane Doe", "23"]],
    [false, ["10", true]],
    [false, [10, true]],
    [false, null],
    [false, 10],
    [false, "10"],
    [false, true],
  ]);
});

describe("Grades: { [name: string]: number | Grades }", () => {
  type Grades = { [name: string]: number | Grades };
  const isGrades = RecordOf<Grades>((self) => [isNumber, self]);
  expectType<Guard<Grades>>(isGrades);

  testEach(isGrades, "{ [name: string]: number | Grades }", [
    [true, { "Jane Doe": 9, "Jon Snow": 10 }],
    [true, { "Jane Doe": 9, "Jon Snow": 10, "Jon Ripper": { Carl: 23 } }],
    [true, {}],
    [false, []],
    [false, [1, 2, 3, 4]],
    [false, { "Jane Doe": 9, "Jon Snow": "A+" }],
    [false, { brand: "Toyota", engine: 1.8 }],
    [false, ["Jane Doe", "23"]],
    [false, ["10", true]],
    [false, [10, true]],
    [false, null],
    [false, 10],
    [false, "10"],
    [false, true],
  ]);
});

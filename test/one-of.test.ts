import type { Guard } from "../src/";
import { expect } from "chai";
import { testGuard } from "./tools";
import RecursiveError from "../src/recursive-error";
import { OneOf, isString, isNumber, isNull, RecordOf } from "../src";

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
  testGuard<Guard<string | number>>("string | number")(isGrade)
    .pass(10)
    .pass("A+")
    .fail({ value: 10 })
    .fail([])
    .fail([10, true])
    .fail(null)
    .fail(true);
});

describe("Grades: string | number | Record<string, Grades>", () => {
  type Grades = string | number | { [k: string]: Grades };
  const isGrades = OneOf<Grades>((self) => [
    isString,
    isNumber,
    RecordOf([self]),
  ]);

  testGuard<Guard<Grades>>("string | number | Record<string, Grades>")(isGrades)
    .pass(10)
    .pass("A+")
    .pass({ math: 10, english: { writing: "A" } })
    .fail({ math: 10, english: ["A", "B"] })
    .fail(["A"])
    .fail([10])
    .fail([10, true])
    .fail(null)
    .fail(true);
});

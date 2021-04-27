import type { Guard } from "../src/types";
import { expectType } from "tsd";
import { expect } from "chai";
import { testEach } from "./tools";

import RecursiveError from "../src/recursive-error";
import ArrayOf from "../src/array-of";
import isString from "../src/is-string";
import isNumber from "../src/is-number";
import isNull from "../src/is-null";

it("ArrayOf: throws explicit error when trying to call the 'self' guard in recursive mode", () => {
  expect(() =>
    ArrayOf((self) => {
      self(undefined);
      return [self, isNull];
    })
  ).to.throw(RecursiveError);
});

describe("Names: string[]", () => {
  const guard = ArrayOf([isString]);
  expectType<Guard<string[]>>(guard);

  testEach(guard, "string[]", [
    [true, ["Victor", "Elena", "Maria"]],
    [true, []],
    [false, ["Victor", 12, "Maria"]],
    [false, { brand: "Toyota", engine: 1.8 }],
    [false, ["10", true]],
    [false, [10, true]],
    [false, null],
    [false, 10],
    [false, "10"],
    [false, true],
  ]);
});

describe("NamesOrId: (string| number)[]", () => {
  const guard = ArrayOf([isString, isNumber]);
  expectType<Guard<(string | number)[]>>(guard);

  testEach(guard, "(string| number)[]", [
    [true, ["Victor", "Elena", "Maria"]],
    [true, []],
    [true, ["Victor", 12, "Maria"]],
    [false, { brand: "Toyota", engine: 1.8 }],
    [false, ["10", true]],
    [false, [10, true]],
    [false, null],
    [false, 10],
    [false, "10"],
    [false, true],
  ]);
});

describe("FullNames: (string | FullNames)[]", () => {
  type FullNames = (string | FullNames)[];
  const guard = ArrayOf<FullNames>((g) => [isString, g]);
  expectType<Guard<FullNames>>(guard);

  testEach(guard, "(string | FullNames)[]", [
    [true, ["Victor", "Elena", "Maria"]],
    [true, []],
    [true, ["Victor", ["Elena", "Maria"]]],
    [false, ["Victor", 12, "Maria"]],
    [false, { brand: "Toyota", engine: 1.8 }],
    [false, ["10", true]],
    [false, [10, true]],
    [false, null],
    [false, 10],
    [false, "10"],
    [false, true],
  ]);
});

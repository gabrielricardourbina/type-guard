import type { Guard } from "../src/types";
import { expectType } from "tsd";
import { expect } from "chai";
import { testEach } from "./tools";
import RecursiveError from "../src/recursive-error";
import TupleOf from "../src/tuple-of";
import isString from "../src/is-string";
import isNumber from "../src/is-number";
import isBoolean from "../src/is-boolean";
import isNull from "../src/is-null";
import OneOf from "../src/one-of";
import OptionalOf from "../src/optional-of";

it("TupleOf: throws RecursiveError when trying to call the 'self' guard in recursive mode", () => {
  expect(() => {
    type L = [L, null];
    TupleOf<L>((self) => {
      self(undefined);
      return [self, isNull];
    });
  }).to.throw(RecursiveError);
});

it("TupleOf: throws TypeError when placing a required guard after an optional one", () => {
  expect(() => {
    const optionalString = OptionalOf(isString);
    TupleOf([
      optionalString,
      //@ts-expect-error
      isNumber,
    ]);
  }).to.throw(TypeError, "A required guard cannot follow an optional guard");
});

describe("Person: [string, number]", () => {
  const isPersonTuple = TupleOf([isString, isNumber]);
  expectType<Guard<[string, number]>>(isPersonTuple);

  testEach(isPersonTuple, "[string, number]", [
    [true, ["Jane Doe", 24]],
    [true, ["Jane Doe", 23, true]],
    [false, { brand: "Toyota", engine: 1.8 }],
    [false, ["Jane Doe", "23"]],
    [false, []],
    [false, ["10", true]],
    [false, [10, true]],
    [false, null],
    [false, 10],
    [false, "10"],
    [false, true],
  ]);
});

describe("Person: [string, number, boolean?]", () => {
  const isOptionalBoolean = OptionalOf(isBoolean);
  const isPersonTuple = TupleOf([isString, isNumber, isOptionalBoolean]);
  expectType<Guard<[string, number, boolean?]>>(isPersonTuple);

  testEach(isPersonTuple, "[string, number, boolean?]", [
    [true, ["Jane Doe", 24]],
    [true, ["Jane Doe", 23, true]],
    [true, ["Jane Doe", 23, undefined]],
    [false, { brand: "Toyota", engine: 1.8 }],
    [false, ["Jane Doe", "23"]],
    [false, ["Jane Doe"]],
    [false, []],
    [false, ["10", true]],
    [false, [10, true]],
    [false, null],
    [false, 10],
    [false, "10"],
    [false, true],
  ]);
});

describe("Person: [string, number, Person | null] ", () => {
  type Person = [string, number, Person | null];
  const isPersonTuple = TupleOf<Person>((self) => [
    isString,
    isNumber,
    OneOf([self, isNull]),
  ]);
  expectType<Guard<Person>>(isPersonTuple);

  testEach(isPersonTuple, "[string, number, Person | null]", [
    [true, ["Jane Doe", 24, null]],
    [true, ["Jane Doe", 23, ["Peter Doe", 54, null]]],
    [false, ["Jane Doe", 23, true]],
    [false, { brand: "Toyota", engine: 1.8 }],
    [false, ["Jane Doe", "23"]],
    [false, []],
    [false, ["10", true]],
    [false, [10, true]],
    [false, null],
    [false, 10],
    [false, "10"],
    [false, true],
  ]);
});

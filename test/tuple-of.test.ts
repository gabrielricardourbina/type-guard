import type { Guard } from "../src/";
import { expect } from "chai";
import { testGuard } from "./tools";
import RecursiveError from "../src/recursive-error";
import {
  isBoolean,
  isNumber,
  isNull,
  TupleOf,
  isString,
  OneOf,
  OptionalOf,
} from "../src";

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
  testGuard<Guard<[string, number]>>("[string, number]")(isPersonTuple)
    .pass(["Jane Doe", 24])
    .fail(["Jane Doe", 23, true])
    .fail({ brand: "Toyota", engine: 1.8 })
    .fail(["Jane Doe", "23"])
    .fail([])
    .fail(["10", true])
    .fail([10, true])
    .fail(null)
    .fail(10)
    .fail("10")
    .fail(true);
});

describe("Person: [string, number, boolean?]", () => {
  const isOptionalBoolean = OptionalOf(isBoolean);
  const isPersonTuple = TupleOf([isString, isNumber, isOptionalBoolean]);
  testGuard<Guard<[string, number, boolean?]>>("[string, number, boolean?]")(
    isPersonTuple
  )
    .pass(["Jane Doe", 24])
    .pass(["Jane Doe", 23, true])
    .pass(["Jane Doe", 23, undefined])
    .fail({ brand: "Toyota", engine: 1.8 })
    .fail(["Jane Doe", "23"])
    .fail(["Jane Doe"])
    .fail([])
    .fail(["10", true])
    .fail([10, true])
    .fail(null)
    .fail(10)
    .fail("10")
    .fail(true);
});

describe("Person: [string, number, Person | null] ", () => {
  type Person = [string, number, Person | null];
  const isPersonTuple = TupleOf<Person>((self) => [
    isString,
    isNumber,
    OneOf([self, isNull]),
  ]);

  testGuard<Guard<Person>>("[string, number, Person | null]")(isPersonTuple)
    .pass(["Jane Doe", 24, null])
    .pass(["Jane Doe", 23, ["Peter Doe", 54, null]])
    .fail(["Jane Doe", 23, true])
    .fail({ brand: "Toyota", engine: 1.8 })
    .fail(["Jane Doe", "23"])
    .fail([])
    .fail(["10", true])
    .fail([10, true])
    .fail(null)
    .fail(10)
    .fail("10")
    .fail(true);
});

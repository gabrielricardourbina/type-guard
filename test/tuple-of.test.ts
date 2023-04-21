import type { Guard } from "../src/index.js";
import { testGuard } from "./tools.js";
import {
  isBoolean,
  isNumber,
  isNull,
  TupleOf,
  isString,
  OneOf,
  OptionalOf,
} from "../src/index.js";

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

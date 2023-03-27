import type { Guard } from "../src/";
import { expect } from "chai";
import { testGuard } from "./tools";
import RecursiveError from "../src/recursive-error";
import {
  ObjectOf,
  OptionalOf,
  isString,
  isNumber,
  isNull,
  OneOf,
  ValueOf,
} from "../src";

const ignoreLiteral = <T>(v: T) => v;

it("ObjectOf: throws explicit error when trying to call the 'self' guard in recursive mode", () => {
  expect(() =>
    ObjectOf((self) => {
      self(undefined);
      return {
        thing: OneOf([self, isNull]),
      };
    })
  ).to.throw(RecursiveError);
});
describe("Person: { firstName: string; lastName: string; age: number }", () => {
  type Person = { firstName: string; lastName: string; age: number };
  const isPerson = ObjectOf({
    firstName: isString,
    lastName: isString,
    age: isNumber,
  });

  testGuard<Guard<Person>>(
    "{ firstName: string; lastName: string; age: number }"
  )(isPerson)
    .pass({ firstName: "Jane", lastName: "Doe", age: 23 })
    .pass(
      ignoreLiteral({
        firstName: "Jane",
        lastName: "Doe",
        age: 23,
        spouse: "Jon Doe",
      })
    )
    .fail({ firstName: "Jane", lastName: "Doe", age: "23" })
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

describe("Person: { firstName: string; middleName?: string; lastName: string; age: number | undefined }", () => {
  const isOptionalString = OptionalOf(isString);
  const maybeIsNumber = OneOf([isNumber, ValueOf([undefined])]);
  type Person = {
    firstName: string;
    middleName?: string;
    lastName: string;
    age: number | undefined;
  };
  const isPerson = ObjectOf({
    firstName: isString,
    middleName: isOptionalString,
    lastName: isString,
    age: maybeIsNumber,
  });

  testGuard<Guard<Person>>(
    "{ firstName: string; middleName?: string; lastName: string; age: number | undefined }"
  )(isPerson)
    .pass({ firstName: "Jane", lastName: "Doe", age: 23 })
    .pass({ firstName: "Jane", lastName: "Doe", age: undefined })
    .pass(
      ignoreLiteral({
        firstName: "Jane",
        lastName: "Doe",
        age: 23,
        spouse: "Jon Doe",
      })
    )
    .pass({ firstName: "Jane", lastName: "Doe", age: 23, middleName: "Alice" })
    .fail({ firstName: "Jane", lastName: "Doe" })
    .fail({ firstName: "Jane", lastName: "Doe", age: "23" })
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

describe("Person: { firstName: string; lastName: string; age: number, spouse: Person | null }", () => {
  type Person = {
    firstName: string;
    lastName: string;
    age: number;
    spouse: Person | null;
  };

  const isPerson = ObjectOf<Person>((self) => ({
    firstName: isString,
    lastName: isString,
    age: isNumber,
    spouse: OneOf([self, isNull]),
  }));

  testGuard<Guard<Person>>(
    "{ firstName: string; lastName: string; age: number, spouse: Person | null }"
  )(isPerson)
    .pass({ firstName: "Jane", lastName: "Doe", age: 23, spouse: null })
    .pass({
      firstName: "Jane",
      lastName: "Doe",
      age: 23,
      spouse: { firstName: "Jon", lastName: "Doe", age: 23, spouse: null },
    })
    .fail({ firstName: "Jane", lastName: "Doe", age: "23" })
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

import type { Guard } from "../src/types";
import { expectType } from "tsd";
import { expect } from "chai";
import { testEach } from "./tools";
import RecursiveError from "../src/recursive-error";

import ObjectOf from "../src/object-of";
import isString from "../src/is-string";
import isNumber from "../src/is-number";
import isNull from "../src/is-null";
import OneOf from "../src/one-of";

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

  expectType<Guard<Person>>(isPerson);

  testEach(isPerson, "{ firstName: string; lastName: string; age: number }", [
    [true, { firstName: "Jane", lastName: "Doe", age: 23 }],
    [true, { firstName: "Jane", lastName: "Doe", age: 23, spouse: "Jon Doe" }],
    [false, { firstName: "Jane", lastName: "Doe", age: "23" }],
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

describe("Person: { firstName: string; lastName: string; age: number, spouse: Person | null }", () => {
  type Person = {
    firstName: string;
    lastName: string;
    age: number;
    spouse: Person | null;
  };

  const isPerson = ObjectOf<Person>((guard) => ({
    firstName: isString,
    lastName: isString,
    age: isNumber,
    spouse: OneOf([guard, isNull]),
  }));

  expectType<Guard<Person>>(isPerson);

  testEach(
    isPerson,
    "{ firstName: string; lastName: string; age: number, spouse: Person | null }",
    [
      [true, { firstName: "Jane", lastName: "Doe", age: 23, spouse: null }],
      [
        true,
        {
          firstName: "Jane",
          lastName: "Doe",
          age: 23,
          spouse: { firstName: "Jon", lastName: "Doe", age: 23, spouse: null },
        },
      ],
      [false, { firstName: "Jane", lastName: "Doe", age: "23" }],
      [false, { brand: "Toyota", engine: 1.8 }],
      [false, ["Jane Doe", "23"]],
      [false, []],
      [false, ["10", true]],
      [false, [10, true]],
      [false, null],
      [false, 10],
      [false, "10"],
      [false, true],
    ]
  );
});

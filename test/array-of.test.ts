import type { Guard } from "../src/";
import { expect } from "chai";
import { testGuard } from "./tools";
import RecursiveError from "../src/recursive-error";
import { ArrayOf, isString, isNumber, isNull } from "../src";

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
  testGuard<Guard<string[]>>("string[]")(guard)
    .pass(["Victor", "Elena", "Maria"])
    .pass([])
    .fail(["Victor", 12, "Maria"])
    .fail({ brand: "Toyota", engine: 1.8 })
    .fail(["10", true])
    .fail([10, true])
    .fail(null)
    .fail(10)
    .fail("10")
    .fail(true);
});

describe("NamesOrId: (string| number)[]", () => {
  const guard = ArrayOf([isString, isNumber]);
  testGuard<Guard<(string | number)[]>>("(string| number)[]")(guard)
    .pass(["Victor", "Elena", "Maria"])
    .pass([])
    .pass(["Victor", 12, "Maria"])
    .fail({ brand: "Toyota", engine: 1.8 })
    .fail(["10", true])
    .fail([10, true])
    .fail(null)
    .fail(10)
    .fail("10")
    .fail(true);
});

describe("FullNames: (string | FullNames)[]", () => {
  type FullNames = (string | FullNames)[];
  const guard = ArrayOf<FullNames>((self) => [isString, self]);
  testGuard<Guard<FullNames>>("(string | FullNames)[]")(guard)
    .pass(["Victor", "Elena", "Maria"])
    .pass([])
    .pass(["Victor", ["Elena", "Maria"]])
    .fail(["Victor", 12, "Maria"])
    .fail({ brand: "Toyota", engine: 1.8 })
    .fail(["10", true])
    .fail([10, true])
    .fail(null)
    .fail(10)
    .fail("10")
    .fail(true);
});

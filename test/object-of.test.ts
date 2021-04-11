import ObjectOf from "../src/object-of";
import isString from "../src/is-string";
import isNumber from "../src/is-number";
import { expectType } from "tsd";
import { testEach } from "./tools";

describe("Person: { firstName: string; lastName: string; age: number }", () => {
  const isPerson = ObjectOf({
    firstName: isString,
    lastName: isString,
    age: isNumber,
  });
  expectType<
    (a: unknown) => a is { firstName: string; lastName: string; age: number }
  >(isPerson);

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

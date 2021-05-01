import type { Guard } from "../src/types";
import { expectType } from "tsd";
import { testEach } from "./tools";

import RecordOf from "../src/record-of";
import isNumber from "../src/is-number";

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

import { expectType } from "tsd";
import ValueOf from "../src/value-of";
import { testEach } from "./tools";

describe('Currency: "USD" | "EUR" | "GBP" ', () => {
  const isCurrency = ValueOf(["USD", "EUR", "GBP"] as const);

  expectType<(a: unknown) => a is "USD" | "EUR" | "GBP">(isCurrency);

  testEach(isCurrency, '"USD" | "EUR" | "GBP"', [
    [true, "USD"],
    [true, "USD"],
    [true, "GBP"],
    [false, "CAD"],
    [false, "JPY"],
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

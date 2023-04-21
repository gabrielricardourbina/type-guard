import type { Guard } from "../src/index.js";
import { testGuard } from "./tools.js";
import { isNumber } from "../src/index.js";

describe("number", () => {
  testGuard<Guard<number>>("number")(isNumber)
    .pass(12)
    .pass(-12)
    .pass(0)
    .pass(-0)
    .pass(Infinity)
    .pass(-Infinity)
    .pass(NaN)
    .fail(new Number(12))
    .fail({ name: "John Doe", age: 18 })
    .fail([10, true])
    .fail(null)
    .fail("10")
    .fail(true);
});

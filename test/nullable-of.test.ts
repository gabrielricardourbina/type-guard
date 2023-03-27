import type { Guard } from "../src/";
import { testGuard } from "./tools";
import { isNumber, NullableOf } from "../src";

describe("number | null", () => {
  const isNullableNumber = NullableOf(isNumber);
  testGuard<Guard<number | null>>("number | null")(isNullableNumber)
    .pass(123)
    .pass(null)
    .fail(new Boolean(true))
    .fail({ name: "John Doe", age: 18 })
    .fail([10, true])
    .fail(undefined)
    .fail("10");
});

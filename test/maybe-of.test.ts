import type { Guard } from "../src/";
import { testGuard } from "./tools";
import { isNumber, MaybeOf } from "../src";

describe("number | undefined", () => {
  const isMaybeNumber = MaybeOf(isNumber);
  testGuard<Guard<number | undefined>>("number | undefined")(isMaybeNumber)
    .pass(123)
    .pass(undefined)
    .fail(new Boolean(true))
    .fail({ name: "John Doe", age: 18 })
    .fail([10, true])
    .fail(null)
    .fail("10");
});

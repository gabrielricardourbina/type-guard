import type { Guard } from "../src/";
import { testGuard } from "./tools";
import { isBoolean } from "../src";

describe("boolean", () => {
  testGuard<Guard<boolean>>("boolean")(isBoolean)
    .pass(true)
    .pass(false)
    .fail(new Boolean(true))
    .fail({ name: "John Doe", age: 18 })
    .fail([10, true])
    .fail(null)
    .fail("10")
    .fail(10);
});

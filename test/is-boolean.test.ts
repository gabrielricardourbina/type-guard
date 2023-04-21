import type { Guard } from "../src/index.js";
import { testGuard } from "./tools.js";
import { isBoolean } from "../src/index.js";

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

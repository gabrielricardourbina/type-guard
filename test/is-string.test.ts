import type { Guard } from "../src/index.js";
import { testGuard } from "./tools.js";
import { isString } from "../src/index.js";

describe("string", () => {
  testGuard<Guard<string>>("string")(isString)
    .pass("John Doe")
    .pass("")
    .pass("\u0000")
    .fail(new String(""))
    .fail({ name: "John Doe", age: 18 })
    .fail([10, true])
    .fail(null)
    .fail(10)
    .fail(true);
});

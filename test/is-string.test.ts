import type { Guard } from "../src/";
import { testGuard } from "./tools";
import { isString } from "../src";

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

import type { Guard } from "../src/";
import { testGuard } from "./tools";
import { isNull } from "../src";

describe("null", () => {
  testGuard<Guard<null>>("null")(isNull)
    .pass(null)
    .fail("John Doe")
    .fail("")
    .fail("\u0000")
    .fail(new String(""))
    .fail({ name: "John Doe", age: 18 })
    .fail([10, true])
    .fail(10)
    .fail(true);
});

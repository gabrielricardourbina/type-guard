import type { Guard } from "../src/";
import { testGuard } from "./tools";
import { isArray } from "../src";

describe("Array of any: any[]", () => {
  testGuard<Guard<any[] | readonly any[]>>("any[]")(isArray)
    .pass(["John Doe", "Oliver King", "Pedro Perez"])
    .pass([12, "Oliver King", true])
    .pass([])
    .fail("John Doe")
    .fail({ name: "John Doe", age: 18 })
    .fail(null)
    .fail(10)
    .fail(true);
});

import type { Guard } from "../src/index.js";
import { testGuard } from "./tools.js";
import { isObject } from "../src/index.js";

describe("object {}", () => {
  testGuard<Guard<{ [K in any]?: unknown }>>("object {}")(isObject)
    .pass({})
    .pass({ name: "Jon Snow" })
    .pass({ amount: 123 })
    .pass({ name: "John Doe", age: 18 })
    .fail(new String(""))
    .fail(new Number(""))
    .fail([10, true])
    .fail(Object.create(null))
    .fail(null)
    .fail(10)
    .fail("10")
    .fail(true);
});

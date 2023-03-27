import type { Guard } from "../src/";
import { testGuard } from "./tools";
import { InstanceOf } from "../src";

describe("Date", () => {
  const guard = InstanceOf([Date]);
  testGuard<Guard<Date>>("Date")(guard)
    .pass(new Date())
    .pass(new Date(0))
    .fail(new Object())
    .fail(["10", true])
    .fail([10, true])
    .fail(null)
    .fail(10)
    .fail("10")
    .fail(true);
});

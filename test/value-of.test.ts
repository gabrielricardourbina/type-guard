import type { Guard } from "../src";
import { testGuard } from "./tools";
import { ValueOf } from "../src";

describe('Currency: "USD" | "EUR" | "GBP" ', () => {
  const isCurrency = ValueOf(["USD", "EUR", "GBP"]);

  testGuard<Guard<"USD" | "EUR" | "GBP">>('"USD" | "EUR" | "GBP"')(isCurrency)
    .pass("USD")
    .pass("USD")
    .pass("GBP")
    .fail("CAD")
    .fail("JPY")
    .fail({ brand: "Toyota", engine: 1.8 })
    .fail(["Jane Doe", "23"])
    .fail([])
    .fail(["10", true])
    .fail([10, true])
    .fail(null)
    .fail(10)
    .fail("10")
    .fail(true);
});

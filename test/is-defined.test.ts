import type { Guard } from "../src/index.js";
import { testGuard, expectExactType } from "./tools.js";
import { isDefined } from "../src/index.js";

describe("Defined: {} | null", () => {
  const str: string | undefined = "hola" as any;
  const nil: null | undefined = null as any;
  const num: number | undefined = 12 as any;
  const fn: (() => void) | undefined = (() => {}) as any;
  const arr: any[] | undefined = [1, 2, 3] as any;
  const obj: Record<string, number> | undefined = { test: 12 } as any;
  const unk: unknown = undefined as any;

  if (isDefined(str)) expectExactType<string>()(str);
  if (isDefined(nil)) expectExactType<null>()(nil);
  if (isDefined(unk)) expectExactType<{} | null>()(unk);
  if (isDefined(num)) expectExactType<number>()(num);
  if (isDefined(fn)) expectExactType<() => void>()(fn);
  if (isDefined(arr)) expectExactType<any[]>()(arr);
  if (isDefined(obj)) expectExactType<Record<string, number>>()(obj);

  testGuard<Guard<{} | null>>("{} | null")(isDefined)
    .pass(["John Doe", "Oliver King", "Pedro Perez"])
    .pass([12, "Oliver King", true])
    .pass([])
    .pass("John Doe")
    .pass({ name: "John Doe", age: 18 })
    .pass(null)
    .pass(10)
    .pass(true)
    .pass(false)
    .pass(() => {})
    .fail(undefined);
});

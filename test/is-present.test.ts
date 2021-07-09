import type { Guard } from "../src/";
import { testGuard, expectExactType } from "./tools";
import { isPresent } from "../src";

describe("Present: {}", () => {
  const str: string | undefined | null = "hola" as any;
  const num: number | undefined | null = 12 as any;
  const fn: (() => void) | undefined | null = (() => {}) as any;
  const arr: any[] | undefined | null = [1, 2, 3] as any;
  const obj: { test: number } | undefined | null = { test: 12 } as any;
  const rec: { [k: string]: number } | undefined | null = { test: 12 } as any;
  const unk: unknown = undefined;

  if (isPresent(unk)) expectExactType<{}>()(unk);
  if (isPresent(str)) expectExactType<string>()(str);
  if (isPresent(num)) expectExactType<number>()(num);
  if (isPresent(fn)) expectExactType<() => void>()(fn);
  if (isPresent(arr)) expectExactType<any[]>()(arr);
  if (isPresent(obj)) expectExactType<{ test: number }>()(obj);
  if (isPresent(rec)) expectExactType<{ [k: string]: number }>()(rec);

  testGuard<Guard<{}>>("{}")(isPresent)
    .pass(["John Doe", "Oliver King", "Pedro Perez"])
    .pass([12, "Oliver King", true])
    .pass([])
    .pass("John Doe")
    .pass({ name: "John Doe", age: 18 })
    .pass(10)
    .pass(true)
    .pass(false)
    .pass(() => {})
    .fail(undefined)
    .fail(null);
});

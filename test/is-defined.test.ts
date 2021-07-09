import type { Guard } from "../src/types";
import { expectType } from "tsd";
import { testEach } from "./tools";
import isDefined from "../src/is-defined";

describe("Defined: {} | null", () => {
  expectType<Guard<{} | null>>(isDefined);

  const str: string | undefined = "hola" as any;
  const nil: null | undefined = null as any;
  const num: number | undefined = 12 as any;
  const fn: (() => void) | undefined = (() => {}) as any;
  const arr: any[] | undefined = [1, 2, 3] as any;
  const obj: Record<string, number> | undefined = { test: 12 } as any;
  const unk: unknown = undefined as any;

  if (isDefined(str)) expectType<string>(str);
  if (isDefined(nil)) expectType<null>(nil);
  if (isDefined(unk)) expectType<{} | null>(unk);
  if (isDefined(num)) expectType<number>(num);
  if (isDefined(fn)) expectType<() => void>(fn);
  if (isDefined(arr)) expectType<any[]>(arr);
  if (isDefined(obj)) expectType<Record<string, number>>(obj);

  testEach(isDefined, "{} | null", [
    [true, ["John Doe", "Oliver King", "Pedro Perez"]],
    [true, [12, "Oliver King", true]],
    [true, []],
    [true, "John Doe"],
    [true, { name: "John Doe", age: 18 }],
    [true, null],
    [true, 10],
    [true, true],
    [true, false],
    [true, () => {}],
    [false, undefined],
  ]);
});

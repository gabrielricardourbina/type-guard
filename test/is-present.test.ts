import type { Guard } from "../src/types";
import { expectType } from "tsd";
import { testEach } from "./tools";
import isPresent from "../src/is-present";

describe("Present: {}", () => {
  expectType<Guard<{}>>(isPresent);
  const str: string | undefined | null = "hola" as any;
  const num: number | undefined | null = 12 as any;
  const fn: (() => void) | undefined | null = (() => {}) as any;
  const arr: any[] | undefined | null = [1, 2, 3] as any;
  const obj: { test: number } | undefined | null = { test: 12 } as any;
  const rec: { [k: string]: number } | undefined | null = { test: 12 } as any;
  const unk: unknown = undefined;

  if (isPresent(unk)) expectType<{}>(unk);
  if (isPresent(str)) expectType<string>(str);
  if (isPresent(num)) expectType<number>(num);
  if (isPresent(fn)) expectType<() => void>(fn);
  if (isPresent(arr)) expectType<any[]>(arr);
  if (isPresent(obj)) expectType<{ test: number }>(obj);
  if (isPresent(rec)) expectType<{ [k: string]: number }>(rec);

  testEach(isPresent, "{}", [
    [true, ["John Doe", "Oliver King", "Pedro Perez"]],
    [true, [12, "Oliver King", true]],
    [true, []],
    [true, "John Doe"],
    [true, { name: "John Doe", age: 18 }],
    [true, 10],
    [true, true],
    [true, false],
    [true, () => {}],
    [false, undefined],
    [false, null],
  ]);
});

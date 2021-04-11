import { expect } from "chai";

export const testEach = <T>(
  guard: (v: unknown) => v is T,
  type: string,
  table: Array<[boolean, unknown]>
) =>
  table.forEach(([expected, value]) =>
    it(`${JSON.stringify(value)} is ${expected ? "" : "not "}${type}`, () =>
      expect(guard(value)).to.equal(expected))
  );

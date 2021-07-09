import { expect } from "chai";
import type { Guard, TypeOfGuard } from "../src";

declare const nonExactType: unique symbol;
type Exactly<A, B> = {
  [nonExactType]: never;
};
export const testGuard =
  <G extends Guard<any, any>>(type: string) =>
  <H extends G>(guard: G extends H ? G : Exactly<G, H>) => {
    const self = {
      pass: (value: TypeOfGuard<G>) => {
        it(`${JSON.stringify(value)} is ${type}`, () =>
          expect((guard as G)(value)).to.equal(true));
        return self;
      },
      fail: <T>(value: T extends TypeOfGuard<G> ? never : T) => {
        it(`${JSON.stringify(value)} is not ${type}`, () =>
          expect((guard as G)(value)).to.equal(false));
        return self;
      },
    };
    return self;
  };

export const expectExactType =
  <B>() =>
  <A extends B>(b: B extends A ? B : Exactly<A, B>) =>
    b;

import { expect } from 'chai';

declare type Guard<T> = (v: unknown) => v is T;

export const TypeChecker = <T>(guard: Guard<T>, name: string) => ({
	passes: (value: unknown) => it(`is ${name}: ${JSON.stringify(value)}`, (): T => {
		if (!guard(value)) expect.fail();
		return value;
	}),
	fails: (value: unknown) => it(`is not ${name}: ${JSON.stringify(value)}`, () => {
		if (guard(value)) expect.fail();
	})

});
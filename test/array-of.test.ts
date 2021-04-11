import ArrayOf from "../src/array-of";
import isString from "../src/is-string";
import { expectType } from 'tsd';
import { testEach } from "./tools";

describe('Names: string[]', () => {
	const guard = ArrayOf(isString);
	expectType<(a: unknown) => a is string[]>(guard);

	testEach(guard, "string[]", [
		[true, ["Victor", "Elena", "Maria"]],
		[true, []],
		[false, ["Victor", 12, "Maria"]],
		[false, { brand: "Toyota", engine: 1.8 }],
		[false, ["10", true]],
		[false, [10, true]],
		[false, null],
		[false, 10],
		[false, "10"],
		[false, true],
	])
});


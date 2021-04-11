import TupleOf from "../src/tuple-of";
import isString from "../src/is-string";
import isNumber from "../src/is-number";
import { expectType } from "tsd";
import { testEach } from "./tools";

describe('Person: [string, number] ', () => {
	const isPersonTuple = TupleOf([isString, isNumber]);
	expectType<(a: unknown) => a is [string, number]>(isPersonTuple);

	testEach(isPersonTuple,"[string, number]", [[true, ["Jane Doe", 24]],
	[true, ["Jane Doe", 23, true]],
	[false, { brand: "Toyota", engine: 1.8 }],
	[false, ["Jane Doe", "23"]],
	[false, []],
	[false, ["10", true]],
	[false, [10, true]],
	[false, null],
	[false, 10],
	[false, "10"],
	[false, true],])
});


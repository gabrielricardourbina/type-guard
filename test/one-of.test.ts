import OneOf from "../src/one-of";
import isString from "../src/is-string";
import isNumber from "../src/is-number";
import { TypeChecker } from "./tools";

describe('Grade: string | number', () => {
	type Grade = string | number;
	const { passes, fails } = TypeChecker<Grade>(OneOf([isString, isNumber]), "Grade");

	passes(10);
	passes("A+");
	fails({ value: 10 });
	fails([]);
	fails([10, true]);
	fails(null);
	fails(true);
});


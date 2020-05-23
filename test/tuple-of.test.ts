import TupleOf from "../src/tuple-of";
import isString from "../src/is-string";
import isNumber from "../src/is-number";
import { TypeChecker } from "./tools";

describe('Person: [string, number] ', () => {
	type Person = [string, number];
	const { passes, fails } = TypeChecker<Person>(TupleOf([isString, isNumber]), "Person");

	passes(["Jane Doe", 24]);
	passes(["Jane Doe", 23, true]);
	fails({ brand: "Toyota", engine: 1.8 });
	fails(["Jane Doe", "23"]);
	fails([]);
	fails(["10", true]);
	fails([10, true]);
	fails(null);
	fails(10);
	fails("10");
	fails(true);
});


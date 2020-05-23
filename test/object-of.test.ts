import ObjectOf from "../src/object-of";
import isString from "../src/is-string";
import isNumber from "../src/is-number";
import { TypeChecker } from "./tools";

describe('Person: { firstName: string; lastName: string; age: number }', () => {
	type Person = { firstName: string; lastName: string; age: number };
	const { passes, fails } = TypeChecker<Person>(ObjectOf({ firstName: isString, lastName: isString, age: isNumber }), "Person");

	passes({ "firstName": "Jane", "lastName": "Doe", "age": 23 });
	passes({ "firstName": "Jane", "lastName": "Doe", "age": 23, "spouse": "Jon Doe" });
	fails({ "firstName": "Jane", "lastName": "Doe", "age": "23" });
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


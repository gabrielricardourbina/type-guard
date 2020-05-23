import RecordOf from "../src/record-of";
import isNumber from "../src/is-number";
import { TypeChecker } from "./tools";

describe('Grades: { [name: string]: number }', () => {
	type Grades = { [name: string]: number }
	
	const { passes, fails } = TypeChecker<Grades>(RecordOf(isNumber), "Grades");

	passes({ "Jane Doe": 9, "Jon Snow": 10 });
	passes({ });
	fails([]);
	fails([1,2,3,4]);
	fails({ "Jane Doe": 9, "Jon Snow": "A+" });
	fails({ brand: "Toyota", engine: 1.8 });
	fails(["Jane Doe", "23"]);
	fails(["10", true]);
	fails([10, true]);
	fails(null);
	fails(10);
	fails("10");
	fails(true);
});


import isArray from "../src/is-array";
import { TypeChecker } from "./tools";

describe('Array<any>', () => {
	const { passes, fails } = TypeChecker<any[]>(isArray, "Array<any>");

	passes(["John Doe", "Oliver King", "Pedro Perez"]);
	passes([12, "Oliver King", true]);
	passes([]);
	fails("John Doe");
	fails({ name: "John Doe", age: 18 });
	fails(null);
	fails(10);
	fails(true);
});


import ArrayOf from "../src/array-of";
import isString from "../src/is-string";
import { TypeChecker } from "./tools";

describe('Names: string[]', () => {
	type Names = string[];
	const { passes, fails } = TypeChecker<Names>(ArrayOf(isString), "Names");

	passes(["Victor", "Elena", "Maria"]);
	passes([]);
	fails(["Victor", 12, "Maria"]);
	fails({ brand: "Toyota", engine: 1.8 });
	fails(["10", true]);
	fails([10, true]);
	fails(null);
	fails(10);
	fails("10");
	fails(true);
});


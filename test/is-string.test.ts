import isString from "../src/is-string";
import { TypeChecker } from "./tools";

describe('string', () => {
	const { passes, fails } = TypeChecker<string>(isString, "string");

	passes("John Doe");
	passes("");
	passes("\u0000");
	fails(new String(""));
	fails({ name: "John Doe", age: 18 });
	fails([10, true]);
	fails(null);
	fails(10);
	fails(true);
});


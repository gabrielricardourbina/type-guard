import isBoolean from "../src/is-boolean";
import { TypeChecker } from "./tools";

describe('boolean', () => {
	const { passes, fails } = TypeChecker<boolean>(isBoolean, "boolean");

	passes(true);
	passes(false);
	fails(new Boolean(true));
	fails({ name: "John Doe", age: 18 });
	fails([10, true]);
	fails(null);
	fails("10");
	fails(10);
});


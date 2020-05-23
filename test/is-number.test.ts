import isNumber from "../src/is-number";
import { TypeChecker } from "./tools";

describe('number', () => {
	const { passes, fails } = TypeChecker<number>(isNumber, "number");

	passes(12);
	passes(-12);
	passes(0);
	passes(-0);
	passes(Infinity);
	passes(-Infinity);
	passes(NaN);
	fails(new Number(12));
	fails({ name: "John Doe", age: 18 });
	fails([10, true]);
	fails(null);
	fails("10");
	fails(true);
});


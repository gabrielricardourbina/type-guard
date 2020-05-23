import InstanceOf from "../src/instance-of";
import { TypeChecker } from "./tools";

describe('Date', () => {
	const { passes, fails } = TypeChecker<Date>(InstanceOf(Date), "a Date");

	passes(new Date());
	passes(new Date(0));
	fails(new Object());
	fails(["10", true]);
	fails([10, true]);
	fails(null);
	fails(10);
	fails("10");
	fails(true);
});


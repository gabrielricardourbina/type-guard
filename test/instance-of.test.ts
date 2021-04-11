import InstanceOf from "../src/instance-of";
import { expectType } from 'tsd';
import { testEach } from "./tools";

describe('Date', () => {
	const guard = InstanceOf(Date)
	expectType<(a: unknown) => a is Date>(guard);

	testEach(guard, "Date", [
		[true, new Date()],
		[true, new Date(0)],
		[false, new Object()],
		[false, ["10", true]],
		[false, [10, true]],
		[false, null],
		[false, 10],
		[false, "10"],
		[false, true],
	])
});


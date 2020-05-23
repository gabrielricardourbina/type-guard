import isObject from "../src/is-object";
import { TypeChecker } from "./tools";

describe('object {}', () => {
	const { passes, fails } = TypeChecker<{ [K in any]: any }>(isObject, "object {}");

	passes({});
	passes({ name: "Jon Snow"});
	passes({ amount: 123 });
	passes({ name: "John Doe", age: 18 });
	fails(new String(""));
	fails(new Number(""));
	fails(Object.create(null));
	fails([10, true]);
	fails(null);
	fails(10);
	fails("10");
	fails(true);
});


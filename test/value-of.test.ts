import { TypeChecker } from "./tools";
import ValueOf from '../src/value-of';

describe('Currency: "USD" | "EUR" | "GBP" ', () => {
	type Currency = "USD" | "EUR" | "GBP";
	const { passes, fails } = TypeChecker<Currency>(ValueOf(["USD", "EUR", "GBP"]), "Currency");

	passes( "USD");
	passes( "USD");
	passes( "GBP");
	fails( "CAD");
	fails( "JPY");
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


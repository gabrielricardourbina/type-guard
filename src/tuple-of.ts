import isArray from "./is-array";

type Guard<T> = (v: unknown) => v is T

const TupleOf = <T extends [any, ...any[]]>(guards: { [K in keyof T]: Guard<T[K]> }) => {
	return (tuple: unknown): tuple is T => {
		return isArray(tuple) && guards.every((guard, i) => guard(tuple[i]));
	};
};

export default TupleOf;


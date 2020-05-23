type Guard<T> = (v: unknown) => v is T

function OneOf<G extends [Guard<any>, ...Guard<any>[]] >(guards: G): Guard<G extends Array<Guard<infer P>> ? P: never>;
function OneOf<T>(guards: Array<T extends any ? Guard<T>: never>): Guard<T>;
function OneOf<T>(guards: Array<T extends any ? Guard<T>: never>) {
	return (value: unknown): value is T => {
		return guards.some((guard) => guard(value));
	};
};

export default OneOf;




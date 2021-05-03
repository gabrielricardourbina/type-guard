const ValueOf = <T>(expectedValues: readonly T[] | T[]) => {
	return (value: unknown): value is T => {
		return expectedValues.some(expected => value === expected);
	};
};

export default ValueOf;

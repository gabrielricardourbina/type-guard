const ValueOf = <T>(expectedValues: Array<T>) => {
	return (value: unknown): value is T => {
		return expectedValues.some(expected => value === expected);
	};
};

export default ValueOf;

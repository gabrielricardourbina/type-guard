/**
 * @category Guard Factory
 * @return a Guard that checks if a value is **identical** to one of the values passed
 * @example
 * ```typescript
 *   const isCurrency = ValueOf(["USD", "EUR", "GBP"] as const);
 * ```
 */
const ValueOf = <T>(expectedValues: readonly T[] | T[]) => {
	return (value: unknown): value is T => {
		return expectedValues.some(expected => value === expected);
	};
};

export default ValueOf;

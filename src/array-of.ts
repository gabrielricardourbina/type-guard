import isArray from "./is-array";

const ArrayOf= <T>(type: (v: unknown) => v is T) => {
	return (arr: unknown): arr is Array<T> => {
		return isArray(arr) && arr.every((v) => type(v));
	};
};

export default ArrayOf;
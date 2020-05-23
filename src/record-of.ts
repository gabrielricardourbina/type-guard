import isObject from "./is-object";

const RecordOf = <T>(type: (v: unknown) => v is T) => {
	return (rec: unknown): rec is { [k: string]: T} => {
		return isObject(rec) && 
			Object.values(rec).every((v) => type(v));
	};
};

export default RecordOf;
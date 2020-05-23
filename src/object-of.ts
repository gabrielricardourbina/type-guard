import isObject from "./is-object";

type Guard<T> = (v: unknown) => v is T

const ObjectOf = <T extends { [K in keyof T]: any }>(guards: { [K in keyof T]: Guard<T[K]> }) => {
	return (obj: unknown): obj is T => {
		return isObject(obj) && Object.keys(guards).every((key) => guards[key as keyof T](obj[key]));
	};
};

export default ObjectOf;
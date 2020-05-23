const isString = (str: unknown): str is string => typeof str === "string";

export default isString;

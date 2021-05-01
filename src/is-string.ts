import type { Guard } from "./types";

const isString: Guard<string> = (str: unknown): str is string => typeof str === "string";

export default isString;

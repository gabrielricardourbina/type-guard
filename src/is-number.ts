import type { Guard } from "./types";

const isNumber: Guard<number> =  (num: unknown): num is number => typeof num === "number";

export default isNumber;
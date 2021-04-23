import type { Guard } from "./types";

const isArray: Guard<any[] | readonly any[]> = (arr: unknown): arr is any[] | readonly any[]  => Array.isArray(arr);

export default isArray;
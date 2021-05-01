import type { Guard } from "./types";

const isBoolean: Guard<boolean> = (bool: unknown): bool is boolean => typeof bool === "boolean";

export default isBoolean;

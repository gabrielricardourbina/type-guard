const isBoolean = (bool: unknown): bool is boolean => typeof bool === "boolean";

export default isBoolean;
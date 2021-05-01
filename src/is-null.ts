import type { Guard } from "./types";

const isNull: Guard<null> = (v: unknown): v is null => v === null;

export default isNull;

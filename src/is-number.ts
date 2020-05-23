const isNumber =  (num: unknown): num is number => typeof num === "number";

export default isNumber;
const isArray = (arr: unknown): arr is Array<any> => Array.isArray(arr);

export default isArray;
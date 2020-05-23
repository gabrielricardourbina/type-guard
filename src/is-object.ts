const isObject = (obj: unknown): obj is { [K in any]: any } => 
	obj instanceof Object && 
	Object === Object.getPrototypeOf(obj).constructor;

export default isObject;

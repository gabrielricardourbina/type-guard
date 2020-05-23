const InstanceOf = <T>(constructor: new (...args: any[]) => T) => {
	return (obj: unknown): obj is T => {
		return obj instanceof constructor;
	};
};

export default InstanceOf;

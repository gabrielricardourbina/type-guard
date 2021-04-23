interface ObjectConstructor {
  entries<T>(o: T): [keyof T, T[keyof T]][];
}

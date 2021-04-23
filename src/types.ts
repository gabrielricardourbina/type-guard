export type Guard<T extends V, V = unknown> = (v: V) => v is T;

export type TypeOfGuard<G extends Guard<any>> = G extends Guard<infer P> ? P : never 
export type Guard<T extends S, S = unknown> = {
  <V extends S>(v: V): v is V extends T? V: never;
  optional?: boolean;
};

export type OptionalGuard<T extends S, S = unknown> = {
  <V extends S>(v: V): v is V extends T? V: never;
  optional: true;
};

export type TypeOfGuard<G extends Guard<any>> = G extends Guard<infer P>
  ? P
  : never;

export type Maybe<T> = T | undefined;
export type Nullable<T> = T | null;

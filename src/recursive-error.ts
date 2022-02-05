/**
 * @internal
 */
export default class RecursiveError extends ReferenceError {
  static assert<T>(iif: (forbidCall: <Qe extends (...args: any[]) => any>(qe: Qe) => Qe) => T): T {
    const proxyHandler: ProxyHandler<() => any> = {
      apply() {
        throw new RecursiveError();
      },
    };
    
    const result = iif((fn) => new Proxy<typeof fn>(fn, proxyHandler));
    delete proxyHandler.apply;
    return result;
  }
  constructor() {
    super(
      "Cannot call the 'self' guard inside the constructor function when using the recursive mode"
    );
  }
}

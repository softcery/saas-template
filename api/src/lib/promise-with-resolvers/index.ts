export interface PromiseWithResolvers<T> {
  promise: Promise<T>;
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (reason?: any) => void;
}

export const withResolvers = <T>(): PromiseWithResolvers<T> => {
  let resolve: (value: T | PromiseLike<T>) => void;
  let reject: (reason?: any) => void;

  const promiseWithResolvers = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return {
    promise: promiseWithResolvers,
    resolve: resolve,
    reject: reject,
  };
};

import {
  inject,
  InjectionToken,
  InjectOptions,
  Provider,
  Type,
} from '@angular/core';

export interface InjectFn<T> {
  (): T;

  (options: InjectOptions & { optional?: false }): T;

  (options: InjectOptions & { optional?: true }): T | null;
}

export interface ProvideFn<T> {
  (value: T): Provider;

  (deps: Array<Type<any>>, factory: (...args: any[]) => T): Provider;
}

export type InjectionTokenCreatorReturn<T> = [
  InjectFn<T>,
  ProvideFn<T>,
  InjectionToken<T>
];

export const createInjectionToken = <T>(
  description: string
): InjectionTokenCreatorReturn<T> => {
  const token = new InjectionToken<T>(description);

  const provideFn = (
    valueOrDeps: T | Array<Type<any>>,
    factory?: (...args: any[]) => T
  ) => {
    if (factory) {
      return {
        provide: token,
        useFactory: factory,
        deps: valueOrDeps as Array<Type<any>>,
      };
    }

    return { provide: token, useValue: valueOrDeps as T };
  }

  const injectFn = (options: InjectOptions = {}) => {
    return inject(token, options);
  }

  return [injectFn as InjectFn<T>, provideFn, token];
}

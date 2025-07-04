import 'reflect-metadata';

import {
    container,
    ValueProvider,
    FactoryProvider,
    TokenProvider,
    ClassProvider,
} from 'tsyringe';

import {
    Injectable,
    InjectableType,
} from './types';

import dependencies from './dependencies';

function registerDependency(dependency: Injectable): void {
  const actions: {
    [K in InjectableType]: () => void
  } = {
    'constructor': () => container.register<any>(
        dependency.token,
        dependency.provider as any,
        dependency.options,
    ),
    'ValueProvider': () => container.register<any>(
        dependency.token,
        dependency.provider as ValueProvider<any>
    ),
    'FactoryProvider': () => container.register<any>(
        dependency.token,
        dependency.provider as FactoryProvider<any>,
    ),
    'TokenProvider': () => container.register<any>(
        dependency.token,
        dependency.provider as TokenProvider<any>,
        dependency.options,
    ),
    'ClassProvider': () => container.register<any>(
        dependency.token,
        dependency.provider as ClassProvider<any>,
        dependency.options,
    ),
  };

  actions[dependency.type]();
}

dependencies?.forEach(registerDependency);

export * from './types';
export * from 'tsyringe';

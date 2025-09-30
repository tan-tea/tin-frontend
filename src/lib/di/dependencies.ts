import { Injectable, } from './types';

import { instanceCachingFactory, Lifecycle, } from 'tsyringe';

import { CommandHandlers, } from 'contexts/shared/infrastructure/CommandHandlers';
import { MemoryCommandBus, } from 'contexts/shared/infrastructure/MemoryCommandBus';
import { HttpUserRepository, } from 'contexts/user/infrastructure/HttpUserRepository';
import { HttpAuthRepository, } from 'contexts/auth/infrastructure/HttpAuthRepository';
import { AuthCommandHandler, } from 'contexts/auth/application/command/AuthCommandHandler';
import { ExchangeCodeCommandHandler, } from 'contexts/auth/application/command/ExchangeCodeCommandHandler';

export default [
    {
        token: 'AuthRepository',
        provider: {
            useFactory: () => new HttpAuthRepository(),
        },
        type: 'FactoryProvider',
        options: {
            lifecycle: Lifecycle.Transient,
        },
    },
    {
        token: 'UserRepository',
        provider: {
            useFactory: () => new HttpUserRepository(),
        },
        type: 'FactoryProvider',
        options: {
            lifecycle: Lifecycle.Transient,
        },
    },
    {
        token: 'CommandHandler',
        provider: {
            useFactory: (c) => new AuthCommandHandler(
                c.resolve('AuthRepository'),
            ),
        },
        type: 'FactoryProvider',
        options: {
            lifecycle: Lifecycle.Transient,
        },
    },
    {
        token: 'CommandHandler',
        provider: {
            useFactory: (c) => new ExchangeCodeCommandHandler(
                c.resolve('AuthRepository'),
            ),
        },
        type: 'FactoryProvider',
        options: {
            lifecycle: Lifecycle.Transient,
        },
    },
    {
        token: 'CommandHandlers',
        provider: {
            useFactory: instanceCachingFactory(
                (c) => new CommandHandlers(c.resolveAll('CommandHandler')),
            ),
        },
        type: 'FactoryProvider',
        options: {
            lifecycle: Lifecycle.Singleton,
        },
    },
    {
        token: 'CommandBus',
        provider: {
            useFactory: instanceCachingFactory(
                (c) => new MemoryCommandBus(c.resolve('CommandHandlers')),
            ),
        },
        type: 'FactoryProvider',
        options: {
            lifecycle: Lifecycle.Singleton,
        },
    },
] as Array<Injectable>;

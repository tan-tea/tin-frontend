import { Injectable, } from './types';

import { Lifecycle, } from 'tsyringe';

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
            // useClass: HttpAuthRepository,
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
            // useClass: HttpUserRepository,
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
            // useClass: AuthCommandHandler,
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
            // useClass: ExchangeCodeCommandHandler,
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
            useFactory: (c) => new CommandHandlers(
                c.resolveAll('CommandHandler'),
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
            // useClass: MemoryCommandBus,
            useFactory: (c) => new MemoryCommandBus(
                c.resolve('CommandHandlers'),
            ),
        },
        type: 'FactoryProvider',
        options: {
            lifecycle: Lifecycle.Singleton,
        },
    },
] as Array<Injectable>;

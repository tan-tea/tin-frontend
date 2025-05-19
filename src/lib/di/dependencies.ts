import { Injectable, } from './types';

import { Lifecycle, } from 'tsyringe';

import { RestDiscordClient, } from 'contexts/shared/infrastructure/external/RestDiscordClient';
import { FetchHttpRepository, } from 'contexts/shared/infrastructure/repositories/FetchHttpRepository';
import { HttpAuthRepository, } from 'contexts/auth/infrastructure/HttpAuthRepository';
import { HttpUserRepository, } from 'contexts/user/infrastructure/HttpUserRepository';

export default [
    {
        token: 'DiscordClient',
        provider: {
            useClass: RestDiscordClient,
        },
        type: 'ClassProvider',
        options: {
            lifecycle: Lifecycle.Transient,
        },
    },
    {
        token: 'HttpRepository',
        provider: {
            useClass: FetchHttpRepository,
        },
        type: 'ClassProvider',
        options: {
            lifecycle: Lifecycle.Transient,
        },
    },
    {
        token: 'AuthRepository',
        provider: {
            useClass: HttpAuthRepository,
        },
        type: 'ClassProvider',
        options: {
            lifecycle: Lifecycle.Transient,
        },
    },
    {
        token: 'UserRepository',
        provider: {
            useClass: HttpUserRepository,
        },
        type: 'ClassProvider',
        options: {
            lifecycle: Lifecycle.Transient,
        },
    },
] as Array<Injectable>;

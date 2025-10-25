import {
    Lifecycle,
    instanceCachingFactory,
} from 'tsyringe';
import { createServerClient } from '@supabase/ssr';

import { CommandHandlers, } from 'contexts/shared/infrastructure/CommandHandlers';
import { MemoryCommandBus, } from 'contexts/shared/infrastructure/MemoryCommandBus';
import { QueryHandlers } from 'contexts/shared/infrastructure/QueryBus/QueryHandlers';
import { InMemoryQueryBus } from 'contexts/shared/infrastructure/QueryBus/InMemoryQueryBus';
import { HttpAuthRepository, } from 'contexts/auth/infrastructure/HttpAuthRepository';
import { AuthCommandHandler, } from 'contexts/auth/application/command/AuthCommandHandler';
import { ExchangeCodeCommandHandler, } from 'contexts/auth/application/command/ExchangeCodeCommandHandler';
import { SupabaseWorkspaceRepository } from 'contexts/wm/workspace/infrastructure/persistence/SupabaseWorkspaceRepository';
import { GetWorkspaceByIdQueryHandler } from 'contexts/wm/workspace/application/query/GetWorkspaceByIdQueryHandler';
import { SupabaseShopRepository } from 'contexts/vm/shop/infrastructure/persistence/SupabaseShopRepository';
import { GetShopsByWorkspaceIdQueryHandler } from 'contexts/vm/shop/application/query/GetShopsByWorkspaceIdQueryHandler';
import { SupabaseCategoryRepository } from 'contexts/wm/category/infrastructure/persistence/SupabaseCategoryRepository';
import { GetCategoriesByWorkspaceIdQueryHandler } from 'contexts/wm/category/application/query/GetCategoriesByWorkspaceIdQueryHandler';
import { SupabaseOfferRepository } from 'contexts/vm/offer/infrastructure/persistence/SupabaseOfferRepository';
import { GetOffersByShopIdQueryHandler } from 'contexts/vm/offer/application/query/GetOffersByShopIdQueryHandler';

import type { Injectable, } from './types';

export default [
    {
        token: 'Supabase',
        provider: {
            useFactory: instanceCachingFactory(
               () => createServerClient(
                    process.env.NEXT_PUBLIC_SUPABASE_URL!,
                    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
                    {
                        cookies: {
                            getAll: () => [],
                            setAll: () => {},
                        },
                    },
                ),
            ),
        },
        type: 'FactoryProvider',
        options: { lifecycle: Lifecycle.Singleton, },
    },
    {
        token: 'WorkspaceRepository',
        provider: {
            useFactory: instanceCachingFactory(
                (container) => new SupabaseWorkspaceRepository(
                    container.resolve('Supabase'),
                ),
            ),
        },
        type: 'FactoryProvider',
        options: { lifecycle: Lifecycle.Singleton, },
    },
    {
        token: 'ShopRepository',
        provider: {
            useFactory: instanceCachingFactory(
                (container) => new SupabaseShopRepository(
                    container.resolve('Supabase'),
                ),
            ),
        },
        type: 'FactoryProvider',
        options: { lifecycle: Lifecycle.Singleton, },
    },
    {
        token: 'CategoryRepository',
        provider: {
            useFactory: instanceCachingFactory(
                (container) => new SupabaseCategoryRepository(
                    container.resolve('Supabase'),
                ),
            ),
        },
        type: 'FactoryProvider',
        options: { lifecycle: Lifecycle.Singleton, },
    },
    {
        token: 'OfferRepository',
        provider: {
            useFactory: instanceCachingFactory(
                (container) => new SupabaseOfferRepository(
                    container.resolve('Supabase'),
                ),
            ),
        },
        type: 'FactoryProvider',
        options: { lifecycle: Lifecycle.Singleton, },
    },
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
        options: { lifecycle: Lifecycle.Singleton, },
    },
    {
        token: 'QueryHandler',
        provider: {
            useFactory: (container) => new GetWorkspaceByIdQueryHandler(
                container.resolve('WorkspaceRepository'),
            ),
        },
        type: 'FactoryProvider',
        options: { lifecycle: Lifecycle.Transient, },
    },
    {
        token: 'QueryHandler',
        provider: {
            useFactory: (container) => new GetShopsByWorkspaceIdQueryHandler(
                container.resolve('ShopRepository'),
            ),
        },
        type: 'FactoryProvider',
        options: { lifecycle: Lifecycle.Transient, },
    },
    {
        token: 'QueryHandler',
        provider: {
            useFactory: (container) => new GetCategoriesByWorkspaceIdQueryHandler(
                container.resolve('CategoryRepository'),
            ),
        },
        type: 'FactoryProvider',
        options: { lifecycle: Lifecycle.Transient, },
    },
    {
        token: 'QueryHandler',
        provider: {
            useFactory: (container) => new GetOffersByShopIdQueryHandler(
                container.resolve('OfferRepository'),
            ),
        },
        type: 'FactoryProvider',
        options: { lifecycle: Lifecycle.Transient, },
    },
	{
		token: 'QueryHandlers',
		provider: {
			useFactory: instanceCachingFactory(
				(container) => new QueryHandlers(
                    container.resolveAll('QueryHandler')
                ),
			),
		},
		type: 'FactoryProvider',
		options: { lifecycle: Lifecycle.Singleton },
	},
	{
		token: 'QueryBus',
		provider: {
			useFactory: instanceCachingFactory(
				(container) => new InMemoryQueryBus(
                    container.resolve('QueryHandlers')
                ),
			),
		},
		type: 'FactoryProvider',
		options: { lifecycle: Lifecycle.Singleton },
	},
] as Array<Injectable>;

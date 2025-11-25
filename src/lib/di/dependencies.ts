import {
    Lifecycle,
    instanceCachingFactory,
} from 'tsyringe';
import { createServerClient } from '@supabase/ssr';

import { CommandHandlers, } from 'contexts/shared/infrastructure/CommandBus/CommandHandlers';
import { InMemoryCommandBus } from 'contexts/shared/infrastructure/CommandBus/InMemoryCommandBus';
import { QueryHandlers } from 'contexts/shared/infrastructure/QueryBus/QueryHandlers';
import { InMemoryQueryBus } from 'contexts/shared/infrastructure/QueryBus/InMemoryQueryBus';
import { SupabaseWorkspaceRepository } from 'contexts/wm/workspace/infrastructure/persistence/SupabaseWorkspaceRepository';
import { GetWorkspaceByIdQueryHandler } from 'contexts/wm/workspace/application/query/GetWorkspaceByIdQueryHandler';
import { SupabaseShopRepository } from 'contexts/vm/shop/infrastructure/persistence/SupabaseShopRepository';
import { GetShopsByWorkspaceIdQueryHandler } from 'contexts/vm/shop/application/query/GetShopsByWorkspaceIdQueryHandler';
import { SupabaseCategoryRepository } from 'contexts/wm/category/infrastructure/persistence/SupabaseCategoryRepository';
import { GetCategoryByIdQueryHandler } from 'contexts/wm/category/application/query/GetCategoryByIdQueryHandler';
import { GetCategoriesByWorkspaceIdQueryHandler } from 'contexts/wm/category/application/query/GetCategoriesByWorkspaceIdQueryHandler';
import { SupabaseOfferRepository } from 'contexts/vm/offer/infrastructure/persistence/SupabaseOfferRepository';
import { GetOffersIdsQueryHandler } from 'contexts/vm/offer/application/query/GetOffersIdsQueryHandler';
import { GetOfferByIdQueryHandler } from 'contexts/vm/offer/application/query/GetOfferByIdQueryHandler';
import { GetOffersByShopIdQueryHandler } from 'contexts/vm/offer/application/query/GetOffersByShopIdQueryHandler';
import { SupabaseCustomizationRepository } from 'contexts/wm/customization/infrastructure/persistence/SupabaseCustomizationRepository';
import { GetCustomizationByWorkspaceIdQueryHandler } from 'contexts/wm/customization/application/query/GetCustomizationByWorkspaceIdQueryHandler';
import { GetCustomizationFullByWorkspaceIdQueryHandler } from 'contexts/wm/customization/application/query/GetCustomizationFullByWorkspaceIdQueryHandler';
import { SupabaseColorRepository } from 'contexts/wm/color/infrastructure/persistence/SupabaseColorRepository';
import { GetColorsByCustomizationIdQueryHandler } from 'contexts/wm/color/application/query/GetColorsByCustomizationIdQueryHandler';
import { SupabaseVariantRepository } from 'contexts/wm/variant/infrastructure/persistence/SupabaseVariantRepository';
import { GetVariantsByColorIdQueryHandler } from 'contexts/wm/variant/application/query/GetVariantsByColorIdQueryHandler';
import { SupabaseTypeRepository } from 'contexts/vm/type/infrastructure/persistence/SupabaseTypeRepository';
import { GetTypeByIdQueryHandler } from 'contexts/vm/type/application/query/GetTypeByIdQueryHandler';
import { SupabaseAttributeRepository } from 'contexts/vm/attribute/infrastructure/persistence/SupabaseAttributeRepository';
import { GetAttributesByTypeIdQueryHandler } from 'contexts/vm/attribute/application/query/GetAttributesByTypeIdQueryHandler';
import { SupabaseValueRepository } from 'contexts/vm/value/infrastructure/persistence/SupabaseValueRepository';
import { GetValuesByAttributeIdQueryHandler } from 'contexts/vm/value/application/query/GetValuesByAttributeIdQueryHandler';

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
        token: 'CustomizationRepository',
        provider: {
            useFactory: instanceCachingFactory(
                (container) => new SupabaseCustomizationRepository(
                    container.resolve('Supabase'),
                ),
            ),
        },
        type: 'FactoryProvider',
        options: { lifecycle: Lifecycle.Singleton, },
    },
    {
        token: 'ColorRepository',
        provider: {
            useFactory: instanceCachingFactory(
                (container) => new SupabaseColorRepository(
                    container.resolve('Supabase'),
                ),
            ),
        },
        type: 'FactoryProvider',
        options: { lifecycle: Lifecycle.Singleton, },
    },
    {
        token: 'VariantRepository',
        provider: {
            useFactory: instanceCachingFactory(
                (container) => new SupabaseVariantRepository(
                    container.resolve('Supabase'),
                ),
            ),
        },
        type: 'FactoryProvider',
        options: { lifecycle: Lifecycle.Singleton, },
    },
    {
        token: 'TypeRepository',
        provider: {
            useFactory: instanceCachingFactory(
                (container) => new SupabaseTypeRepository(
                    container.resolve('Supabase'),
                ),
            ),
        },
        type: 'FactoryProvider',
        options: { lifecycle: Lifecycle.Singleton, },
    },
    {
        token: 'AttributeRepository',
        provider: {
            useFactory: instanceCachingFactory(
                (container) => new SupabaseAttributeRepository(
                    container.resolve('Supabase'),
                ),
            ),
        },
        type: 'FactoryProvider',
        options: { lifecycle: Lifecycle.Singleton, },
    },
    {
        token: 'ValueRepository',
        provider: {
            useFactory: instanceCachingFactory(
                (container) => new SupabaseValueRepository(
                    container.resolve('Supabase'),
                ),
            ),
        },
        type: 'FactoryProvider',
        options: { lifecycle: Lifecycle.Singleton, },
    },
    {
        token: 'CommandHandlers',
        provider: {
            useFactory: instanceCachingFactory(
                (c) => new CommandHandlers(
                    c.resolveAll('CommandHandler')
                ),
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
                (c) => new InMemoryCommandBus(
                    c.resolve('CommandHandlers')
                ),
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
            useFactory: (container) => new GetCategoryByIdQueryHandler(
                container.resolve('CategoryRepository'),
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
            useFactory: (container) => new GetOffersIdsQueryHandler(
                container.resolve('OfferRepository'),
            ),
        },
        type: 'FactoryProvider',
        options: { lifecycle: Lifecycle.Transient, },
    },
    {
        token: 'QueryHandler',
        provider: {
            useFactory: (container) => new GetOfferByIdQueryHandler(
                container.resolve('OfferRepository'),
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
        token: 'QueryHandler',
        provider: {
            useFactory: (container) => new GetCustomizationByWorkspaceIdQueryHandler(
                container.resolve('CustomizationRepository'),
            ),
        },
        type: 'FactoryProvider',
        options: { lifecycle: Lifecycle.Transient, },
    },
    {
        token: 'QueryHandler',
        provider: {
            useFactory: (container) => new GetCustomizationFullByWorkspaceIdQueryHandler(
                container.resolve('CustomizationRepository'),
            ),
        },
        type: 'FactoryProvider',
        options: { lifecycle: Lifecycle.Transient, },
    },
    {
        token: 'QueryHandler',
        provider: {
            useFactory: (container) => new GetColorsByCustomizationIdQueryHandler(
                container.resolve('ColorRepository'),
            ),
        },
        type: 'FactoryProvider',
        options: { lifecycle: Lifecycle.Transient, },
    },
    {
        token: 'QueryHandler',
        provider: {
            useFactory: (container) => new GetVariantsByColorIdQueryHandler(
                container.resolve('VariantRepository'),
            ),
        },
        type: 'FactoryProvider',
        options: { lifecycle: Lifecycle.Transient, },
    },
    {
        token: 'QueryHandler',
        provider: {
            useFactory: (container) => new GetTypeByIdQueryHandler(
                container.resolve('TypeRepository'),
            ),
        },
        type: 'FactoryProvider',
        options: { lifecycle: Lifecycle.Transient, },
    },
    {
        token: 'QueryHandler',
        provider: {
            useFactory: (container) => new GetAttributesByTypeIdQueryHandler(
                container.resolve('AttributeRepository'),
            ),
        },
        type: 'FactoryProvider',
        options: { lifecycle: Lifecycle.Transient, },
    },
    {
        token: 'QueryHandler',
        provider: {
            useFactory: (container) => new GetValuesByAttributeIdQueryHandler(
                container.resolve('ValueRepository'),
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

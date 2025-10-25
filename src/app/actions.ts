'use server'

import 'reflect-metadata';

import { container } from 'tsyringe';

import type {
    Shop,
    Offer,
    Category,
} from 'shared/models';

import { QueryBus } from 'contexts/shared/domain/QueryBus';
import { GetWorkspaceByIdQuery } from 'contexts/wm/workspace/application/query/GetWorkspaceByIdQuery';
import { WorkspaceReadModel } from 'contexts/wm/workspace/application/query/read-model/WorkspaceReadModel';
import { GetShopsByWorkspaceIdQuery } from 'contexts/vm/shop/application/query/GetShopsByWorkspaceIdQuery';
import { ShopsReadModel } from 'contexts/vm/shop/application/query/read-model/ShopsReadModel';
import { GetCategoriesByWorkspaceIdQuery } from 'contexts/wm/category/application/query/GetCategoriesByWorkspaceIdQuery';
import { CategoriesReadModel } from 'contexts/wm/category/application/query/read-model/CategoriesReadModel';
import { GetOffersByShopIdQuery } from 'contexts/vm/offer/application/query/GetOffersByShopIdQuery';
import { OffersReadModel, } from 'contexts/vm/offer/application/query/read-model/OffersReadModel';

export async function getWorkspaceById(id: string): Promise<WorkspaceReadModel> {
    'use server'
    const queryBus = container.resolve<QueryBus>('QueryBus');

    const query = new GetWorkspaceByIdQuery(id);
    return await queryBus.ask<WorkspaceReadModel>(query);
}

export async function getShopsByWorkspaceId(workspaceId: string): Promise<Array<Shop>> {
    'use server'
    const queryBus = container.resolve<QueryBus>('QueryBus');

    const query = new GetShopsByWorkspaceIdQuery(workspaceId);
    const { shops } = await queryBus.ask<ShopsReadModel>(query);
    return shops.map(shop => ({ ...shop, }));
}

export async function getCategoriesByWorkspaceId(workspaceId: string): Promise<Array<Category>> {
    'use server'
    const queryBus = container.resolve<QueryBus>('QueryBus');

    const query = new GetCategoriesByWorkspaceIdQuery(workspaceId);
    const { categories } = await queryBus.ask<CategoriesReadModel>(query);
    return categories.map(category => ({ ...category }));
}

export async function getOffersByShopId(shopId: string): Promise<Array<Offer>> {
    'use server'
    const queryBus = container.resolve<QueryBus>('QueryBus');

    const query = new GetOffersByShopIdQuery(shopId);
    const { offers, } = await queryBus.ask<OffersReadModel>(query);
    return offers.map(offer => ({ ...offer, })); // TODO: create mapper.
}

export async function getWorkspaceWithShopsAndCategories(
    workspaceId: string,
    locale?: string
) {
    'use server'
    const [
        workspace,
        shops,
        categories,
    ] = await Promise.all([
        getWorkspaceById(workspaceId),
        getShopsByWorkspaceId(workspaceId),
        getCategoriesByWorkspaceId(workspaceId),
    ]);

    return {
        ...workspace,
        shops,
        categories,
    };
}

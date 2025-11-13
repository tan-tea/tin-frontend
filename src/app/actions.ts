'use server'

import 'reflect-metadata';

import 'lib/di';

import { container } from 'tsyringe';

import type {
    Shop,
    Offer,
    Category,
    Variant,
    Color,
    Customization,
    Type,
    Attribute,
    Value,
} from 'shared/models';

import { QueryBus } from 'contexts/shared/domain/QueryBus';
import { GetWorkspaceByIdQuery } from 'contexts/wm/workspace/application/query/GetWorkspaceByIdQuery';
import { WorkspaceReadModel } from 'contexts/wm/workspace/application/query/read-model/WorkspaceReadModel';
import { GetShopsByWorkspaceIdQuery } from 'contexts/vm/shop/application/query/GetShopsByWorkspaceIdQuery';
import { ShopsReadModel } from 'contexts/vm/shop/application/query/read-model/ShopsReadModel';
import { GetCategoriesByWorkspaceIdQuery } from 'contexts/wm/category/application/query/GetCategoriesByWorkspaceIdQuery';
import { CategoriesReadModel } from 'contexts/wm/category/application/query/read-model/CategoriesReadModel';
import { GetOfferByIdQuery } from 'contexts/vm/offer/application/query/GetOfferByIdQuery';
import { GetOffersByShopIdQuery } from 'contexts/vm/offer/application/query/GetOffersByShopIdQuery';
import { OfferReadModel } from 'contexts/vm/offer/application/query/read-model/OfferReadModel';
import { OffersReadModel, } from 'contexts/vm/offer/application/query/read-model/OffersReadModel';
import { GetVariantsByColorIdQuery } from 'contexts/wm/variant/application/query/GetVariantsByColorIdQuery';
import { VariantsReadModel } from 'contexts/wm/variant/application/query/read-model/VariantsReadModel';
import { GetColorsByCustomizationIdQuery } from 'contexts/wm/color/application/query/GetColorsByCustomizationIdQuery';
import { ColorsReadModel } from 'contexts/wm/color/application/query/read-model/ColorsReadModel';
import { GetCustomizationByWorkspaceIdQuery } from 'contexts/wm/customization/application/query/GetCustomizationByWorkspaceIdQuery';
import { CustomizationReadModel } from 'contexts/wm/customization/application/query/read-model/CustomizationReadModel';
import { GetCustomizationFullByWorkspaceIdQuery } from 'contexts/wm/customization/application/query/GetCustomizationFullByWorkspaceIdQuery';
import { GetTypeByIdQuery } from 'contexts/vm/type/application/query/GetTypeByIdQuery';
import { TypeReadModel } from 'contexts/vm/type/application/query/read-model/TypeReadModel';
import { GetAttributesByTypeIdQuery } from 'contexts/vm/attribute/application/query/GetAttributesByTypeIdQuery';
import { AttributesReadModel } from 'contexts/vm/attribute/application/query/read-model/AttributesReadModel';
import { GetValuesByAttributeIdQuery } from 'contexts/vm/value/application/query/GetValuesByAttributeIdQuery';
import { ValuesReadModel } from 'contexts/vm/value/application/query/read-model/ValuesReadModel';
import { GetCategoryByIdQuery } from 'contexts/wm/category/application/query/GetCategoryByIdQuery';
import { CategoryReadModel } from 'contexts/wm/category/application/query/read-model/CategoryReadModel';
import { GetOffersIdsQuery } from 'contexts/vm/offer/application/query/GetOffersIdsQuery';
import { OffersIdsReadModel } from 'contexts/vm/offer/application/query/read-model/OffersIdsReadModel';

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

export async function getCategoriesByWorkspaceId(workspaceId: string, locale: string): Promise<Array<Category>> {
    'use server'
    const queryBus = container.resolve<QueryBus>('QueryBus');

    const query = new GetCategoriesByWorkspaceIdQuery(workspaceId, locale);
    const { categories } = await queryBus.ask<CategoriesReadModel>(query);
    return categories.map(category => ({ ...category }));
}

export async function getValuesByAttributeId(attributeId: string): Promise<Array<Value>> {
    'use server'
    const queryBus = container.resolve<QueryBus>('QueryBus');

    const query = new GetValuesByAttributeIdQuery(attributeId);
    const { values } = await queryBus.ask<ValuesReadModel>(query);
    return values.map(value => ({ ...value }));
}

export async function getAttributesByTypeId(typeId: string): Promise<Array<Attribute>> {
    'use server'
    const queryBus = container.resolve<QueryBus>('QueryBus');

    const query = new GetAttributesByTypeIdQuery(typeId);
    const { attributes, } = await queryBus.ask<AttributesReadModel>(query);
    return await Promise.all(
        attributes.map(async (attribute) => {
            const values = await getValuesByAttributeId(attribute.id);

            return {
                ...attribute,
                values,
            };
        }),
    );
}

export async function getTypeById(id: string): Promise<Type | null> {
    'use server'
    const queryBus = container.resolve<QueryBus>('QueryBus');

    const query = new GetTypeByIdQuery(id);
    const type = await queryBus.ask<TypeReadModel>(query);
    const attributes = await getAttributesByTypeId(type.id);

    return {
        ...type,
        attributes,
    }
}

export async function getCategoryById(id: string): Promise<Category | null> {
    'use server'
    const queryBus = container.resolve<QueryBus>('QueryBus');

    const query = new GetCategoryByIdQuery(id);
    const category = await queryBus.ask<CategoryReadModel>(query);

    return {
        ...category,
    }
}

export async function getOffersIds(): Promise<Array<Offer['id']>> {
    'use server'
    const queryBus = container.resolve<QueryBus>('QueryBus');

    const query = new GetOffersIdsQuery();
    const { offersIds, } = await queryBus.ask<OffersIdsReadModel>(query);

    return offersIds;
}

export async function getOfferById(id: string): Promise<Offer | null> {
    'use server'
    const queryBus = container.resolve<QueryBus>('QueryBus');

    const query = new GetOfferByIdQuery(id);
    const offer = await queryBus.ask<OfferReadModel>(query);
    const type = await getTypeById(offer.typeId);
    const category = await getCategoryById(offer.categoryId);

    return {
        ...offer,
        type,
        category,
    };
}

export async function getOffersByShopId(shopId: string): Promise<Array<Offer>> {
    'use server'
    const queryBus = container.resolve<QueryBus>('QueryBus');

    const query = new GetOffersByShopIdQuery(shopId);
    const { offers, } = await queryBus.ask<OffersReadModel>(query);

    return offers.map(o => ({
        ...o,
        type: null,
        category: null,
    }));
}

export async function getWorkspaceWithShopsAndCategories(
    workspaceId: string,
    locale: string
) {
    'use server'
    const [
        workspace,
        shops,
        categories,
    ] = await Promise.all([
        getWorkspaceById(workspaceId),
        getShopsByWorkspaceId(workspaceId),
        getCategoriesByWorkspaceId(workspaceId, locale),
    ]);

    return {
        ...workspace,
        shops,
        categories,
    };
}

export async function getVariantsByColorId(colorId: string): Promise<Array<Variant>> {
    'use server'
    const queryBus = container.resolve<QueryBus>('QueryBus');

    const query = new GetVariantsByColorIdQuery(colorId);
    const { variants, } = await queryBus.ask<VariantsReadModel>(query);
    return variants.map(variant => ({ ...variant, }));
}

export async function getColorsByCustomizationId(customizationId: string): Promise<Array<Color>> {
    'use server'
    const queryBus = container.resolve<QueryBus>('QueryBus');

    const query = new GetColorsByCustomizationIdQuery(customizationId);
    const { colors, } = await queryBus.ask<ColorsReadModel>(query);

    return await Promise.all(
        colors.map(async (color) => {
            const variants = await getVariantsByColorId(color?.id);

            return {
                ...color,
                variants,
            };
        })
    );
}

// TODO: use just one request for all customization data. This maybe cause performance issues.
export async function getCustomizationByWorkspaceId(workspaceId: string): Promise<Customization> {
    'use server'
    const queryBus = container.resolve<QueryBus>('QueryBus');

    const query = new GetCustomizationByWorkspaceIdQuery(workspaceId);
    const customization = await queryBus.ask<CustomizationReadModel>(query);
    const colors = await getColorsByCustomizationId(customization.id);

    return {
        ...customization,
        colors,
    };
}

export async function getCustomizationFullByWorkspaceId(workspaceId: string): Promise<Customization> {
    'use server'
    const queryBus = container.resolve<QueryBus>('QueryBus');

    const query = new GetCustomizationFullByWorkspaceIdQuery(workspaceId);
    const result = await queryBus.ask<any>(query);
    return result;
}

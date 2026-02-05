'use server'

import { Decimal } from 'decimal.js';

import { clientEnv } from 'env/client';

import {
    findCategoryBySlug,
    findVerifiedWorkspaceById,
    findCustomizationByWorkspaceId,
} from 'contexts/wm';
import {
    findOfferBySlug,
    findOffersByCategoryId,
    findOffersByCriteria,
    findOffersByShopId,
    findShopBySlugAndWorkspaceId,
    findVerifiedShopsByWorkspaceId,
} from 'contexts/vm';

export async function getVerifiedWorkspaceById(id: string) {
    'use server'

    return await findVerifiedWorkspaceById(id);
}

export async function getAllCustomizationByWorkspace(workspaceId: string) {
    'use server'

    return await findCustomizationByWorkspaceId(workspaceId);
}

export async function getShopDetailsBySlug(slug: string) {
    'use server'

    const shop = await findShopBySlugAndWorkspaceId(slug, clientEnv.NEXT_PUBLIC_WORKSPACE_ID);
    if (!shop) return null;

    return {
        ...shop,
        ...(shop?.geolocation && {
            geolocation: {
                ...shop.geolocation,
                latitude: Decimal(shop.geolocation.latitude).toNumber(),
                longitude: Decimal(shop.geolocation.longitude).toNumber(),
            },
        }),
    };
}

export async function getVerifiedShopsByWorkspace(workspaceId: string) {
    'use server'

    const shops = await findVerifiedShopsByWorkspaceId(workspaceId);
    return shops.map(shop => ({
        ...shop,
        geolocation: {
            ...shop.geolocation,
            latitude: Decimal(shop.geolocation.latitude).toNumber(),
            longitude: Decimal(shop.geolocation.longitude).toNumber(),
        },
    }));
}

export async function getOfferDetailsBySlug(slug: string) {
    'use server'

    const workspaceId = clientEnv.NEXT_PUBLIC_WORKSPACE_ID;
    const offer = await findOfferBySlug(slug);

    const outOfWorkspace = offer?.workspaceId !== workspaceId;
    if (outOfWorkspace) return null

    return offer;
}

export async function getOffersByShop(shopId: string, pagination: CursorPagination) {
    'use server'

    return await findOffersByShopId(shopId, pagination);
}

export async function getOffersByCategory(slug: string, pagination: CursorPagination) {
    'use server'

    return await findOffersByCategoryId(slug, pagination);
}

export async function getOffersByCriteria(query: string, shopId: string, pagination: CursorPagination) {
    'use server'

    return await findOffersByCriteria(query, shopId, pagination)
}

export async function getCategoryBySlug(slug: string) {
    'use server'
    try {
        const category = await findCategoryBySlug(slug);
        if (!category) return { status: 400, error: 'Cannot get category by slug' };

        return category;
    } catch (error) {
        console.error('Failed to get category by slug', error);

        return { status: 400, error: 'Failed to get category by slug' };
    }
}

'use server'

import 'server-only';

import {
    getWorkspaceById,
    getCustomizationByWorkspaceId,
} from 'lib/core/wm';
import {
    getOfferBySlug,
    getOffersByCriteria,
    getOffersByShopId,
    getOffersSlugByWorkspace,
    getShopBySlug,
    getShopsByWorkspaceId,
    getShopsSlugsByWorkspaceId,
    getCategoryWithOffersBySlug,
} from 'lib/core/vm';

export async function getWorkspaceDetailsById(id: string) {
    'use server'
    return await getWorkspaceById(id);
}

export async function getAllCustomizationByWorkspace(workspaceId: string) {
    'use server'
    return await getCustomizationByWorkspaceId(workspaceId);
}

export async function getShopsSlugsByWorkspace(workspaceId: string) {
    'use server'
    return await getShopsSlugsByWorkspaceId(workspaceId);
}

export async function getShopDetailsBySlug(slug: string) {
    'use server'
    return await getShopBySlug(slug);
}

export async function getShopsDetailsByWorkspace(workspaceId: string) {
    'use server'
    return await getShopsByWorkspaceId(workspaceId);
}

export async function getOffersSlugByWorkspaceId() {
    'use server'
    return await getOffersSlugByWorkspace();
}

export async function getOfferDetailsBySlug(slug: string) {
    'use server'
    return await getOfferBySlug(slug);
}

export async function getOffersByShop(shopId: string) {
    'use server'
    return await getOffersByShopId(shopId);
}

export async function getCategoryWithOffers(slug: string) {
    'use server'
    return await getCategoryWithOffersBySlug(slug);
}

export async function autocomplete(query: string, shopId: string, top?: number, skip?: number) {
    'use server'
    return await getOffersByCriteria(query, shopId, top, skip);
}

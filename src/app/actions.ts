'use server'

import { Decimal } from 'decimal.js';

import { getCustomizationByWorkspaceId } from 'lib/core/wm';
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

import { findVerifiedWorkspaceById } from 'contexts/wm';
import { findVerifiedShopsByWorkspaceId } from 'contexts/vm';

// ! NEW
export async function getVerifiedWorkspaceById(id: string) {
    'use server'
    return await findVerifiedWorkspaceById(id);
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

// ! NEW
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
    }))
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

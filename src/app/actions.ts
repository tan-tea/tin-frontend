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
    getShopsByWorkspaceId,
} from 'lib/core/vm';

import type {
    Shop,
    Offer,
    Category,
    Workspace,
    Customization,
} from 'shared/models';

export async function getWorkspaceDetailsById(id: string): Promise<Workspace> {
    'use server'
    return await getWorkspaceById(id);
}

export async function getAllCustomizationByWorkspace(workspaceId: string): Promise<Customization> {
    'use server'
    return await getCustomizationByWorkspaceId(workspaceId);
}

export async function getShopsByWorkspace(workspaceId: string): Promise<Array<Shop>> {
    'use server'
    return await getShopsByWorkspaceId(workspaceId);
}

export async function getOffersSlugByWorkspaceId() {
    'use server'
    return await getOffersSlugByWorkspace();
}

export async function getOfferDetailsBySlug(slug: string): Promise<Offer> {
    'use server'
    return await getOfferBySlug(slug);
}

export async function getOffersByShop(shopId: string): Promise<Array<Offer>> {
    'use server'
    return await getOffersByShopId(shopId);
}

export async function autocomplete(query: string): Promise<Array<Offer>> {
    'use server'
    return await getOffersByCriteria(query);
}

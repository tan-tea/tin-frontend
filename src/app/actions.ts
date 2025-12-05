'use server'

import 'server-only';

import {
    getWorkspaceById,
    getCustomizationByWorkspaceId,
} from 'lib/core/wm';
import {
    getOfferBySlug,
    getOffersByShopId,
    getOffersSlugByWorkspace,
} from 'lib/core/vm';

import type {
    Offer,
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

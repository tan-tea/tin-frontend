'use server'

import 'server-only';
import camelcaseKeys from 'camelcase-keys';

import { formatISO } from 'date-fns';

import { clientEnv } from 'env/client';

import type { Cache } from 'lib/core';
import {
    getCached,
    setCached,
} from 'lib/utils';
import { createClient, createStaticClient } from 'lib/supabase/server';

import type {
    Offer,
    Shop,
} from 'shared/models';

const offersCache = new Map<string, Cache<Offer>>();
const shopsCache = new Map<string, Cache<Shop>>();

function getCachedOfferBySlug(slug: string): Offer | null {
    return getCached(offersCache, slug);
}

function setCachedOfferBySlug(slug: string, data: Offer): void {
    return setCached(offersCache, slug, data);
}

async function getOfferBySlug(slug: string): Promise<Offer> {
    const cached = getCachedOfferBySlug(slug);
    if (cached) return cached;

    const supabase = await createClient();

    const now = formatISO(Date.now());

    const { data, error } = await supabase
        .from('offers')
        .select(`
            *,
            type:offer_types (
                *,
                attributes:offer_attributes (
                    *,
                    values:offer_attribute_values ( * )
                )
            ),
            category:categories ( * )
        `)
        .eq('slug', slug)
        .eq('is_active', true)
        .lte('start_date', now)
        .gte('end_date', now)
        .single();

    if (error && !data) throw new Error('Cannot get product id: ' + slug);

    const result = camelcaseKeys(data, { deep: true }) as Offer;

    setCachedOfferBySlug(slug, result);

    return result;
}

async function getOffersSlugByWorkspace(): Promise<Array<{ slug: string }>> {
    const supabase = createStaticClient();

    const now = formatISO(Date.now());

    const { data, error } = await supabase
        .from('offers')
        .select(`
            slug,
            shop:shops!inner ( workspace_id )
        `)
        .eq('shop.workspace_id', clientEnv.NEXT_PUBLIC_WORKSPACE_ID)
        .eq('is_active', true)
        .lte('start_date', now)
        .gte('end_date', now);

    if (error && !data) return [];

    return data.map(d => ({ slug: d.slug, }));
}

function getCachedDefaultShopByWorkspaceId(workspaceId: string): Shop | null {
    return getCached(shopsCache, workspaceId);
}

function setCachedDefaultShopByWorkspaceId(workspaceId: string, data: Shop): void {
    return setCached(shopsCache, workspaceId, data, 5);
}

async function getDefaultShopByWorkspaceId(workspaceId: string): Promise<Shop | null> {
    const cached = getCachedDefaultShopByWorkspaceId(workspaceId);
    if (cached) return cached;

    const supabase = await createClient();

    const { data, error } = await supabase
        .from('shops')
        .select('*')
        .eq('workspace_id', workspaceId)
        .eq('is_primary', true)
        .single()

    if (error && !data) return null;

    const result = camelcaseKeys(data, { deep: true });

    setCachedDefaultShopByWorkspaceId(workspaceId, result);

    return result;
}

function getCachedOffersByShopId(shopId: string): Array<Offer> | null {
    return getCached(offersCache, shopId);
}

function setCachedOffersByShopId(shopId: string, data: Array<Offer>): void {
    return setCached(offersCache, shopId, data, 10);
}

async function getOffersByShopId(shopId: string): Promise<Array<Offer>> {
    const cached = getCachedOffersByShopId(shopId);
    if (cached) return cached;

    const supabase = await createClient();

    const now = formatISO(new Date());

    const { data, error } = await supabase
        .from('offers')
        .select('*')
        .eq('shop_id', shopId)
        .lte('start_date', now)
        .gte('end_date', now)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

    if (error && !data) return [];

    const result = camelcaseKeys(data, { deep: true }) as Array<Offer>;

    setCachedOffersByShopId(shopId, result);

    return result;
}

export {
    getOfferBySlug,
    getOffersSlugByWorkspace,
    getDefaultShopByWorkspaceId,
    getOffersByShopId,
};

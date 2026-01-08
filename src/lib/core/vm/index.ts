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
    Shop,
    Offer,
    Category,
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
            category:categories ( * ),
            option_groups:offer_option_groups (
                *,
                group:option_groups (
                    *,
                    options ( * )
                )
            )
        `)
        .eq('slug', slug)
        .eq('is_active', true)
        .lte('start_date', now)
        .gte('end_date', now)
        .single();

    if (error && !data) {
        console.error('error', error);
        throw new Error('Cannot get product id: ' + slug);
    }

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

    if (error && !data) {
        console.error('error', error);
        return [];
    }

    return data.map(d => ({ slug: d.slug, }));
}

function getCachedOffersByShopId(shopId: string): Array<Offer> | null {
    return getCached(offersCache, shopId);
}

function setCachedOffersByShopId(shopId: string, data: Array<Offer>): void {
    return setCached(offersCache, shopId, data);
}

async function getOffersByShopId(shopId: string): Promise<Array<Offer>> {
    const cached = getCachedOffersByShopId(shopId);
    if (cached) return cached;

    const supabase = await createClient();

    const now = formatISO(new Date());

    const offersWithShopsQuery = supabase
        .from('offers')
        .select(`
            *,
            shops!inner!shop_offers (
                *
            )`
        )
        .eq('shops.id', shopId)
        .lte('start_date', now)
        .gte('end_date', now)
        .eq('is_active', true)
        .order('created_at', { ascending: true });

    const { data, error } = await offersWithShopsQuery;

    if (error) {
        console.error('error', error);
        return [];
    }

    const offersWithShops = camelcaseKeys(data, { deep: true }) as any as Array<Offer>;

    setCachedOffersByShopId(shopId, offersWithShops);

    return offersWithShops;
}

async function getOffersByCriteria(
    query: string,
    shopId: string,
    top: number = 10,
    skip: number = 0,
): Promise<Array<Offer>> {
    const supabase = await createClient();

    const now = formatISO(new Date());

    const { data, error } = await supabase
        .from('offers')
        .select(`
            id,
            title,
            description,
            slug
        `)
        .or(`title.ilike.%${query}%,description.ilike.%${query}%,slug.ilike.%${query}%`)
        .lte('start_date', now)
        .gte('end_date', now)
        .eq('is_active', true)
        .eq('shop_id', shopId)
        .range(skip, top);

    if (error && !data) {
        console.error('error', error);
        return [];
    }

    const result = camelcaseKeys(data, { deep: true }) as unknown as Array<Offer>;
    return result;
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

    if (error && !data) {
        console.error('error', error);
        return null;
    }

    const result = camelcaseKeys(data, { deep: true });

    setCachedDefaultShopByWorkspaceId(workspaceId, result);

    return result;
}

function getCachedShopsByWorkspaceId(workspaceId: string): Array<Shop> | null {
    return getCached(shopsCache, workspaceId);
}

function setCachedShopsByWorkspaceId(workspaceId: string, data: Array<Shop>): void {
    return setCached(shopsCache, workspaceId, data);
}

async function getShopsByWorkspaceId(workspaceId: string): Promise<Array<Shop>> {
    const cached = getCachedShopsByWorkspaceId(workspaceId);
    if (cached) return cached;

    const supabase = await createClient();

    const { data, error } = await supabase
        .from('shops')
        .select(`
            *,
            workspace:workspaces!workspace_id ( * ),
            address:addresses!address_id ( * ),
            geolocation:geolocations!geolocation_id ( * ),
            schedules:schedules!shop_id (
                *,
                timeSlots:schedule_time_slots!schedule_id ( * )
            )
        `)
        .eq('workspace_id', workspaceId);

    if (error && !data) {
        console.error('error', error);
        return []
    };

    const result = camelcaseKeys(data, { deep: true });

    setCachedShopsByWorkspaceId(workspaceId, result);

    return result;
}

async function getShopsSlugsByWorkspaceId(workspaceId: string): Promise<Array<string>> {
    const supabase = createStaticClient();

    const { data, error } = await supabase
        .from('shops')
        .select('slug')
        .eq('workspace_id', workspaceId);

    if (error && !data) {
        console.log('error', error);
        return [];
    }

    return data.map(s => s.slug);
}

function getCachedShopBySlug(slug: string): Shop | null {
    return getCached(shopsCache, slug);
}

function setCachedShopBySlug(slug: string, data: Shop): void {
    return setCached(shopsCache, slug, data);
}

async function getShopBySlug(slug: string): Promise<Shop> {
    const cached = getCachedShopBySlug(slug);
    if (cached) return cached;

    const supabase = await createClient();

    const { data, error } = await supabase
        .from('shops')
        .select(`
            *,
            workspace:workspaces!workspace_id ( * ),
            address:addresses!address_id ( * ),
            geolocation:geolocations!geolocation_id ( * ),
            schedules:schedules!shop_id (
                *,
                timeSlots:schedule_time_slots!schedule_id ( * )
            )
        `)
        .eq('slug', slug)
        .eq('workspace_id', clientEnv.NEXT_PUBLIC_WORKSPACE_ID)
        .single();

    if (error && !data) {
        console.log('error', error);
        throw new Error('Cannot get shop by slug: ' + slug);
    }

    const result = camelcaseKeys(data, { deep: true }) as Shop;

    setCachedShopBySlug(slug, result);

    return result;
}

async function getCategoryWithOffersBySlug(slug: string): Promise<Category> {
    const supabase = await createClient();

    const now = formatISO(new Date());

    const { data, error } = await supabase
        .from('categories')
        .select(`
            *,
            offers:offers ( * )
        `)
        .eq('slug', slug)
        .eq('workspace_id', clientEnv.NEXT_PUBLIC_WORKSPACE_ID)
        .lte('offers.start_date', now)
        .gte('offers.end_date', now)
        .eq('offers.is_active', true)
        .single();

    if (error && !data) {
        console.error('error', error);
        throw new Error('Cannot get category with offers by slug: ' + slug);
    }

    const result = camelcaseKeys(data, { deep: true }) as Category;
    return result;
}

export {
    getOfferBySlug,
    getOffersSlugByWorkspace,
    getDefaultShopByWorkspaceId,
    getOffersByShopId,
    getOffersByCriteria,
    getShopsByWorkspaceId,
    getShopsSlugsByWorkspaceId,
    getShopBySlug,
    getCategoryWithOffersBySlug,
};

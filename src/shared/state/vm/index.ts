import { atom } from 'jotai';
import { queryClientAtom } from 'jotai-tanstack-query';

import db from 'lib/db';

import {
    type Shop,
    type Offer,
    Cart,
} from 'shared/models';

import { workspaceAtom } from '../wm';

export const shopAtom = atom<Shop | null>(null);

export const cachedShopAtom = atom(
    null,
    async (get, set, shop: Shop) => {
        await db.table('shops').put({
            ...shop,
            id: 'current',
            _id: shop.id,
        });

        set(shopAtom, shop);

        const queryClient = get(queryClientAtom);
        queryClient.setQueryData(['shop-by-slug'], shop);
    },
);

export const currentShopAtom = atom(
    (get) => {
        const current = get(shopAtom);
        if(current) return current;

        const workspace = get(workspaceAtom);
        if (!workspace) return null;

        return workspace?.shops?.find(shop => shop?.isPrimary) || null;
    },
);

export const shopsAtom = atom<Array<Shop>>([]);

export const cachedShopsAtom = atom(
    null,
    async (get, set, shops: Array<Shop>) => {
        await db.table('shops').bulkPut(
            shops.map(shop => ({ ...shop, _id: shop.id })),
        );

        set(shopsAtom, shops);

        const queryClient = get(queryClientAtom);
        queryClient.setQueryData(['shops-by-workspace'], shops);
    },
);

export const offerAtom = atom<Offer | null>(null);

export const cachedOfferAtom = atom(
    null,
    async (get, set, offer: Offer) => {
        await db.table('offers').put({
            ...offer,
            id: 'current',
            _id: offer.id,
        });

        set(offerAtom, offer);

        const queryClient = get(queryClientAtom);
        queryClient.setQueryData(['offer-by-slug'], offer);
    },
);

export const offersAtom = atom<Array<Offer>>([]);

export const cachedOffersAtom = atom(
    null,
    async (get, set, offers: Array<Offer>) => {
        await db.table('offers').bulkPut(
            offers.map(offer => ({ ...offer, _id: offer.id })),
        );

        set(offersAtom, offers);

        const queryClient = get(queryClientAtom);
        queryClient.setQueryData(['offers-by-shop'], offers);
    },
);

import { atom } from 'jotai';
import { queryClientAtom } from 'jotai-tanstack-query';

import db from 'lib/db';

import type {
    Shop,
} from 'shared/models';

import { workspaceAtom } from '../wm';

export const shopBaseAtom = atom<Shop| null>(null);

export const shopAtom = atom(
    (get) => get(shopBaseAtom),
    (_, set, currentShop: Shop) => {
        set(shopBaseAtom, currentShop);
    },
);

export const loadShopAtom = atom(
    null,
    async (_, set) => {
        const stored = await db.table<Shop>('shops').get('current');
        if (stored) {
            set(shopBaseAtom, stored);
        }
    },
);

export const cachedShopAtom = atom(
    null,
    async (get, set, shop: Shop) => {
        await db.table('shops').put({
            ...shop,
            id: 'current',
            _id: shop.id,
        });

        set(shopBaseAtom, shop);

        const queryClient = get(queryClientAtom);
        queryClient.setQueryData(['shop-by-slug'], shop);
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

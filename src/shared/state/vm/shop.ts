import type { Shop } from 'shared/models';

import { atom } from 'jotai';
import { queryClientAtom } from 'jotai-tanstack-query';

import cache from 'lib/dexie';

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
        const stored = await cache.table<Shop>('shops').get('current');
        if (stored) set(shopBaseAtom, stored);
    },
);

export const cachedShopAtom = atom(
    null,
    async (get, set, shop: Shop) => {
        await cache.table('shops').put({
            ...shop,
            id: 'current',
            _id: shop.id,
        });

        set(shopBaseAtom, shop);

        const queryClient = get(queryClientAtom);
        queryClient.setQueryData(['shop-by-slug'], shop);
    },
);

export const shopsBaseAtom = atom<Array<Shop>>([]);

export const shopsAtom = atom(
    (get) => get(shopsBaseAtom),
    (_, set, shops: Array<Shop>) => {
        set(shopsBaseAtom, shops);
    },
);

export const loadShopsAtom = atom(
    null,
    async (_, set) => {
        const stored = await cache.table<Shop>('shops').toArray();
        if (stored && stored.length > 0) set(shopsBaseAtom, stored);
    }
)

export const cachedShopsAtom = atom(
    null,
    async (get, set, shops: Array<Shop>) => {
        await cache.table('shops').bulkPut(
            shops.map(shop => ({ ...shop, _id: shop.id })),
        );

        set(shopsBaseAtom, shops);

        const queryClient = get(queryClientAtom);
        queryClient.setQueryData(['shops-by-workspace'], shops);
    },
);

export const primaryShopAtom = atom((get) => {
    return get(shopsAtom).find(s => s.isPrimary);
});

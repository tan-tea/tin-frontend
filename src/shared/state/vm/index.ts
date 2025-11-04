import { atom } from 'jotai';

import type {
    Offer,
    Shop
} from 'shared/models';

import { workspaceAtom } from '../wm';

export const shopAtom = atom<Shop | null>(null);

export const currentShopAtom = atom(
    (get) => {
        const current = get(shopAtom);
        if(current) return current;

        const workspace = get(workspaceAtom);
        if (!workspace) return null;

        return workspace?.shops?.find(shop => shop?.isPrimary) || null;
    },
    (_, set, newShop: Shop) => {
        set(shopAtom, newShop);
    }
);

export const offersAtom = atom<Array<Offer>>([]);

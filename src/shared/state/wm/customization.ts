import { atom } from 'jotai';
import { queryClientAtom } from 'jotai-tanstack-query';

import cache from 'lib/dexie';

import type { Customization } from 'shared/models';

export const customizationBaseAtom = atom<Customization | null>(null);

export const customizationAtom = atom(
    (get) => get(customizationBaseAtom),
    (_, set, customization: Customization) => set(customizationBaseAtom, customization),
);

export const loadCustomizationAtom = atom(
    null,
    async (_, set) => {
        const stored = await cache.table<Customization>('customizations').get('current');
        if (stored) set(customizationBaseAtom, stored);
    },
);

export const cachedCustomizationAtom = atom(
    null,
    async (get, set, customization: Customization) => {
        await cache.table('customizations').put({
            ...customization,
            id: 'current',
            _id: customization.id,
        });

        set(customizationBaseAtom, customization);

        const queryClient = get(queryClientAtom);
        queryClient.setQueryData(['customization'], customization);
    },
);

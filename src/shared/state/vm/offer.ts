import { atom } from 'jotai';
import { queryClientAtom } from 'jotai-tanstack-query';

import cache from 'lib/dexie';

import type {
    Offer,
} from 'shared/models';

export const offerAtom = atom<Offer | null>(null);

export const cachedOfferAtom = atom(
    null,
    async (get, set, offer: Offer) => {
        await cache.table('offers').put({
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
        await cache.table('offers').bulkPut(
            offers.map(offer => ({ ...offer, _id: offer.id })),
        );

        set(offersAtom, offers);

        const queryClient = get(queryClientAtom);
        queryClient.setQueryData(['offers-by-shop'], offers);
    },
);

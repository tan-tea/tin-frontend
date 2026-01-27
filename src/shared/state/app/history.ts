import { atom } from 'jotai';
import { formatISO } from 'date-fns';
import { queryClientAtom } from 'jotai-tanstack-query';

import cache from 'lib/dexie';

import type { History } from 'shared/models';

export const historyBaseAtom = atom<Array<History>>([]);

export const historyAtom = atom(
    (get) => get(historyBaseAtom),
    (_, set, newHistory: Array<History>) => {
        set(historyBaseAtom, newHistory);
    },
);

export const loadHistoryAtom = atom(
    null,
    async (_, set) => {
        const stored = await cache.table<HiddenId<History>>('history').toArray();
        if (stored) {
            set(historyBaseAtom, stored);
        }
    }
)

export const cachedHistoryAtom = atom(
    null,
    async (get, set, history: Array<History>) => {
        await cache.table<HiddenId<History>>('history').bulkPut(
            history.map(h => ({
                ...h,
                _id: h.key,
                createdAt: formatISO(new Date()),
                modifiedAt: formatISO(new Date()),
            }),
        ));

        // TODO: improve performance?
        set(historyBaseAtom, history);

        const queryClient = get(queryClientAtom);
        queryClient.setQueryData(['history'], history);
    },
);

export const addToHistoryAtom = atom(
    null,
    (get, set, newHistoryItem: History) => {
        const currentHistory = get(historyAtom);

        set(cachedHistoryAtom, [
            ...currentHistory,
            newHistoryItem,
        ]);
    },
);

export const historyCountAtom = atom(async (get) => {
    const history = get(historyAtom);
    return history.length ?? 0;
});

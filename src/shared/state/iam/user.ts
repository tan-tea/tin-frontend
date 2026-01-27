import { atom } from 'jotai';
import { queryClientAtom } from 'jotai-tanstack-query';

import cache from 'lib/dexie';

import type { User } from 'shared/models';

export const userBaseAtom = atom<User>({
    id: 'anonymous',
    name: 'Anonymous',
    email: '',
    emailVerified: false,
    image: null,
    createdAt: new Date(),
    updatedAt: new Date(),
});

export const userAtom = atom(
    (get) => get(userBaseAtom),
    (_, set, user: User) => set(userBaseAtom, user),
);

export const loadUserAtom = atom(
    null,
    async (_, set) => {
        const stored = await cache.table<User>('users').get('current');
        if (stored) set(userBaseAtom, stored);
    },
);

export const cachedUserAtom = atom(
    null,
    async (get, set, user: User) => {
        await cache.table<HiddenId<User>>('users').put({
            ...user,
            id: 'current',
            _id: user.id,
        });

        set(userBaseAtom, user);

        const queryClient = get(queryClientAtom);
        queryClient.setQueryData(['user'], user);
    },
);

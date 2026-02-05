import type { Category } from 'shared/models';

import { atom, } from 'jotai';
import { queryClientAtom } from 'jotai-tanstack-query';

import cache from 'lib/dexie';

import { workspaceAtom } from './workspace';

export const categoryBaseAtom = atom<Category | null>(null);

export const categoryAtom = atom(
    (get) => get(categoryBaseAtom),
    (_, set, category: Category) => set(categoryBaseAtom, category),
);

export const loadCategoryAtom = atom(
    null,
    async (_, set) => {
        const stored = await cache.table<Category>('categories').get('current');
        if (stored) set(categoryBaseAtom, stored);
    },
);

export const cachedCategoryAtom = atom(
    null,
    async (get, set, category: Category) => {
        await cache.table('categories').put({
            ...category,
            id: 'current',
            _id: category.id,
        });

        set(categoryBaseAtom, category);

        const queryClient = get(queryClientAtom);
        queryClient.setQueryData(['category-by-slug'], category);
    },
);

export const categoriesAtom = atom<Array<Category>>((get) => {
    const workspace = get(workspaceAtom);

    if (!workspace || workspace.categories.length === 0) return [];

    return workspace.categories.sort((a, b) => a.position - b.position);
});


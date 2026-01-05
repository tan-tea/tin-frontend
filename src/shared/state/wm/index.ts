import { atom, } from 'jotai';
import { queryClientAtom } from 'jotai-tanstack-query';

import db from 'lib/db';

import type {
    Category,
    Workspace,
    Customization,
} from 'shared/models';

export const workspaceAtom = atom<Workspace | null>(null);

export const cachedWorkspaceAtom = atom(
    null,
    async (get, set, workspace: Workspace) => {
        await db.table('workspaces').put({
            ...workspace,
            id: 'current',
            _id: workspace.id,
        });

        set(workspaceAtom, workspace);

        const queryClient = get(queryClientAtom);
        queryClient.setQueryData(['workspace'], workspace);
    },
);

export const customizationAtom = atom<Customization | null>(null);

export const cachedCustomizationAtom = atom(
    null,
    async (get, set, customization: Customization) => {
        await db.table('customizations').put({
            ...customization,
            id: 'current',
            _id: customization.id,
        });

        set(customizationAtom, customization);

        const queryClient = get(queryClientAtom);
        queryClient.setQueryData(['customization'], customization);
    },
);

export const categoriesAtom = atom<Array<Category>>((get) => {
    const workspace = get(workspaceAtom);

    if (!workspace || workspace.categories.length === 0) return [];

    return workspace.categories.sort((a, b) => a.position - b.position);
});

export const categoryAtom = atom<Category | null>(null);

export const cachedCategoryAtom = atom(
    null,
    async (get, set, category: Category) => {
        await db.table('categories').put({
            ...category,
            id: 'current',
            _id: category.id,
        });

        set(categoryAtom, category);

        const queryClient = get(queryClientAtom);
        queryClient.setQueryData(['category-offers-by-slug'], category);
    }
)

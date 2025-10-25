'use client'

import { atom, } from 'jotai';

import { DATABASE_INSTANCE } from 'shared/contexts/database/constants';

import type {
    Shop,
    Workspace
} from 'shared/models';

export const workspaceAtom = atom<Workspace | null>(null);

export const hydratedWorkspaceAtom = atom(
    async (get) => {
        const current = get(workspaceAtom);
        if (current) return current;

        const saved = await DATABASE_INSTANCE.table('workspace').get('current');
        return saved ?? null;
    },
    async (_, set, next: Workspace) => {
        set(workspaceAtom, next);
        if (next) {
            await DATABASE_INSTANCE
                .table('workspace')
                .put({
                    ...next,
                    id: 'current',
                });
        } else {
            await DATABASE_INSTANCE
                .table('workspace')
                .clear();
        }
    },
);

export const currentShopAtom = atom<Shop | null>(
    (get) => {
        const workspace = get(workspaceAtom);
        if (!workspace) return null;

        return workspace?.shops?.find(shop => shop?.isPrimary) || null;
    }
);

export const currentCategoryAtom = atom<string | null>(null);

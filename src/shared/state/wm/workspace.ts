import { atom } from 'jotai';
import { queryClientAtom } from 'jotai-tanstack-query';

import db from 'lib/dexie';

import type { Workspace } from 'shared/models';

export const workspaceBaseAtom = atom<Workspace | null>(null);

export const workspaceAtom = atom(
    (get) => get(workspaceBaseAtom),
    (_, set, workspace: Workspace) => set(workspaceBaseAtom, workspace),
);

export const loadWorkspaceAtom = atom(
    null,
    async (_, set) => {
        const stored = await db.table<Workspace>('workspaces').get('current');
        if (stored) set(workspaceBaseAtom, stored);
    },
);

export const cachedWorkspaceAtom = atom(
    null,
    async (get, set, workspace: Workspace) => {
        await db.table('workspaces').put({
            ...workspace,
            id: 'current',
            _id: workspace.id,
        });

        set(workspaceBaseAtom, workspace);

        const queryClient = get(queryClientAtom);
        queryClient.setQueryData(['workspace'], workspace);
    },
);

export const workspaceTypeAtom = atom((get) => {
    return get(workspaceBaseAtom)?.segment.slug;
})

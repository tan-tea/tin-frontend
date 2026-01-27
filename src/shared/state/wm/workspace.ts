import type { Workspace } from 'shared/models';

import { atom } from 'jotai';
import { queryClientAtom } from 'jotai-tanstack-query';

import cache from 'lib/dexie';

export const workspaceBaseAtom = atom<Workspace | null>(null);

export const workspaceAtom = atom(
    (get) => get(workspaceBaseAtom),
    (_, set, workspace: Workspace) => set(workspaceBaseAtom, workspace),
);

export const loadWorkspaceAtom = atom(
    null,
    async (_, set) => {
        const stored = await cache.table<Workspace>('workspaces').get('current');
        if (stored) set(workspaceBaseAtom, stored);
    },
);

export const cachedWorkspaceAtom = atom(
    null,
    async (get, set, workspace: Workspace) => {
        await cache.table('workspaces').put({
            ...workspace,
            id: 'current',
            _id: workspace.id,
        });

        set(workspaceBaseAtom, workspace);

        const queryClient = get(queryClientAtom);
        queryClient.setQueryData(['workspace-by-id'], workspace);
    },
);

export const workspaceTypeAtom = atom((get) => {
    return get(workspaceBaseAtom)?.segment.slug;
})

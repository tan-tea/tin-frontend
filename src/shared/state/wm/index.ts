import { atom, } from 'jotai';

import { createClient } from 'lib/supabase/client';
import { DATABASE_INSTANCE } from 'shared/contexts/database/constants';
import { WorkspacePrimitives } from 'contexts/wm/workspace/domain/Workspace';

const supabase = createClient();

export const workspaceAtom = atom<WorkspacePrimitives | null>(null);

export const hydratedWorkspaceAtom = atom(
    async (get) => {
        const current = get(workspaceAtom);
        if (current) return current;

        const saved = await DATABASE_INSTANCE.table('workspace').get('current');
        return saved ?? null;
    },
    async (_, set, next: WorkspacePrimitives) => {
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

export const revalidateWorkspaceAtom = atom(null, async (_, set) => {
    const {
        data,
        error,
    } = await supabase
        .from('workspaces')
        .select(`
            *,
            shops ( * ),
            categories ( * )
        `)
        .eq('id', process.env.NEXT_PUBLIC_WORKSPACE_ID!)
        .single();

    if (!error && data) {
        set(hydratedWorkspaceAtom, data);
    }
});

export const currentShopAtom = atom<any | null>(null);

import { atom, } from 'jotai';

import type {
    Shop,
    Category,
    Workspace,
    Customization,
} from 'shared/models';

export const workspaceAtom = atom<Workspace | null>(null);

export const customizationAtom = atom<Customization | null>(null);

export const currentShopAtom = atom<Shop | null>(
    (get) => {
        const workspace = get(workspaceAtom);
        if (!workspace) return null;

        return workspace?.shops?.find(shop => shop?.isPrimary) || null;
    }
);

export const currentCategoryAtom = atom<Category | null>(null);

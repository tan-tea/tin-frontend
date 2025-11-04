import { atom, } from 'jotai';

import type {
    Category,
    Workspace,
    Customization,
} from 'shared/models';

export const workspaceAtom = atom<Workspace | null>(null);

export const customizationAtom = atom<Customization | null>(null);

export const currentCategoryAtom = atom<Category | null>(null);

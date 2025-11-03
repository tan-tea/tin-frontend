import { atom } from 'jotai';

import type {
    Offer
} from 'shared/models';

export const offersAtom = atom<Array<Offer>>([]);

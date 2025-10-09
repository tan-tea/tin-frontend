import {
    Atom,
    useAtom,
    useAtomValue,
    createStore,
} from 'jotai';
import {
    freezeAtom,
    selectAtom,
    splitAtom,
} from 'jotai/utils';
import { focusAtom, } from 'jotai-optics';

export const store = createStore();

export function useSelectAtom<A, S>(
    anAtom: Atom<A>,
    selector: (v: A, prev: S | undefined) => S,
    equalityFn?: ((a: S, b: S) => boolean),
) {
    const selectorAtom = selectAtom(
        anAtom,
        selector,
        equalityFn,
    );

    return useAtomValue(selectorAtom);
}

export function useFreezeAtom<T>(anAtom: Atom<T>) {
    return useAtom(freezeAtom(anAtom));
}

export function useSplitAtom<T = any>(anAtom: any) {
    return useAtom(splitAtom(anAtom));
}

export function useFocusAtom<T = any>(
    anAtom: any,
    keyFn: (optic: any) => any,
) {
    return useAtom(focusAtom(anAtom, keyFn));
}

import {
    useRef,
    useEffect,
    useCallback,
} from 'react';
import { PrimitiveAtom } from 'jotai';
import { useHydrateAtoms, useAtomCallback } from 'jotai/utils'

type Handler = <T>(
    values: [
        [PrimitiveAtom<T>, T]
    ],
) => void;

export const useHydrateAndSyncAtom: Handler = (values) => {
    useHydrateAtoms(values);

    const sync = useAtomCallback(
        useCallback((_, set) => {
            for (const [atom, value] of values) {
                set(atom, value);
            }
        }, [values]),
    );

    const isInitial = useRef<boolean>(true);

    useEffect(() => {
        if (isInitial.current) {
            isInitial.current = false;
        } else {
            sync();
        }
    }, [sync]);
}

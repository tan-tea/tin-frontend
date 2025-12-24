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

// TODO: review this, we shouldn't change or re-hydrate by this way, use another way directly changing or setting the atom value.
export const useHydrateAndSyncAtom: Handler = (values) => {
    const hydratedRef = useRef<boolean>(false);

    useHydrateAtoms(values, { dangerouslyForceHydrate: true, });

    const sync = useAtomCallback(
        useCallback((_, set) => {
            for (const [atom, value] of values) {
                set(atom, value);
            }
        }, [values]),
    );

    useEffect(() => {
        if (!hydratedRef.current) {
            hydratedRef.current = true;
            return;
        }

        sync();
    }, [sync, values]);
}

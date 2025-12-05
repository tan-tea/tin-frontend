import {
    useCallback,
    useMemo
} from 'react';
import {
    useAtomValue,
    useSetAtom,
    type PrimitiveAtom
} from 'jotai';

import type {
    CacheDatabaseTables
} from 'lib/db';

import { useDatabase } from 'shared/contexts/database';
import { millisecondsToMinutes } from 'date-fns';

type Timestamped<T> = T & {
    createdAt: number;
    updatedAt: number;
};

type UseCache<T> = {
    load: (key?: string, maxAge?: number) => Promise<T | null>;
    save: (
        item: T,
        key?: string
    ) => Promise<void>;
    saveMany: (items: T) => Promise<void>
    getAge: (key?: string) => Promise<number | null>;
};

export const useCache = <T>(
    entity: keyof CacheDatabaseTables,
    atom: PrimitiveAtom<T>,
): UseCache<T> => {
    'use memo'
    const setAtom = useSetAtom(atom);
    const atomValue = useAtomValue(atom);

    const { database } = useDatabase();

    const table = useMemo(
        () => database.table(entity),
        [database, entity,],
    );

    const load: UseCache<T>['load'] = useCallback(
        async (key, maxAge = 10) => {
            const age = await getAge(key);

            if (age === null || age >= maxAge) return null;

            const stored =  key
                ? await table.get(key)
                : await table.toArray();

            const result = stored ?? atomValue;

            setAtom(result);

            return result;
        },
        [table,],
    );


    const save: UseCache<T>['save'] = useCallback(
        async (item, key) => {
            const now = Date.now();

            const itemWithTimestamp: Timestamped<T> = {
                ...item,
                createdAt: now,
                updatedAt: now,
            };

            try {
                await table.put(itemWithTimestamp, key);
            } catch (e) {
                console.error(e);
            } finally {
                setAtom(item);
            }
        },
        [table,],
    );

    const saveMany: UseCache<T>['saveMany'] = useCallback(
        async (items) => {
            try {
                if (!Array.isArray(items)) return;

                await Promise.all(
                    items.map(item => save(item)),
                );
            } catch (e) {
                console.error(e);
            }
        },
        [table,],
    );

    const getAge: UseCache<T>['getAge'] = useCallback(
        async (key) => {
            if (!(entity in database)) return null;

            const item = (key
                ? await table.get(key)
                : (await table.toArray())?.[0]
            ) as Timestamped<T> | undefined

            if (!item || !item?.createdAt) return null;

            return millisecondsToMinutes(Date.now() - item?.createdAt);
        },
        [table,],
    );

    return {
        load,
        save,
        saveMany,
        getAge,
    };
}

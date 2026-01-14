import type { PrimitiveAtom } from 'jotai';

import {
    useMemo,
    useCallback,
} from 'react';
import { millisecondsToMinutes } from 'date-fns';

import type {
    CacheDatabaseTables
} from 'lib/dexie';

import { useDatabase } from 'shared/contexts/database';

type Timestamped<T> = T & {
    createdAt: number;
    updatedAt: number;
};

type HiddenId<T> = T & {
    _id?: string;
};

type Cache<T> = {
    load: (key?: string, maxAge?: number) => Promise<T | null>;
    loadMany: (maxAge?: number) => Promise<T | null>;
    save: (
        item: HiddenId<T>,
        key?: string
    ) => Promise<void>;
    saveMany: (items: HiddenId<T>) => Promise<void>
    getAge: (key?: string) => Promise<number | Array<number> | null>;
};

export const useCache = <T>(entity: keyof CacheDatabaseTables): Cache<T> => {
    'use memo'
    const database = useDatabase();

    const table = useMemo(
        () => database.current.table(entity),
        [database, entity,],
    );

    const load: Cache<T>['load'] = useCallback(
        async (key, maxAge = 10) => {
            const age = await getAge(key);
            if (Array.isArray(age)) {
                const someIsOutOfAge = age.some(a => a >= maxAge);
                if (someIsOutOfAge) return null;
            } else {
                if (age === null || age >= maxAge) return null;
            }

            const stored =  key
                ? await table.get(key)
                : await table.toArray();

            const result = stored;

            return result;
        },
        [table,],
    );

    const loadMany: Cache<T>['loadMany'] = useCallback(
        async (maxAge = 10) => load(undefined, maxAge),
        [table,],
    );

    const save: Cache<T>['save'] = useCallback(
        async (item, key) => {
            const now = Date.now();

            const primaryKey = key ?? item._id;

            const itemWithTimestamp: Timestamped<T> = {
                ...item,
                createdAt: now,
                updatedAt: now,
            };

            try {
                await table.put(itemWithTimestamp, primaryKey);
            } catch (e) {
                console.error(e);
            } finally {}
        },
        [table,],
    );

    const saveMany: Cache<T>['saveMany'] = useCallback(
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

    const getAge: Cache<T>['getAge'] = useCallback(
        async (key) => {
            const fromMillisecondsToMinutes = (timestamp: number) =>
                millisecondsToMinutes(Date.now() - timestamp);

            const items = (key
                ? await table.get(key)
                : await table.toArray()
            ) as Timestamped<T> | Array<Timestamped<T>>;

            const multipleItems = Array.isArray(items);
            if (multipleItems) {
                return items.map(item => fromMillisecondsToMinutes(item.createdAt));
            }

            if (!items || !items?.createdAt) return null;

            return fromMillisecondsToMinutes(items.createdAt);
        },
        [table,],
    );

    return {
        load,
        loadMany,
        save,
        saveMany,
        getAge,
    };
}

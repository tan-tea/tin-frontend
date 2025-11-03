import {
    useMemo,
    useCallback,
} from 'react';
import type { PromiseExtended } from 'dexie';

import db, {
    CacheDatabase,
    CacheDatabaseTables,
} from 'lib/db';

type Database = CacheDatabase;

type DatabaseContextState = {
    database: Database;
    get: <T extends keyof CacheDatabaseTables>(
        entity: T,
        key: Parameters<CacheDatabaseTables[T]['get']>[0],
    ) => PromiseExtended;
    add: <T extends keyof CacheDatabaseTables>(
        entity: T,
        item: Parameters<CacheDatabaseTables[T]['add']>[0],
        key?: Parameters<CacheDatabaseTables[T]['add']>[1],
    ) => PromiseExtended;
    put: <T extends keyof CacheDatabaseTables>(
        entity: T,
        item: Parameters<CacheDatabaseTables[T]['put']>[0],
        key?: Parameters<CacheDatabaseTables[T]['put']>[1],
    ) => PromiseExtended;
    count: <T extends keyof CacheDatabaseTables>(
        entity: T,
    ) => PromiseExtended;
    del: <T extends keyof CacheDatabaseTables>(
        entity: T,
        key: Parameters<CacheDatabaseTables[T]['delete']>[0],
    ) => PromiseExtended;
};

const useDatabaseContextState: () => DatabaseContextState = () => {
    const database = useMemo<Database>(
        () => db,
        [],
    );

    const get = useCallback(
        (entity, key) => database?.[entity]?.get?.(key),
        [database,],
    ) as DatabaseContextState['get'];

    const add = useCallback(
        (entity, item, key) => database?.[entity]?.add?.(item as any, key),
        [database,],
    ) as DatabaseContextState['add'];

    const put = useCallback(
        (entity, item, key) => database?.[entity]?.put?.(item as any, key),
        [database,],
    ) as DatabaseContextState['put'];

    const count = useCallback(
        (entity) => database?.[entity]?.count?.(),
        [database,],
    ) as DatabaseContextState['count'];

    const del = useCallback(
        (entity, key) => database?.[entity]?.delete?.(key!),
        [database,],
    ) as DatabaseContextState['del'];

    return {
        database,
        get,
        add,
        put,
        del,
        count,
    };
}

export default useDatabaseContextState;

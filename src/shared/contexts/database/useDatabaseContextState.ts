'use client'

import {
    useMemo,
    useEffect,
    useCallback,
} from 'react';
import {
    Dexie,
    EntityTable,
    PromiseExtended,
} from 'dexie';

import {
    User,
    History,
    Preferences,
} from 'contexts/shared/domain/models';

import { useContainer, } from 'shared/contexts/container';
import { DATABASE_INSTANCE, } from 'shared/contexts/database/constants';

type DatabaseEntities = {
    users: EntityTable<User, 'ID'>;
    preferences: EntityTable<Preferences, 'ID'>;
    history: EntityTable<History, 'key'>;
};

type Database = Dexie & DatabaseEntities;

type DatabaseContextState = {
    database: Database;
    get: <T extends keyof DatabaseEntities>(
        entity: T,
        key: Parameters<DatabaseEntities[T]['get']>[0],
    ) => PromiseExtended;
    add: <T extends keyof DatabaseEntities>(
        entity: T,
        item: Parameters<DatabaseEntities[T]['add']>[0],
        key?: Parameters<DatabaseEntities[T]['add']>[1],
    ) => PromiseExtended;
    put: <T extends keyof DatabaseEntities>(
        entity: T,
        item: Parameters<DatabaseEntities[T]['put']>[0],
        key?: Parameters<DatabaseEntities[T]['put']>[1],
    ) => PromiseExtended;
    count: <T extends keyof DatabaseEntities>(
        entity: T,
    ) => PromiseExtended;
    del: <T extends keyof DatabaseEntities>(
        entity: T,
        key: Parameters<DatabaseEntities[T]['delete']>[0],
    ) => PromiseExtended;
};

const useDatabaseContextState: () => DatabaseContextState = () => {
    const {
        registerDependency,
        isRegisteredDependency,
    } = useContainer();

    const database = useMemo<Database>(
        () => DATABASE_INSTANCE as Database,
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

    useEffect(() => {
        if (!isRegisteredDependency<Database>('database', true))
            registerDependency<Database>('database', { useValue: database, });
    }, [ database, registerDependency, isRegisteredDependency,]);

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

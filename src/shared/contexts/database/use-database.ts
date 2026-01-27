import type { RefObject } from 'react';

import {
    useRef,
    useEffect,
} from 'react';

import cache, {
    CacheDatabase,
} from 'lib/dexie';

type Database = CacheDatabase;

type DatabaseContextState = RefObject<Database>;

const useDatabaseContextState: () => DatabaseContextState = () => {
    const database = useRef<Database>(cache);

    useEffect(() => {
        if (!database.current) {
            database.current = cache;
        }
    }, []);

    return database;
}

export default useDatabaseContextState;

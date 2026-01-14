import type { RefObject } from 'react';

import {
    useRef,
    useEffect,
} from 'react';

import db, {
    CacheDatabase,
} from 'lib/dexie';

type Database = CacheDatabase;

type DatabaseContextState = RefObject<Database>;

const useDatabaseContextState: () => DatabaseContextState = () => {
    const database = useRef<Database>(db);

    useEffect(() => {
        if (!database.current) {
            database.current = db;
        }
    }, []);

    return database;
}

export default useDatabaseContextState;

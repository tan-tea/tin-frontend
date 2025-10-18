'use client'

import contextFactory from 'shared/contexts/contextFactory';
import useDatabaseContextState from 'shared/contexts/database/useDatabaseContextState';

const {
    Provider,
    useContext,
} = contextFactory(useDatabaseContextState);

export {
    Provider as DatabaseProvider,
    useContext as useDatabase,
};

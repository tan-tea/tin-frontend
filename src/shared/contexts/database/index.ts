import contextFactory from 'shared/contexts/contextFactory';
import contextState from 'shared/contexts/database/use-database';

const {
    Provider: DatabaseProvider,
    useContext: useDatabase,
} = contextFactory(contextState);

export {
    DatabaseProvider,
    useDatabase,
};

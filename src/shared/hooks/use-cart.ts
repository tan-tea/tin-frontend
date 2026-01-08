import { useCallback } from 'react';

import { useDatabase } from 'shared/contexts/database';

export function useCart() {
    const database = useDatabase();

    const addToCart = useCallback(
        async <T>(item: T) => {
            if (!database.current) return;

            await database.current.table('carts').put(item);
        },
        [database],
    );
}

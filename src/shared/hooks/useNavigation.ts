'use client'

import {
    useEffect,
    useCallback,
} from 'react';
import {
    getTime,
    formatISO,
} from 'date-fns';
import {
    useRouter,
    useParams,
    usePathname,
    useSearchParams,
} from 'next/navigation';

import {
    History,
} from 'contexts/shared/domain/models';

import { useDatabase, } from 'shared/contexts/database';

const MAX_HISTORY_RECORDS = 20;

type NavigationOptions = Parameters<ReturnType<typeof useRouter>['push']>[1];

type UseNavigation = {
    router: ReturnType<typeof useRouter>;
    navigate: (
        href: string,
        options?: NavigationOptions,
    ) => void;
    back: () => void | Promise<void>;
};

export const useNavigation: () => UseNavigation = () => {
    const {
        database,
    } = useDatabase();

    const router = useRouter();
    const params = useParams();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const navigate: UseNavigation['navigate'] = router?.push;

    const back: UseNavigation['back'] = async () => {
        const records = await findAllHistoryFromNow();

        if (!Array.isArray(records) || records.length === 0)
            return navigate('/');

        let position = -1;
        let lastRecord = records?.at(position);

        while (lastRecord) {
            if (lastRecord.path !== pathname)
                return navigate(lastRecord.path);

            position -= 1;
            lastRecord = records?.at(position);
        }

        return navigate('/');
    };

    const saveHistory = useCallback(
        async (history: History) => {
            const saved = await database
                ?.history
                ?.put({
                    ...history,
                    createdAt: formatISO(new Date()),
                    modifiedAt: formatISO(new Date()),
                });

            return saved;
        },
        [database,],
    );

    const findAllHistoryFromNow = useCallback(
        async () => {
            const records = await database
                ?.history
                ?.where('createdAt')
                ?.belowOrEqual(formatISO(new Date()))
                ?.sortBy('createdAt')

            return records;
        },
        [database,],
    );

    const syncHistory = useCallback(
        async () => {
            const newRecord: History = {
                key: pathname,
                hash: '',
                params: searchParams ? [...searchParams?.entries?.()]
                    ?.map(([key, value]) => `${key}=${value}`) : [],
                path: pathname,
                url: window?.location?.hostname,
            };

            const [ count, records, ] = await Promise.all([
                database?.history?.count?.(),
                findAllHistoryFromNow(),
            ]);

            if (count < MAX_HISTORY_RECORDS)
                return await saveHistory(newRecord);

            const lastRecord = records?.at(0);
            if (!lastRecord)
                return await saveHistory(newRecord);

            await Promise.all([
                database?.history?.delete?.(lastRecord?.key),
                saveHistory(newRecord),
            ]);
        },
        [pathname, database, findAllHistoryFromNow,],
    );

    useEffect(() => {
        syncHistory()
            .catch(err => console.error(err));
    }, [syncHistory,]);

    return {
        back,
        navigate,
        router,
    };
}

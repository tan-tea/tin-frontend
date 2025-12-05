import { minutesToMilliseconds } from 'date-fns';
import {
    useQuery,
    QueryObserverResult,
} from '@tanstack/react-query';

import { clientEnv } from 'env/client';
import { getAllCustomizationByWorkspace } from 'app/actions';

import type {
    Customization
} from 'shared/models';
import { useCache } from 'shared/hooks';
import { customizationAtom } from 'shared/state';

type UseThemeData = Readonly<{
    queryId: string;
    data: Customization | null;
    isLoading: boolean;
    error: Error | null;
    refetch: QueryObserverResult['refetch'];
    isRefetching: boolean;
}>;

type UseThemeDataHandler = () => UseThemeData;

const QUERY_ID = 'customization-data';

export const useCustomizationData: UseThemeDataHandler = () => {
    'use memo'
    const {
        load,
        save,
    } = useCache<Customization | null>('customizations', customizationAtom)

    const {
        data: themeData,
        isLoading,
        error,
        refetch,
        isRefetching,
    } = useQuery({
        queryKey: [QUERY_ID],
        queryFn: async () => {
            const cached = await load('current');
            if (cached) return cached;

            const customization = await getAllCustomizationByWorkspace(clientEnv.NEXT_PUBLIC_WORKSPACE_ID);

            await save({
                ...customization,
                id: 'current',
            });

            return customization;
        },
        staleTime: minutesToMilliseconds(60),
        retry: 1,
    });

    return {
        queryId: QUERY_ID,
        data: themeData || null,
        isLoading,
        error,
        refetch,
        isRefetching,
    };
};

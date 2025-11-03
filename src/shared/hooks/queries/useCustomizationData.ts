import { useMemo } from 'react';
import {
    useQuery,
    QueryObserverResult,
} from '@tanstack/react-query';

import { clientEnv } from 'env/client';
import {
    getCustomizationByWorkspaceId,
} from 'app/actions';

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

type UseThemeDataProps = object;

type UseThemeDataHandler = (props?: UseThemeDataProps) => UseThemeData;

export const useCustomizationData: UseThemeDataHandler = () => {
    const queryId = useMemo<string>(
        () => 'customization-data',
        [],
    );

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
        queryKey: [queryId],
        queryFn: async () => {
            const cached = await load('current');
            if (cached) return Array.isArray(cached)
                ? cached?.[0]
                : cached;

            const customization = await getCustomizationByWorkspaceId(clientEnv.NEXT_PUBLIC_WORKSPACE_ID);
            await save({
                ...customization,
                id: 'current',
            });
            return customization;
        },
        staleTime: Infinity,
        retry: 5,
    });

    return {
        queryId,
        data: themeData || null,
        isLoading,
        error,
        refetch,
        isRefetching,
    };
};

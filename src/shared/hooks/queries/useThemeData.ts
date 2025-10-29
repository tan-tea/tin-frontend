import { useMemo } from 'react';
import {
    useQuery,
    QueryObserverResult,
} from '@tanstack/react-query';
import { PaletteOptions } from '@mui/material';

import { clientEnv } from 'env/client';
import {
    getCustomizationByWorkspaceId,
} from 'app/actions';
import { formatThemePalette } from 'lib/utils';

type UseThemeData = Readonly<{
    queryId: string;
    data: PaletteOptions | null;
    isLoading: boolean;
    error: Error | null;
    refetch: QueryObserverResult['refetch'];
    isRefetching: boolean;
}>;

type UseThemeDataProps = object;

type UseThemeDataHandler = (props?: UseThemeDataProps) => UseThemeData;

export const useThemeData: UseThemeDataHandler = () => {
    const queryId = useMemo<string>(
        () => 'theme-data',
        [],
    );

    const {
        data: themeData,
        isLoading,
        error,
        refetch,
        isRefetching,
    } = useQuery({
        queryKey: [queryId],
        queryFn: async () => {
            const customization = await getCustomizationByWorkspaceId(clientEnv.NEXT_PUBLIC_WORKSPACE_ID);
            const formatted = formatThemePalette(customization);
            return formatted;
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

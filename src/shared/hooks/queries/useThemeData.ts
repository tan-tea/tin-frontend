import { useMemo } from 'react';
import {
    useQuery,
    QueryObserverResult,
} from '@tanstack/react-query';

import {
    getOffersByShopId,
} from 'app/actions';

type UseThemeData = Readonly<{
    queryId: string;
    theme: any;
    isLoading: boolean;
    error: Error | null;
    refetch: QueryObserverResult['refetch'];
    isRefetching: boolean;
}>;

type UseThemeDataProps = object;

type UseThemeDataHandler = (props: UseThemeDataProps) => UseThemeData;

const useThemeData: UseThemeDataHandler = () => {
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
        queryFn: () => {},
        staleTime: Infinity,
        retry: 5,
    });

    return {
        queryId,
        theme: themeData,
        isLoading,
        error,
        refetch,
        isRefetching,
    };
};

export default useThemeData;

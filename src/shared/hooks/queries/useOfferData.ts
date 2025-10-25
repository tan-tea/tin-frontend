import { useMemo } from 'react';
import {
    useQuery,
    QueryObserverResult,
} from '@tanstack/react-query';

import {
    getOffersByShopId,
} from 'app/actions';

type UseOfferData = Readonly<{
    queryId: string;
    theme: any;
    isLoading: boolean;
    error: Error | null;
    refetch: QueryObserverResult['refetch'];
    isRefetching: boolean;
}>;

type UseOfferDataProps = {
    shopId: string;
};

type UseOfferDataHandler = (props: UseOfferDataProps) => UseOfferData;

const useOfferData: UseOfferDataHandler = (props: UseOfferDataProps) => {
    const {
        shopId,
    } = props;

    const queryId = useMemo<string>(
        () => 'offer-data',
        [],
    );

    const {
        data: offerData,
        isLoading,
        error,
        refetch,
        isRefetching,
    } = useQuery({
        queryKey: [queryId, shopId,],
        queryFn: async () => await getOffersByShopId(shopId),
        staleTime: Infinity,
        retry: 5,
    });

    return {
        queryId,
        theme: offerData,
        isLoading,
        error,
        refetch,
        isRefetching,
    };
};

export default useOfferData;

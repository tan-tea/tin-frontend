import { useMemo } from 'react';
import { minutesToMilliseconds } from 'date-fns';
import { useAtomValue } from 'jotai';
import {
    useQuery,
    QueryObserverResult,
} from '@tanstack/react-query';

import {
    getOffersByShopId,
} from 'app/actions';

import type {
    Offer
} from 'shared/models';
import { currentShopAtom } from 'shared/state';

type UseOfferData = Readonly<{
    queryId: string;
    data: Array<Offer>;
    isLoading: boolean;
    error: Error | null;
    refetch: QueryObserverResult['refetch'];
    isRefetching: boolean;
}>;

type UseOfferDataProps = {
    shopId?: string;
};

type UseOfferDataHandler = (props?: UseOfferDataProps) => UseOfferData;

export const useOfferData: UseOfferDataHandler = (props = {
    shopId: undefined
}) => {
    const currentShop = useAtomValue(currentShopAtom);

    const {
        shopId = currentShop?.id!,
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
        enabled: !!shopId,
        staleTime: minutesToMilliseconds(30),
        retry: 5,
    });

    return {
        queryId,
        data: offerData || [],
        isLoading,
        error,
        refetch,
        isRefetching,
    };
};

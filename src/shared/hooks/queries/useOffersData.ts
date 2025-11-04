import { useMemo } from 'react';
import { minutesToMilliseconds } from 'date-fns';
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
import { useCache } from 'shared/hooks';
import { offersAtom } from 'shared/state';

type UseOfferData = Readonly<{
    queryId: string;
    data: Array<Offer>;
    isLoading: boolean;
    error: Error | null;
    refetch: QueryObserverResult['refetch'];
    isRefetching: boolean;
}>;

type UseOfferDataProps = {
    shopId: string;
};

type UseOfferDataHandler = (props: UseOfferDataProps) => UseOfferData;

export const useOffersData: UseOfferDataHandler = (props) => {
    const {
        shopId,
    } = props;

    const queryId = useMemo<string>(
        () => 'offers-by-shop-data',
        [],
    );

    const {
        load,
        saveMany,
    } = useCache<Array<Offer>>('offers', offersAtom);

    const {
        data: offerData,
        isLoading,
        error,
        refetch,
        isRefetching,
    } = useQuery({
        queryKey: [queryId, shopId,],
        queryFn: async () => {
            // const cached = await load();
            // if (cached && cached?.length > 0) return cached

            const offers = await getOffersByShopId(shopId);
            await saveMany(offers);
            return offers;
        },
        enabled: !!shopId,
        staleTime: minutesToMilliseconds(5),
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

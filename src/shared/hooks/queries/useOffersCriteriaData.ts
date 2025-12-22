import { useAtomValue } from 'jotai';
import {
    useQuery,
    type QueryObserverResult,
} from '@tanstack/react-query';
import { minutesToMilliseconds } from 'date-fns';

import { autocomplete } from 'app/actions';

import type {
    Offer
} from 'shared/models';
import { shopAtom } from 'shared/state';

type UseOffersCriteriaData = Readonly<QueryObserverResult<Array<Offer>> & {
    queryId: string;
}>;

type UseOffersCriteriaDataHandler = (
    query: string,
    top?: number,
    skip?: number,
) => UseOffersCriteriaData;

const QUERY_ID = 'offers-by-criteria';

export const useOffersCriteriaData: UseOffersCriteriaDataHandler = (
    query,
    top,
    skip,
) => {
    'use memo'
    const shop = useAtomValue(shopAtom);

    const result = useQuery({
        queryKey: [QUERY_ID, query, top, skip,],
        queryFn: async () => {
            const shopId = shop?.id;
            if (!shopId) return [];

            const offers = await autocomplete(query, shopId, top, skip);
            return offers;
        },
        enabled: !!query,
        staleTime: minutesToMilliseconds(5),
    });

    return {
        ...result,
        queryId: QUERY_ID,
    };
}

import { minutesToMilliseconds } from 'date-fns';
import {
    useQuery,
    type QueryObserverResult,
} from '@tanstack/react-query';

import { autocomplete } from 'app/actions';

import type {
    Offer
} from 'shared/models';

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

    const result = useQuery({
        queryKey: [QUERY_ID, query, top, skip,],
        queryFn: async () => {
            const offers = await autocomplete(query);
            console.log('offers', offers);
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

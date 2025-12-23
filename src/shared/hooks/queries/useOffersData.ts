import { minutesToMilliseconds } from 'date-fns';
import {
    useQuery,
    QueryObserverResult,
} from '@tanstack/react-query';

import { getOffersByShop } from 'app/actions';

import type {
    Offer
} from 'shared/models';
import { useCache } from 'shared/hooks';
import { offersAtom } from 'shared/state';

type OfferData = Readonly<QueryObserverResult<Array<Offer>> & {
    queryId: string;
}>;

type UseOfferDataProps = {
    shopId: string;
};

type UseOfferDataHandler = (props: UseOfferDataProps) => OfferData;

const QUERY_ID = 'offers-by-shop-data' as const;

export const useOffersData: UseOfferDataHandler = ({
    shopId,
}) => {
    'use memo'
    const {
        load,
        saveMany,
    } = useCache<Array<Offer>>('offers', offersAtom);

    const query = useQuery({
        queryKey: [QUERY_ID, shopId,],
        queryFn: async () => {
            const cached = await load(undefined, 5);
            if (cached && cached?.length > 0) return cached

            const offers = await getOffersByShop(shopId);

            await saveMany(offers.map(o => ({ ...o, _id: o.id, })));

            return offers;
        },
        enabled: !!shopId,
        staleTime: minutesToMilliseconds(5),
        retry: 3,
    });

    return {
        ...query,
        queryId: QUERY_ID,
    };
};

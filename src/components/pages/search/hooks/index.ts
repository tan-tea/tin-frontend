import { toast } from 'sonner';
import { useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

import { getOffersByCriteria } from 'app/actions';

type Criteria = Readonly<{
    query: string;
    shopId: string;
}>;

function useSearchOffers(criteria: Criteria) {
    'use memo'
    const {
        query,
        shopId,
    } = criteria;

    return useInfiniteQuery({
        queryKey: ['search-offers', query, shopId,],
        queryFn: ({ pageParam = null }) => getOffersByCriteria(query, shopId, {
            limit: 5,
            cursor: pageParam as any
        }),
        enabled: !!shopId && shopId !== 'current',
        initialPageParam: null,
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        retry: 1,
    });
}

export function useSearchOffersData(criteria: Criteria) {
    'use memo'
    const {
        data,
        error,
        isError,
        ...rest
    } = useSearchOffers(criteria);

    const offers = data?.pages?.flatMap(p => p.items) ?? [];

    useEffect(() => {
        if (isError) {
            toast.error(error.message);
        }
    }, [error, isError,]);

    return {
        ...rest,
        error,
        isError,
        offers,
    };
}

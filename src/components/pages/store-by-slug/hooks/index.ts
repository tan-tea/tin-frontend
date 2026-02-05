import { toast } from 'sonner';
import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { minutesToMilliseconds } from 'date-fns';
import { useInfiniteQuery, useSuspenseQuery } from '@tanstack/react-query';

import { getOffersByShop, getShopDetailsBySlug } from 'app/actions';

import { cachedOffersAtom, cachedShopAtom } from 'shared/state';

export function useOffersByShop(shopId: string) {
    return useInfiniteQuery({
        queryKey: ['offers-by-shop', shopId],
        queryFn: ({ pageParam = null }) => getOffersByShop(shopId, {
            limit: 10,
            cursor: pageParam as any,
        }),
        initialPageParam: null,
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        retry: 2,
    });
}

export function useOffersByShopData(shopId: string) {
    'use memo'
    const setCachedOffers = useSetAtom(cachedOffersAtom);

    const {
        data,
        error,
        isError,
        isSuccess,
        isLoading,
        ...query
    } = useOffersByShop(shopId);

    const offers = data?.pages.flatMap(p => p.items) ?? [];

    useEffect(() => {
        if (!data || !offers) return;

        setCachedOffers(offers);
    }, [data, setCachedOffers]);

    useEffect(() => {
        if (isError && !isLoading) {
            toast.error('Something went wrong!');
        }
    }, [isError, isLoading, error]);

    return {
        ...query,
        error,
        isError,
        isLoading,
        isSuccess,
        data,
        offers,
    };
}

export function useShopBySlug(slug: string) {
    return useSuspenseQuery({
        queryKey: ['shop-by-slug', slug],
        queryFn: () => getShopDetailsBySlug(slug),
        staleTime: minutesToMilliseconds(10),
        gcTime: minutesToMilliseconds(30),
        retry: 2,
    });
}

export function useShopBySlugData(slug: string) {
    'use memo'
    const setCachedShop = useSetAtom(cachedShopAtom);

    const {
        data,
        error,
        isError,
        isSuccess,
        isLoading,
        ...query
    } = useShopBySlug(slug);

    useEffect(() => {
        if (!data) return;

        setCachedShop(data);
    }, [data, setCachedShop]);

    useEffect(() => {
        if (isError && !isLoading) {
            toast.error(error.message);
        }
    }, [isError, isLoading, error]);

    return {
        ...query,
        error,
        isError,
        isLoading,
        isSuccess,
        shop: data,
    };
}

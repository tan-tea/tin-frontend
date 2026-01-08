import { toast } from 'sonner';
import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { minutesToMilliseconds } from 'date-fns';
import { useSuspenseQuery } from '@tanstack/react-query';

import { getOffersByShop, getShopDetailsBySlug } from 'app/actions';

import { cachedOffersAtom, cachedShopAtom } from 'shared/state';

export function useOffersByShop(shopId: string) {
    return useSuspenseQuery({
        queryKey: ['offers-by-shop', shopId],
        queryFn: () => getOffersByShop(shopId),
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        staleTime: minutesToMilliseconds(1),
        gcTime: minutesToMilliseconds(2.5),
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

    useEffect(() => {
        if (!data) return;

        setCachedOffers(data);
    }, [data, setCachedOffers]);

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
        offers: data,
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

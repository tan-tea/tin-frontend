import { toast } from 'sonner';
import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { minutesToMilliseconds } from 'date-fns';
import { useSuspenseQuery } from '@tanstack/react-query';

import { getOfferDetailsBySlug } from 'app/actions';

import { cachedOfferAtom } from 'shared/state';

export function useOfferBySlugData(slug: string) {
    'use memo'
    const setCachedOffer = useSetAtom(cachedOfferAtom)

    const {
        data,
        error,
        isError,
        isSuccess,
        isLoading,
        ...query
    } = useSuspenseQuery({
        queryKey: ['offer-by-slug', slug],
        queryFn: () => getOfferDetailsBySlug(slug),
        refetchOnMount: true,
        refetchOnReconnect: true,
        refetchOnWindowFocus: true,
        staleTime: minutesToMilliseconds(1),
        gcTime: minutesToMilliseconds(5),
        retry: 3,
    });

    useEffect(() => {
        if (!data) return;

        setCachedOffer(data);
    }, [data, setCachedOffer]);

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
        offer: data,
    };
}

import { toast } from 'sonner';
import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { minutesToMilliseconds } from 'date-fns';
import { useSuspenseQuery } from '@tanstack/react-query';

import { getCategoryWithOffers } from 'app/actions';

import { cachedCategoryAtom } from 'shared/state';

export function useCategoryOffersData(slug: string) {
    'use memo'
    const setCachedCategory = useSetAtom(cachedCategoryAtom);

    const {
        data,
        error,
        isError,
        isSuccess,
        isLoading,
        ...query
    } = useSuspenseQuery({
        queryKey: ['category-offers-by-slug', slug],
        queryFn: () => getCategoryWithOffers(slug),
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        staleTime: minutesToMilliseconds(2.5),
        gcTime: minutesToMilliseconds(5),
        retry: 2,
    });

    useEffect(() => {
        if (!data) return;

        setCachedCategory(data);
    }, [data, setCachedCategory]);

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
        category: data,
    };
}

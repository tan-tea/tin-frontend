import { toast } from 'sonner';
import { useEffect } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { useInfiniteQuery, useSuspenseQuery } from '@tanstack/react-query';

import { getCategoryBySlug, getOffersByCategory } from 'app/actions';

import { cachedCategoryAtom, categoryAtom } from 'shared/state';

function useCategoryBySlug(slug: string) {
    'use memo'
    return useSuspenseQuery({
        queryKey: ['category-by-slug', slug],
        queryFn: async () => {
            const result = await getCategoryBySlug(slug);
            if ('error' in result) throw new Error(result.error);

            return result;
        },
        retry: 1,
    });
}

export function useCategoryBySlugData(slug: string) {
    'use memo'
    const setCachedCategory = useSetAtom(cachedCategoryAtom);

    const {
        data,
        error,
        isError,
        ...rest
    } = useCategoryBySlug(slug);

    useEffect(() => {
        if (!data) return;

        setCachedCategory(data);
    }, [data, setCachedCategory,]);

    useEffect(() => {
        if (isError) {
            toast.error(error.message);
        }
    }, [error, isError]);

    return {
        ...rest,
        error,
        isError,
        category: data,
    };
}

function useOffersByCategoryId(categoryId: string) {
    'use memo'
    return useInfiniteQuery({
        queryKey: ['offers-by-category-id', categoryId],
        queryFn: ({ pageParam = null }) => getOffersByCategory(categoryId, {
            limit: 20,
            cursor: pageParam as any,
        }),
        initialPageParam: null,
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        retry: 2,
    });
}

export function useOffersByCategoryIdData(categoryId: string) {
    'use memo'
    const cachedCategory = useAtomValue(categoryAtom);
    const setCachedCategory = useSetAtom(cachedCategoryAtom);

    const {
        data,
        error,
        isError,
        ...query
    } = useOffersByCategoryId(categoryId)

    const offers = data?.pages?.flatMap(p => p.items) ?? [];

    useEffect(() => {
        if (!data || !offers || !cachedCategory) return;

        setCachedCategory({
            ...cachedCategory,
            offers,
        });
    }, [data, setCachedCategory]);

    useEffect(() => {
        if (isError) {
            toast.error(error.message);
        }
    }, [isError, error]);

    return {
        ...query,
        error,
        isError,
        offers,
    };
}

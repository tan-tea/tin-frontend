import type { Metadata } from 'next';
import type { Offer } from 'shared/models';

import { cache } from 'react';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import {
    getOffersByShop,
    getShopDetailsBySlug,
} from 'app/actions';
import { cachedQueryClient } from 'app/get-query-client';

import StoreBySlug from 'pages/store-by-slug';

type PageProps = Readonly<{
    params: Promise<{
        locale: string;
        slug: string;
    }>;
}>;

const cachedGetShopDetailsBySlug = cache(
    (slug: string) => getShopDetailsBySlug(slug),
);

export const dynamic = 'force-dynamic';

export async function generateMetadata(props: PageProps): Promise<Metadata> {
    const { params } = props;

    const slug = (await params).slug;
    const locale = (await params).locale;

    const t = await getTranslations({
        locale,
        namespace: 'metadata',
    });

    const shop = await cachedGetShopDetailsBySlug(slug);

    if (!shop) return {
        title: t('notFound.title'),
        description: t('notFound.description'),
    };

    const title = shop.name,
        description = shop.description;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
        },
        twitter: {
            title,
            description,
            card: 'summary',
            creator: '@yimall.co',
        },
    } as Metadata;
}

export default async function Page(props: PageProps) {
    const { params } = props;

    const slug = (await params).slug;
    const locale = (await params).locale;

    const queryClient = cachedQueryClient();

    const shop = await queryClient.fetchQuery({
        queryKey: ['shop-by-slug', slug],
        queryFn: () => cachedGetShopDetailsBySlug(slug),
    });

    if (!shop) return notFound();

    const shopId = shop.id;

    queryClient.prefetchInfiniteQuery({
        queryKey: ['offers-by-shop', shopId],
        queryFn: ({ pageParam = null }) =>
            getOffersByShop(shopId, {
                limit: 10,
                cursor: pageParam ?? undefined,
            }),
        initialPageParam: null,
        getNextPageParam: (lastPage: PaginatedResult<Offer>) => lastPage.nextCursor,
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <StoreBySlug slug={slug} shopId={shopId} locale={locale}/>
        </HydrationBoundary>
    );
}

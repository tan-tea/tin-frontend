import type { Metadata } from 'next';

import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { fetchWithBackoff } from 'lib/utils';
import {
    getOffersByShop,
    getShopDetailsBySlug,
} from 'app/actions';
import { getQueryClient } from 'app/get-query-client';

import StoreBySlug from 'pages/store-by-slug';

type PageProps = Readonly<{
    params: Promise<{
        locale: string;
        slug: string;
    }>;
}>;

export const dynamic = 'force-dynamic';

export async function generateMetadata(props: PageProps): Promise<Metadata> {
    const { params } = props;

    const slug = (await params).slug;
    const locale = (await params).locale;

    const t = await getTranslations({
        locale,
    });

    const shop = await fetchWithBackoff<
        ReturnType<typeof getShopDetailsBySlug>,
        typeof getShopDetailsBySlug,
        Parameters<typeof getShopDetailsBySlug>
    >(getShopDetailsBySlug, [slug]);

    if (!shop) return {
        title: t('shopNotFound'),
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
        }
    } as Metadata;
}

export default async function Page(props: PageProps) {
    const { params } = props;

    const slug = (await params).slug;

    const queryClient = getQueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['shop-by-slug', slug],
        queryFn: () => getShopDetailsBySlug(slug),
    });

    const shop = queryClient.getQueryData<
        Awaited<ReturnType<typeof getShopDetailsBySlug>>
    >(['shop-by-slug', slug]);
    if (!shop) return notFound();

    const shopId = shop.id;

    queryClient.prefetchQuery({
        queryKey: ['offers-by-shop', shopId],
        queryFn: () => getOffersByShop(shopId),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <StoreBySlug slug={slug} shopId={shopId}/>
        </HydrationBoundary>
    );
}

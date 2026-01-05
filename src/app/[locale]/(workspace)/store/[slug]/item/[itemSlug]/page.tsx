import type { Metadata, } from 'next';

import { notFound } from 'next/navigation';
import { getTranslations, } from 'next-intl/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { clientEnv } from 'env/client';
import { getOfferDetailsBySlug } from 'app/actions';
import { getQueryClient } from 'app/get-query-client';

import { fetchWithBackoff } from 'lib/utils';

import type {
    Offer
} from 'shared/models';

import ItemBySlug from 'pages/item-by-slug';

type PageProps = {
    params: Promise<{
        locale: string;
        slug: string;
        itemSlug: string;
    }>;
};

export const dynamic = 'force-dynamic';

export async function generateMetadata(props: PageProps): Promise<Metadata> {
    const { params } = props;

    const locale = (await params).locale;
    const slug = (await params).slug;
    const itemSlug = (await params).itemSlug;

    const t = await getTranslations('metadata');

    const offer = await fetchWithBackoff<
        Offer,
        typeof getOfferDetailsBySlug,
        Parameters<typeof getOfferDetailsBySlug>
    >(getOfferDetailsBySlug, [itemSlug]);

    if (!offer) return {
        title: t('siteName'),
        description: t('description'),
    };

    const title = offer.title,
        description = offer.description,
        url = `${clientEnv.NEXT_PUBLIC_SITE_URL}/${locale}/shop/${slug}/item/${itemSlug}`;

    return {
        title,
        description,
        openGraph: {
            title,
            url,
            description,
            images: [
                {
                    url: offer.banner,
                    width: 1080,
                    height: 650,
                },
            ],
        },
        twitter: {
            title,
            url,
            description,
            card: 'summary_large_image',
            creator: '@yimall.co',
            images: [
                {
                    url: offer.banner,
                    width: 1200,
                    height: 630,
                },
            ],
        },
    } as Metadata;
}

export default async function Page(props: PageProps) {
    const { params } = props;

    const itemSlug = (await params).itemSlug;

    const queryClient = getQueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['offer-by-slug', itemSlug],
        queryFn: () => getOfferDetailsBySlug(itemSlug),
    });

    const offer = queryClient.getQueryData<
        Awaited<ReturnType<typeof getOfferDetailsBySlug>>
    >(['offer-by-slug', itemSlug]);
    if (!offer) return notFound();

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ItemBySlug itemSlug={itemSlug}/>
        </HydrationBoundary>
    );
};

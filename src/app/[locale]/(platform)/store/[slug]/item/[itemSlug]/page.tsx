import type { Metadata, } from 'next';

import { notFound } from 'next/navigation';
import { getTranslations, } from 'next-intl/server';

import { clientEnv } from 'env/client';
import {
    getOfferDetailsBySlug,
    getOffersSlugByWorkspaceId,
} from 'app/actions';

import { fetchWithBackoff } from 'lib/utils';
import { fallbackLanguage } from 'lib/i18n/constants';

import type {
    Offer
} from 'shared/models';

import ItemBySlug from 'pages/item-by-slug';

type StaticParams = {
    params: Awaited<{ locale: string; }>;
}

type ItemPageProps = {
    params: Promise<{
        locale: string;
        slug: string;
        itemSlug: string;
    }>;
};

// TODO: review this one
// export async function generateStaticParams(props: StaticParams) {
//     const { params } = props;

//     const locale = params.locale;

//     const offers = await getOffersSlugByWorkspaceId();

//     return offers?.map?.(({ slug }) => ({
//         id: slug,
//         locale: locale || fallbackLanguage,
//     }));
// }

export const dynamic = 'force-dynamic';

export async function generateMetadata(props: ItemPageProps): Promise<Metadata> {
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
    // const offer = await getOfferDetailsBySlug(itemSlug);

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

export default async function ItemPage(props: ItemPageProps) {
    const { params } = props;

    const itemSlug = (await params).itemSlug;

    const offer = await getOfferDetailsBySlug(itemSlug);
    if (!offer) return notFound();

    return (
        <ItemBySlug offer={offer}/>
    );
};

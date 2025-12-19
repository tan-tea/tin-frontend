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

import ProductDetail from 'pages/product-detail';

type ItemPageStaticParams = {
    params: Awaited<{ locale: string; }>;
}

type ItemPageProps = {
    params: Promise<{ id: string; locale: string; }>;
};

export async function generateStaticParams(
    props: ItemPageStaticParams
): Promise<Array<any>> {
    const {
        params: {
            locale,
        },
    } = props;

    const offers = await getOffersSlugByWorkspaceId();

    return offers?.map?.(({ slug }) => ({
        id: slug,
        locale: locale || fallbackLanguage,
    }));
}

export async function generateMetadata(
    props: ItemPageProps,
): Promise<Metadata> {
    const {
        params
    } = props;

    const { id, locale } = await params;

    const t = await getTranslations('metadata');

    const offer = await fetchWithBackoff<
        Offer,
        typeof getOfferDetailsBySlug,
        Parameters<typeof getOfferDetailsBySlug>
    >(getOfferDetailsBySlug, [id]);

    if (!offer) return {
        title: t('titles.home.title'),
        description: t('titles.home.description'),
    };

    const title = offer.title,
        description = offer.description,
        url = `${clientEnv.NEXT_PUBLIC_SITE_URL}/${locale}/product/${id}`;

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

    const id = (await params).id;

    const offer = await getOfferDetailsBySlug(id);
    if (!offer) return notFound();

    return (
        <ProductDetail offer={offer}/>
    );
};

import type {
    FC,
    ReactElement,
} from 'react';
import type { Metadata, } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, } from 'next-intl/server';

import { FALLBACK_LANGUAGE } from 'lib/i18n/constants';

import {
    getOfferDetailsBySlug,
    getOffersSlugByWorkspaceId,
} from 'app/actions';

import ProductDetail from 'feature/ProductDetail';

type ProductDetailStaticParams = {
    params: Awaited<{
        locale: string;
    }>;
}

type ProductDetailPageProps = {
    params: Promise<{
        id: string;
        locale: string;
    }>;
};

export async function generateMetadata(
    props: ProductDetailPageProps,
): Promise<Metadata> {
    const {} = props;

    const t = await getTranslations('titles.home');

    return {
        title: t('title'),
        description: t('description'),
    };
}

export async function generateStaticParams(
    props: ProductDetailStaticParams
): Promise<Array<any>> {
    const {
        params: {
            locale,
        },
    } = props;

    // const offersIds = await getOffersIds();
    const offers = await getOffersSlugByWorkspaceId();
    // console.log('offers', offers);

    return offers?.map?.(({ slug }) => ({
        id: slug,
        locale: locale || FALLBACK_LANGUAGE,
    })) || [];
}

export default async function ProductDetailPage(
    props: ProductDetailPageProps
): Promise<ReactElement<FC<ProductDetailPageProps>> | null> {
    const {
        params,
    } = props;

    const {
        id,
        locale,
    } = await params;

    const offer = await getOfferDetailsBySlug(id);
    if (!offer)
        return notFound();

    return (
        <ProductDetail offer={offer}/>
    );
};

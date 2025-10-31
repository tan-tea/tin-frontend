import type {
    FC,
    ReactElement,
} from 'react';
import type { Metadata, } from 'next';
import { getTranslations, } from 'next-intl/server';

import dynamic from 'next/dynamic';

import {
    getOfferById,
    getOffersIds
} from 'app/actions';

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

    const offersIds = await getOffersIds();

    return offersIds?.map?.(id => ({
        id: id,
        locale: locale || 'en',
    })) || [];
}

const ProductDetail = dynamic(
    () => import('feature/ProductDetail'),
    {
        ssr: false,
    },
);

export default async function ProductDetailPage(
    props: ProductDetailPageProps
): Promise<ReactElement<FC<ProductDetailPageProps>> | null> {
    const {
        params,
    } = props;

    const {
        id,
    } = await params;

    const offer = await getOfferById(id);
    if (!offer) return null;

    return (
        <ProductDetail
            id={id}
            offer={offer}
        />
    );
};

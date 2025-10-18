import type {
    FC,
    ReactElement,
} from 'react';
import type { Metadata, } from 'next';
import { getTranslations, } from 'next-intl/server';

import {
    createClient,
    createStaticClient,
} from 'lib/supabase/server';

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

    const supabase = createStaticClient();

    const {
        data: offers,
    } = await supabase.from('offers').select('id');

    return offers?.map?.((offer: any) => ({
        id: offer.id,
        locale: locale || 'en',
    })) || [];
}

export default async function ProductDetailPage(
    props: ProductDetailPageProps
): Promise<ReactElement<FC<ProductDetailPageProps>>> {
    const {
        params,
    } = props;

    const {
        id,
    } = await params;

    const supabase = await createClient();

    const {
        data: offer,
        error,
    } = await supabase.from('offers').select(`
            *,
            categories ( * ),
            offer_types (
                *,
                offer_attributes (
                    *,
                    offer_attribute_values ( * )
                )
            )
        `)
        .eq('id', id)
        .single();

    return (
        <ProductDetail
            id={id}
            offer={offer}
        />
    );
};

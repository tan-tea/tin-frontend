import type {
    FC,
    ReactElement,
} from 'react';
import type { Metadata, } from 'next';
import { createSSRClient } from 'lib/supabase';
import { getTranslations, } from 'next-intl/server';

import ProductDetail from 'feature/ProductDetail';

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

export async function generateStaticParams(): Promise<Array<any>> {
    return [];
}

export default async function ProductDetailPage(
    props: ProductDetailPageProps
): Promise<ReactElement<FC<ProductDetailPageProps>>> {
    const {
        params,
    } = props;

    const {
        id,
        locale,
    } = await params;

    const supabase = await createSSRClient();

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

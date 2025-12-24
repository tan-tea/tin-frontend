import type { Metadata } from 'next';

import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import {
    getOffersByShop,
    getShopDetailsBySlug,
} from 'app/actions';
import { fetchWithBackoff } from 'lib/utils';

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

    const shopBySlug = await fetchWithBackoff<
        ReturnType<typeof getShopDetailsBySlug>,
        typeof getShopDetailsBySlug,
        Parameters<typeof getShopDetailsBySlug>
    >(getShopDetailsBySlug, [slug]);

    if (!shopBySlug) return {
        title: t('shopNotFound'),
    };

    const title = shopBySlug.name,
        description = '';

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

    const shopBySlug = await getShopDetailsBySlug(slug);
    if (!shopBySlug) return notFound();

    let offersByShop: Awaited<ReturnType<typeof getOffersByShop>>;
    try{
        offersByShop = await getOffersByShop(shopBySlug.id);
    } catch (error) {
        offersByShop = [];
    }

    return (
        <StoreBySlug shop={shopBySlug} offers={offersByShop}/>
    );
}

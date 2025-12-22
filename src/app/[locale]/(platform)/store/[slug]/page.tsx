import type { Metadata } from 'next';

import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { clientEnv } from 'env/client';
import {
    getShopDetailsBySlug,
    getShopsSlugsByWorkspace,
    getOffersByShop,
} from 'app/actions';
import { fetchWithBackoff } from 'lib/utils';
import { fallbackLanguage } from 'lib/i18n/constants';

import StoreBySlug from 'pages/store-by-slug';

type StaticParams = Readonly<{
    params: Awaited<{
        locale: string;
        slug: string;
    }>;
}>;

type StoreBySlugPageProps = Readonly<{
    params: Promise<{
        locale: string;
        slug: string;
    }>;
}>;

export async function generateStaticParams(props: StaticParams) {
    const { params } = props;

    const locale = params.locale ?? fallbackLanguage;

    let slugs: Awaited<ReturnType<typeof getShopsSlugsByWorkspace>> | [];
    try {
        slugs = await fetchWithBackoff<
            ReturnType<typeof getShopsSlugsByWorkspace>,
            typeof getShopsSlugsByWorkspace,
            Parameters<typeof getShopsSlugsByWorkspace>
        >(getShopsSlugsByWorkspace, [clientEnv.NEXT_PUBLIC_WORKSPACE_ID]) ?? [];
    } catch (error) {
        slugs = [];
    }

    return slugs.map(slug => ({
        locale,
        slug,
    }));
}

export async function generateMetadata(props: StoreBySlugPageProps): Promise<Metadata> {
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

export default async function StoreBySlugPage(props: StoreBySlugPageProps) {
    const { params } = props;

    const slug = (await params).slug;

    const shopBySlug = await getShopDetailsBySlug(slug);
    if (!shopBySlug) return notFound();

    let offersByShop: Awaited<ReturnType<typeof getOffersByShop>>;
    try{
        offersByShop = await getOffersByShop(shopBySlug.id);
    } catch (error) {
        console.error('error', error);
        offersByShop = [];
    }

    return (
        <StoreBySlug shop={shopBySlug} offers={offersByShop}/>
    );
}

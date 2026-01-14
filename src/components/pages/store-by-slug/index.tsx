'use client'

import dynamic from 'next/dynamic';

import { useTranslations } from 'next-intl';

import type {
    Shop,
    Offer,
} from 'shared/models';

import {
    useOffersByShopData,
    useShopBySlugData
} from './hooks';

import Loading from 'pages/loading';
import DeviceDetector from 'common/device-detector';

const StoreBySlugMobile = dynamic(
    () => import('./mobile'),
    {
        ssr: false,
        loading: () => <Loading/>,
    },
);

type Props = Readonly<{
    slug: string;
    shopId: string;
}>;

export type StoreBySlugProps = Props & {
    t: ReturnType<typeof useTranslations>;
    shop: Shop;
    offers: Array<Offer>;
};

export default function StoreBySlug(props: Props) {
    'use memo'
    const { slug, shopId } = props;

    const t = useTranslations();

    const {
        shop,
        isLoading: isLoadingShop,
    } = useShopBySlugData(slug);

    const {
        offers,
        isLoading: isLoadingOffers,
    } = useOffersByShopData(shopId);

    const childProps: StoreBySlugProps = {
        t,
        slug,
        shopId,
        shop,
        offers,
    };

    const loading = isLoadingOffers || isLoadingShop;
    if (loading) return <Loading/>

    return (
        <DeviceDetector
            MobileComponent={<StoreBySlugMobile {...childProps}/>}
            DesktopComponent={<StoreBySlugMobile {...childProps}/>}
        />
    );
}

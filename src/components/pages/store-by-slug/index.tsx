'use client'

import type { Shop, Offer } from 'shared/models';

import { useTranslations } from 'next-intl';

import {
    useOffersByShopData,
    useShopBySlugData
} from './hooks';

import Loading from 'pages/loading';
import DeviceDetector from 'common/device-detector';

import StoreBySlugMobile from './mobile';
import StoreBySlugDesktop from './mobile';

type Props = Readonly<{
    slug: string;
    shopId: string;
    locale: string;
}>;

export type StoreBySlugProps = Props & Readonly<{
    t: ReturnType<typeof useTranslations>;
    shop: Shop;
    offers: Array<Offer>;
    fetchNextPage: any,
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
    isLoadingOffers: boolean;
}>;

export default function StoreBySlug(props: Props) {
    'use memo'
    const { slug, shopId, locale } = props;

    const t = useTranslations();

    const {
        shop,
        isLoading: isLoadingShop,
    } = useShopBySlugData(slug);

    const {
        offers,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading: isLoadingOffers,
    } = useOffersByShopData(shopId);

    if (isLoadingShop || isLoadingOffers) return <Loading/>

    const childProps: StoreBySlugProps = {
        t,
        slug,
        shopId,
        locale,
        shop: shop!,
        offers,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoadingOffers,
    };

    return (
        <DeviceDetector
            MobileComponent={<StoreBySlugMobile {...childProps}/>}
            DesktopComponent={<StoreBySlugDesktop {...childProps}/>}
        />
    );
}

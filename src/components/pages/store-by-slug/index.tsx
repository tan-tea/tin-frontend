'use client'

import dynamic from 'next/dynamic';

import { useHydrateAtoms } from 'jotai/utils';
import { useTranslations } from 'next-intl';

import type {
    Shop,
    Offer,
} from 'shared/models';
import { offersAtom, shopAtom } from 'shared/state';

import DeviceDetector from 'common/device-detector';

const StoreBySlugMobile = dynamic(
    () => import('./mobile'),
    {
        ssr: false,
        loading: () => <></>,
    },
);

const StoreBySlugDesktop = dynamic(
    () => import('./desktop'),
    {
        ssr: false,
        loading: () => <></>,
    },
);

type OwnStoreBySlugProps = Readonly<{
    shop: Shop;
    offers: Array<Offer>;
}>;

export type StoreBySlugProps = OwnStoreBySlugProps & {
    t: ReturnType<typeof useTranslations>;
};

export default function StoreBySlug(props: OwnStoreBySlugProps) {
    'use memo'
    const { shop, offers } = props;

    useHydrateAtoms([
        [shopAtom, shop] as any,
        [offersAtom, offers] as any,
    ]);

    const t = useTranslations();

    const childProps: StoreBySlugProps = {
        t,
        shop,
        offers,
    };

    return (
        <DeviceDetector
            MobileComponent={<StoreBySlugMobile {...childProps}/>}
            DesktopComponent={<StoreBySlugMobile {...childProps}/>}
        />
    );
}

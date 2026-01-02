'use client'

import dynamic from 'next/dynamic';

import { useTranslations } from 'next-intl';
import { useHydrateAtoms } from 'jotai/utils';

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

type OwnStoreBySlugProps = Readonly<{
    slug: string;
    shop: Shop;
    offers: Array<Offer>;
}>;

export type StoreBySlugProps = OwnStoreBySlugProps & {
    t: ReturnType<typeof useTranslations>;
};

export default function StoreBySlug(props: OwnStoreBySlugProps) {
    'use memo'
    const { slug, shop, offers } = props;

    useHydrateAtoms([
        [shopAtom, shop] as any,
        [offersAtom, offers] as any,
    ]);

    const t = useTranslations();

    const childProps: StoreBySlugProps = {
        t,
        slug,
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

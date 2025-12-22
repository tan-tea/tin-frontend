'use client'

import dynamic from 'next/dynamic';

import { useTranslations } from 'next-intl';

import type {
    Offer
} from 'shared/models';
import { useHideUI } from 'shared/hooks';

import DeviceDetector from 'common/device-detector';

import ItemBySlugMobileSkeleton from './mobile/skeleton';

const ItemBySlugMobile = dynamic(
    () => import('./mobile'),
    {
        loading: () => <ItemBySlugMobileSkeleton/>,
    },
);

type OwnItemBySlugProps = {
    offer: Offer;
};

export type ItemBySlugProps = Pick<OwnItemBySlugProps, 'offer'> & {
    t: ReturnType<typeof useTranslations>;
};

export default function ItemBySlug(props: OwnItemBySlugProps) {
    const { offer } = props;

    useHideUI({
        hideHeader: true,
        hideBottomNavigation: true,
    });

    const t = useTranslations('productDetail');

    const childProps: ItemBySlugProps = {
        t,
        offer,
    };

    return (
        <DeviceDetector
            MobileComponent={<ItemBySlugMobile {...childProps}/>}
            DesktopComponent={<ItemBySlugMobile {...childProps}/>}
        />
    );
};

'use client'

import type {
    FC,
    ReactElement,
} from 'react';
import { useTranslations, } from 'next-intl';

import dynamic from 'next/dynamic';

import type {
    Offer
} from 'shared/models';
import { useHideUI } from 'shared/hooks';

import DeviceDetectorLayout from 'common/DeviceDetector';

import MobileSkeleton from './mobile/skeleton';
import DesktopSkeleton from './desktop/skeleton';

const ProductDetailMobile = dynamic(
    () => import('./mobile'),
    {
        loading: (props) => <MobileSkeleton {...props}/>,
    },
);

const ProductDetailDesktop = dynamic(
    () => import('./desktop'),
    {
        loading: (props) => <DesktopSkeleton {...props}/>,
    },
);

type OwnProductDetailProps = {
    offer: Offer;
};

export type ProductDetailProps = Pick<OwnProductDetailProps, 'offer'> & {
    t: ReturnType<typeof useTranslations>;
};

export default function ProductDetail(
    props: OwnProductDetailProps,
): ReactElement<FC<OwnProductDetailProps>> | null {
    const {
        offer,
    } = props;

    useHideUI({
        hideHeader: true,
        hideBottomNavigation: true,
    });

    const t = useTranslations('productDetail');

    const childProps: ProductDetailProps = {
        t,
        offer,
    };

    return (
        <DeviceDetectorLayout
            MobileComponent={<ProductDetailMobile {...childProps}/>}
            DesktopComponent={<ProductDetailMobile {...childProps}/>}
        />
    );
};

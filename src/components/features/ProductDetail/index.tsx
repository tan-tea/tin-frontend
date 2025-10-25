'use client'

import {
    type FC,
    type ReactElement,
} from 'react';
import { useTranslations, } from 'next-intl';

import { useHideUI } from 'shared/hooks';

import DeviceDetectorLayout from 'layout/DeviceDetectorLayout';

import ProductDetailMobile from './mobile';
import ProductDetailDesktop from './desktop';

type OwnProductDetailProps = {
    id: string;
    offer: any;
};

export type ProductDetailProps = Pick<OwnProductDetailProps, 'offer'> & {
    t: ReturnType<typeof useTranslations>;
};

export default function ProductDetail(
    props: OwnProductDetailProps,
): ReactElement<FC<OwnProductDetailProps>> {
    const {
        id,
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

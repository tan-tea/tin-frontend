'use client'

import type { Cart } from 'shared/models';

import { useTranslations } from 'next-intl';

import { useHideUI } from 'shared/hooks';

import DeviceDetector from 'common/device-detector';

import CartMobile from './mobile';
import CartDesktop from './mobile';

type Props = Readonly<{ locale: string; }>;

export type CartProps = Props & {
    t: ReturnType<typeof useTranslations>;
};

export default function Cart(props: Props) {
    'use memo'
    useHideUI({
        hideHeader: true,
        hideBottomNavigation: true,
    });

    const t = useTranslations();

    const childProps: CartProps = {
        ...props,
        t,
    };

    return (
        <DeviceDetector
            MobileComponent={<CartMobile {...childProps}/>}
            DesktopComponent={<CartDesktop {...childProps}/>}
        />
    );
}

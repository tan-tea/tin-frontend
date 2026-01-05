'use client'

import dynamic from 'next/dynamic';

import { useTranslations } from 'next-intl';

import { useHideUI } from 'shared/hooks';

import Loading from 'pages/loading';
import DeviceDetector from 'common/device-detector';

const CartMobile = dynamic(
    () => import('./mobile'),
    {
        ssr: false,
        loading: () => <Loading/>
    },
);

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
            DesktopComponent={<CartMobile {...childProps}/>}
        />
    );
}

'use client'

import dynamic from 'next/dynamic';

import { useScroll } from 'shared/hooks';

import DeviceDetector from 'common/device-detector';

import HeaderMobileSkeleton from './mobile/skeleton';

const HeaderMobile = dynamic(
    () => import('./mobile'),
    {
        loading: () => <HeaderMobileSkeleton/>,
    },
);

type Props = Readonly<object>;

export type HeaderProps = {
    scrolling: boolean;
};

export default function Header(props: Props) {
    'use memo'
    const {} = props;

    const { moving } = useScroll();

    const childProps: HeaderProps = {
        scrolling: moving,
    };

    return (
        <DeviceDetector
            MobileComponent={<HeaderMobile {...childProps}/>}
            DesktopComponent={<HeaderMobile {...childProps}/>}
        />
    );
};

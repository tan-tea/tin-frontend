'use client'

import {
    type FC,
    type ReactNode,
    type ReactElement,
    Fragment,
    useEffect,
} from 'react';
import { useShallow, } from 'zustand/react/shallow';

import { useGeolocation, } from 'shared/hooks';
import { useApplicationStore, } from 'shared/stores/application-store';

import {
    Box,
} from 'ui/index';

import Header from 'common/Header';
import BottomNavigation from 'common/BottomNavigation';

import DeviceDetectorLayout from './DeviceDetectorLayout';

export type BaseLayoutProps = {
    children: ReactNode;
};

const BaseLayoutMobile: FC<BaseLayoutProps> = (
    props: BaseLayoutProps,
) => {
    const {
        children,
    } = props;

    return (
        <Fragment>
            <Header/>
            <Box className='relative top-header-mobile'>
                {children}
            </Box>
            <BottomNavigation/>
        </Fragment>
    );
}

const BaseLayoutDesktop: FC<BaseLayoutProps> = (
    props: BaseLayoutProps,
) => {
    const {
        children,
    } = props;

    return (
        <Fragment>
            <Header/>
            <Box className='relative top-header-desktop'>
                {children}
            </Box>
        </Fragment>
    );
}

export default function BaseLayout(
    props: BaseLayoutProps,
): ReactElement<FC<BaseLayoutProps>> {
    const {
        children,
    } = props;

    const {
        geolocationPosition,
        requestGeolocationPermission,
    } = useGeolocation();

    const { setGeolocation, } = useApplicationStore(
        useShallow(store => store),
    );

    useEffect(() => {
        if (!navigator.geolocation) return

        let position = geolocationPosition;
        if (!position) position = requestGeolocationPermission();

        setGeolocation(position);
    }, [geolocationPosition, requestGeolocationPermission,]);

    return (
        <DeviceDetectorLayout
            MobileComponent={<BaseLayoutMobile children={children}/>}
            DesktopComponent={<BaseLayoutDesktop children={children}/>}
        />
    );
}

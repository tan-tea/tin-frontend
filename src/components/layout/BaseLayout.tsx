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
    showHeader?: boolean;
    showBottomNavigation?: boolean;
};

const BaseLayoutMobile: FC<BaseLayoutProps> = (
    props: BaseLayoutProps,
) => {
    const {
        children,
        showHeader,
        showBottomNavigation,
    } = props;

    return (
        <Fragment>
            {showHeader && <Header />}
            <Box className={`relative ${showHeader ? 'top-header-mobile' : ''}`}>
                {children}
            </Box>
            {showBottomNavigation && <BottomNavigation />}
        </Fragment>
    );
}

const BaseLayoutDesktop: FC<BaseLayoutProps> = (
    props: BaseLayoutProps,
) => {
    const {
        children,
        showHeader,
        showBottomNavigation,
    } = props;

    return (
        <Fragment>
            {showHeader && <Header />}
            <Box className={`relative ${showHeader ? 'top-header-desktop' : ''}`}>
                {children}
            </Box>
            {showBottomNavigation && <BottomNavigation />}
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

    const {
        showHeader,
        showBottomNavigation,
        setGeolocation,
    } = useApplicationStore(
        useShallow(store => store),
    );

    useEffect(() => {
        if (!navigator.geolocation) return

        let position = geolocationPosition;
        if (!position) position = requestGeolocationPermission();

        setGeolocation(position);
    }, [geolocationPosition, requestGeolocationPermission,]);

    const childProps: BaseLayoutProps = {
        children,
        showHeader,
        showBottomNavigation,
    };

    return (
        <DeviceDetectorLayout
            MobileComponent={<BaseLayoutMobile {...childProps}/>}
            DesktopComponent={<BaseLayoutDesktop {...childProps}/>}
        />
    );
}

'use client'

import type {
    FC,
    ReactElement,
} from 'react';
import {
    useMemo,
    useState,
    useEffect,
} from 'react';
import {
    MapCameraProps,
    MapCameraChangedEvent,
} from '@vis.gl/react-google-maps';
import { useTranslations, } from 'next-intl';
import { useShallow, } from 'zustand/react/shallow';

import dynamic from 'next/dynamic';

import type {
    Shop
} from 'shared/models';
import {
    useHideUI,
    useNavigation,
    useLocalStorage,
} from 'shared/hooks';
import { useApplicationStore, } from 'shared/stores/application-store';
import { defaultInitState } from 'shared/stores/application-store/constants';

import DeviceDetectorLayout from 'common/DeviceDetector';

import LocationMobileSkeleton from './mobile/skeleton';

const LocationMobile = dynamic(
    () => import('./mobile'),
    {
        loading: () => <LocationMobileSkeleton/>
    },
);

type OwnLocationProps = {
    shops: Array<Shop>;
};

export type LocationProps = OwnLocationProps & {
    camera: MapCameraProps;
    geolocation: GeolocationPosition | null;
    t: ReturnType<typeof useTranslations>;
    navigation: ReturnType<typeof useNavigation>;
    onCameraChanged: (camera: MapCameraChangedEvent) => void;
    onLocatePin?: (geolocation: {
        lat: number;
        lng: number;
    }) => void;
};

export default function Location(
    props: OwnLocationProps,
): ReactElement<FC<OwnLocationProps>> {
    'use memo'
    const { shops } = props;

    useHideUI({
        hideHeader: true,
        hideBottomNavigation: true,
    });

    const t = useTranslations();
    const navigation = useNavigation();

    const { geolocation, } = useApplicationStore(
        useShallow(store => store),
    );

    const primaryShop = useMemo(
        () => shops?.find?.(shop => shop.isPrimary === true),
        [shops,]
    );

    const [camera, setCamera,] = useLocalStorage<MapCameraProps>('mapCamera', {
        center: {
            lat: primaryShop?.geolocation.latitude || geolocation?.coords?.latitude! || defaultInitState.geolocation.coords.latitude,
            lng: primaryShop?.geolocation.longitude ||  geolocation?.coords?.longitude! || defaultInitState.geolocation.coords.longitude,
        },
        zoom: 17.5,
    });

    const childProps: LocationProps = {
        t,
        shops,
        navigation,
        geolocation,
        camera,
        onLocatePin: (geolocation) => setCamera({
            center: {
                lat: geolocation.lat,
                lng: geolocation.lng,
            },
            zoom: 19,
        }),
        onCameraChanged: (event) => setCamera(event?.detail),
    };

    return (
        <DeviceDetectorLayout
            MobileComponent={<LocationMobile {...childProps}/>}
            DesktopComponent={<LocationMobile {...childProps}/>}
        />
    );
};

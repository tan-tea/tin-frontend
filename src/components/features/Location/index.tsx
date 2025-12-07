'use client'

import type {
    FC,
    ReactElement,
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

    const [camera, setCamera,] = useLocalStorage<MapCameraProps>('mapCamera', {
        center: {
            lat: geolocation?.coords?.latitude || 0,
            lng: geolocation?.coords?.longitude || 0,
        },
        zoom: 14,
    });

    const childProps: LocationProps = {
        t,
        shops,
        navigation,
        geolocation,
        camera,
        onCameraChanged: (event) => setCamera(event?.detail),
    };

    return (
        <DeviceDetectorLayout
            MobileComponent={<LocationMobile {...childProps}/>}
            DesktopComponent={<LocationMobile {...childProps}/>}
        />
    );
};

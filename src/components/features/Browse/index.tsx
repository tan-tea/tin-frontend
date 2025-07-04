'use client'

import {
    useState,
    type FC,
    type ReactElement,
} from 'react';
import {
    MapCameraProps,
    MapCameraChangedEvent,
} from '@vis.gl/react-google-maps';
import { useTranslations, } from 'next-intl';
import { useShallow, } from 'zustand/react/shallow';

import {
    useNavigation,
} from 'shared/hooks';
import { useApplicationStore, } from 'shared/stores/application-store';

import DeviceDetectorLayout from 'layout/DeviceDetectorLayout';

import BrowseMobile from './mobile';
import BrowseDesktop from './desktop';

type OwnBrowseProps = object;

export type BrowseProps = {
    camera: MapCameraProps;
    geolocation: GeolocationPosition;
    t: ReturnType<typeof useTranslations>;
    navigation: ReturnType<typeof useNavigation>;
    onCameraChanged: (camera: MapCameraChangedEvent) => void;
};

export default function Browse(
    props: OwnBrowseProps,
): ReactElement<FC<OwnBrowseProps>> {
    const {} = props;

    const t = useTranslations();
    const navigation = useNavigation();

    const { geolocation, } = useApplicationStore(
        useShallow(store => store),
    );

    const [cameraProps, setCameraProps,] = useState<MapCameraProps>({
        center: {
            lat: geolocation?.coords?.latitude || 0,
            lng: geolocation?.coords?.longitude || 0,
        },
        zoom: 17.5,
    });

    const childProps: BrowseProps = {
        t,
        navigation,
        geolocation,
        camera: cameraProps,
        onCameraChanged: (event) => setCameraProps(event?.detail),
    };

    return (
        <DeviceDetectorLayout
            MobileComponent={<BrowseMobile {...childProps}/>}
            DesktopComponent={<BrowseDesktop {...childProps}/>}
        />
    );
};

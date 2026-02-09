'use client'

import type { Shop } from 'shared/models';

import dynamic from 'next/dynamic';

import {
    MapCameraProps,
    MapCameraChangedEvent,
} from '@vis.gl/react-google-maps';
import { Decimal } from 'decimal.js';
import { useTranslations, } from 'next-intl';
import { useShallow, } from 'zustand/react/shallow';

import {
    useHideUI,
    useNavigation,
    useLocalStorage,
} from 'shared/hooks';
import { useApplicationStore, } from 'shared/stores/application-store';
import { defaultInitState } from 'shared/stores/application-store/constants';

import { useShopsByWorkspaceData } from 'pages/platform/hooks';

import Loading from 'pages/loading';
import DeviceDetector from 'common/device-detector';

const LocationMobile = dynamic(
    () => import('./mobile'),
    {
        ssr: false,
        loading: () => <Loading/>
    },
);

type Props = Readonly<{
    locale: string;
    workspaceId: string;
}>;

export type LocationProps = Props & {
    t: ReturnType<typeof useTranslations>;
    shops: Array<Shop>;
    camera: MapCameraProps;
    geolocation: GeolocationPosition | null;
    navigation: ReturnType<typeof useNavigation>;
    onCameraChanged: (camera: MapCameraChangedEvent) => void;
};

export default function Location(props: Props) {
    'use memo'
    const { locale, workspaceId } = props;

    useHideUI({
        hideHeader: true,
        hideBottomNavigation: true,
    });

    const t = useTranslations();
    const navigation = useNavigation();

    const { geolocation, } = useApplicationStore(
        useShallow(store => store),
    );

    const {
        shops,
        primaryShop,
        isLoading,
    } = useShopsByWorkspaceData(workspaceId);

    const [camera, setCamera] = useLocalStorage<MapCameraProps>('mapCamera', {
        center: {
            lat: Decimal(primaryShop?.geolocation?.latitude ?? geolocation?.coords?.latitude).toNumber() ?? defaultInitState.geolocation.coords.latitude,
            lng: Decimal(primaryShop?.geolocation?.longitude ?? geolocation?.coords?.longitude).toNumber() ?? defaultInitState.geolocation.coords.longitude,
        },
        zoom: 4.5,
    });

    if (isLoading) return <Loading/>

    const childProps: LocationProps = {
        t,
        shops,
        locale,
        workspaceId,
        navigation,
        geolocation,
        camera,
        onCameraChanged: (event) => setCamera(event?.detail),
    };

    return (
        <DeviceDetector
            MobileComponent={<LocationMobile {...childProps}/>}
            DesktopComponent={<LocationMobile {...childProps}/>}
        />
    );
};

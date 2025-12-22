'use client'

import type {
    FC,
    ComponentProps,
} from 'react';

import { useId, useMemo } from 'react';

import { clientEnv } from 'env/client';

import {
    Box,
} from 'ui/index';
import {
    Map,
    Pin,
    AdvancedMarker,
} from 'ui/map';

import type {
    LocationProps,
} from 'components/pages/location';

import Section from 'common/Section';
import Titlebar from 'common/Titlebar';
import BackButton from 'components/common/buttons/back-button';
import LocationButton from 'common/buttons/LocationButton';
import LocationContent from 'pages/location/components/LocationContent';

type Marker = {
    latitude: number;
    longitude: number;
    pin: ComponentProps<typeof Pin>['glyph'];
};

type LocationMobileProps = LocationProps;

const LocationMobile: FC<LocationMobileProps> = ({
    t,
    shops,
    camera,
    geolocation,
    onCameraChanged,
    onLocatePin,
}) => {
    'use memo'
    const uniqueId = useId();

    const markers: Array<Marker> = useMemo(
        () => shops?.map?.(shop => ({
            latitude: shop.geolocation.latitude,
            longitude: shop.geolocation.longitude,
            pin: shop?.workspace?.logo,
        })),
        [shops,]
    );

    const handleCameraChanged: ComponentProps<typeof Map>['onCameraChanged'] = (event) => {
        if (onCameraChanged) onCameraChanged(event);
    }

    return (
        <Section
            label={''}
            description={''}
            className='w-full flex flex-col h-dvh'
        >
            <Titlebar
                position='fixed'
                renderStart={() => <BackButton variant='rounded'/>}
                renderEnd={() => (
                    <Box className='ml-auto bg-white p-1 rounded-full dark:bg-dark-600'>
                        <LocationButton/>
                    </Box>
                )}
            />
            <Box className='h-[420px] shrink-0'>
                <Map
                    mapId={clientEnv.NEXT_PUBLIC_GOOGLE_MAP_ID}
                    zoom={camera?.zoom}
                    center={{
                        lat: camera?.center?.lat,
                        lng: camera?.center?.lng,
                    }}
                    onCameraChanged={handleCameraChanged}
                    className='size-full'
                >
                    <AdvancedMarker
                        position={{
                            lat: geolocation?.coords?.latitude || 0,
                            lng: geolocation?.coords?.longitude || 0,
                        }}
                    />
                    {markers.map(marker => (
                        <AdvancedMarker
                            key={`${uniqueId}-${Date.now()}`}
                            position={{
                                lat: marker?.latitude,
                                lng: marker?.longitude,
                            }}
                        >
                            <Pin
                                background={'var(--mui-palette-primary-main)'}
                                glyphColor={'var(--mui-palette-primary-main)'}
                                borderColor={'transparent'}
                            />
                        </AdvancedMarker>
                    ))}
                </Map>
            </Box>
            <LocationContent
                shops={shops}
                onFocusInMap={(geolocation) => onLocatePin && onLocatePin({ ...geolocation })}
            />
        </Section>
    );
};

export default LocationMobile;

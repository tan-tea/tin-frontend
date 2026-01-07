'use client'

import type { FC, ComponentProps } from 'react';

import dynamic from 'next/dynamic';

import { useMemo } from 'react';

import { clientEnv } from 'env/client';

import {
    Map,
    Pin,
    AdvancedMarker,
} from 'ui/map';
import { Section } from 'ui/layout';

import type {
    LocationProps,
} from 'components/pages/location';

import Titlebar from 'common/titlebar';
import BackButton from 'common/buttons/back-button';
import LocationButton from 'common/buttons/location-button';

const LocationContent = dynamic(
    () => import('features/location/content'),
    {
        ssr: false,
    },
);

type Marker = {
    latitude: number;
    longitude: number;
    pin: ComponentProps<typeof Pin>['glyph'];
};

type Props = LocationProps;

const LocationMobile: FC<Props> = ({
    t,
    shops,
    camera,
    geolocation,
    onCameraChanged,
}) => {
    'use memo'
    const markers: Array<Marker> = useMemo(
        () => (shops ?? [])
            ?.filter(shop => shop.geolocation && !shop.address.isOnline)
            ?.map(shop => ({
                latitude: shop?.geolocation?.latitude!,
                longitude: shop?.geolocation?.longitude!,
                pin: shop?.workspace?.logo!,
            })),
        [shops,]
    );

    const handleCameraChanged: ComponentProps<typeof Map>['onCameraChanged'] = (event) => {
        if (onCameraChanged) onCameraChanged(event);
    }

    return (
        <Section
            aria-label={t('metadata.location.title')}
            aria-description={t('metadata.location.description')}
            className='h-dvh overflow-hidden'
        >
            <Titlebar
                position='absolute'
                renderStart={() => <div><BackButton/></div>}
                renderEnd={() => <div className='ml-auto'><LocationButton/></div>}
            />
            <div className='size-full shrink-0'>
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
                    {markers.map((marker, index) => (
                        <LocationContent
                            key={`${index}-${Date.now()}`}
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
                        </LocationContent>
                    ))}
                </Map>
            </div>
        </Section>
    );
};

export default LocationMobile;

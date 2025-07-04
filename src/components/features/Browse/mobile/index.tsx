'use client'

import type {
    FC,
} from 'react';
import {
    Map,
    Marker,
    AdvancedMarker,
} from '@vis.gl/react-google-maps';

import {
    Box,
} from 'ui/index';

import { BrowseProps, } from 'feature/Browse';

type BrowseMobileProps = BrowseProps;

const BrowseMobile: FC<BrowseMobileProps> = (
    props: BrowseMobileProps
) => {
    const {
        camera,
        geolocation,
        onCameraChanged,
    } = props;

    return (
        <Box
            component='section'
            className='h-dvh-screen-mobile w-full overflow-hidden'
        >
            <Map
                id='maap'
                reuseMaps
                colorScheme='DARK'
                zoom={camera?.zoom}
                center={{
                    lat: camera?.center?.lat,
                    lng: camera?.center?.lng,
                }}
                onCameraChanged={onCameraChanged}
                streetViewControlOptions={{
                    sources: null,
                }}
                styles={[
                    {
                        featureType: 'poi',
                        stylers: [{ visibility: 'off', }],
                    },
                    {
                        featureType: 'transit',
                        stylers: [{ visibility: 'off', }],
                    },
                ]}
                scaleControl={false}
                mapTypeControl={false}
                fullscreenControl={false}
                className='size-full'
            >
                <Marker position={{
                    lat: geolocation?.coords?.latitude,
                    lng: geolocation?.coords?.longitude,
                }}/>
            </Map>
        </Box>
    );
};

export default BrowseMobile;

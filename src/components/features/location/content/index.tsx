'use client';

import type { FC, ReactNode } from 'react';
import type { AdvancedMarkerProps } from '@vis.gl/react-google-maps';

import {
    useState,
    useCallback,
    Fragment
} from 'react';
import { useAtomValue } from 'jotai';
import { useAdvancedMarkerRef } from '@vis.gl/react-google-maps';

import { formatAddress } from 'lib/utils';

import { shopsAtom } from 'shared/state';

import {
    InfoWindow,
    AdvancedMarker,
} from 'ui/map';
import { ExternalLink } from 'ui/link';
import { Heading, Paragraph } from 'ui/text';

type Props = Readonly<{
    position: AdvancedMarkerProps['position'];
    children: ReactNode;
}>;

const LocationContent: FC<Props> = ({
    position,
    children,
}) => {
    'use memo';
    const shops = useAtomValue(shopsAtom);

    const currentShop = shops.find(
        (s) =>
            s.geolocation.latitude === position?.lat && s.geolocation.longitude === position?.lng,
    );

    const [markerRef, marker] = useAdvancedMarkerRef();

    const [infoWindowShown, setInfoWindowShown] = useState(false);

    const handleMarkerClick: AdvancedMarkerProps['onClick'] = useCallback(
        () => setInfoWindowShown((isShown) => !isShown),
        [],
    );

    const handleClose = useCallback(() => setInfoWindowShown(false), []);

    if (!currentShop) return null;

    return (
        <Fragment>
            <AdvancedMarker ref={markerRef} position={position} onClick={handleMarkerClick}>
                {children}
            </AdvancedMarker>
            {infoWindowShown && (
                <InfoWindow
                    anchor={marker}
                    onClose={handleClose}
                    headerContent={<Heading color='primary'>{currentShop?.name}</Heading>}
                >
                    <div className='flex flex-col gap-y-2'>
                        <Paragraph color='dark'>{formatAddress(currentShop.address)}</Paragraph>
                        <ExternalLink
                            href={`https://google.com/maps?q=${currentShop.geolocation.latitude},${currentShop.geolocation.longitude}` as any}
                            className='bg-[var(--mui-palette-primary-main)] text-center text-base py-2 px-4 rounded-full outline-none'
                        >
                            Ir a google Maps
                        </ExternalLink>
                    </div>
                </InfoWindow>
            )}
        </Fragment>
    );
};

export default LocationContent;

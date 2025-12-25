'use client'

import type { FC, ComponentProps } from 'react';
import type { VariantProps } from 'tailwind-variants';

import { useId } from 'react';
import { tv, cn } from 'tailwind-variants';
import {
    Map as BaseMap,
    Pin as BasePin,
    InfoWindow as BaseInfoWindow,
    AdvancedMarker as BaseAdvanceMarker,
} from '@vis.gl/react-google-maps';

const map = tv({
    slots: {
        root: cn('w-full min-h-[100%]'),
        infoWindow: cn(''),
        marker: cn(''),
    },
    variants: {},
});

type MapVariants = VariantProps<typeof map>;

type MapProps = MapVariants & ComponentProps<typeof BaseMap>;

export const Map: FC<MapProps> = ({
    className,
    ...props
}) => {
    'use memo'
    const { root } = map();

    const uniqueId = useId();

    return (
        <BaseMap
            id={uniqueId}
            reuseMaps
            disableDefaultUI
            colorScheme='DARK'
            zoom={12.5}
            streetViewControlOptions={{
                sources: null,
            }}
            {...props}
            data-slot='map'
            className={root({
                className,
            })}
        />
    );
}

type PinProps = MapVariants & ComponentProps<typeof BasePin>;

export const Pin: FC<PinProps> = ({ ...props }) => {
    'use memo'

    return (
        <BasePin {...props}/>
    );
}

type AdvancedMarkerProps = MapVariants & ComponentProps<typeof BaseAdvanceMarker>;

export const AdvancedMarker: FC<AdvancedMarkerProps> = ({
    className,
    ...props
}) => {
    'use memo'
    const { marker } = map();

    return (
        <BaseAdvanceMarker
            {...props}
            data-slot='map-marker'
            className={marker({
                className,
            })}
        />
    );
}

type InfoWindowProps = MapVariants & ComponentProps<typeof BaseInfoWindow>;

export const InfoWindow: FC<InfoWindowProps> = ({
    className,
    ...props
}) => {
    'use memo'
    const { infoWindow } = map();

    return (
        <BaseInfoWindow
            {...props}
            data-slot='map-info-window'
            className={infoWindow({
                className,
            })}
        />
    );
}

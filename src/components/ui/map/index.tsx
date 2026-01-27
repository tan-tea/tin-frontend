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
    StaticMap as BaseStaticMap,
} from '@vis.gl/react-google-maps';

const map = tv({
    slots: {
        root: cn('w-full min-h-[100%]'),
        infoWindow: cn(''),
        marker: cn(''),
        staticMap: cn(''),
    },
    variants: {},
});

type MapVariants = VariantProps<typeof map>;

type MapProps = MapVariants & ComponentProps<typeof BaseMap>;

const Map: FC<MapProps> = ({
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

const Pin: FC<PinProps> = ({ ...props }) => {
    'use memo'

    return (
        <BasePin {...props}/>
    );
}

type AdvancedMarkerProps = MapVariants & ComponentProps<typeof BaseAdvanceMarker>;

const AdvancedMarker: FC<AdvancedMarkerProps> = ({
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

const InfoWindow: FC<InfoWindowProps> = ({
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

type StaticMapProps = MapVariants & ComponentProps<typeof BaseStaticMap>;

const StaticMap: FC<StaticMapProps> = ({
    className,
    ...props
}) => {
    'use memo'
    const { staticMap } = map();

    return (
        <BaseStaticMap
            {...props}
            data-slot='map-static'
            className={staticMap({
                className,
            })}
        />
    )
}

export {
    Map,
    Pin,
    AdvancedMarker,
    InfoWindow,
    StaticMap,
}

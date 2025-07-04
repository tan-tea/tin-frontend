'use client'

import {
    useRef,
    useCallback,
    useEffect,
    useState,
} from 'react';

const POSITION_OPTIONS: PositionOptions = {
    enableHighAccuracy: false,
} as const;

type UseGeolocation = {
    geolocationPosition: GeolocationPosition | null;
    geolocationError: GeolocationPositionError | null;
    requestGeolocationPermission: () => GeolocationPosition;
};

export const useGeolocation: () => UseGeolocation = () => {
    const geolocationWatchIdRef = useRef<number | null>(null);

    const [geolocationError, setGeolocationError,] = useState<GeolocationPositionError | null>(null);
    const [geolocationPosition, setGeolocationPosition,] = useState<GeolocationPosition | null>(null);

    const onSuccess = useCallback(
        (position: GeolocationPosition) =>
            setGeolocationPosition(position),
        [],
    );

    const onError = useCallback(
        (error: GeolocationPositionError) =>
            setGeolocationError(error),
        [],
    );

    const watchGeolocationPosition = useCallback(
        () => {
            if (!navigator.geolocation) return;

            const watchId = navigator
                .geolocation
                .watchPosition(onSuccess, onError, POSITION_OPTIONS);

            geolocationWatchIdRef.current = watchId;
        },
        [onSuccess, onError,],
    );

    const requestGeolocationPermission = useCallback(
        () => {
            if (!navigator.geolocation)
                throw new Error('Something went wrong on Geolocation');

            navigator
                ?.geolocation
                ?.getCurrentPosition?.(onSuccess, onError, POSITION_OPTIONS);

        },
        [onSuccess, onError,],
    ) as UseGeolocation['requestGeolocationPermission'];

    useEffect(() => {
        watchGeolocationPosition();

        return () => {
            if (geolocationWatchIdRef.current) {
                navigator.geolocation.clearWatch(geolocationWatchIdRef.current);
                geolocationWatchIdRef.current = null;
            }
        };
    }, [watchGeolocationPosition,]);

    return {
        geolocationError,
        geolocationPosition,
        requestGeolocationPermission,
    };
};

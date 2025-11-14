import {
    useRef,
    useCallback,
    useEffect,
    useState,
} from 'react';
import { useShallow } from 'zustand/shallow';

import { useApplicationStore } from 'shared/stores/application-store';

const POSITION_OPTIONS: PositionOptions = {
    enableHighAccuracy: false,
} as const;

type UseGeolocation = {
    isWatching: boolean;
    geolocationPosition: GeolocationPosition | null;
    geolocationError: GeolocationPositionError | null;
    requestGeolocationPermission: () => GeolocationPosition;
};

type UseGeolocationHandler = () => UseGeolocation;

export const useGeolocation: UseGeolocationHandler = () => {
    'use memo'
    const geolocationWatchIdRef = useRef<number | null>(null);

    const {
        geolocation,
        setGeolocation,
    } = useApplicationStore(
        useShallow(store => store),
    );

    const [isWatching, setIsWatching,] = useState<boolean>(() => Boolean(geolocation));
    const [geolocationError, setGeolocationError,] = useState<GeolocationPositionError | null>(null);

    const onSuccess = useCallback(
        (position: GeolocationPosition) => {
            setGeolocation(position);
            setGeolocationError(null);

            if (!isWatching && position) setIsWatching(true);
        },
        [],
    );

    const onError = useCallback(
        (error: GeolocationPositionError) => {
            setGeolocation(null);
            setGeolocationError(error);
        },
        [],
    );

    const watchGeolocationPosition = useCallback(
        () => {
            if (!navigator.geolocation) return;

            if (geolocationWatchIdRef.current)
                geolocationWatchIdRef.current = null;

            const watchId = navigator
                .geolocation
                .watchPosition(onSuccess, onError, POSITION_OPTIONS);

            geolocationWatchIdRef.current = watchId;
        },
        [onSuccess, onError],
    );

    const requestGeolocationPermission = useCallback(
        () => {
            if (!navigator.geolocation)
                throw new Error('Something went wrong on Geolocation');

            navigator
                ?.geolocation
                ?.getCurrentPosition?.(onSuccess, onError, POSITION_OPTIONS);


            return geolocation;
        },
        [onSuccess, onError,],
    ) as UseGeolocation['requestGeolocationPermission'];

    useEffect(() => {
        if (isWatching)
            watchGeolocationPosition();

        return () => {
            if (geolocationWatchIdRef.current) {
                navigator.geolocation.clearWatch(geolocationWatchIdRef.current);
                geolocationWatchIdRef.current = null;
            }
        };
    }, [watchGeolocationPosition, isWatching]);

    return {
        isWatching,
        geolocationError,
        geolocationPosition: geolocation,
        requestGeolocationPermission,
    };
};

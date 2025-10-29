import {
    FALLBACK_LANGUAGE,
} from 'lib/i18n/constants';
import type {
    ApplicationState,
} from 'shared/stores/application-store/types';

const defaultInitState: ApplicationState = {
    theme: 'system',
    language: FALLBACK_LANGUAGE,
    geolocation: {
        coords: {
            latitude: 4.570868,
            longitude: -74.297333,
            accuracy: 0,
            altitude: null,
            altitudeAccuracy: null,
            heading: null,
            speed: null,
            toJSON: function () {}
        },
        timestamp: Date.now(),
        toJSON: () => {},
    },
    loading: false,
    showHeader: true,
    showBottomNavigation: true,
};

export {
    defaultInitState,
};

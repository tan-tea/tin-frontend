import {
    FALLBACK_LANGUAGE,
} from 'lib/i18n/constants';
import type {
    ApplicationState,
} from 'shared/stores/application-store/types';

const defaultInitState: ApplicationState = {
    theme: 'system',
    language: FALLBACK_LANGUAGE,
    discord: {
        accessToken: null,
        expiresIn: null,
    },
};

export {
    defaultInitState,
};

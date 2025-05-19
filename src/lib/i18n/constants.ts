const FALLBACK_LANGUAGE = 'en';

const LANGUAGES = [
    FALLBACK_LANGUAGE,
    'es',
];

const DEFAULT_NS = 'translation';

const COOKIE_NAME = 'i18next';

const HEADER_NAME = 'x-i18next-current-language';

const RUN_ON_SERVER_SIDE = typeof window === 'undefined';

export {
    LANGUAGES,
    FALLBACK_LANGUAGE,
    DEFAULT_NS,
    COOKIE_NAME,
    HEADER_NAME,
    RUN_ON_SERVER_SIDE,
};

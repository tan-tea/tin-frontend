import { defineRouting, } from 'next-intl/routing';

import {
    LANGUAGES,
    FALLBACK_LANGUAGE,
} from 'lib/i18n/constants';

export const routing = defineRouting({
    locales: LANGUAGES,
    defaultLocale: FALLBACK_LANGUAGE,
    // localePrefix: 'as-needed',
});

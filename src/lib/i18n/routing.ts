import { defineRouting, } from 'next-intl/routing';

import {
    locales,
    fallbackLanguage,
} from 'lib/i18n/constants';

export const routing = defineRouting({
    locales: locales,
    defaultLocale: fallbackLanguage,
    pathnames: {
        '/': '/',
        '/privacy': {
            es: '/privacidad',
        },
        '/terms': {
            es: '/terminos-del-servicio',
        },
        '/location': {
            es: '/ubicacion',
        },
        '/item/[id]': {
            es: '/item/[id]',
        },
        '/store/[slug]': {
            es: '/sucursal/[slug]'
        },
    },
});

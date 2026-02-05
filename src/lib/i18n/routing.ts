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
        '/store/[slug]': {
            es: '/sucursal/[slug]'
        },
        '/store/[slug]/item/[itemSlug]': {
            es: '/sucursal/[slug]/item/[itemSlug]',
        },
        '/category/[slug]': {
            es: '/categoria/[slug]',
        },
        '/sign-in': {
            es: '/iniciar-sesion',
        },
        '/sign-up': {
            es: '/registrarse',
        },
    },
});

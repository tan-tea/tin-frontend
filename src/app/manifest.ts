import type { MetadataRoute } from 'next';
import { getTranslations } from 'next-intl/server';

import { FALLBACK_LANGUAGE } from 'lib/i18n/constants';

export default async function manifest(): Promise<MetadataRoute.Manifest> {
    const t = await getTranslations({
        namespace: 'manifest',
        locale: FALLBACK_LANGUAGE,
    });

    return {
        name: t('name'),
        short_name: t('shortName'),
        description: t('description'),
        categories: t('categories').split(','),
        start_url: '/',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
            {
                src: './favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
        ],
    };
};

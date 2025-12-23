import type { MetadataRoute } from 'next';

import { getTranslations } from 'next-intl/server';

import { clientEnv } from 'env/client';
import { fallbackLanguage } from 'lib/i18n/constants';

export default async function manifest(): Promise<MetadataRoute.Manifest> {
    const t = await getTranslations({
        namespace: 'metadata',
        locale: fallbackLanguage,
    });

    return {
        name: t('siteName'),
        short_name: t('applicationName'),
        description: t('description'),
        categories: t('keywords').split(','),
        start_url: '/',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
            {
                src: `/favicons/${clientEnv.NEXT_PUBLIC_WORKSPACE_NAME}.ico`,
                sizes: 'any',
                type: 'image/x-icon',
            },
        ],
    };
};

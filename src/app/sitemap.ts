import type { MetadataRoute } from 'next';

import { clientEnv } from 'env/client';

import { getPathname } from 'lib/i18n/navigation';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

    const es = getPathname({ locale: 'es', href: '/' });
    const en = getPathname({ locale: 'en', href: '/' });

    return [
        {
            url: clientEnv.NEXT_PUBLIC_SITE_URL,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
            alternates: {
                languages: {
                    es: clientEnv.NEXT_PUBLIC_SITE_URL + es,
                    en: clientEnv.NEXT_PUBLIC_SITE_URL + en,
                },
            },
        },
    ];
};

import type { MetadataRoute } from 'next';

import { clientEnv } from 'env/client';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = clientEnv.NEXT_PUBLIC_SITE_URL;

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'always',
            priority: 1,
            alternates: {
                languages: {
                    es: `${baseUrl}/es`,
                    en: `${baseUrl}/en`,
                },
            },
        },
        {
            url: `${baseUrl}/location`,
            lastModified: new Date(),
            changeFrequency: 'always',
            priority: 0.9,
            alternates: {
                languages: {
                    es: `${baseUrl}/es/ubicacion`,
                    en: `${baseUrl}/en/location`,
                },
            },
        },
        {
            url: `${baseUrl}/privacy`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.8,
            alternates: {
                languages: {
                    es: `${baseUrl}/es/privacidad`,
                    en: `${baseUrl}/en/privacy`,
                },
            },
        },
    ];
};

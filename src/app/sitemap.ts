import type { MetadataRoute } from 'next';

import { clientEnv } from 'env/client';

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: clientEnv.NEXT_PUBLIC_SITE_URL,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
    ];
};

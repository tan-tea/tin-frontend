import type { NextConfig, } from 'next';

import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
    /* config options here */
    experimental: {
        useCache: true,
        nextScriptWorkers: true,
    },
    env: {},
    devIndicators: false,
    allowedDevOrigins: ['http://172.23.94.42'],
    async redirects() {
        return [];
    },
    async rewrites() {
        return [];
    },
    images: {
        remotePatterns: [
            {
                hostname: '**',
            },
        ],
    }
};

const withNextIntl = createNextIntlPlugin('./src/lib/i18n/request.ts');

export default withNextIntl(nextConfig);

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
    async redirects() {
        return [];
    },
    async rewrites() {
        return [];
    },
};

const withNextIntl = createNextIntlPlugin('./src/lib/i18n/request.ts');

export default withNextIntl(nextConfig);

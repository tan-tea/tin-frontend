import type { NextConfig, } from 'next';

import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
    /* config options here */
    experimental: {
        useCache: true,
        nextScriptWorkers: true,
    },
    images: {
        remotePatterns: [
            {
                hostname: '**',
            },
            {
                protocol: 'https',
                hostname: 'ssfdpagynvyveoschegx.storage.supabase.co',
                pathname: 'storage/v1/s3/**',
            },
        ],
    },
    eslint: {
        ignoreDuringBuilds: true,
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
};

const withNextIntl = createNextIntlPlugin('./src/lib/i18n/request.ts');

export default withNextIntl(nextConfig);

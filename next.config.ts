import type { NextConfig } from 'next';

import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
    /* config options here */
    experimental: {
        useCache: true,
        nextScriptWorkers: true,
        reactCompiler: {
            compilationMode: 'annotation',
        },
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
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin',
                    },
                ],
            },
            {
                source: '/sw.js',
                headers: [
                    {
                        key: 'Content-Type',
                        value: 'application/javascript; charset=utf-8',
                    },
                    {
                        key: 'Cache-Control',
                        value: 'no-cache, no-store, must-revalidate',
                    },
                    {
                        key: 'Content-Security-Policy',
                        value: "default-src 'self'; script-src 'self'",
                    },
                ],
            },
        ];
    },
    async redirects() {
        return [];
    },
    async rewrites() {
        return [];
    },
};

const withNextIntl = createNextIntlPlugin('./src/lib/i18n/request.ts');

export default withNextIntl(nextConfig);

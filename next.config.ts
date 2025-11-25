import type { NextConfig } from 'next';
import { fileURLToPath } from 'node:url';
import { createJiti } from 'jiti';

import createNextIntlPlugin from 'next-intl/plugin';

const jiti = createJiti(fileURLToPath(import.meta.url));

jiti.import('./src/env/server.ts');
jiti.import('./src/env/client.ts');

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
    /* config options here */
    experimental: {
        useCache: true,
        nextScriptWorkers: true,
        optimizePackageImports: [
            'lucide-react',
            'date-fns',
        ],
        serverActions: {
            bodySizeLimit: '50mb',
        },
        reactCompiler: {
            compilationMode: 'annotation',
        },
        staleTimes: {
            dynamic: 10,
            static: 30,
        },
    },
    transpilePackages: ['@t3-oss/env-nextjs', '@t3-oss/env-core'],
    output: 'standalone',
    devIndicators: false,
    allowedDevOrigins: ['http://172.23.94.42'],
    images: {
        qualities: [25, 50, 75, 100],
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
    compiler: {
        removeConsole: isProd,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
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

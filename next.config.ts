import type { NextConfig } from 'next';

import { createJiti } from 'jiti';
import { fileURLToPath } from 'node:url';

import createNextIntlPlugin from 'next-intl/plugin';

const jiti = createJiti(fileURLToPath(import.meta.url));

jiti.import('./src/env/server.ts');
jiti.import('./src/env/client.ts');

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
    output: 'standalone',
    devIndicators: false,
    // cacheComponents: true,
    reactStrictMode: true,
    compiler: {
        removeConsole: isProd,
    },
    reactCompiler: {
        compilationMode: 'annotation',
    },
    transpilePackages: [
        '@t3-oss/env-nextjs',
        '@t3-oss/env-core',
    ],
    serverExternalPackages: ['esbuild-wasm'],
    allowedDevOrigins: ['http://172.23.94.42'],
    experimental: {
        useCache: true,
        globalNotFound: true,
        turbopackFileSystemCacheForDev: true,
        optimizePackageImports: [
            'lucide-react',
            'date-fns',
        ],
        serverActions: {
            bodySizeLimit: '50mb',
        },
        staleTimes: {
            dynamic: 10,
            static: 30,
        },
    },
    images: {
        qualities: [75, 100],
        dangerouslyAllowSVG: true,
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
        minimumCacheTTL: 2678400,
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        unoptimized: false,
    },
    headers: async () => {
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
    redirects: async () => {
        return [];
    },
    rewrites: async () => {
        return [];
    },
};

const withNextIntl = createNextIntlPlugin('./src/lib/i18n/request.ts');

export default withNextIntl(nextConfig);

import 'app/globals.css';

import type { ReactNode } from 'react';
import type { Viewport, Metadata } from 'next';

import {
    Inter,
    Nunito_Sans,
    Poppins,
    Raleway,
} from 'next/font/google';
import { Toaster } from 'sonner';
import { Provider } from 'jotai';
import {
    hasLocale,
    NextIntlClientProvider,
} from 'next-intl';
import { cn } from 'tailwind-variants';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

import { clientEnv } from 'env/client';

import { routing } from 'lib/i18n/routing';
import { locales } from 'lib/i18n/constants';
import { SerwistProvider } from 'lib/serwist';

import Providers from 'layouts/providers';

const inter = Inter({
    variable: '--font-inter',
    subsets: ['latin'],
    display: 'swap',
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900',],
});

const poppins = Poppins({
    variable: '--font-poppins',
    subsets: ['latin',],
    display: 'swap',
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900',],
});

const raleway = Raleway({
    variable: '--font-raleway',
    subsets: ['latin', 'latin-ext', 'cyrillic',],
    display: 'swap',
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900',],
});

const nunito = Nunito_Sans({
    variable: '--font-nunito',
    subsets: ['latin'],
    display: 'swap',
    weight: ['200', '300', '400', '500', '600', '700', '800', '900', '1000',],
});

type LayoutProps = Readonly<{
    children: ReactNode;
    params: Promise<{ locale: string; }>;
}>;

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    minimumScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: 'cover',
    themeColor: [
        {
            media: '(prefers-color-scheme: light)',
            color: '#121212',
        },
        {
            media: '(prefers-color-scheme: dark)',
            color: '#ffffff',
        },
    ],
};

export async function generateMetadata(props: LayoutProps): Promise<Metadata> {
    const { params } = props;

    const locale = (await params).locale;

    const t = await getTranslations({
        locale,
        namespace: 'metadata',
    });

    return {
        title: {
            default: t('siteName'),
            template: t('titleTemplate'),
        },
        metadataBase: new URL(clientEnv.NEXT_PUBLIC_SITE_URL),
        alternates: {
            canonical: '/',
            languages: locales.map(language => ({
                [language]: clientEnv.NEXT_PUBLIC_SITE_URL + `/${language}`,
            })) as any,
        },
        applicationName: t('applicationName'),
        description: t('description'),
        creator: 'Brian Castro',
        publisher: 'yimall.co',
        authors: [
            {
                name: 'yimall.co',
                url: 'https://www.yimall.co'
            }
        ],
        formatDetection: {
            telephone: false,
        },
        appleWebApp: {
            capable: true,
            statusBarStyle: 'default',
            title: t('siteName'),
        },
        openGraph: {
            title: t('siteName'),
            url: clientEnv.NEXT_PUBLIC_SITE_URL,
            images: '../opengraph-image.png',
            siteName: t('applicationName'),
            description: t('description'),
            locale,
            type: 'website',
        },
        keywords: t('keywords').split(','),
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
            },
        },
        icons: {
            icon: {
                url: `/favicons/${clientEnv.NEXT_PUBLIC_WORKSPACE_NAME ?? 'default'}.ico`,
                href: `/favicons/${clientEnv.NEXT_PUBLIC_WORKSPACE_NAME ?? 'default'}.ico`,
            },
        },
    };
}

export default async function RootLayout(props: LayoutProps) {
    const { params, children } = props;

    const { locale } = await params;

    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    const t = await getTranslations();

    return (
        <html
            dir='ltr'
            translate='no'
            lang={locale}
            suppressHydrationWarning
        >
            <body
                suppressHydrationWarning
                className={cn(
                    poppins.variable,
                    raleway.variable,
                    nunito.variable,
                    inter.variable,
                    'relative isolate scrollbar-hide md:scrollbar-default bg-white dark:bg-dark-600'
                )}
            >
                <noscript>{t('noscript')}</noscript>
                <Provider>
                    <NextIntlClientProvider>
                        <AppRouterCacheProvider
                            options={{
                                key: 'css',
                                enableCssLayer: true,
                            }}
                        >
                            <Toaster position='top-center'/>
                            <Providers>
                                <SerwistProvider
                                    swUrl='/serwist/sw.js'
                                    options={{
                                        scope: '/',
                                    }}
                                >
                                    {children}
                                </SerwistProvider>
                            </Providers>
                        </AppRouterCacheProvider>
                    </NextIntlClientProvider>
                </Provider>
            </body>
        </html>
    );
};

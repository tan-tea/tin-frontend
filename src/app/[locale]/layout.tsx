import './globals.css';

import type {
    FC,
    ReactNode,
    ReactElement,
} from 'react';
import type {
    Viewport,
    Metadata,
} from 'next';
import {
    Nunito,
    Poppins,
    Raleway,
} from 'next/font/google';
import { Provider } from 'jotai';
import {
    hasLocale,
    NextIntlClientProvider,
} from 'next-intl';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

import { clientEnv } from 'env/client';

import { cn } from 'lib/utils';
import { routing } from 'lib/i18n/routing';
import { LANGUAGES } from 'lib/i18n/constants';

import Providers from 'layout/Providers';

const poppins = Poppins({
    subsets: ['latin',],
    display: 'swap',
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900',],
    variable: '--font-primary',
});

const raleway = Raleway({
    subsets: ['latin', 'latin-ext', 'cyrillic',],
    display: 'swap',
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900',],
    variable: '--font-secondary',
});

const nunito = Nunito({
    subsets: ['latin'],
    display: 'swap',
    weight: ['200', '300', '400', '500', '600', '700', '800', '900', '1000',],
    variable: '--font-nunito',
});

type RootLayoutProps = {
    children: ReactNode;
    params: Promise<{
        locale: string;
    }>;
};

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

export async function generateMetadata(
    props: RootLayoutProps
): Promise<Metadata> {
    const {
        params
    } = props;

    const { locale } = await params;

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
            languages: LANGUAGES.map(language => ({
                [language]: clientEnv.NEXT_PUBLIC_SITE_URL + `/${language}`,
            })) as any,
        },
        applicationName: t('applicationName'),
        description: t('description'),
        creator: 'Brian Castro',
        authors: [
            {
                name: 'yimall.co',
                url: 'https://www.yimall.co'
            }
        ],
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

export default async function RootLayout(
    props: RootLayoutProps
): Promise<ReactElement<FC<RootLayoutProps>>> {
    const {
        params,
        children,
    } = props;

    const { locale, } = await params;

    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    return (
        <html
            lang={locale}
            translate='no'
            suppressHydrationWarning
            className={cn(
                poppins.className,
                raleway.className,
                nunito.className,
                'scrollbar-hide',
            )}
        >
            <body
                suppressHydrationWarning
                className='isolate bg-white dark:bg-dark-600'
            >
                <Provider>
                    <NextIntlClientProvider>
                        <AppRouterCacheProvider
                            options={{
                                key: 'css',
                                enableCssLayer: true,
                            }}
                        >
                            <Providers>
                                {children}
                            </Providers>
                        </AppRouterCacheProvider>
                    </NextIntlClientProvider>
                </Provider>
            </body>
        </html>
    );
};

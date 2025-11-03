import './globals.css';

import 'reflect-metadata';

import 'lib/di';

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
import { notFound, } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { AppRouterCacheProvider, } from '@mui/material-nextjs/v15-appRouter';

import { clientEnv } from 'env/client';
import { routing } from 'lib/i18n/routing';

import AppProviderLayout from 'layout/AppProviderLayout';

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
            color: '#000000',
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
    const {} = props;

    const t = await getTranslations('metadata');

    return {
        title: {
            default: t('titleDefault'),
            template: t('titleTemplate'),
        },
        description: t('description'),
        metadataBase: new URL(clientEnv.NEXT_PUBLIC_SITE_URL),
        openGraph: {
            url: clientEnv.NEXT_PUBLIC_SITE_URL,
            siteName: t('siteName'),
        },
        keywords: [],
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
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
            className={[
                poppins.className,
                raleway.className,
                nunito.className
            ].join(' ')}
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
                            <AppProviderLayout>
                                {children}
                            </AppProviderLayout>
                        </AppRouterCacheProvider>
                    </NextIntlClientProvider>
                </Provider>
            </body>
        </html>
    );
};

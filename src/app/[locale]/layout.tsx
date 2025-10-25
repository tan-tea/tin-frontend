import './globals.css';

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

    const t = await getTranslations('titles');

    return {
        title: {
            default: t('default'),
            template: t('template'),
        },
        description: t('description'),
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
            className={[poppins.className, raleway.className].join(' ')}
        >
            <body className='isolate bg-white dark:bg-dark-600'>
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

import 'app/globals.css';

import type { Metadata } from 'next';

import { NextIntlClientProvider } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import {
    Poppins,
    Raleway,
} from 'next/font/google';

import { cn } from 'lib/utils';

import { Heading } from 'ui/text';
import { ExternalLink, InternalLink } from 'ui/link';

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

type GlobalNotFoundProps = Readonly<{
    params: Promise<{ locale: string; }>;
}>;

export async function generateMetadata(props: GlobalNotFoundProps): Promise<Metadata> {
    const { params } = props;

    const locale = (await params).locale;

    const t = await getTranslations({
        locale,
        namespace: 'metadata',
    });

    return {
        title: t('titles.notFound.title'),
        description: t('titles.notFound.description'),
    };
}

export default async function GlobalNotFoundPage(
    props: GlobalNotFoundProps
) {
    const { params } = props;

    const locale = (await params).locale;

    const t = await getTranslations('notFound');

    return (
        <html
            lang={locale}
            translate='no'
            suppressHydrationWarning
        >
            <body suppressHydrationWarning className={cn(
                poppins.variable,
                raleway.variable,
                'isolate',
            )}>
                <NextIntlClientProvider>
                    <main className='h-dvh overflow-hidden'>
                        <div className='size-full flex flex-col items-center justify-center p-6 text-center'>
                            <Heading level='1'>{t('title')}</Heading>
                            <p>{t('description')}</p>
                            <ExternalLink
                                href='/'
                                rel='noopener noreferrer'
                                referrerPolicy='no-referrer'
                                className='mt-4 px-6 py-2.5 rounded-full border border-dark-600 text-dark-600'
                            >
                                {t('home')}
                            </ExternalLink>
                        </div>
                    </main>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}

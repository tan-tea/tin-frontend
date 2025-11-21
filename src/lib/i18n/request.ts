import { Formats, hasLocale, } from 'next-intl';
import { getRequestConfig, } from 'next-intl/server';

import { routing } from 'lib/i18n/routing';
import { clientEnv } from 'env/client';

export const formats: Formats = {
    dateTime: {
        short: {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        },
    },
    number: {
        precise: {
            maximumFractionDigits: 5,
        },
    },
    list: {
        enumeration: {
            style: 'long',
            type: 'conjunction',
        },
    },
} satisfies Formats;

export default getRequestConfig(
    async ({
        requestLocale,
    }) => {
        const requested = await requestLocale;

        const locale = hasLocale(routing.locales, requested)
            ? requested
            : routing.defaultLocale;

        return {
            locale,
            messages: (await import(`messages/${clientEnv.NEXT_PUBLIC_WORKSPACE_ID}/${locale}.json`)).default,
        };
    }
);

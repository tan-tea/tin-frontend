import * as R from 'remeda';

import { cache } from 'react';
import { Formats, hasLocale, } from 'next-intl';
import { getRequestConfig, } from 'next-intl/server';

import { clientEnv } from 'env/client';
import { routing } from 'lib/i18n/routing';

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

type Messages = Record<string, any>;

const readI18nMessages = cache(
    async (workspace: string, locale: string) => {
        let specific: Messages | null;

        // Always should exists.
        const common = (await import(`messages/${locale}.json`)).default;

        try {
            specific = (await import(`messages/${workspace}/${locale}.json`)).default;
        } catch {
            specific = null;
        }

        return { common, specific };
    }
);

export default getRequestConfig(
    async ({
        requestLocale,
    }) => {
        const requested = await requestLocale;

        const locale = hasLocale(routing.locales, requested)
            ? requested
            : routing.defaultLocale;

        // TODO: show how works with arrays.
        const { common, specific } = await readI18nMessages(clientEnv.NEXT_PUBLIC_WORKSPACE_NAME, locale);

        const merged = specific
            ? R.mergeDeep(common, specific)
            : common;

        return {
            locale,
            messages: merged,
        };
    }
);

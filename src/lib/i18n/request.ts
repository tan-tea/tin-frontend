import * as R from 'remeda';

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

async function readI18nMessages(workspace: string, locale: string): Promise<[Messages, Messages | null]> {
    let result: Messages | null = null;

    // Always should exists.
    const common = (
        await import(`messages/${locale}.json`)
    ).default;

    try {
        result = (
            await import(`messages/${workspace}/${locale}.json`)
        ).default;
    } catch {
        result = null;
    }

    return [common, result];
}

export default getRequestConfig(
    async ({
        requestLocale,
    }) => {
        const requested = await requestLocale;

        const locale = hasLocale(routing.locales, requested)
            ? requested
            : routing.defaultLocale;

        // TODO: show how works with arrays.
        const [common, specific] = await readI18nMessages(clientEnv.NEXT_PUBLIC_WORKSPACE_NAME, locale);

        const merged = specific
            ? R.mergeDeep(common, specific)
            : common;

        return {
            locale,
            messages: merged,
        };
    }
);

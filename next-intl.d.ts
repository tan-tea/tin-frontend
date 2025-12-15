import type { formats, } from 'lib/i18n/request';

declare module 'next-intl' {
    interface AppConfig {
        Formats: typeof formats;
    }
}

export type Theme = 'dark' | 'light' | 'system';

export interface Preferences {
    ID: string;
    theme?: Theme;
    locale?: string;
    zoneinfo?: string;
    notifications?: boolean;
}
import {
    DISCORD_CDN,
    AVAILABLE_EXTENSIONS,
} from 'lib/utils/constants';
import type { Currency } from 'lib/utils/types';

export function getDiscordAssetExtension(asset: string): string {
    const isGif = asset?.startsWith?.('a_');
    return isGif
        ? AVAILABLE_EXTENSIONS['gif']
        : AVAILABLE_EXTENSIONS['photo']
}

export function getDiscordAvatar(user: any): string {
    if (!user) return '';

    const avatarExtension = getDiscordAssetExtension(user.avatar);

    const result = [
        DISCORD_CDN,
        '/avatars',
        `/${user.id}`,
        `/${user.avatar}`,
        `${avatarExtension}`,
    ];

    return result.join('');
}

export function getDiscordBanner(user: any): string {
    if (!user) return '';

    const bannerExtension = getDiscordAssetExtension(user?.banner);

    const result = [
        DISCORD_CDN,
        '/banners',
        `/${user.id}`,
        `/${user.banner}`,
        `${bannerExtension}`,
    ];

    return result.join('');
}

export function createRandomState(length: number = 32): string {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const randomValues = new Uint8Array(length);
    crypto.getRandomValues(randomValues);

    return Array.from(randomValues)
        .map(byte => charset[byte % charset?.length])
        .join('');
}

export function formatCurrency(
    currency: Currency,
    value: number,
): string {
    const localesAsCurrency: { [K in Currency]: string } = {
        'COP': 'es-CO',
        'USD': 'en-EN',
    };

    return Intl.NumberFormat(localesAsCurrency[currency], {
        style: 'currency',
        currency,
        maximumFractionDigits: 0,
    }).format(value);
}

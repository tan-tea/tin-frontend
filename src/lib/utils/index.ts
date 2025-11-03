import * as R from 'remeda';

import {
    DISCORD_CDN,
    AVAILABLE_EXTENSIONS,
} from 'lib/utils/constants';
import type { Currency } from 'lib/utils/types';
import { PaletteColorOptions, PaletteOptions } from '@mui/material';
import { Customization } from 'shared/models';

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

export function getValueInitials(value: string): string {
  return R.pipe(
    value ?? '',
    (v) => v.trim(),
    (v) => v.split(' '),
    (arr) => R.filter(arr, (x) => x.length > 0),
    (arr) => R.take(arr, 2),
    (arr) => arr.map((word) => word[0]?.toUpperCase() || ''),
    (arr) => arr.join('')
  );
}

export function formatThemePalette(customization: Customization): PaletteOptions {
    const palette: { [key: string]: PaletteColorOptions } = {};

    for (const color of customization.colors) {
        const variants: Record<string, any> = {};

        for (const variant of color.variants) {
            variants[variant.code] = variant.hex;

            if (variant.isMain) {
                variants.main = variant.hex;
            }
        }

        if (!variants.main && Object.keys(variants).length > 0) {
            variants.main = Object.values(variants)[0];
        }

        if (color.variants?.length > 0) {
            palette[color.value] = variants;
        }
    }

    return palette;
}

export function toBase64(value: string): string {
    if (typeof value !== 'string') return '';

    return typeof window === 'undefined'
        ? Buffer.from(value).toString('base64')
        : window.btoa(value);
}

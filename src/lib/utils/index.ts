import * as R from 'remeda';

import {
    clsx,
    type ClassValue,
} from 'clsx';
import {
    PaletteOptions,
    PaletteColorOptions,
} from '@mui/material';
import { twMerge } from 'tailwind-merge';
import { minutesToMilliseconds, secondsToMilliseconds } from 'date-fns';

import type {
    BackoffFn,
    CacheFactory,
    Currency,
    GetCachedFn,
    SetCachedFn
} from 'lib/utils/types';

import type {
    Address,
    Customization,
} from 'shared/models';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createRandomState(length: number = 32): string {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const randomValues = new Uint8Array(length);
    crypto.getRandomValues(randomValues);

    return Array.from(randomValues)
        .map(byte => charset[byte % charset?.length])
        .join('');
}

export function random(max: number): number {
    const random = Math.floor(Math.random() * max);
    return random;
}

export function formatCurrency(
    currency: Currency,
    value: number,
): string {
    const localesAsCurrency: { [K in Currency]: string } = {
        'COP': 'es-CO',
        'USD': 'en-EN',
    };

    const roundToCOP = (price: number) => {
        return Math.floor(price / 50) * 50;
    }

    const roundMap = {
        'COP': roundToCOP(value),
        'USD': value,
    };

    return Intl.NumberFormat(localesAsCurrency[currency], {
        style: 'currency',
        currency,
        maximumFractionDigits: 0,
    }).format(roundMap[currency]);
}

export function formatAddress(address: Address): string | null {
    if (!address) return null;

    const {
        street,
        number,
        complement,
        neighborhood,
        city,
        state,
        country,
        postalCode,
    } = address;

    const formatted = [
        street,
        number,
        neighborhood,
        complement,
    ].filter(Boolean).join(" ");

    return `${formatted}, ${city}, ${state}`;
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

export async function sleep(durationMs: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, durationMs));
}

export const fetchWithBackoff: BackoffFn = async (
    callback,
    args,
    opts,
) => {
    const maximumDelayInMs = opts?.maximunDelay || secondsToMilliseconds(20);
    const deadline = Date.now() + maximumDelayInMs;

    let delayInMs = opts?.delay || 500;

    let result = await callback(args);
    if (result) return result;

    while (Date.now() < deadline) {
        const remainingMs = deadline - Date.now();

        await sleep(Math.min(delayInMs, remainingMs));

        result = await callback(args);
        if (result) return result;

        delayInMs = Math.min(delayInMs * 2, maximumDelayInMs);
    }

    return undefined;
}

export const cacheDurationFactory: CacheFactory = (minutes) => minutesToMilliseconds(minutes);

export const getCached: GetCachedFn = (store, key) => {
    const cached = store.get(key);
    if (cached && cached?.expiresAt > Date.now()) return cached.data;

    if (cached) store.delete(key);

    return null;
};

/**
 *
 * @param store - Representa el objeto o Map que almacena el cache.
 * @param key - La llave que se almacenara en el store.
 * @param data - Los datos que se almacenaran en el cache.
 * @param duration - La duracion en minutos del cache.
 *
 */
export const setCached: SetCachedFn = (store, key, data, duration = 5) => {
    store.set(key, {
        data,
        expiresAt: Date.now() + cacheDurationFactory(duration),
    });
}

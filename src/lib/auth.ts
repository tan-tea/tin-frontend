// import 'server-only';

import { config } from 'dotenv';
import { milliseconds } from 'date-fns';
import { betterAuth } from 'better-auth/minimal';
import { nextCookies } from 'better-auth/next-js';
import { genericOAuth, lastLoginMethod } from 'better-auth/plugins';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

import * as schema from 'lib/db/schema';

import { db } from 'lib/db';
// import { clientEnv } from 'env/client';
// import { serverEnv } from 'env/server';

config({
    path: '.env.local'
});

const isProd = process.env.NODE_ENV === 'production';

export const auth = betterAuth({
    appName: 'yimall.co',
    experimental: { joins: true },
    database: drizzleAdapter(db, {
        provider: 'pg',
        schema,
        usePlural: true,
    }),
    // trustedOrigins: ['http://localhost:3000', clientEnv.NEXT_PUBLIC_SITE_URL],
    trustedOrigins: ['*'],
    emailAndPassword: {
        enabled: true,
        disableSignUp: true,
        autoSignIn: true,
        minPasswordLength: 6,
        resetPasswordTokenExpiresIn: milliseconds({ hours: 1 }),
    },
    session: {
        expiresIn: milliseconds({ days: 7 }),
        updateAge: milliseconds({ days: 1 }),
        storeSessionInDatabase: false,
        preserveSessionInDatabase: false,
        cookieCache: {
            enabled: true,
            maxAge: milliseconds({ minutes: 5 }),
        },
    },
    rateLimit: {
        enabled: true,
        max: 50,
        window: 60,
        storage: 'memory',
    },
    advanced: {
        ipAddress: {
            ipAddressHeaders: ['x-client-ip', 'x-forwarded-for'],
            disableIpTracking: false,
        },
        useSecureCookies: true,
        disableCSRFCheck: false,
        cookies: {
            session_token: {
                attributes: {
                    httpOnly: isProd,
                    secure: isProd,
                },
            },
        },
        defaultCookieAttributes: {
            httpOnly: isProd,
            secure: isProd,
        },
    },
    logger: {
        disabled: false,
        level: 'info',
        log: (level, message, ...args) => {
            console.log(`[${level}] ${message}`, ...args);
        },
    },
    plugins: [
        lastLoginMethod(),
        // genericOAuth({
        //     config: [
        //         {
        //             providerId: 'instagram',
        //             clientId: serverEnv.INSTAGRAM_CLIENT_ID,
        //             clientSecret: serverEnv.INSTAGRAM_CLIENT_SECRET,
        //             authorizationUrl: serverEnv.INSTAGRAM_AUTHORIZE_URL,
        //             redirectURI: serverEnv.INSTAGRAM_REDIRECT_URI,
        //             tokenUrl: serverEnv.INSTAGRAM_TOKEN_URL,
        //             scopes: serverEnv.INSTAGRAM_SCOPE.split(','),
        //         },
        //     ],
        // }),
        nextCookies(),
    ],
});

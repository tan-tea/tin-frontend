import 'server-only';

import { config } from 'dotenv';
import { betterAuth } from 'better-auth';
import { nextCookies } from 'better-auth/next-js';
import { genericOAuth } from 'better-auth/plugins';

import { serverEnv } from 'env/server';

config({
    path: '.env.local'
});

const isProd = process.env.NODE_ENV === 'production';

export const auth = betterAuth({
    appName: 'myapp',
    emailAndPassword: {
        enabled: true,
        autoSignIn: true,
        minPasswordLength: 6,
    },
    cookieCache: {
        enabled: true,
        maxAge: 5 * 60,
    },
    sessions: {
        enabled: true,
        cookieName: 'session',
        cookieSecure: isProd,
        cookieSameSite: 'lax',
    },
    rateLimit: {
        max: 50,
        window: 60,
    },
    trustedOrigins: ['http://localhost:3000', 'https://alashes.vercel.app'],
    plugins: [
        nextCookies(),
        genericOAuth({
            config: [
                {
                    providerId: 'instagram',
                    clientId: serverEnv.INSTAGRAM_CLIENT_ID,
                    clientSecret: serverEnv.INSTAGRAM_CLIENT_SECRET,
                    authorizationUrl: serverEnv.INSTAGRAM_AUTHORIZE_URL,
                    redirectURI: serverEnv.INSTAGRAM_REDIRECT_URI,
                    tokenUrl: serverEnv.INSTAGRAM_TOKEN_URL,
                    scopes: serverEnv.INSTAGRAM_SCOPE!?.split?.(','),
                },
            ],
        }),
    ],
});

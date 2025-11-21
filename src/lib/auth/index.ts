import 'server-only';

import {
    betterAuth,
    type BetterAuthPlugin
} from 'better-auth';
import { nextCookies } from 'better-auth/next-js';
import { genericOAuth } from 'better-auth/plugins';

import { serverEnv } from 'env/server';

const isProd = process.env.NODE_ENV === 'production';

const syncServerPlugin = () => {
    return {
        id: 'sync-server',
    } satisfies BetterAuthPlugin;
};

export const auth = betterAuth({
    appName: 'myapp',
    jwt: {
        enabled: true,
        algorithm: 'RS256',
        // privateKey: '',
        // publicKey: '',
        accessTokenExpiresIn: '15m',
        refreshTokenExpiresIn: '30d',
    },
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
    allowedOrigins: ['http://localhost:3000'],
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
                    scopes: serverEnv.INSTAGRAM_SCOPE.split(','),
                },
            ],
        }),
    ],
});

import { z } from 'zod';
import { createEnv, } from '@t3-oss/env-nextjs';

export const serverEnv = createEnv({
    server: {
        BETTER_AUTH_SECRET: z.string().min(1),
        BETTER_AUTH_URL: z.string().min(1),
        INSTAGRAM_CLIENT_ID: z.string().min(1),
        INSTAGRAM_AUTHORIZE_URL: z.string().min(1),
        INSTAGRAM_TOKEN_URL: z.string().min(1),
        INSTAGRAM_SCOPE: z.string().min(1),
        INSTAGRAM_CLIENT_SECRET: z.string().min(1),
        INSTAGRAM_REDIRECT_URI: z.string().min(1),
        INSTAGRAM_TOKEN: z.string().min(1),
        MAIN_DATABASE_URL: z.url(),
        REPLICA_DATABASE_URL: z.string().optional(),
    },
    experimental__runtimeEnv: process.env,
})

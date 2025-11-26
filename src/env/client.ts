import { z } from 'zod';
import { createEnv } from '@t3-oss/env-nextjs';

export const clientEnv = createEnv({
    client: {
        NEXT_PUBLIC_SITE_URL: z.string().min(1),
        NEXT_PUBLIC_WORKSPACE_ID: z.string().min(1),
        NEXT_PUBLIC_WORKSPACE_NAME: z.string().min(1),
        NEXT_PUBLIC_WORKSPACE_NUMBER: z.string().min(1),
    },
    runtimeEnv: {
        NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
        NEXT_PUBLIC_WORKSPACE_ID: process.env.NEXT_PUBLIC_WORKSPACE_ID,
        NEXT_PUBLIC_WORKSPACE_NAME: process.env.NEXT_PUBLIC_WORKSPACE_NAME,
        NEXT_PUBLIC_WORKSPACE_NUMBER: process.env.NEXT_PUBLIC_WORKSPACE_NUMBER,
    },
});

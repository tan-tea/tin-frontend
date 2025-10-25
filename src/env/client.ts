import { z } from 'zod';
import { createEnv } from '@t3-oss/env-nextjs';

export const clientEnv = createEnv({
    client: {
        NEXT_PUBLIC_WORKSPACE_ID: z.string().min(1),
    },
    runtimeEnv: {
        NEXT_PUBLIC_WORKSPACE_ID: process.env.NEXT_PUBLIC_WORKSPACE_ID,
    },
});

import { headers } from 'next/headers';

import { auth } from 'lib/auth';
import { createSessionKey, sessionCache } from 'lib/performance/cache';

import type { User } from 'shared/models';

type Session = ReturnType<typeof auth.api.getSession>;

export function extractSessionToken(headers: Headers): string | null {
    const cookies = headers.get('cookie');
    if (!cookies) return null;

    const match = cookies.match(/better-auth\.session_token=([^;]+)/);
    return match ? match[1] : null;
}

export async function getSession(): Promise<Session> {
    const requestHeaders = await headers();

    const sessionToken = extractSessionToken(requestHeaders);
    if (sessionToken) {
        const cachedKey = createSessionKey(sessionToken);
        const cached = sessionCache.get(cachedKey);
        if (cached) return cached;
    }

    const session = await auth.api.getSession({
        headers: requestHeaders,
    });

    if (sessionToken && session?.user) {
        const cachedKey = createSessionKey(sessionToken);
        sessionCache.set(cachedKey, session);
    }

    return session;
}

export async function getUser(): Promise<User | null> {
    const session = await getSession();
    return session?.user as User | null;
}

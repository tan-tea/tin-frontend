import {
    NextRequest,
    NextResponse,
    MiddlewareConfig,
} from 'next/server';
import { headers } from 'next/headers';

import createMiddleware from 'next-intl/middleware';

import { auth } from 'lib/auth';
import { routing, } from 'lib/i18n/routing';

const i18nMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    console.log('session', session);

    const response = i18nMiddleware(request);
    return response;
}

export const config: MiddlewareConfig = {
    matcher: [
        '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
        '/([\\w-]+)?/users/(.+)',
    ],
};

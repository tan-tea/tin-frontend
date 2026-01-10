import {
    NextRequest,
    NextResponse,
    ProxyConfig,
} from 'next/server';
import { getSessionCookie } from 'better-auth/cookies';

import createMiddleware from 'next-intl/middleware';

import { routing } from 'lib/i18n/routing';

const i18nMiddleware = createMiddleware(routing);

export async function proxy(request: NextRequest) {
    const session = getSessionCookie(request);

    const { pathname } = request.nextUrl;
    if (pathname.startsWith('/serwist')) {
        return NextResponse.next();
    }

    const response = i18nMiddleware(request);
    return response;
}

export const config: ProxyConfig = {
    matcher: [
        '/((?!api|trpc|serwist|_next|_vercel|.*\\..*).*)',
        // '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/([\\w-]+)?/users/(.+)',
    ],
};

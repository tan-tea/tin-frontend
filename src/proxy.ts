import {
    NextRequest,
    NextResponse,
    ProxyConfig,
} from 'next/server';
import { getSessionCookie } from 'better-auth/cookies';

import createMiddleware from 'next-intl/middleware';

import { routing } from 'lib/i18n/routing';

const i18nMiddleware = createMiddleware(routing);

const authRoutes = [
    '/sign-in',
    '/sign-up',
] as const;

function getLocaleFromPathname(pathname: string) {
    const [, locale] = pathname.split('/');
    return locale || routing.defaultLocale;
}

function withLocale(locale: string, path: string) {
    return `/${locale}${path}`;
}

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const locale = getLocaleFromPathname(pathname);

    if (pathname.startsWith(withLocale(locale, '/serwist'))) {
        return NextResponse.next();
    }

    const sessionCookie = getSessionCookie(request);

    if (sessionCookie && authRoutes.some(r => pathname.startsWith(withLocale(locale, r)))) {
        return NextResponse.redirect(
            new URL(`/${locale}`, request.url),
        );
    }

    return i18nMiddleware(request);
}

export const config: ProxyConfig = {
    matcher: [
        '/([\\w-]+)?/users/(.+)',
        '/((?!api|trpc|serwist|_next|_vercel|.*\\..*).*)',
        // '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    ],
};

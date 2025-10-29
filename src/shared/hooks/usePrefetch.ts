import {
    useRef,
    useCallback,
} from 'react';

import { useRouter } from 'lib/i18n/navigation';

type UsePrefetch = {
    prefetchRoute: (route: string) => void;
    prefetchOnHover: (route: string) => void;
    prefetchOnFocus: (route: string) => void;
    prefetchRoutes: (routes: Array<string>) => void;
};

type UsePrefetchHandler = () => UsePrefetch;

export const usePrefetch: UsePrefetchHandler = () => {
    const router = useRouter();
    const prefetched = useRef<Set<string>>(new Set());

    const prefetchRoute = useCallback(
        (route: string) => {
            if (prefetched.current?.has(route)) return;

            try {
                router.prefetch(route);
                prefetched.current?.add(route);
            } catch {}
        },
        [router,],
    );

    const prefetchOnHover = useCallback(
        (route: string) => {
            const tid = setTimeout(() => prefetchRoute(route), 200);
            return () => clearTimeout(tid);
        },
        [prefetchRoute,],
    );

    const prefetchOnFocus = useCallback(
        (route: string) => {
            prefetchRoute(route);
        },
        [prefetchRoute],
    );

    const prefetchRoutes = useCallback(
        (routes: Array<string>) => {
            routes.forEach(route => prefetchRoute(route));
        },
        [prefetchRoute],
    );

    return {
        prefetchRoute,
        prefetchOnHover,
        prefetchOnFocus,
        prefetchRoutes,
    };
};

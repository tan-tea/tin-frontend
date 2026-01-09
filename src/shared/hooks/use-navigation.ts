import {
    useMemo,
    useEffect,
    useCallback,
    useTransition
} from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { useParams, useSearchParams } from 'next/navigation';

import { useRouter, usePathname } from 'lib/i18n/navigation';

import type {
    History
} from 'shared/models';
import {
    historyAtom,
    addToHistoryAtom,
} from 'shared/state';

type RouteParams = Record<string, string | string[]>;

type NavigationOptions = Parameters<ReturnType<typeof useRouter>['push']>[1];

type UseNavigation = {
    router: ReturnType<typeof useRouter>;
    pathname: ReturnType<typeof usePathname>;
    params: ReturnType<typeof useParams>;
    searchParams: ReturnType<typeof useSearchParams>;
    navigate: (href: any, options?: NavigationOptions) => void;
    back: () => void;
    isActivePath: (path: string) => boolean;
    changeLanguage: (locale: string) => void;
    isChangingLanguage: boolean;
};

type UseNavigationHandler = () => UseNavigation;

function resolvePathname(pathname: string, params: RouteParams) {
    let resolved = pathname;

    Object.entries(params).forEach(([key, value]) => {
        resolved = resolved.replace(`[${key}]`, Array.isArray(value) ? value.join('/') : value);
    });

    return resolved;
}

let intent: 'push' | 'back' = 'push';

function markBackNavigation() {
    intent = 'back';
};

function shouldRecordNavigation() {
    const record = intent === 'push';
    intent = 'push';
    return record;
};

export const useNavigation: UseNavigationHandler = () => {
    'use memo'

    const router = useRouter();
    const pathname = usePathname();
    const params = useParams<RouteParams>();
    const searchParams = useSearchParams();

    const [isPending, startTransition] = useTransition();

    const history = useAtomValue(historyAtom);
    const addToHistory = useSetAtom(addToHistoryAtom);

    /**
     * Ruta real (sin [slug])
     */
    const resolvedPathname = useMemo(() => resolvePathname(pathname, params), [pathname, params]);

    useEffect(
        () => {
            if (!shouldRecordNavigation()) return;

            const last = history?.[history.length - 1];
            if (last?.path === resolvedPathname) return;

            const record: History = {
                url: window?.location?.href!,
                key: resolvedPathname,
                path: resolvedPathname,
                hash: window?.location?.hash!,
                params: searchParams.toString(),
            };

            addToHistory(record);
        },
        [resolvePathname, searchParams],
    );

    /**
     * Navegación básica
     */
    const navigate = useCallback<UseNavigation['navigate']>(
        (path, options) => router.push(path, options),
        [router],
    );

    /**
     * Back inteligente
     */
    const back: UseNavigation['back'] = () => {
        markBackNavigation();

        const path =
            history
            ?.slice()
            .reverse()
            .find(r => r.path && r.path !== resolvedPathname)
            ?.path ?? '/';

        navigate(path, { scroll: true });
    };

    /**
     * Utils
     */
    const isActivePath: UseNavigation['isActivePath'] = (path) => resolvedPathname === path;

    const changeLanguage: UseNavigation['changeLanguage'] = (locale) => {
        startTransition(() => {
            router.replace({ pathname, params } as any, { locale });
        });
    };

    return {
        router,
        navigate,
        back,
        pathname: resolvedPathname as any,
        params,
        searchParams,
        isActivePath,
        changeLanguage,
        isChangingLanguage: isPending,
    };
};

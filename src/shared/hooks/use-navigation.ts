import {
    useMemo,
    useEffect,
    useCallback,
    useTransition
} from 'react';
import { toast } from 'sonner';
import { formatISO } from 'date-fns';
import { useTranslations } from 'next-intl';
import { useParams, useSearchParams } from 'next/navigation';

import { useRouter, usePathname } from 'lib/i18n/navigation';

import type {
    History
} from 'shared/models';
import { useDatabase } from 'shared/contexts/database';

const MAX_HISTORY_RECORDS = 20;

type RouteParams = Record<string, string | string[]>;

type NavigationOptions = Parameters<ReturnType<typeof useRouter>['push']>[1];

type UseNavigation = {
    router: ReturnType<typeof useRouter>;
    pathname: ReturnType<typeof usePathname>;
    params: ReturnType<typeof useParams>;
    searchParams: ReturnType<typeof useSearchParams>;
    navigate: (href: any, options?: NavigationOptions) => void;
    back: () => void | Promise<void>;
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

export const useNavigation: UseNavigationHandler = () => {
    const database = useDatabase();

    const t = useTranslations();
    const router = useRouter();
    const pathname = usePathname();
    const params = useParams<RouteParams>();
    const searchParams = useSearchParams();

    const [isPending, startTransition] = useTransition();

    /**
     * Ruta real (sin [slug])
     */
    const resolvedPathname = useMemo(() => resolvePathname(pathname, params), [pathname, params]);

    /**
     * Navegación básica
     */
    const navigate: UseNavigation['navigate'] = router.push;

    /**
     * Guardar historial
     */
    const saveHistory = useCallback(
        async (history: History) => {
            return database.current.history?.put({
                ...history,
                createdAt: formatISO(new Date()),
                modifiedAt: formatISO(new Date()),
            });
        },
        [database],
    );

    const findAllHistoryFromNow = useCallback(async () => {
        return database.current?.history
            ?.where('createdAt')
            ?.belowOrEqual(formatISO(new Date()))
            ?.sortBy('createdAt');
    }, [database]);

    /**
     * Sincronizar historial
     */
    const syncHistory = useCallback(async () => {
        if (!database) return;

        const newRecord: History = {
            url: window.location.href,
            key: resolvedPathname,
            path: resolvedPathname,
            hash: typeof window !== 'undefined' ? window.location.hash : '',
            params: [...searchParams.entries()].map(([k, v]) => `${k}=${v}`),
        };

        const [count, records] = await Promise.all([
            database.current.history.count(),
            findAllHistoryFromNow(),
        ]);

        if (count <= MAX_HISTORY_RECORDS) {
            return saveHistory(newRecord);
        }

        const oldest = records?.[0];
        if (!oldest) return saveHistory(newRecord);

        await Promise.all([database.current.history.delete(oldest.key), saveHistory(newRecord)]);
    }, [database, resolvedPathname, searchParams, findAllHistoryFromNow, saveHistory]);

    useEffect(() => {
        syncHistory().catch(console.error);
    }, [syncHistory]);

    /**
     * Back inteligente
     */
    const back: UseNavigation['back'] = async () => {
        const records = await findAllHistoryFromNow();
        if (!records?.length) return navigate('/');

        try {
            for (let i = records.length - 1; i >= 0; i--) {
                if (records[i].path !== resolvedPathname) {
                    return navigate(records[i].path, {
                        scroll: false,
                    });
                }
            }
        } catch (error) {
            toast.error(t('goBackError'));
            console.error('Something went wrong in go back');
            return navigate('/', { scroll: false });
        }
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

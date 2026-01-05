import {
    useState,
    useEffect,
    useCallback,
} from 'react';
import { useLocale, useTranslations } from 'next-intl';

import { useNavigation } from 'shared/hooks';

type BreadcrumbElement = {
    label: string;
    href: string;
};

type BreadcrumbContextState = {
    breadcrumbs: Array<BreadcrumbElement>;
    addBreadcrumb: (breadcrumb: BreadcrumbElement) => void;
    updateBreadcrumb: (breadcrumb: BreadcrumbElement) => void;
    getBreadcrumbsFromPath: () => Array<BreadcrumbElement>;
};

type BreadcrumbContextStateHandler = () => BreadcrumbContextState;

const breadcrumbDictionary: Record<string, Record<string, string>> = {
    'es': {
        'terms': 'Términos del servicio',
        'privacy': 'Privacidad',
        'location': 'Ubicación',
        'store': 'Sucursal',
        'item': 'Item',
        'category': 'Categoría',
    }
} as const;

function resolveLabel(segment: string, locale: string) {
    const dictionary = breadcrumbDictionary?.[locale];

    if (dictionary?.[segment]) {
        return dictionary[segment];
    }

    return decodeURIComponent(segment)
        .replace(/-/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase());
}

const useBreadcrumbContextState: BreadcrumbContextStateHandler = () => {
    'use memo'
    const t = useTranslations();

    const locale = useLocale();

    const { pathname } = useNavigation();

    const [breadcrumbs, setBreadcrumbs] = useState<Array<BreadcrumbElement>>([]);

    const addBreadcrumb: BreadcrumbContextState['addBreadcrumb'] = useCallback(
        (breadcrumb) => {
            setBreadcrumbs(prev => {
                const exists = prev.some(b => b.href === breadcrumb.href);
                if (exists) return prev;

                return [...prev, breadcrumb];
            });
        },
        [],
    );

    const updateBreadcrumb: BreadcrumbContextState['updateBreadcrumb'] = useCallback(
        (breadcrumb) => {
            setBreadcrumbs(prev => prev.map(
                b => b.href === breadcrumb.href ? {
                    ...b,
                    label: breadcrumb.label
                } : b
            ));
        },
        [],
    );

    const getBreadcrumbsFromPath: BreadcrumbContextState['getBreadcrumbsFromPath'] = useCallback(
        () => {
            const segments = pathname.split('/').filter(Boolean);
            const formatted = segments.map((segment, index) => {
                const href = '/' + segments.slice(0, index + 1).join('/');

                return {
                    label: resolveLabel(segment, locale),
                    href,
                };
            });

            return formatted;
        },
        [pathname, locale],
    );

    useEffect(() => {
        const elements: Array<BreadcrumbElement> = [
            {
                label: locale.toUpperCase(),
                href: '/',
            },
            ...getBreadcrumbsFromPath(),
        ];
        setBreadcrumbs(elements);
    }, [getBreadcrumbsFromPath]);

    return {
        breadcrumbs,
        addBreadcrumb,
        updateBreadcrumb,
        getBreadcrumbsFromPath,
    };
};

export type { BreadcrumbElement };
export default useBreadcrumbContextState;

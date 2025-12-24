'use client'

import dynamic from 'next/dynamic';

import { useTranslations } from 'next-intl';

import type {
    Category
} from 'shared/models';
import { currentCategoryAtom } from 'shared/state';
import { useHideUI, useHydrateAndSyncAtom } from 'shared/hooks';

import DeviceDetector from 'common/device-detector';

const CategoryDetailMobile = dynamic(
    () => import('./mobile'),
    {
        ssr: false,
        loading: () => <>Loading...</>
    },
);

type OwnCategoryDetailProps = {
    slug: string;
    category: Category;
};

export type CategoryDetailProps = OwnCategoryDetailProps & {
    t: ReturnType<typeof useTranslations>;
};

export default function CategoryDetail(props: OwnCategoryDetailProps) {
    'use memo'
    useHydrateAndSyncAtom([
        [currentCategoryAtom, props.category],
    ]);

    useHideUI({
        hideHeader: true,
        hideBottomNavigation: true,
    });

    const t = useTranslations();

    const childProps: CategoryDetailProps = {
        ...props,
        t,
    };

    return (
        <DeviceDetector
            MobileComponent={<CategoryDetailMobile {...childProps}/>}
            DesktopComponent={<CategoryDetailMobile {...childProps}/>}
        />
    );
}

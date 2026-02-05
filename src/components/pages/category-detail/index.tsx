'use client'

import type { Category } from 'shared/models';

import { useTranslations } from 'next-intl';

import { useHideUI } from 'shared/hooks';

import { useCategoryBySlugData } from './hooks';

import Loading from 'pages/loading';
import DeviceDetector from 'common/device-detector';

import CategoryDetailMobile from './mobile';
import CategoryDetailDesktop from './mobile';

type Props = Readonly<{
    slug: string;
    locale: string;
}>;

export type CategoryDetailProps = Props & {
    t: ReturnType<typeof useTranslations>;
    category: Category;
};

export default function CategoryDetail(props: Props) {
    'use memo'
    const { slug, locale } = props;

    useHideUI({
        hideHeader: true,
        hideBottomNavigation: true,
    });

    const {
        category,
        isLoading,
    } = useCategoryBySlugData(slug);

    if (isLoading) return <Loading/>;

    const t = useTranslations();

    const childProps: CategoryDetailProps = {
        t,
        slug,
        locale,
        category,
    };

    return (
        <DeviceDetector
            MobileComponent={<CategoryDetailMobile {...childProps}/>}
            DesktopComponent={<CategoryDetailDesktop {...childProps}/>}
        />
    );
}

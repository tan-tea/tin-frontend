'use client'

import dynamic from 'next/dynamic';

import { useTranslations } from 'next-intl';

import type {
    Category
} from 'shared/models';
import { useHideUI } from 'shared/hooks';

import { useCategoryOffersData } from './hooks';

import Loading from 'pages/loading';
import DeviceDetector from 'common/device-detector';

const CategoryDetailMobile = dynamic(
    () => import('./mobile'),
    {
        ssr: false,
        loading: () => <Loading/>
    },
);

type Props = Readonly<{ slug: string; }>;

export type CategoryDetailProps = Props & {
    t: ReturnType<typeof useTranslations>;
    category: Category;
};

export default function CategoryDetail(props: Props) {
    'use memo'
    const { slug } = props;

    useHideUI({
        hideHeader: true,
        hideBottomNavigation: true,
    });

    const t = useTranslations();

    const {
        category,
        isLoading,
    } = useCategoryOffersData(slug);

    const childProps: CategoryDetailProps = {
        ...props,
        t,
        category,
    };

    const loading = isLoading;

    if (loading) return <Loading/>;

    return (
        <DeviceDetector
            MobileComponent={<CategoryDetailMobile {...childProps}/>}
            DesktopComponent={<CategoryDetailMobile {...childProps}/>}
        />
    );
}

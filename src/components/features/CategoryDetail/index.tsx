'use client'
import type {
    FC,
    ReactElement,
} from 'react';
import { useTranslations } from 'next-intl';

import dynamic from 'next/dynamic';

import DeviceDetectorLayout from 'common/DeviceDetector';

const CategoryDetailMobile = dynamic(
    () => import('./mobile'),
    {
        loading: () => <>Loading...</>
    },
);

type OwnCategoryDetailProps = {
    id: string;
};

export type CategoryDetailProps = {
    t: ReturnType<typeof useTranslations>;
};

export default function CategoryDetail(
    props: OwnCategoryDetailProps
): ReactElement<FC<OwnCategoryDetailProps>> {
    'use memo'
    const { id } = props;

    const t = useTranslations();

    const childProps: CategoryDetailProps = {
        t,
    };

    return (
        <DeviceDetectorLayout
            MobileComponent={<CategoryDetailMobile {...childProps}/>}
            DesktopComponent={<>Desktop</>}
        />
    );
}

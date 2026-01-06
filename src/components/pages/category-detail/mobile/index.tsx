'use client'

import type { FC } from 'react';

import dynamic from 'next/dynamic';

import { Section } from 'ui/layout';

import type {
    CategoryDetailProps
} from 'pages/category-detail';

import Titlebar from 'common/titlebar';
import BackButton from 'common/buttons/back-button';

const CategoryContent = dynamic(
    () => import('features/category/content'),
    {
        ssr: false,
    },
);

type CategoryDetailMobileProps = CategoryDetailProps;

const CategoryDetailMobile: FC<CategoryDetailMobileProps> = ({
    t,
    category,
}) => {
    'use memo'
    const {
        label,
        description,
    } = category;

    return (
        <Section
            aria-label={label}
            aria-description={description}
        >
            <Titlebar
                title={label}
                renderStart={() => (
                    <div>
                        <BackButton/>
                    </div>
                )}
            />
            <CategoryContent/>
        </Section>
    );
}

export default CategoryDetailMobile;

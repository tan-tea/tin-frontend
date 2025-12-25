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
        label
    } = category;

    return (
        <Section
            aria-label='category detail'
            aria-description='Lorem ipsum'
        >
            <Titlebar
                title={label}
                renderStart={() => <BackButton/>}
            />
            <CategoryContent/>
        </Section>
    );
}

export default CategoryDetailMobile;

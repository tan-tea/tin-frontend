'use client'

import type { FC } from 'react';

import dynamic from 'next/dynamic';

import type {
    CategoryDetailProps
} from 'pages/category-detail';

import Section from 'common/Section';
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
            label='category detail'
            description='Lorem ipsum'
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

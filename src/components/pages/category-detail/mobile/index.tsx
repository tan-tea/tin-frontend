'use client';

import type { FC } from 'react';
import type { CategoryDetailProps } from 'pages/category-detail';

import { Section } from 'ui/layout';

import Titlebar from 'common/titlebar';
import BackButton from 'common/buttons/back-button';
import CategoryContent from 'features/category/content';

type Props = CategoryDetailProps;

const CategoryDetailMobile: FC<Props> = ({ t, category }) => {
    'use memo';
    const { label, description } = category;

    return (
        <Section aria-label={label} aria-description={description ?? ''}>
            <Titlebar
                title={label}
                renderStart={() => (
                    <div>
                        <BackButton />
                    </div>
                )}
            />
            <CategoryContent categoryId={category.id} />
        </Section>
    );
};

export default CategoryDetailMobile;

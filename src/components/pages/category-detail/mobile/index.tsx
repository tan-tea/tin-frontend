'use client'
import type {
    FC
} from 'react';

import type {
    CategoryDetailProps
} from 'components/pages/category-detail';

import Section from 'common/Section';

type CategoryDetailMobileProps = CategoryDetailProps;

const CategoryDetailMobile: FC<CategoryDetailMobileProps> = ({
    t,
}) => {
    'use memo'

    return (
        <Section
            label='category detail'
            description='Lorem ipsum'
        >
            Mobile component
        </Section>
    );
}

export default CategoryDetailMobile;

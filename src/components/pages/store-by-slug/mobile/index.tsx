'use client'

import type { FC } from 'react';

import { Section } from 'ui/layout';

import type { StoreBySlugProps } from 'pages/store-by-slug';

import OfferList from 'features/offer/list';
import CategoryList from 'features/category/list';
import NavigationBreadcrumb from 'features/navigation/breadcrumb';

type StoreBySlugMobileProps = StoreBySlugProps

const StoreBySlugMobile: FC<StoreBySlugMobileProps> = ({
    shop,
    offers,
}) => {
    'use memo'
    return (
        <Section
            role='application'
            aria-label={shop.name}
            aria-description={shop.slug}
            className='overflow-hidden'
        >
            <div className='px-4 pb-2'>
                <NavigationBreadcrumb/>
            </div>
            <CategoryList/>
            <OfferList offers={offers}/>
        </Section>
    );
}

export default StoreBySlugMobile;

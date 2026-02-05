'use client';

import type { FC } from 'react';
import type { StoreBySlugProps } from 'pages/store-by-slug';

import { Section } from 'ui/layout';

import LoadMoreTrigger from 'common/load-more-trigger';
import OfferList from 'features/offer/list';
import CategoryList from 'features/category/list';
import NavigationBreadcrumb from 'features/navigation/breadcrumb';

type Props = StoreBySlugProps;

const StoreBySlugMobile: FC<Props> = ({
    shop,
    offers,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoadingOffers,
}) => {
    'use memo';

    return (
        <Section
            role='application'
            aria-label={shop.name}
            aria-description={shop.slug}
            className='overflow-hidden'
        >
            <div className='px-4 py-2'>
                <NavigationBreadcrumb/>
            </div>
            <CategoryList/>
            <OfferList offers={offers}/>
            <LoadMoreTrigger
                onVisible={fetchNextPage}
                disabled={isFetchingNextPage}
                hasMore={hasNextPage}
            />
        </Section>
    );
};

export default StoreBySlugMobile;

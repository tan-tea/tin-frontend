'use client'

import type { FC } from 'react';

import { Wrapper } from 'ui/layout';

import { useOffersByCategoryIdData } from 'pages/category-detail/hooks';

import OfferList from 'features/offer/list';
import LoadMoreTrigger from 'common/load-more-trigger';

type CategoryContentProps = Readonly<{
    categoryId: string;
}>;

const CategoryContent: FC<CategoryContentProps> = ({
    categoryId,
}) => {
    'use memo'
    const {
        offers,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useOffersByCategoryIdData(categoryId);

    return (
        <Wrapper className='flex flex-col'>
            <OfferList
                offers={offers}
                defaultView='list'
                forceDefaultView
                showActions={false}
            />
            <LoadMoreTrigger
                onVisible={fetchNextPage}
                disabled={isFetchingNextPage}
                hasMore={hasNextPage}
            />
        </Wrapper>
    );
};

export default CategoryContent;

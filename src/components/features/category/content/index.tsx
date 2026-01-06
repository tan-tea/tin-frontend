'use client'

import type { FC } from 'react';

import dynamic from 'next/dynamic';

import { useAtomValue } from 'jotai';

import { categoryAtom } from 'shared/state';

import { Wrapper } from 'ui/layout';

const OfferList = dynamic(
    () => import('features/offer/list'),
    {
        ssr: false,
    },
);

type CategoryContentProps = Readonly<object>;

const CategoryContent: FC<CategoryContentProps> = () => {
    'use memo'
    const category = useAtomValue(categoryAtom);
    if (!category) return null;

    const { offers } = category;

    return (
        <Wrapper className='flex flex-col'>
            <OfferList
                offers={offers}
                defaultView='list'
                forceDefaultView
                showActions={false}
            />
        </Wrapper>
    );
};

export default CategoryContent;

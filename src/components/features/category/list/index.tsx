'use client'

import type { FC } from 'react';

import dynamic from 'next/dynamic';

import { useAtomValue } from 'jotai';

import { categoriesAtom } from 'shared/state';

import { Wrapper } from 'ui/layout';

import CategoryCardSkeleton from 'features/category/card/skeleton';

const CategoryCard = dynamic(
    () => import('features/category/card'),
    {
        ssr: false,
        loading: () => <CategoryCardSkeleton/>,
    },
);

type CategoryListProps = Readonly<object>;

const CategoryList: FC<CategoryListProps> = () => {
    'use memo'

    const categories = useAtomValue(categoriesAtom);

    return (
        <Wrapper className='px-4 py-2 flex items-stretch gap-x-4 overflow-x-scroll scrollbar-hide'>
            {categories.map(category => (
                <CategoryCard key={category.id} category={category}/>
            ))}
        </Wrapper>
    );
}

export default CategoryList;

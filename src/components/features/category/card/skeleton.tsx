'use client'

import type { FC } from 'react';

import Skeleton from 'ui/skeleton'

const CategoryCardSkeleton: FC = () => <Skeleton
    rounded='xl'
    className='shrink-0 flex-1 grow w-[120px] h-[100px]'
/>

export default CategoryCardSkeleton;

'use client'

import type { FC } from 'react';

import Skeleton from 'ui/skeleton'

const CategoryCardSkeleton: FC = () => <Skeleton
    rounded='xl'
    className='w-[70px] h-[100px]'
/>

export default CategoryCardSkeleton;

'use client'

import type {
    FC
} from 'react';

import Skeleton from 'ui/skeleton'

const ProductCardSkeleton: FC = () => <Skeleton
    rounded='xl'
    className='w-[170px] h-[200px]'
/>

export default ProductCardSkeleton;

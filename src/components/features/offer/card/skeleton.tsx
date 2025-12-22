'use client'

import type {
    FC
} from 'react';

import Skeleton from 'ui/skeleton'

const OfferCardSkeleton: FC = () => <Skeleton
    rounded='xl'
    className='w-full h-[200px]'
/>

export default OfferCardSkeleton;

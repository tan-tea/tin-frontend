'use client'

import type {
    FC
} from 'react';

import Skeleton from 'ui/skeleton'

const HeaderMobileSkeleton: FC = () => <Skeleton
    rounded='none'
    className='w-full h-header-mobile'
/>

export default HeaderMobileSkeleton;

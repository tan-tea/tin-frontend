'use client'

import type {
    FC,
} from 'react';
import type { DynamicOptionsLoadingProps } from 'next/dynamic';

import Skeleton from 'ui/skeleton';

type ProductDetailMobileSkeletonProps = DynamicOptionsLoadingProps;

const ProductDetailMobileSkeleton: FC<ProductDetailMobileSkeletonProps> = () => <Skeleton
    rounded='none'
    className='h-dvh'
/>;

export default ProductDetailMobileSkeleton;

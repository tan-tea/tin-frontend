'use client'

import type {
    FC,
} from 'react';
import type { DynamicOptionsLoadingProps } from 'next/dynamic';

type ProductDetailDesktopSkeletonProps = DynamicOptionsLoadingProps;

const ProductDetailDesktopSkeleton: FC<ProductDetailDesktopSkeletonProps> = (props) => {
    const {
        error,
        isLoading,
    } = props;

    return (
        <>
            Loading..
        </>
    )
};

export default ProductDetailDesktopSkeleton;

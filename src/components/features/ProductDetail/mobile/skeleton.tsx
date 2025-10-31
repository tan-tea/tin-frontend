'use client'

import type {
    FC,
} from 'react';
import type { DynamicOptionsLoadingProps } from 'next/dynamic';

type ProductDetailMobileSkeletonProps = DynamicOptionsLoadingProps;

const ProductDetailMobileSkeleton: FC<ProductDetailMobileSkeletonProps> = (props) => {
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

export default ProductDetailMobileSkeleton;

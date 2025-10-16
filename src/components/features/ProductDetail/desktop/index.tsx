'use client'

import type { FC, } from 'react';

import {
    Box,
} from 'ui/index';

import { ProductDetailProps, } from 'feature/ProductDetail';

type ProductDetailDesktopProps = ProductDetailProps;

const ProductDetailDesktop: FC<ProductDetailDesktopProps> = (
    props: ProductDetailDesktopProps
) => {
    const {
        t,
    } = props;

    return (
        <Box
            component='section'
            className='min-h-dvh-screen-mobile bg-inherit size-full overflow-hidden'
        >
            Hola
        </Box>
    );
};

export default ProductDetailDesktop;

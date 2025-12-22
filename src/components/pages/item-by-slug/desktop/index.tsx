'use client'

import type { FC, } from 'react';

import {
    Box,
} from 'ui/index';

import { ItemBySlugProps, } from 'components/pages/item-by-slug';

type ProductDetailDesktopProps = ItemBySlugProps;

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
        </Box>
    );
};

export default ProductDetailDesktop;

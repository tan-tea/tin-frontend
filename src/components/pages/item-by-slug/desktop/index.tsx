'use client'

import type { FC, } from 'react';

import type {
    ItemBySlugProps,
} from 'pages/item-by-slug';

type Props = ItemBySlugProps;

const ProductDetailDesktop: FC<Props> = ({
    t
}) => {
    'use memo'

    return (
        <div className='min-h-dvh-screen-mobile bg-inherit size-full overflow-hidden'>
        </div>
    );
};

export default ProductDetailDesktop;

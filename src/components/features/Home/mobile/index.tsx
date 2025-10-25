'use client'

import type {
    FC,
} from 'react';

import {
    Box,
} from 'ui/index';

import { HomeProps, } from 'feature/Home';

import ProductCard from 'common/ProductCard';
import CategoryCard from 'common/CategoryCard';

type HomeMobileProps = HomeProps;

const HomeMobile: FC<HomeMobileProps> = (
    props: HomeMobileProps
) => {
    const {
        t,
        offers,
        shops,
        categories,
        currentShop,
        selectedCategory,
        onSelectCategory,
    } = props;

    return (
        <Box
            component='section'
            className='min-h-dvh-screen-mobile bg-inherit size-full overflow-hidden'
        >
            <Box className='size-full overflow-y-scroll p-4 pt-0 flex flex-col gap-y-4'>
                {categories && categories?.length > 0 && (
                    <Box className='w-full h-auto flex items-stretch gap-x-4 overflow-x-scroll scrollbar-hide'>
                        {categories?.map?.(category => (
                            <CategoryCard
                                selected={category?.id === selectedCategory}
                                onSelectCategory={onSelectCategory}
                                key={category?.id}
                                {...category}
                            />
                        ))}
                    </Box>
                )}
                <Box className='size-full flex-1 grid grid-cols-2 gap-2'>
                    {offers && offers?.length > 0 && offers?.map?.(offer => (
                        <ProductCard
                            id={offer?.id}
                            key={offer?.id}
                            image={offer?.banner}
                            title={offer?.title}
                            discount={offer?.discount}
                            price={offer?.price}
                            description={offer?.description}
                            className='col-span-1 gap-y-2'
                        />
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default HomeMobile;

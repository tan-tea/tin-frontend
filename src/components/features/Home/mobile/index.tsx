'use client'

import {
    useState,
    type FC,
} from 'react';

import {
    Box,
    Dropdown,
} from 'ui/index';

import { HomeProps, } from 'feature/Home';

import ProductCard from 'common/ProductCard';
import CategoryCard from 'common/CategoryCard';
import SearchEngine from 'common/SearchEngine';

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
    } = props;

    return (
        <Box
            component='section'
            className='min-h-dvh-screen-mobile bg-inherit size-full overflow-hidden'
        >
            <Box className='size-full overflow-y-scroll p-4 pt-0 flex flex-col gap-y-4'>
                {categories && categories?.length > 0 && (
                    <Box className='w-full h-auto flex items-center gap-x-4 overflow-x-scroll scrollbar-hide'>
                        {categories?.map?.(category => (
                            <CategoryCard
                                key={category?.id}
                                banner={category?.banner}
                                label={category?.label}
                            />
                        ))}
                    </Box>
                )}
                <Box className='size-full flex-1 grid grid-cols-2 gap-2'>
                    {offers && offers?.length > 0 && offers?.map?.(offer => (
                        <ProductCard
                            key={offer?.id}
                            image={offer?.banner}
                            title={offer?.title}
                            discount={offer?.discount}
                            price={offer?.price}
                            className='col-span-1 gap-y-2'
                        />
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default HomeMobile;

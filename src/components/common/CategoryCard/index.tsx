'use client'

import type {
    FC,
} from 'react';

import {
    Box,
    Text,
    Avatar,
} from 'ui/index';

type CategoryCardProps = {
    banner?: string;
    label?: string;
};

const CategoryCard: FC<CategoryCardProps> = (
    props: CategoryCardProps,
) => {
    const {
        banner = '/logo.svg',
        label = 'LG',
    } = props;

    return (
        <Box className='shrink-0 flex flex-col px-2 gap-y-1.5 items-center justify-center w-18 h-auto bg-light-400 rounded-4xl pt-2 pb-4 dark:bg-dark-500'>
            <Avatar
                size='xxxl'
                src={banner}
                alt={label}
                rounded='full'
                className='shrink-0'
            />
            <Text
                variant='body1'
                component='p'
                className='w-full font-secondary font-normal text-xs leading-3.5 text-center text-dark-600 dark:text-light-600'
            >
                {label}
            </Text>
        </Box>
    );
};

export default CategoryCard;

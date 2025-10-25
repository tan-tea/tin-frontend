'use client'

import type {
    FC,
} from 'react';
import {
    tv,
    type VariantProps,
} from 'tailwind-variants';

import {
    Box,
    Text,
    Avatar,
} from 'ui/index';

const categoryCard = tv({
    slots: {
        wrapper: 'shrink-0 flex flex-col px-2 gap-y-1.5 items-center justify-start w-18 h-auto rounded-4xl pt-2 pb-4',
        avatar: 'shrink-0',
        text: 'w-full font-secondary font-normal text-xs leading-3 text-center text-dark-600 dark:text-light-600',
    },
    variants: {
        selected: {
            true: {
                wrapper: 'bg-primary',
                text: 'text-white'
            },
            false: {
                wrapper: 'bg-light-400 dark:bg-dark-500',
            },
        },
    },
});

type CategoryCardVariants = VariantProps<typeof categoryCard>;

type CategoryCardProps = CategoryCardVariants & {
    id: string;
    banner?: string;
    label?: string;
    onSelectCategory: (id: string) => void;
};

const CategoryCard: FC<CategoryCardProps> = (
    props: CategoryCardProps,
) => {
    const {
        id,
        selected,
        banner = '/images/logo.svg',
        label = 'LG',
        onSelectCategory,
    } = props;

    const {
        wrapper,
        avatar,
        text,
    } = categoryCard({
        selected,
    });

    const handleCategoryClick: (id: string) => void = (id) => {
        if (onSelectCategory)
            onSelectCategory(id);
    };

    return (
        <Box
            className={wrapper()}
            onClick={() => handleCategoryClick(id)}
        >
            <Avatar
                size='xxxl'
                src={banner}
                alt={label}
                rounded='full'
                className={avatar()}
            />
            <Text
                variant='body1'
                component='p'
                className={text()}
            >
                {label}
            </Text>
        </Box>
    );
};

export default CategoryCard;

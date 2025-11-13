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
        wrapper: 'shrink-0 flex flex-col items-center justify-start px-2 py-4 gap-y-2 rounded-4xl w-26 min-h-[110px] border border-transparent dark:bg-dark-500 transition-all duration-200 hover:shadow-md cursor-pointer',
        avatar: 'shrink-0 w-14 h-14',
        text: 'w-full font-nunito font-normal text-xs leading-tight text-center text-[var(--mui-palette-grey-700)] dark:text-light-600 break-words',
    },
    variants: {
        selected: {
            true: {
                wrapper: 'bg-[var(--mui-palette-primary-50)] border-[var(--mui-palette-primary-main)]',
                text: 'text-[var(--mui-palette-primary-main)] font-bold'
            },
            false: {
                wrapper: 'bg-[var(--mui-palette-grey-50)]',
            },
        },
    },
});

type CategoryCardVariants = VariantProps<typeof categoryCard>;

type CategoryCardProps = CategoryCardVariants & {
    id: string;
    banner: string;
    label?: string;
    onSelectCategory: (id: string) => void;
};

const CategoryCard: FC<CategoryCardProps> = (props) => {
    'use memo'
    const {
        id,
        banner,
        label,
        selected,
        onSelectCategory,
    } = props;

    const {
        wrapper,
        avatar,
        text,
    } = categoryCard({
        selected,
    });

    return (
        <Box
            className={wrapper()}
            onClick={() => onSelectCategory(id)}
        >
            <Avatar
                size='xxxl'
                src={banner}
                alt={label || ''}
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

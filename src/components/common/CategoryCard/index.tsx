'use client'

import type {
    FC,
} from 'react';
import {
    tv,
    type VariantProps,
} from 'tailwind-variants';

import { cn, getValueInitials } from 'lib/utils';

import {
    Box,
    Text,
} from 'ui/index';
import {
    AvatarRoot,
    AvatarImage,
    AvatarFallback,
} from 'ui/avatar';

const categoryCard = tv({
    slots: {
        wrapper: cn(
            'shrink-0 flex flex-col items-center justify-start px-2 py-4 gap-y-2 rounded-4xl w-26',
            'min-h-[110px] border transition-all duration-200 cursor-pointer',
            'dark:bg-dark-400'
        ),
        avatar: cn('shrink-0 w-14 h-14 ring-2'),
        text: cn('w-full font-nunito text-xs leading-tight text-center break-words'),
    },
    variants: {
        selected: {
            true: {
                wrapper: 'bg-[var(--mui-palette-primary-50)] border-[var(--mui-palette-primary-main)]',
                text: 'text-[var(--mui-palette-primary-main)] font-bold',
                avatar: cn('ring-[var(--mui-palette-primary-main)]')
            },
            false: {
                wrapper: 'bg-[var(--mui-palette-grey-50)] border-transparent',
                text: cn(
                    'text-[var(--mui-palette-grey-700)] font-normal',
                    'dark:text-light-500',
                ),
                avatar: cn('ring-[transparent]')
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
            <AvatarRoot
                size='xxxl'
                rounded='full'
                className={avatar()}>
                <AvatarImage
                    quality={100}
                    fill={false}
                    src={banner}
                    alt={label!}
                    width={40}
                    height={40}
                    className='object-cover'
                />
                <AvatarFallback>
                    {getValueInitials(label!)}
                </AvatarFallback>
            </AvatarRoot>
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

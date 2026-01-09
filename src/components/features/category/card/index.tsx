'use client'

import type { FC } from 'react';
import type { VariantProps } from 'tailwind-variants';

import { tv } from 'tailwind-variants';

import { getValueInitials } from 'lib/utils';

import type {
    Category,
} from 'shared/models';
import { useNavigation } from 'shared/hooks';

import {
    AvatarRoot,
    AvatarImage,
    AvatarFallback,
} from 'ui/avatar';
import { Article } from 'ui/layout';
import { Paragraph } from 'ui/text';
import { CardActionsArea } from 'ui/card';

const categoryCard = tv({
    slots: {
        wrapper: 'shrink-0 px-2 py-2.5 pb-4 rounded-4xl w-26 min-h-[110px] border transition-all duration-200 cursor-pointer',
        avatar: 'shrink-0 w-14 h-14 bg-[var(--mui-palette-primary-main)]',
        text: 'w-full font-alternative text-xs leading-tight text-center break-words',
    },
    variants: {
        selected: {
            true: {
                wrapper: 'bg-[var(--mui-palette-primary-50)] border-[var(--mui-palette-primary-main)] dark:bg-transparent',
                text: 'text-[var(--mui-palette-primary-main)] font-bold',
                avatar: 'ring-[var(--mui-palette-primary-main)]'
            },
            false: {
                wrapper: 'bg-[var(--mui-palette-grey-50)] dark:bg-dark-400 border-transparent',
                text: 'text-dark-600 font-normal dark:text-light-500',
                avatar: 'dark:text-dark-300 ring-[transparent]',
            },
        },
    },
});

type CategoryCardVariants = VariantProps<typeof categoryCard>;

type CategoryCardProps = Readonly<CategoryCardVariants & {
    category: Category;
}>;

const CategoryCard: FC<CategoryCardProps> = ({
    category,
    selected,
}) => {
    'use memo'
    const {
        slug,
        banner,
        label,
        description,
    } = category;

    const { isActivePath } = useNavigation();

    const path = `/category/${slug}`;

    const {
        wrapper,
        avatar,
        text,
    } = categoryCard({
        selected: isActivePath(path) || selected,
    });

    return (
        <Article
            whileTap={{ scale: 0.90 }}
            aria-label={label}
            aria-description={description}
            className={wrapper()}
        >
            <CardActionsArea
                href={path as any}
                className='size-full grow flex flex-col gap-y-2 items-center justify-start bg-inherit'
            >
                <AvatarRoot
                    size='xxxl'
                    rounded='full'
                    className={avatar()}>
                    <AvatarImage
                        loading='eager'
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
                <Paragraph className={text()}>
                    {label}
                </Paragraph>
            </CardActionsArea>
        </Article>
    );
};

export default CategoryCard;

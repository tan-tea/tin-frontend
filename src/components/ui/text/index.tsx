'use client'

import type {
    FC,
    ComponentProps,
} from 'react';

import { memo } from 'react';
import {
    tv,
    type VariantProps,
} from 'tailwind-variants';
import { motion } from 'motion/react';
import BaseTypography, {
    TypographyProps as BaseTypographyProps,
} from '@mui/material/Typography';

import { cn } from 'lib/utils';

const text = tv({
    slots: {
        root: cn('text-base font-primary font-normal m-0 p-0 text-inherit'),
        heading: cn('font-secondary font-bold'),
        paragraph: '',
        label: '',
    },
    variants: {
        as: {
            heading: {},
            paragraph: {},
            label: {},
            link: {},
        },
        level: {
            '1': { heading: cn('text-xl md:text-2xl') },
            '2': { heading: cn('text-lg md:text-xl') },
            '3': { heading: cn('text-base md:text-lg') },
            '4': { heading: cn('text-sm md:text-base') },
            '5': { heading: cn('text-xs md:text-sm') },
            '6': { heading: cn('text-[10px] md:text-xs') },
        },
        color: {
            normal: {
                heading: 'text-dark-600 dark:text-light-400',
            },
            primary: {
                heading: 'text-[var(--mui-palette-primary-main)]'
            },
        },
        through: {
            true: {
                root: 'line-through',
            },
            false: {
                root: 'no-underline',
            },
        },
    },
    defaultVariants: {
        through: false,
    },
});

type TextVariants = VariantProps<typeof text>;

type HeadingProps = Omit<TextVariants, 'as'>
& ComponentProps<typeof motion.h1>;

const headingLevelMap = {
    '1': motion.h1,
    '2': motion.h2,
    '3': motion.h3,
    '4': motion.h4,
    '5': motion.h5,
    '6': motion.h6,
} as const;

export const Heading: FC<HeadingProps> = ({
    level = '2',
    color = 'normal',
    className,
    through,
    ...props
}) => {
    'use memo'
    const { heading } = text({
        level,
        color,
        through,
    });

    const Wrapper = Object.hasOwn(headingLevelMap, level)
        ? headingLevelMap?.[level]
        : headingLevelMap?.['1'];

    return (
        <Wrapper
            {...props}
            data-slot={`text-heading-${level}`}
            className={heading({
                level,
            })}
        />
    );
}

const componentMap = {
    'heading': Heading,
    'subtitle': motion.h2,
    'paragraph': motion.p,
} as const;

type TypographyProps = TextVariants
& BaseTypographyProps;

const Typography: FC<TypographyProps> = ({
    through,
    className,
    ...props
}) => {
    'use memo'
    const { root } = text({
        through,
    })

    return (
        <BaseTypography
            {...props}
            className={root({
                className,
            })}
        />
    )
};

export default memo(Typography);

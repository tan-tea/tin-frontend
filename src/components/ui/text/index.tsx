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
import { motion, MotionNodeAnimationOptions } from 'motion/react';
import BaseTypography, {
    TypographyProps as BaseTypographyProps,
} from '@mui/material/Typography';

import { cn } from 'lib/utils';

const TEXT_ANIMATION: MotionNodeAnimationOptions = {
    initial: {
        opacity: 0,
        y: 8,
    },
    animate: {
        opacity: 1,
        y: 0,
    },
    transition: {
        duration: 0.35,
        ease: 'easeInOut',
    },
} as const;

const text = tv({
    slots: {
        root: cn('text-base font-normal m-0 p-0 text-inherit'),
        heading: cn('block font-secondary font-bold'),
        paragraph: cn('block font-primary-alt text-normal truncate'),
        label: '',
    },
    variants: {
        level: {
            '1': {
                heading: cn('text-2xl leading-10 md:text-3xl'),
                paragraph: cn('text-[20px] leading-[22px]')
            },
            '2': {
                heading: cn('text-xl leading-8 md:text-2xl'),
                paragraph: cn('text-[18px] leading-[20px]')
            },
            '3': {
                heading: cn('text-lg leading-6 md:text-xl'),
                paragraph: cn('text-base leading-[18px]')
            },
            '4': {
                heading: cn('text-base leading-4 md:text-lg'),
                paragraph: cn('text-sm leading-4'),
            },
            '5': {
                heading: cn('text-sm leading-3.5 md:text-base'),
                paragraph: cn('text-xs leading-3.5'),
            },
            '6': {
                heading: cn('text-xs leading-2.5 md:text-sm'),
                paragraph: cn('text-[10px] leading-[12px]')
            },
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
        truncate: {
            true: {
                heading: 'truncate',
                paragraph: 'truncate',
            },
            false: {
                heading: 'text-clip',
                paragraph: 'text-clip',
            },
        },
    },
    defaultVariants: {
        through: false,
    },
});

type TextVariants = VariantProps<typeof text>;

type HeadingProps = TextVariants & ComponentProps<typeof motion.h1>;

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
            {...TEXT_ANIMATION}
            {...props}
            role='heading'
            aria-label={props.children?.toString()}
            data-slot={`text-heading-${level}`}
            className={heading({
                level,
                className,
            })}
        />
    );
}

type ParagraphProps = TextVariants & ComponentProps<typeof motion.p>;

export const Paragraph: FC<ParagraphProps> = ({
    level = '4',
    className,
    ...props
}) => {
    'use memo'
    const { paragraph } = text();

    return (
        <motion.p
            {...TEXT_ANIMATION}
            {...props}
            data-slot='text-paragraph'
            className={paragraph({
                className,
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

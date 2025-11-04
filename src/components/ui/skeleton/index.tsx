'use client'

import type {
    FC,
} from 'react';
import {
    tv,
    type ClassValue,
    type VariantProps
} from 'tailwind-variants';

import Box from 'ui/box';

export const skeleton = tv({
    base: 'w-full bg-[var(--mui-palette-grey-100)] dark:bg-[var(--mui-palette-grey-600)] animate-pulse',
    variants: {
        rounded: {
            none: 'rounded-none',
            sm: 'rounded-sm',
            md: 'rounded-md',
            lg: 'rounded-lg',
            xl: 'rounded-xl',
            full: 'rounded-full',
        },
    },
    defaultVariants: {
        rounded: 'lg',
    },
    compoundVariants: [],
});

export type SkeletonVariants = VariantProps<typeof skeleton>;

export type SkeletonProps = SkeletonVariants & {
    className?: ClassValue;
};

const Skeleton: FC<SkeletonProps> = (props) => {
    const {
        rounded,
        className,
    } = props;

    return (
        <Box className={skeleton({
            rounded,
            className,
        })}/>
    );
};

export default Skeleton;

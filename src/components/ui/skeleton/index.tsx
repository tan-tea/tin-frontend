'use client'

import type { FC } from 'react';
import type { VariantProps, ClassValue } from 'tailwind-variants';

import { tv } from 'tailwind-variants';

const skeleton = tv({
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

type SkeletonVariants = VariantProps<typeof skeleton>;

type SkeletonProps = SkeletonVariants & {
    className?: ClassValue;
};

const Skeleton: FC<SkeletonProps> = (props) => {
    const {
        rounded,
        className,
    } = props;

    return (
        <div className={skeleton({
            rounded,
            className,
        })}/>
    );
};

export default Skeleton;

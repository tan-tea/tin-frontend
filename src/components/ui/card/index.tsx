'use client'

import {
    FC,
    memo,
} from 'react';

import {
    tv,
    type VariantProps,
} from 'tailwind-variants';
import {
    default as RootCard,
    CardProps as RootCardProps,
} from '@mui/material/Card';

const card = tv({
    base: 'p-4 rounded-lg',
    variants: {
        rounded: {
            none: 'rounded-none',
            sm: 'rounded-sm',
            md: 'rounded-md',
            lg: 'rounded-lg',
            xl: 'rounded-xl',
            xxl: 'rounded-2xl',
            xxxl: 'rounded-3xl',
            full: 'rounded-full',
        },
        shadow: {
            none: 'shadow-none',
            sm: 'shadow-sm',
        },
    },
    defaultVariants: {
        shadow: 'sm',
    },
});

type CardVariants = VariantProps<typeof card>;

type CardProps = CardVariants & RootCardProps;

const Card: FC<CardProps> = (props: CardProps) => {
    const {
        rounded,
        shadow,
        variant,
        children,
        className,
        ...rest
    } = props;

    return (
        <RootCard
            {...rest}
            variant={variant}
            children={children}
            className={card({
                rounded,
                shadow,
                className,
            })}
        />
    );
};

export default memo(Card);

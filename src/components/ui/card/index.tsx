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
    base: 'p-6 shadow-sm rounded-lg',
});

type CardVariants = VariantProps<typeof card>;

type CardProps = CardVariants & RootCardProps;

const Card: FC<CardProps> = (props: CardProps) => {
    const {
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
                className,
            })}
        />
    );
};

export default memo(Card);

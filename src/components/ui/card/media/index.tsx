'use client'

import { FC, } from 'react';

import {
    tv,
    type VariantProps,
} from 'tailwind-variants';
import {
    default as RootCardMedia,
    CardMediaProps as RootCardMediaProps,
} from '@mui/material/CardMedia';

const cardMedia = tv({
    base: 'rounded-inherit',
});

type CardMediaVariants = VariantProps<typeof cardMedia>;

type CardMediaProps = CardMediaVariants & RootCardMediaProps;

const CardMedia: FC<CardMediaProps> = (props: CardMediaProps) => {
    const {
        children,
        className,
        ...rest
    } = props;

    return (
        <RootCardMedia
            {...rest}
            children={children}
            className={cardMedia({
                className,
            })}
        />
    );
};

export default CardMedia;

'use client'

import { FC, } from 'react';

import {
    tv,
    type VariantProps,
} from 'tailwind-variants';
import {
    default as RootCardContent,
    CardContentProps as RootCardContentProps,
} from '@mui/material/CardContent';

const cardContent = tv({
    base: 'pt-0 md:pt-4',
});

type CardContentVariants = VariantProps<typeof cardContent>;

type CardContentProps = CardContentVariants & RootCardContentProps;

const CardContent: FC<CardContentProps> = (props: CardContentProps) => {
    const {
        children,
        className,
        ...rest
    } = props;

    return (
        <RootCardContent
            {...rest}
            children={children}
            className={cardContent({
                className,
            })}
        />
    );
};

export default CardContent;

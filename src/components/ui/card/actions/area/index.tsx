'use client'

import { FC, } from 'react';

import {
    tv,
    type VariantProps,
} from 'tailwind-variants';
import {
    default as RootCardActionsArea,
    CardActionAreaProps as RootCardActionsAreaProps,
} from '@mui/material/CardActionArea';

const cardActionsArea = tv({
    base: 'border border-transparent',
});

type CardActionsAreaVariants = VariantProps<typeof cardActionsArea>;

type CardActionsAreaProps = CardActionsAreaVariants & RootCardActionsAreaProps;

const CardActionsArea: FC<CardActionsAreaProps> = (props: CardActionsAreaProps) => {
    const {
        children,
        className,
        ...rest
    } = props;

    return (
        <RootCardActionsArea
            {...rest}
            children={children}
            className={cardActionsArea({
                className,
            })}
        />
    );
};

export default CardActionsArea;

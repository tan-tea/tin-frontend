'use client'

import { FC, } from 'react';

import {
    tv,
    type VariantProps,
} from 'tailwind-variants';
import {
    default as RootCardActions,
    CardActionsProps as RootCardActionsProps,
} from '@mui/material/CardActions';

const cardActions = tv({
    base: '',
});

type CardActionsVariants = VariantProps<typeof cardActions>;

type CardActionsProps = CardActionsVariants & RootCardActionsProps;

const CardActions: FC<CardActionsProps> = (props: CardActionsProps) => {
    const {
        children,
        className,
        ...rest
    } = props;

    return (
        <RootCardActions
            {...rest}
            children={children}
            className={cardActions({
                className,
            })}
        />
    );
};

export default CardActions;

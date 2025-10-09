'use client'

import { FC, } from 'react';

import {
    tv,
    type VariantProps,
} from 'tailwind-variants';
import {
    default as RootCardHeader,
    CardHeaderProps as RootCardHeaderProps,
} from '@mui/material/CardHeader';

import {
    Text,
} from 'ui/index';

const cardHeader = tv({
    slots: {
        base: '',
        title: 'font-secondary text-base font-bold capitalize',
    },
});

const {
    base,
    title,
} = cardHeader();

type CardHeaderVariants = VariantProps<typeof cardHeader>;

type CardHeaderProps = CardHeaderVariants & RootCardHeaderProps;

const CardHeader: FC<CardHeaderProps> = (props: CardHeaderProps) => {
    const {
        children,
        className,
        ...rest
    } = props;

    return (
        <RootCardHeader
            {...rest}
            className={base({
                className,
            })}
            slots={{
                title: Text,
            }}
            slotProps={{
                title: { className: title(), },
            }}
        />
    );
};

export default CardHeader;

'use client'

import type {
    FC,
} from 'react';

import {
    tv,
    type VariantProps,
} from 'tailwind-variants';
import {
    default as RootCardHeader,
    CardHeaderProps as RootCardHeaderProps,
} from '@mui/material/CardHeader';

import Typography from 'ui/text';

const cardHeader = tv({
    slots: {
        base: 'dark:text-[var(--mui-palette-grey-50)]',
        title: 'font-secondary text-base font-bold capitalize',
    },
});

type CardHeaderVariants = VariantProps<typeof cardHeader>;

type CardHeaderProps = CardHeaderVariants & RootCardHeaderProps;

const CardHeader: FC<CardHeaderProps> = (props: CardHeaderProps) => {
    const {
        children,
        className,
        ...rest
    } = props;

    const {
        base,
        title,
    } = cardHeader();

    return (
        <RootCardHeader
            {...rest}
            className={base({
                className,
            })}
            slots={{
                title: Typography,
            }}
            slotProps={{
                title: { className: title(), },
            }}
        />
    );
};

export default CardHeader;

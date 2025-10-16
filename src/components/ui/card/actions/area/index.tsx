'use client'

import type { FC, } from 'react';
import {
    tv,
    type VariantProps,
} from 'tailwind-variants';
import {
    default as RootCardActionsArea,
    CardActionAreaProps as RootCardActionsAreaProps,
} from '@mui/material/CardActionArea';

import Link, { LinkProps, } from 'next/link';

const cardActionsArea = tv({
    base: 'border border-transparent',
});

type CardActionsAreaVariants = VariantProps<typeof cardActionsArea>;

type CardActionsAreaProps = CardActionsAreaVariants & RootCardActionsAreaProps & Partial<LinkProps>;

const CardActionsArea: FC<CardActionsAreaProps> = (props: CardActionsAreaProps) => {
    const {
        href,
        children,
        className,
        ...rest
    } = props;

    return (
        <RootCardActionsArea
            {...rest}
            className={cardActionsArea({
                className,
            })}
        >
            {href
                ? (<Link className='rounded-[inherit]' href={href}>{children}</Link>)
                : (children)
            }
        </RootCardActionsArea>
    );
};

export default CardActionsArea;

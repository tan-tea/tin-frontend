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
    default as RootPopper,
    PopperProps as RootPopperProps,
} from '@mui/material/Popper';

const popper = tv({
    base: '',
});

type PopperVariants = VariantProps<typeof popper>;

type PopperProps = PopperVariants & RootPopperProps;

const Popper: FC<PopperProps> = (props: PopperProps) => {
    const {
        children,
        className,
        ...rest
    } = props;

    return (
        <RootPopper
            {...rest}
            children={children}
            className={popper({
                className,
            })}
        />
    );
};

export default memo(Popper);
